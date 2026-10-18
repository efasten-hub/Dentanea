#!/usr/bin/env node
/**
 * Browser-Tests aller Seiten in dist/ (Playwright + axe-core):
 *   - Barrierefreiheit nach WCAG 2.2 AA (axe) bei 390 px Breite
 *   - kein seitlicher Überlauf bei 320 px und 1280 px
 *   - beim Laden keine Verbindungen zu fremden Servern
 *
 *   npm run test:a11y
 * Chromium: npx playwright install chromium (einmalig) oder CHROMIUM_PATH=/pfad/zu/chrome
 */
import { createServer } from "node:http";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { chromium } from "playwright";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(WURZEL, "dist");
const axe = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const TYP = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".avif": "image/avif", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".txt": "text/plain", ".xml": "application/xml" };

const server = createServer((req, res) => {
  let p = join(DIST, decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYP[extname(p)] ?? "application/octet-stream" });
  res.end(readFileSync(p));
}).listen(0);
const BASIS = `http://localhost:${server.address().port}`;

const seiten = [];
(function walk(d) { for (const n of readdirSync(d)) { const p = join(d, n); if (statSync(p).isDirectory()) walk(p); else if (n === "index.html") seiten.push("/" + relative(DIST, d).replace(/\\/g, "/") + (d === DIST ? "" : "/")); } })(DIST);

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const fehler = [];
for (const breite of [320, 390, 1280]) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: 900 } });
  for (const s of seiten) {
    const url = BASIS + s.replace(/^\/\//, "/");
    const p = await ctx.newPage(); const fremd = [];
    p.on("request", (r) => { if (!r.url().startsWith(BASIS)) fremd.push(r.url()); });
    await p.goto(url, { waitUntil: "networkidle" });
    if (await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) fehler.push(`${breite}px ${s}: seitlicher Überlauf`);
    if (fremd.length) fehler.push(`${breite}px ${s}: Verbindung zu ${fremd[0]}`);
    if (breite === 390) {
      await p.addScriptTag({ content: axe });
      const v = await p.evaluate(async () => (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"] })).violations.map((x) => `${x.id} (${x.nodes.length}×)`));
      if (v.length) fehler.push(`${s}: axe ${v.join(", ")}`);
    }
    await p.close();
  }
  await ctx.close();
}
await browser.close(); server.close();
console.log(`${seiten.length} Seiten × 3 Breiten geprüft.`);
if (fehler.length) { console.error(`✗ ${fehler.length} Fehler:\n` + fehler.map((x) => `  – ${x}`).join("\n")); process.exit(1); }
console.log("✓ Barrierefreiheit, Überlauf und Datenschutz in Ordnung.");
