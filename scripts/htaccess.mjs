#!/usr/bin/env node
/**
 * Erzeugt dist/.htaccess aus server/htaccess.vorlage (läuft automatisch nach jedem Build).
 *
 * Die Content-Security-Policy (CSP) wird aus src/config/site.ts berechnet:
 *  - Grundregel: nur eigene Dateien, keine Inline-Skripte, keine fremden Schriften
 *  - Karte (OpenStreetMap): Einbettung erlaubt, lädt aber erst nach Klick
 *  - Doctolib-Widget (terminbuchung.modus = "widget"): Doctolib-Domains zusätzlich
 *  - Statistik (schalter.analytics.aktiv): Skript-Herkunft des Anbieters zusätzlich
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const { site } = await import(join(WURZEL, "src/config/site.ts"));

const quelle = { script: ["'self'"], frame: ["https://www.openstreetmap.org"], connect: ["'self'"], img: ["'self'", "data:"] };
if (site.terminbuchung.aktiv && site.terminbuchung.modus === "widget") {
  // [[PRÜFEN: Domains des Doctolib-Widgets nach Einbau im Browser kontrollieren]]
  quelle.script.push("https://www.doctolib.de");
  quelle.frame.push("https://www.doctolib.de", "https://partners.doctolib.de");
  quelle.connect.push("https://www.doctolib.de");
}
const a = site.schalter.analytics;
if (a.aktiv && a.script_url) {
  const herkunft = new URL(a.script_url).origin;
  quelle.script.push(herkunft);
  quelle.connect.push(herkunft);
}
const csp = [
  "default-src 'self'",
  `script-src ${quelle.script.join(" ")}`,
  "style-src 'self'",
  `img-src ${quelle.img.join(" ")}`,
  "font-src 'self'",
  `connect-src ${quelle.connect.join(" ")}`,
  `frame-src ${quelle.frame.join(" ")}`,
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const host = new URL(site.domain).host;
const ziel = join(WURZEL, "dist/.htaccess");
if (!existsSync(join(WURZEL, "dist"))) { console.error("dist/ fehlt – zuerst npm run build"); process.exit(1); }
const inhalt = readFileSync(join(WURZEL, "server/htaccess.vorlage"), "utf8")
  .replaceAll("{{CSP}}", csp)
  .replaceAll("{{HOST_REGEX}}", host.replace(/\./g, "\\."))
  .replaceAll("{{HOST}}", host);
writeFileSync(ziel, inhalt);
console.log(`✓ dist/.htaccess erzeugt (Host ${host})\n  CSP: ${csp}`);
