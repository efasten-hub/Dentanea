#!/usr/bin/env node
/**
 * Automatische Tests des fertigen Builds (dist/) – ohne Browser, ohne Internet.
 *
 *   npm test            – baut die Website und prüft dist/
 *   npm run test:dist   – prüft nur ein vorhandenes dist/
 *   npm run test:a11y   – zusätzlich Barrierefreiheit (axe) und Überlauf im Browser (Playwright)
 *
 * Geprüft wird je HTML-Seite:
 *   - genau eine <h1>, <html lang>, <title>, Meta-Description
 *   - Canonical zeigt auf die eigene URL; hreflang-Ziele existieren und verweisen zurück
 *   - interne Links und eingebundene Dateien existieren
 *   - keine Inline-Skripte (außer JSON-LD) und keine style-Attribute (CSP)
 *   - keine eingebundenen Dateien von fremden Servern (Datenschutz)
 *   - JSON-LD ist gültiges JSON, alle @id-Verweise lösen auf, keine offenen [[…]]-Markierungen
 * Außerdem: Sitemap = alle indexierbaren Seiten, robots.txt, llms.txt, .htaccess mit CSP.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const DIST = process.env.TEST_DIST ?? join(WURZEL, "dist");
const { site } = await import(join(WURZEL, "src/config/site.ts"));
const DOMAIN = site.domain.replace(/\/$/, "");

const fehler = [];
const f = (text) => fehler.push(text);
if (!existsSync(DIST)) { console.error("dist/ fehlt – zuerst npm run build"); process.exit(1); }

const dateien = [];
(function walk(d) { for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : dateien.push(p); } })(DIST);
const html = dateien.filter((p) => p.endsWith(".html"));
const urlVon = (p) => "/" + relative(DIST, p).replace(/\\/g, "/").replace(/index\.html$/, "");
const seiten = new Map(html.map((p) => [urlVon(p), readFileSync(p, "utf8")]));
const existiert = (pfad) => {
  const ohne = decodeURIComponent(pfad.split(/[?#]/)[0]);
  const z = join(DIST, ohne);
  return existsSync(z) && (statSync(z).isFile() || existsSync(join(z, "index.html")));
};
const attr = (s, re) => [...s.matchAll(re)].map((m) => m[1]);

const indexierbar = new Set();
for (const [url, s] of seiten) {
  const noindex = /<meta name="robots" content="noindex/.test(s);
  if (!noindex) indexierbar.add(DOMAIN + url);

  const h1 = (s.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) f(`${url}: ${h1} × <h1> (erwartet 1)`);
  if (!/<html lang="(de|en|es|tr)"/.test(s)) f(`${url}: <html lang> fehlt`);
  if (!/<title>[^<]+<\/title>/.test(s)) f(`${url}: <title> fehlt`);
  if (!/<meta name="description" content="[^"]+"/.test(s)) f(`${url}: Meta-Description fehlt`);

  if (!noindex) {
    const canonical = s.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== DOMAIN + url) f(`${url}: Canonical ${canonical} ≠ eigene URL`);
    for (const [, lang, href] of s.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
      const ziel = href.replace(DOMAIN, "");
      if (!seiten.has(ziel)) { f(`${url}: hreflang ${lang} → ${href} existiert nicht`); continue; }
      if (lang !== "x-default" && !seiten.get(ziel).includes(`href="${DOMAIN}${url}"`)) f(`${url}: hreflang ${lang} → ${href} verweist nicht zurück`);
    }
  }

  for (const h of [...attr(s, /\s(?:href|src)="(\/[^"]*)"/g), ...attr(s, /srcset="([^"]+)"/g).flatMap((x) => x.split(",").map((t) => t.trim().split(" ")[0]))]) {
    if (h.startsWith("/") && !h.startsWith("//") && !h.startsWith("/anfrage.php") && !existiert(h)) f(`${url}: Link/Datei fehlt: ${h}`);
  }
  for (const src of attr(s, /<(?:script|img|iframe|link)[^>]+(?:src|href)="(https?:\/\/[^"]+)"/g)) {
    // Nur echte Einbindungen zählen; <link rel="alternate|canonical"> sind Verweise
    if (!new RegExp(`<link[^>]+rel="(?:canonical|alternate)"[^>]+href="${src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`).test(s) && !src.startsWith(DOMAIN)) {
      const erlaubt = site.schalter.analytics.aktiv && site.schalter.analytics.script_url && src === site.schalter.analytics.script_url;
      if (!erlaubt) f(`${url}: fremde Einbindung ${src}`);
    }
  }
  for (const m of s.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (!/type="application\/ld\+json"/.test(m[1]) && m[2].trim()) f(`${url}: Inline-Skript (verstößt gegen CSP)`);
  }
  if (/\sstyle="/.test(s)) f(`${url}: style-Attribut (verstößt gegen CSP)`);
  if (/<style[\s>]/.test(s)) f(`${url}: <style>-Block (verstößt gegen CSP)`);

  const ld = attr(s, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  if (!noindex && ld.length !== 1) f(`${url}: ${ld.length} JSON-LD-Blöcke (erwartet 1)`);
  for (const block of ld) {
    let g;
    try { g = JSON.parse(block)["@graph"]; } catch { f(`${url}: JSON-LD ist kein gültiges JSON`); continue; }
    const ids = new Set(g.map((k) => k["@id"]).filter(Boolean));
    for (const ref of block.matchAll(/\{"@id":"([^"]+)"\}/g)) if (!ids.has(ref[1])) f(`${url}: JSON-LD-Verweis ${ref[1]} ohne Ziel`);
    if (/\[\[/.test(block)) f(`${url}: offene Markierung im JSON-LD`);
  }
}

// Sitemap
const sitemap = readFileSync(join(DIST, "sitemap.xml"), "utf8");
const locs = new Set(attr(sitemap, /<loc>([^<]+)<\/loc>/g));
for (const u of indexierbar) if (!locs.has(u)) f(`Sitemap: ${u} fehlt`);
for (const u of locs) if (!indexierbar.has(u)) f(`Sitemap: ${u} ist nicht indexierbar oder existiert nicht`);

// robots.txt, llms.txt, .htaccess
const robots = readFileSync(join(DIST, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${DOMAIN}/sitemap.xml`)) f("robots.txt: Sitemap-Verweis fehlt");
if (!/User-agent: GPTBot[\s\S]*?Allow: \//.test(robots)) f("robots.txt: KI-Crawler nicht erlaubt");
for (const l of ["llms.txt", "llms-full.txt", ...site.sprachen.aktiv.filter((s) => s !== "de").map((s) => `${s}/llms.txt`)]) {
  const p = join(DIST, l);
  if (!existsSync(p)) { f(`${l} fehlt`); continue; }
  if (/\[\[/.test(readFileSync(p, "utf8"))) f(`${l}: enthält offene Markierungen`);
}
const ht = existsSync(join(DIST, ".htaccess")) ? readFileSync(join(DIST, ".htaccess"), "utf8") : "";
if (!/Content-Security-Policy "default-src 'self'/.test(ht)) f(".htaccess fehlt oder ohne CSP (npm run build erzeugt sie)");
if (/\{\{[A-Z_]+\}\}/.test(ht)) f(".htaccess: nicht ersetzte Platzhalter");
for (const intern of ["intern", "_bildauswahl"]) if (existsSync(join(DIST, intern))) f(`Interne Seite ${intern}/ ist im Build`);

console.log(`${seiten.size} HTML-Seiten, ${locs.size} Sitemap-Einträge geprüft.`);
if (fehler.length) {
  console.error(`\n✗ ${fehler.length} Fehler:\n` + fehler.slice(0, 60).map((x) => `  – ${x}`).join("\n"));
  process.exit(1);
}
console.log("✓ Alle Tests bestanden.");
