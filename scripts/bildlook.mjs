#!/usr/bin/env node
/**
 * Einheitlicher Bildlook (Phase 3) – einmalig bzw. nach jedem neuen Bild ausführen:
 *
 *   npm run bilder
 *
 * Liest jedes Bild aus dem Bildmanifest (src/assets/fotos/bilder.json) als Original aus
 * bilder/original/<datei> und schreibt die bearbeitete Fassung nach src/assets/fotos/<datei>.
 * Die Astro-Bildpipeline erzeugt daraus beim Build AVIF/WebP in mehreren Größen.
 *
 * Look (DESIGN.md: warm, ruhig, editorial – kein Filter-Look):
 *   - etwas wärmerer Weißabgleich (Rot leicht hoch, Blau leicht runter)
 *   - Sättigung −12 %
 *   - sanfte Kontrastkurve, Schatten minimal angehoben
 *   - längste Kante max. 2400 px, JPEG (mozjpeg) Qualität 84
 *   - alle Metadaten (EXIF, GPS, Kamera) werden entfernt
 * Bilder mit "bearbeitung": "keine" im Manifest werden nur verkleinert.
 */
import sharp from "sharp";
import { readFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const ORIGINAL = join(WURZEL, "bilder/original");
const ZIEL = join(WURZEL, "src/assets/fotos");
const manifest = JSON.parse(readFileSync(join(ZIEL, "bilder.json"), "utf8"));
const nurNeue = !process.argv.includes("--alle");

export const LOOK = {
  waerme: [1.035, 1.0, 0.94], // Faktoren R, G, B
  saettigung: 0.88,
  kontrast: 0.94,             // < 1 = weicher
  helligkeit: 1.01,
  maxKante: 2400,
  qualitaet: 84,
};

mkdirSync(ZIEL, { recursive: true });
let anzahl = 0;
for (const [schluessel, e] of Object.entries(manifest)) {
  if (schluessel.startsWith("_") || !e.datei) continue;
  const quelle = join(ORIGINAL, e.datei);
  const ziel = join(ZIEL, e.datei.replace(/\.(png|webp|jpeg|tiff?)$/i, ".jpg"));
  if (!existsSync(quelle)) { console.warn(`⚠ ${schluessel}: Original fehlt (${quelle})`); continue; }
  if (nurNeue && existsSync(ziel) && statSync(ziel).mtimeMs > statSync(quelle).mtimeMs) continue;
  let bild = sharp(quelle).rotate().resize({ width: LOOK.maxKante, height: LOOK.maxKante, fit: "inside", withoutEnlargement: true });
  if (e.bearbeitung !== "keine") {
    const [r, g, b] = LOOK.waerme;
    bild = bild
      .recomb([[r, 0, 0], [0, g, 0], [0, 0, b]])
      .modulate({ saturation: LOOK.saettigung, brightness: LOOK.helligkeit })
      // Kontrast um die Mitte (128) abschwächen: y = k·x + 128·(1−k)
      .linear(LOOK.kontrast, 128 * (1 - LOOK.kontrast));
  }
  await bild.jpeg({ quality: LOOK.qualitaet, mozjpeg: true }).toFile(ziel); // ohne .withMetadata() → Metadaten entfernt
  console.log(`✓ ${schluessel} → ${e.datei}`);
  anzahl++;
}
console.log(`${anzahl} Bild(er) bearbeitet.`);
