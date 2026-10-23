#!/usr/bin/env node
/**
 * Build-Check: warnt, solange die Website noch nicht fertig ist.
 *
 *   npm run pruefen               – Bericht ausgeben (läuft auch automatisch vor jedem Build)
 *   npm run pruefen -- --streng   – mit Fehlercode beenden, wenn Warnungen offen sind (z. B. vor Livegang)
 *   npm run pruefen -- --schreiben – zusätzlich die Übersetzungsliste in PLATZHALTER.md aktualisieren
 *
 * Geprüft wird:
 *   1. [[…]]-Platzhalter in src/, public/ und astro.config.mjs
 *   2. Seiten mit „uebersetzung_geprueft: false“ (je Sprache) und unveröffentlichte Übersetzungen
 *   3. fehlende oder überzählige Schlüssel in src/i18n/{de,en,es,tr}.json
 *   4. Slug-Zuordnung: fehlende Sprachen, ungültige Slugs, doppelte URLs, Inhalte ohne Route
 *   5. Bildmanifest: Bilder ohne (vollständigen) Eintrag, Einträge ohne Datei
 *   6. Titel- und Description-Längen (≤ 60 / ≤ 155 Zeichen)
 *   7. Info: Anzahl noch verwendeter Stockfotos
 */
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse as parseYaml } from "yaml";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const pfadRel = (p) => relative(WURZEL, p);
const args = new Set(process.argv.slice(2));

// import() braucht unter Windows eine file://-URL statt eines Pfads mit Laufwerksbuchstaben
const { routen, pfad } = await import(pathToFileURL(join(WURZEL, "src/i18n/routen.ts")).href);
const { site } = await import(pathToFileURL(join(WURZEL, "src/config/site.ts")).href);

const warnungen = [];
const infos = [];
const warn = (bereich, text) => warnungen.push({ bereich, text });

function* dateien(ordner, endungen) {
  if (!existsSync(ordner)) return;
  for (const name of readdirSync(ordner)) {
    const p = join(ordner, name);
    if (statSync(p).isDirectory()) yield* dateien(p, endungen);
    else if (!endungen || endungen.includes(extname(name))) yield p;
  }
}

// ---------------------------------------------------------------- 1. Platzhalter
const TEXT = [".ts", ".mjs", ".js", ".astro", ".md", ".json", ".css", ".txt", ".svg", ".html", ".php", ".htaccess"];
const platzhalter = new Map(); // Art → [{datei, zeile, text}]
for (const datei of [...dateien(join(WURZEL, "src"), TEXT), ...dateien(join(WURZEL, "public"), TEXT), join(WURZEL, "astro.config.mjs")]) {
  if (datei.includes(`${join("src", "pages", "intern")}`)) continue; // interne Vorschau
  readFileSync(datei, "utf8").split("\n").forEach((zeile, i) => {
    for (const m of zeile.matchAll(/\[\[([A-ZÄÖÜ][^\]]*)\]\]/g)) { // Markierungen beginnen mit Großbuchstaben
      const art = m[1].split(":")[0].trim();
      if (!platzhalter.has(art)) platzhalter.set(art, []);
      platzhalter.get(art).push({ datei: pfadRel(datei), zeile: i + 1, text: m[0] });
    }
  });
}
for (const [art, liste] of platzhalter) {
  warn("Platzhalter", `${liste.length} × [[${art}…]]`);
}

// ---------------------------------------------------------------- 2. Inhalte und Übersetzungsstand
const inhalte = []; // {sprache, id, daten, datei}
for (const sprache of ["de", "en", "es", "tr"]) {
  for (const datei of dateien(join(WURZEL, "src/content", sprache), [".md"])) {
    const roh = readFileSync(datei, "utf8");
    const fm = roh.match(/^---\n([\s\S]*?)\n---/);
    const daten = fm ? parseYaml(fm[1]) : {};
    const id = relative(join(WURZEL, "src/content", sprache), datei).replace(/\.md$/, "");
    inhalte.push({ sprache, id, daten, datei: pfadRel(datei) });
  }
}
const ungeprueft = {};
const unveroeffentlicht = {};
for (const e of inhalte) {
  if (!routen[e.id]) warn("Slugs", `${e.datei}: Seiten-ID „${e.id}“ fehlt in src/i18n/routen.ts`);
  if (e.daten.uebersetzt === false) (unveroeffentlicht[e.sprache] ??= []).push(e.id);
  else if (e.sprache !== "de" && e.daten.uebersetzung_geprueft !== true) (ungeprueft[e.sprache] ??= []).push(e.id);
  // 6. Längen
  if (e.daten.uebersetzt !== false) {
    if ((e.daten.seo_titel ?? "").length > 60) warn("SEO", `${e.datei}: seo_titel hat ${e.daten.seo_titel.length} Zeichen (max. 60)`);
    if ((e.daten.beschreibung ?? "").length > 155) warn("SEO", `${e.datei}: beschreibung hat ${e.daten.beschreibung.length} Zeichen (max. 155)`);
  }
}
for (const [sprache, ids] of Object.entries(ungeprueft)) {
  warn("Übersetzung", `${sprache.toUpperCase()}: ${ids.length} Seite(n) mit uebersetzung_geprueft: false – ${ids.join(", ")}`);
}
for (const [sprache, ids] of Object.entries(unveroeffentlicht)) {
  infos.push(`${sprache.toUpperCase()}: ${ids.length} Seite(n) noch nicht veröffentlicht (uebersetzt: false) – ${ids.join(", ")}`);
}

// ---------------------------------------------------------------- 3. i18n-Schlüssel
const schluessel = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    k.startsWith("_") ? [] : v && typeof v === "object" ? schluessel(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
const i18n = Object.fromEntries(["de", "en", "es", "tr"].map((s) => [s, JSON.parse(readFileSync(join(WURZEL, `src/i18n/${s}.json`), "utf8"))]));
const deSchluessel = new Set(schluessel(i18n.de));
for (const s of ["en", "es", "tr"]) {
  const eigen = new Set(schluessel(i18n[s]));
  const fehlt = [...deSchluessel].filter((k) => !eigen.has(k));
  const zuviel = [...eigen].filter((k) => !deSchluessel.has(k));
  if (fehlt.length) warn("i18n", `${s}.json: ${fehlt.length} Schlüssel fehlen – ${fehlt.join(", ")}`);
  if (zuviel.length) warn("i18n", `${s}.json: ${zuviel.length} Schlüssel nicht in de.json – ${zuviel.join(", ")}`);
}

// ---------------------------------------------------------------- 4. Slug-Zuordnung
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const urls = new Map();
for (const [id, r] of Object.entries(routen)) {
  for (const s of ["de", "en", "es", "tr"]) {
    if (!(s in r.slug)) { warn("Slugs", `${id}: kein Eintrag für ${s} (Slug oder null angeben)`); continue; }
    const slug = r.slug[s];
    if (slug === null) continue;
    if (slug !== "" && !SLUG.test(slug)) warn("Slugs", `${id}/${s}: ungültiger Slug „${slug}“ (nur a–z, 0–9, Bindestrich)`);
    if (slug === "" && r.typ !== "startseite") warn("Slugs", `${id}/${s}: leerer Slug`);
    if (r.eltern && !routen[r.eltern]) warn("Slugs", `${id}: Eltern-Seite „${r.eltern}“ unbekannt`);
    const url = pfad(id, s);
    if (url && urls.has(url)) warn("Slugs", `doppelte URL ${url}: ${urls.get(url)} und ${id}`);
    if (url) urls.set(url, id);
  }
}

// ---------------------------------------------------------------- 5. Bildmanifest
const FOTOS = join(WURZEL, "src/assets/fotos");
const manifestPfad = join(FOTOS, "bilder.json");
const manifest = existsSync(manifestPfad) ? JSON.parse(readFileSync(manifestPfad, "utf8")) : {};
const eintraege = Object.entries(manifest).filter(([k]) => !k.startsWith("_"));
const PFLICHT = ["datei", "position", "quelle", "original_url", "fotograf", "lizenz", "download_datum", "stock", "ersetzen_durch_eigenes", "alt"];
const imManifest = new Set();
let stockAnzahl = 0;
for (const [schl, e] of eintraege) {
  imManifest.add(e.datei);
  for (const feld of PFLICHT) if (e[feld] === undefined || e[feld] === "") warn("Bilder", `${schl}: Feld „${feld}“ fehlt`);
  for (const s of ["de", "en", "es", "tr"]) if (!e.alt?.[s]) warn("Bilder", `${schl}: Alt-Text ${s} fehlt`);
  if (e.datei && !existsSync(join(FOTOS, e.datei))) warn("Bilder", `${schl}: Datei ${e.datei} existiert nicht`);
  if (e.stock === true) {
    stockAnzahl++;
    // Stock nie für Arzt, Team, Praxisräume oder Patientenfälle (HWG/UWG – Irreführung)
    const verboten = (e.position ?? []).filter((p) => /(porträt|portrait|dr\. adali|team|empfang|warte|behandlungszimmer|hauseingang|praxisr|vorher|nachher|patientenfall|schema\.org dentist)/i.test(p) && !/nie als/i.test(p));
    if (verboten.length) warn("Bilder", `${schl}: Stockfoto an unzulässiger Position – ${verboten.join(", ")}`);
    if (e.einwilligung_dokumentiert) warn("Bilder", `${schl}: Stockfoto mit Patienteneinwilligung? Bitte Quelle prüfen`);
    const altText = Object.values(e.alt ?? {}).join(" ").toLowerCase();
    if (/\b(unser\w*|our|nuestr\w*|bizim\w*|dentanea)\b|praxis dr/.test(altText)) warn("Bilder", `${schl}: Stockfoto-Alt-Text behauptet Praxisbezug`);
  }
}
const BILD = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
for (const datei of dateien(FOTOS, BILD)) {
  const name = relative(FOTOS, datei);
  if (!imManifest.has(name)) warn("Bilder", `${name}: kein Eintrag in bilder.json`);
}
infos.push(`Stockfotos im Einsatz: ${stockAnzahl} von ${eintraege.length} Bildern (werden schrittweise durch eigene Fotos ersetzt)`);

// ---------------------------------------------------------------- Ausgabe
const bereiche = [...new Set(warnungen.map((w) => w.bereich))];
console.log("\n┌─ Prüfbericht Website Dentanea ─────────────────────────────");
if (!warnungen.length) console.log("│ ✓ Keine offenen Punkte.");
for (const b of bereiche) {
  console.log(`│\n│ ⚠ ${b}`);
  for (const w of warnungen.filter((x) => x.bereich === b)) console.log(`│   – ${w.text}`);
}
if (args.has("--details") && platzhalter.size) {
  console.log("│\n│ Fundstellen der Platzhalter:");
  for (const [, liste] of platzhalter) for (const f of liste) console.log(`│   ${f.datei}:${f.zeile}  ${f.text.slice(0, 90)}`);
}
console.log("│\n│ ℹ Info");
for (const i of infos) console.log(`│   – ${i}`);
console.log(`└─ ${warnungen.length} Warnung(en). Details: npm run pruefen -- --details\n`);

// ---------------------------------------------------------------- PLATZHALTER.md aktualisieren
if (args.has("--schreiben")) {
  const md = join(WURZEL, "PLATZHALTER.md");
  const start = "<!-- AUTO:UEBERSETZUNGEN:START -->";
  const ende = "<!-- AUTO:UEBERSETZUNGEN:ENDE -->";
  const zeilen = [start, "", `_Automatisch erzeugt mit \`npm run pruefen -- --schreiben\` am ${new Date().toISOString().slice(0, 10)}._`, ""];
  for (const s of ["en", "es", "tr"]) {
    const name = site.sprachen.bezeichnungen[s];
    const offen = (ungeprueft[s] ?? []).map((id) => `- [ ] ${id} → \`${pfad(id, s) ?? "–"}\``);
    const nicht = (unveroeffentlicht[s] ?? []).map((id) => `- ${id} (noch nicht veröffentlicht)`);
    zeilen.push(`**${name}** – zu prüfen: ${offen.length}`, "", ...(offen.length ? offen : ["- keine"]), ...(nicht.length ? ["", ...nicht] : []), "");
  }
  zeilen.push(ende);
  const stockStart = "<!-- AUTO:STOCKFOTOS:START -->", stockEnde = "<!-- AUTO:STOCKFOTOS:ENDE -->";
  const stockListe = eintraege.filter(([, e]) => e.stock === true && e.ersetzen_durch_eigenes !== false)
    .map(([k, e]) => `- [ ] **${k}** (${e.quelle}, ${e.fotograf}) – verwendet: ${(e.position ?? []).join(", ")}`);
  const stockBlock = [stockStart, "", ...(stockListe.length ? stockListe : ["- noch keine Stockfotos eingebaut"]), "", stockEnde].join("\n");
  const alt = readFileSync(md, "utf8");
  let neu = alt.includes(start) ? alt.replace(new RegExp(`${start}[\\s\\S]*?${ende}`), zeilen.join("\n")) : `${alt}\n${zeilen.join("\n")}\n`;
  if (neu.includes(stockStart)) neu = neu.replace(new RegExp(`${stockStart}[\\s\\S]*?${stockEnde}`), stockBlock);
  writeFileSync(md, neu);
  console.log("PLATZHALTER.md aktualisiert.");
}

if (args.has("--streng") && warnungen.length) process.exit(1);
