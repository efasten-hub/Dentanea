# Projekt: Dentaviva – Website der Zahnarztpraxis Dr. Adali

Statische Astro-Website (Astro 7, Tailwind v4) in vier Sprachen (DE, EN, ES, TR) für Hetzner-Webhosting (Apache). Ausführliche Anleitung: `README.md`. Offene Punkte der Praxis: `PLATZHALTER.md`. Design verbindlich: `DESIGN.md`.

## Befehle
- `npm run dev` – Entwicklungsserver (http://localhost:4321)
- `npm run build` – Build nach `dist/` (vorher Inhaltsprüfung, danach `.htaccess`-Erzeugung)
- `npm test` – Build + technische Tests; `npm run test:a11y` – axe/Überlauf im Browser
- `npm run pruefen` – offene Markierungen, Übersetzungsstand, SEO-Längen (`--schreiben` aktualisiert PLATZHALTER.md)
- `npm run check` – TypeScript/Astro

## Regeln
- Sprache mit der Nutzerin/dem Nutzer: Deutsch, einfache Worte. Kommentare im Code: Deutsch.
- Praxisdaten nur in `src/config/site.ts`; Seitentexte in `src/content/<sprache>/*.md`; Oberflächentexte in `src/i18n/*.json` (alle vier Sprachen pflegen); Slugs in `src/i18n/routen.ts`.
- Unsichere Angaben markieren statt erfinden: `[[PRÜFEN: …]]`, `[[PLATZHALTER]]`, `[[PREIS]]`, `[[DATUM]]`, werberechtlich `[[PRÜFEN HWG/BO]]`.
- Heilmittelwerbegesetz/Berufsordnung: keine Heilversprechen, Superlative oder Vergleiche.
- Übersetzungen: `uebersetzung_geprueft: false`, bis eine muttersprachliche Fachperson geprüft hat.
- Datenschutz: keine Cookies, kein Tracking, keine externen Schriften/Skripte; Doctolib nur als Link.
- CSP: keine Inline-Skripte, keine `style`-Attribute oder `<style>`-Blöcke (Tests schlagen sonst fehl).
- Stockfotos nie als Praxis, Arzt, Team oder Patient beschriften; keine KI-Bilder von Menschen oder Zähnen; keine Patientenfotos ohne schriftliche Einwilligung.
- Design: nur Tokens aus `DESIGN.md`, Schriftgewicht 400, keine Rundungen/Schatten, WCAG 2.2 AA, Klickflächen ≥ 44 px.
- Vor jedem Commit: `npm test` grün.
