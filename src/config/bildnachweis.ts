/**
 * Bildnachweis für das Impressum – automatisch aus dem Bildmanifest.
 * Nach dem Tausch eines Stockfotos gegen ein eigenes Foto (stock: false, quelle: "eigen")
 * aktualisiert sich der Nachweis von selbst.
 */
import manifest from "../assets/fotos/bilder.json";

export interface Nachweis {
  datei: string;
  quelle: string;
  fotograf: string;
  fotograf_url?: string;
  plattform_url?: string;
  lizenz: string;
  stock: boolean;
}

const PLATTFORM: Record<string, string> = {
  unsplash: "Unsplash",
  pexels: "Pexels",
  "alte-website": "Zahnarztpraxis Dr. Adali",
  eigen: "Dentaviva",
  "adobe-stock": "Adobe Stock",
  istock: "iStock",
};

export function bildnachweis(): Nachweis[] {
  return Object.entries(manifest as Record<string, unknown>)
    .filter(([k]) => !k.startsWith("_"))
    .map(([, e]) => {
      const x = e as Record<string, string | boolean>;
      return {
        datei: String(x.datei),
        quelle: PLATTFORM[String(x.quelle)] ?? String(x.quelle),
        fotograf: String(x.fotograf).replace(/\[\[[^\]]*\]\]/g, "").trim() || "–",
        fotograf_url: x.fotograf_url ? String(x.fotograf_url) : undefined,
        plattform_url: x.original_url ? String(x.original_url) : undefined,
        lizenz: String(x.lizenz).replace(/\s*\[\[[^\]]*\]\]/g, ""),
        stock: x.stock === true,
      };
    })
    .sort((a, b) => Number(a.stock) - Number(b.stock) || a.quelle.localeCompare(b.quelle));
}
