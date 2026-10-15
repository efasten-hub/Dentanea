/**
 * Content Collections – Seiteninhalte je Sprache.
 *
 * Ablage: src/content/<sprache>/<seiten-id>.md
 *   z. B. src/content/de/implantologie.md, src/content/tr/implantologie.md
 * Die Seiten-ID (Dateiname) muss in src/i18n/routen.ts stehen; dort steht auch der Slug.
 */
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const seiten = defineCollection({
  loader: glob({ pattern: "{de,en,es,tr}/**/*.md", base: "./src/content" }),
  schema: z.object({
    /** Sichtbare Hauptüberschrift (H1). */
    titel: z.string(),
    /** <title> für Suchmaschinen, höchstens 60 Zeichen (prüft npm run pruefen). */
    seo_titel: z.string(),
    /** Meta-Description, höchstens 155 Zeichen. */
    beschreibung: z.string(),
    /**
     * Seite in dieser Sprache veröffentlichen?
     * false → erscheint nicht: nicht in Navigation, Sitemap, hreflang; der Sprachumschalter
     * führt zur deutschen Fassung mit Hinweis. Keine halbfertigen Übersetzungen online.
     */
    uebersetzt: z.boolean(),
    /** Von einer muttersprachlichen Person mit zahnmedizinischem Verständnis geprüft? (Deutsch: immer true) */
    uebersetzung_geprueft: z.boolean().default(false),
    /** Medizinisch geprüft von Dr. Adali, Datum der Prüfung (ISO, z. B. 2026-10-08) oder "[[DATUM]]". */
    stand: z.string().optional(),
    /** Antwortabsatz: 2–3 Sätze oben auf Leistungsseiten (Was, für wen, Ziel). */
    antwort: z.string().optional(),
    /** Unterzeile im Seitenkopf. */
    unterzeile: z.string().optional(),
    /** Aufmacherbild: Schlüssel aus src/assets/fotos/bilder.json */
    bild: z.string().optional(),
    /** Häufige Fragen zu dieser Seite. */
    faq: z.array(z.object({ frage: z.string(), antwort: z.string() })).default([]),
    /** Für Ratgeber: Veröffentlichungsdatum und Quellen. */
    datum: z.string().optional(),
    quellen: z.array(z.object({ titel: z.string(), url: z.string().optional() })).default([]),
    /** Kurztext für Übersichten, Startseite und Linklisten (1–2 Sätze). */
    kurz: z.string().optional(),
    /** Verwandte Seiten (Seiten-IDs aus routen.ts) – erscheinen als Links am Seitenende. */
    verwandt: z.array(z.string()).default([]),
    /** FAQ-Seite: Fragen in Gruppen. */
    faq_gruppen: z.array(z.object({ titel: z.string(), fragen: z.array(z.object({ frage: z.string(), antwort: z.string() })) })).default([]),
    /** Nur Startseite: Inhalte der Sektionen. Reihenfolge der Zielgruppen je Sprache frei wählbar. */
    start: z
      .object({
        vertrauen: z.array(z.string()),
        schwerpunkte: z.object({
          label: z.string(),
          titel: z.string(),
          eintraege: z.array(z.object({ id: z.string(), titel: z.string(), text: z.string() })),
        }),
        zielgruppen: z.object({
          label: z.string(),
          titel: z.string(),
          eintraege: z.array(z.object({ titel: z.string(), text: z.string(), links: z.array(z.string()) })),
        }),
        ablauf: z.object({ label: z.string(), titel: z.string(), schritte: z.array(z.object({ titel: z.string(), text: z.string() })) }),
        arzt: z.object({ label: z.string(), titel: z.string(), text: z.string(), punkte: z.array(z.string()), link: z.string() }),
        labor: z.object({ label: z.string(), titel: z.string(), text: z.string(), punkte: z.array(z.string()), link: z.string() }),
        faq: z.object({ label: z.string(), titel: z.string(), link: z.string() }),
        abschluss: z.object({ titel: z.string(), text: z.string() }),
      })
      .optional(),
  }),
});

export const collections = { seiten };
