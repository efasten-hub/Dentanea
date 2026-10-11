#!/usr/bin/env node
/**
 * Stockfoto-Kandidaten laden und Auswahl übernehmen (Phase 3).
 *
 *   npm run bilder:laden                  – Kandidaten je Position suchen bzw. Vorschauen laden
 *   npm run bilder:laden -- --uebernehmen – ausgewählte Bilder in voller Größe laden,
 *                                           nach bilder/original/ legen und ins Manifest eintragen
 *
 * Quellen und Wege
 *   1. Mit Schlüssel in .env (UNSPLASH_ACCESS_KEY, PEXELS_API_KEY): Suche über die offiziellen APIs
 *      mit den Suchbegriffen aus bilder/kandidaten.json (nur Querformat).
 *   2. Ohne Schlüssel: Fotoseiten-URLs von Hand in „kandidaten“ eintragen ({ "seite_url": "…" }).
 *      Das Skript liest Fotograf/Beschreibung von der Seite und lädt über den offiziellen
 *      Download-Link (Unsplash: /photos/<id>/download, Pexels: /photo/<id>/download).
 *
 * Lizenzen: Unsplash License und Pexels License – kommerzielle Nutzung erlaubt, keine Namensnennung
 * nötig; wir nennen Fotograf und Plattform trotzdem im Bildnachweis. Keine Modelfreigabe garantiert →
 * Personen nur unkenntlich/klein/von hinten, nie in Behandlungssituationen erkennbar.
 *
 * Netzwerk über curl (beachtet Proxy- und Zertifikatseinstellungen des Systems).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const KAND = join(WURZEL, "bilder/kandidaten.json");
const VORSCHAU = join(WURZEL, "bilder/kandidaten");
const ORIGINAL = join(WURZEL, "bilder/original");
const MANIFEST = join(WURZEL, "src/assets/fotos/bilder.json");
const PRO_SUCHE = 3;
const MAX_KANDIDATEN = 6;
const heute = new Date().toISOString().slice(0, 10);

// .env lesen (ohne Abhängigkeit)
const env = { ...process.env };
if (existsSync(join(WURZEL, ".env"))) {
  for (const z of readFileSync(join(WURZEL, ".env"), "utf8").split("\n")) {
    const m = z.match(/^\s*([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !env[m[1]]) env[m[1]] = m[2];
  }
}
const schluessel = (k) => (env[k] && !env[k].startsWith("[[") ? env[k] : null);

function curl(url, { header = [], datei = null } = {}) {
  const args = ["-sS", "-L", "--fail", "-A", "Mozilla/5.0 (Website Dentaviva, Bildauswahl)", ...header.flatMap((h) => ["-H", h])];
  if (datei) args.push("-o", datei);
  args.push(url);
  return execFileSync("curl", args, { encoding: datei ? undefined : "utf8", maxBuffer: 64 * 1024 * 1024 });
}
const json = (url, header) => JSON.parse(curl(url, { header }));
const meta = (html, name) =>
  html.match(new RegExp(`<meta[^>]+(?:property|name)="${name}"[^>]+content="([^"]*)"`, "i"))?.[1] ??
  html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="${name}"`, "i"))?.[1];

// ------------------------------------------------------------------ Suche per API
function unsplashSuche(begriff, key) {
  const d = json(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(begriff)}&orientation=landscape&per_page=${PRO_SUCHE}&content_filter=high`, [`Authorization: Client-ID ${key}`, "Accept-Version: v1"]);
  return d.results.map((p) => ({
    quelle: "unsplash",
    id: p.id,
    seite_url: p.links.html,
    download_location: p.links.download_location,
    vorschau_url: `${p.urls.raw}&w=900&q=75&fm=jpg`,
    fotograf: p.user.name,
    fotograf_url: p.user.links.html,
    beschreibung: p.alt_description ?? p.description ?? "",
    breite: p.width, hoehe: p.height,
    lizenz: "Unsplash License (https://unsplash.com/license)",
    suchbegriff: begriff,
  }));
}
function pexelsSuche(begriff, key) {
  const d = json(`https://api.pexels.com/v1/search?query=${encodeURIComponent(begriff)}&orientation=landscape&per_page=${PRO_SUCHE}`, [`Authorization: ${key}`]);
  return d.photos.map((p) => ({
    quelle: "pexels",
    id: String(p.id),
    seite_url: p.url,
    vorschau_url: p.src.large,
    original_url: p.src.original,
    fotograf: p.photographer,
    fotograf_url: p.photographer_url,
    beschreibung: p.alt ?? "",
    breite: p.width, hoehe: p.height,
    lizenz: "Pexels License (https://www.pexels.com/license/)",
    suchbegriff: begriff,
  }));
}

// ------------------------------------------------------------------ Ohne Schlüssel: Fotoseite auslesen
function vonSeite(k) {
  const url = k.seite_url;
  const html = curl(url);
  const titel = meta(html, "og:title") ?? "";
  const bild = meta(html, "og:image");
  if (/unsplash\.com/.test(url)) {
    const id = url.match(/photos\/(?:[^/]*-)?([A-Za-z0-9_-]{11})(?:[/?]|$)/)?.[1];
    return { ...k, quelle: "unsplash", id, vorschau_url: bild, fotograf: titel.match(/Photo by (.+?) on Unsplash/i)?.[1] ?? k.fotograf ?? "[[PRÜFEN]]",
      beschreibung: meta(html, "og:description") ?? "", lizenz: "Unsplash License (https://unsplash.com/license)" };
  }
  if (/pexels\.com/.test(url)) {
    const id = url.match(/-(\d+)\/?$/)?.[1];
    return { ...k, quelle: "pexels", id, vorschau_url: bild, fotograf: titel.match(/(?:by|von) (.+?)(?: on Pexels|$)/i)?.[1] ?? k.fotograf ?? "[[PRÜFEN]]",
      beschreibung: meta(html, "og:description") ?? titel, lizenz: "Pexels License (https://www.pexels.com/license/)" };
  }
  throw new Error(`Unbekannte Plattform: ${url}`);
}

const daten = JSON.parse(readFileSync(KAND, "utf8"));
const uKey = schluessel("UNSPLASH_ACCESS_KEY");
const pKey = schluessel("PEXELS_API_KEY");

if (!process.argv.includes("--uebernehmen")) {
  console.log(`Unsplash-API: ${uKey ? "ja" : "nein (nur eingetragene Seiten)"} · Pexels-API: ${pKey ? "ja" : "nein (nur eingetragene Seiten)"}`);
  for (const pos of daten.positionen) {
    if (!pos.stock_erlaubt) continue;
    const vorhanden = new Set(pos.kandidaten.map((k) => `${k.quelle}:${k.id}`));
    const neu = [];
    try {
      if (uKey) for (const b of pos.suche?.unsplash ?? []) neu.push(...unsplashSuche(b, uKey));
      if (pKey) for (const b of pos.suche?.pexels ?? []) neu.push(...pexelsSuche(b, pKey));
    } catch (e) { console.warn(`⚠ ${pos.id}: Suche fehlgeschlagen – ${e.message.split("\n")[0]}`); }
    for (const k of neu) if (!vorhanden.has(`${k.quelle}:${k.id}`) && pos.kandidaten.length < MAX_KANDIDATEN) { pos.kandidaten.push(k); vorhanden.add(`${k.quelle}:${k.id}`); }
    // Kandidaten ohne Vorschau: Seite auslesen und Vorschau laden
    for (const [i, k] of pos.kandidaten.entries()) {
      try {
        if (!k.vorschau_url) pos.kandidaten[i] = vonSeite(k);
        const kk = pos.kandidaten[i];
        const ordner = join(VORSCHAU, pos.id);
        mkdirSync(ordner, { recursive: true });
        const datei = join(ordner, `${kk.quelle}-${kk.id}.jpg`);
        if (!existsSync(datei)) curl(kk.vorschau_url, { datei });
        kk.vorschau = `${pos.id}/${kk.quelle}-${kk.id}.jpg`;
        kk.geladen_am ??= heute;
      } catch (e) { console.warn(`⚠ ${pos.id} #${i}: ${e.message.split("\n")[0]}`); }
    }
    console.log(`✓ ${pos.id}: ${pos.kandidaten.length} Kandidat(en)`);
  }
  writeFileSync(KAND, JSON.stringify(daten, null, 2) + "\n");
  console.log("\nKandidaten gespeichert. Ansehen: npm run dev → http://localhost:4321/_bildauswahl");
} else {
  // ---------------------------------------------------------------- Auswahl übernehmen
  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  mkdirSync(ORIGINAL, { recursive: true });
  for (const pos of daten.positionen) {
    if (pos.auswahl == null) continue;
    const ids = Array.isArray(pos.auswahl) ? pos.auswahl : [pos.auswahl];
    for (const [n, a] of ids.entries()) {
      const k = typeof a === "number" ? pos.kandidaten[a] : pos.kandidaten.find((x) => x.id === a);
      if (!k) { console.warn(`⚠ ${pos.id}: Auswahl „${a}“ nicht gefunden`); continue; }
      const schl = ids.length > 1 ? `${pos.id}-${n + 1}` : pos.id;
      const datei = `${schl}.jpg`;
      const ziel = join(ORIGINAL, datei);
      if (!existsSync(ziel)) {
        if (k.quelle === "unsplash") {
          // Offizieller Weg: Download über download_location (API, zählt den Download) bzw. /download-Link
          const url = uKey && k.download_location ? json(k.download_location, [`Authorization: Client-ID ${uKey}`]).url : `https://unsplash.com/photos/${k.id}/download?force=true`;
          curl(url, { datei: ziel });
        } else {
          curl(k.original_url ?? `https://www.pexels.com/photo/${k.id}/download/`, { datei: ziel });
        }
      }
      const alt = manifest[schl]?.alt ?? { de: "[[PLATZHALTER: Alt-Text]]", en: "[[PLATZHALTER: alt text]]", es: "[[PLATZHALTER: texto alternativo]]", tr: "[[PLATZHALTER: alternatif metin]]" };
      manifest[schl] = {
        datei,
        position: pos.verwendung,
        quelle: k.quelle,
        original_url: k.seite_url,
        fotograf: k.fotograf,
        fotograf_url: k.fotograf_url ?? "",
        lizenz: k.lizenz,
        download_datum: heute,
        stock: true,
        ersetzen_durch_eigenes: true,
        alt,
      };
      console.log(`✓ ${schl} ← ${k.seite_url}`);
    }
  }
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log("\nManifest aktualisiert. Jetzt Alt-Texte ergänzen und `npm run bilder` für den einheitlichen Look ausführen.");
}
