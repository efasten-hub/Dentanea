# DESIGN.md – Dentanea · Zahnarztpraxis Dr. Adali

Verbindliches Designsystem der Website. Umgesetzt in `src/styles/global.css` (Tokens im `@theme`-Block) und `src/styles/fonts.css`. Vorschau aller Bausteine: `npm run dev` → `/intern/designsystem`.

**Grundlage (seit 23.10.2026):**
- **Werte** aus dem *Brand Book Dentanea 2026* (Farben, Schrift, Signet, Mengenverhältnis).
- **Struktur und Haltung** nach dem Refero-Style *Isla Beauty*: ruhige helle Fläche, flache Bausteine, Haarlinien, kleine Rundungen, keine Schatten, **eine** rote Akzentfarbe nur als Funktion.

Das frühere Design (Oxblood auf Creme, Libre Caslon + Inter, nur Gewicht 400, scharfe Ecken) ist damit abgelöst.

---

## 1. Haltung

- **Medizinisch geführt, kein Beauty-Salon.** Ruhig, hell, sachlich. Fotos und klare Typografie tragen die Seite, nicht Effekte.
- **Rot ist ein Siegel, keine Fläche.** Es markiert, was man tun kann (Termin, Link) und wo man ist (Label, Wortmarke). Große rote Flächen gibt es nicht.
- **Mengenverhältnis (Brand Book):** ca. 70 % Weiß · 20 % Hellgrau/Tiefgrau · 10 % Rot.
- **Barrierefrei:** WCAG 2.2 AA ist Pflicht und wird mit `npm run test:a11y` geprüft.

## 2. Farben

| Rolle | Token | Wert | Verwendung | Kontrast |
|---|---|---|---|---|
| **Dentanea Rot** | `--color-rot` | `#A3203A` | Buttons, Textlinks, Labels, Wortmarke, Fokus, Aufzählungszeichen | Rot auf Weiß 7,4 : 1 · Weiß auf Rot 7,4 : 1 · Rot auf Hellgrau 6,8 : 1 |
| Tiefrot | `--color-tiefrot` | `#7A1A2E` | Hover von Buttons und Links | Weiß auf Tiefrot 10,4 : 1 |
| **Tiefgrau** (Text) | `--color-oxblood-ink` | `#4E4741` | Fließtext, Überschriften, Formularrahmen | 9,1 : 1 auf Weiß · 8,7 : 1 auf Hellgrau |
| **Weiß** | `--color-cream-paper` | `#FFFFFF` | Seitenfläche | – |
| **Hellgrau** | `--color-aged-linen` | `#F5F5F4` | Zweitfläche: Ablauf, Terminbox, Hinweise | – |
| Linie | `--color-linie` | `#E3E0DD` | Haarlinien (rein dekorativ) | – |
| Sekundärtext | `--color-oxblood-muted` | `#6B635D` | Captions, Unterzeilen, Meta | 5,9 : 1 auf Weiß · 5,4 : 1 auf Hellgrau |
| Untergrenze | `--color-oxblood-subtle` | `#756D66` | Platzhalter in Formularfeldern | 5,1 : 1 auf Weiß · 4,7 : 1 auf Hellgrau |
| Rosé | `--color-rose` | `#C86B7E` | Bereichsfarbe Studio – **für Text gesperrt** | 3,6 : 1 |
| Sand | `--color-warm-stone` | `#A48E72` | Bereichsfarbe Labor – **für Text gesperrt** | 3,2 : 1 |
| Grau | `--color-dusty-clay` | `#8A827B` | Bereichsfarbe Akademie – **für Text gesperrt** | 3,8 : 1 |

- **Token-Namen:** Die Namen `oxblood-…`, `cream-paper`, `aged-linen`, `warm-stone`, `dusty-clay` stammen aus dem alten Design und bleiben, damit Vorlagen und Komponenten unverändert funktionieren. Sie tragen jetzt die Brand-Book-Werte. Neue Stellen dürfen die sprechenden Namen `rot`, `tiefrot`, `linie`, `rose` nutzen.
- **Linien:** Dekorative Trennlinien sind `--color-linie` (Basis-Reset setzt jede Rahmenfarbe darauf). **Formularfelder und Checkboxen** brauchen ≥ 3 : 1 (WCAG 1.4.11): Rahmen in Tiefgrau, Checkbox `accent-rot`.
- **Fokus:** 2px rote Outline mit 3px Abstand an jedem fokussierbaren Element (WCAG 2.4.7, 2.4.11).
- **Keine weiteren Farben.** Kein Zahnarzt-Blau, kein Doctolib-Blau, keine Verläufe.

## 3. Schrift

**Open Sans** – eine Familie für alles (Brand Book), selbst gehostet unter `public/fonts/`, Lizenz SIL OFL (`public/fonts/OFL-open-sans.txt`), Quelle `@fontsource/open-sans`.

| Schnitt | Gewicht | Verwendung |
|---|---|---|
| Open Sans Light | 300 | Intro, Unterzeilen, große Ziffern im Ablauf |
| Open Sans Regular | 400 | Fließtext, Navigation, Captions |
| Open Sans SemiBold | 600 | Wortmarke, H1–H3, Buttons, Labels, Textlinks, `<strong>` |

- Kein Bold (700), kein Kursiv.
- **Subsetting:** je Schnitt `latin` und `latin-ext`. Der Browser lädt `latin-ext` nur bei Zeichen wie ğ ş İ (türkische Seiten). Geprüfte Zeichen: `ä ö ü ß ñ á é í ó ú ¿ ¡ ç ğ Ğ ı İ ş Ş – „ “ € §`.
- **Preload:** `open-sans-latin-400` und `-600` (auf TR-Seiten zusätzlich `latin-ext`), `font-display: swap`.
- Die Theme-Tokens `--font-mier-a`, `--font-caslon-ionic`, `--font-caslon-display` zeigen auf Open Sans (Altnamen, siehe oben).

### Skala

| Stufe | Token / Klasse | Größe | Zeilenhöhe | Gewicht |
|---|---|---|---|---|
| Hero | `.hero-title` · `--text-hero` | clamp 40→68px | 1.05 | 600, Laufweite −0,02em |
| H1 | `--text-display` | clamp 34→56px | 1.1 | 600, −0,02em |
| H2 | `--text-title` | clamp 28→42px | 1.15 | 600, −0,02em |
| H3, Wortmarke | `--text-subheading` | 20px | 1.3 | 600 |
| Intro | `.intro` · `--text-heading` | clamp 20→26px | 1.45 | 300 |
| Fließtext | `--text-body` | 17px | 1.65 | 400 |
| Navigation, Buttons, Links | `--text-nav` | 16px | 1.45 | 400 / 600 |
| Caption | `.caption` · `--text-caption` | 14px | 1.45 | 400, Sekundärtext |
| **Label** (Isla-„Eyebrow“) | `.label` | 14px | 1.45 | 600, Versalien, Laufweite +0,08em, Rot |

- Linksbündig. `text-wrap: balance` in Überschriften, `pretty` und `hyphens: auto` im Fließtext.
- **Versalien nur per CSS** (`text-transform: uppercase`) mit korrektem `lang`, nie im Quelltext – sonst wird im Türkischen i → İ falsch.
- Lange Übersetzungen: keine festen Breiten an Buttons, Navigation, Sprachumschalter; alles bricht per `flex-wrap` um.

## 4. Abstände, Layout, Rundungen

- **Abstandsskala** (px): 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 44 · 48 · 56 · 60 · 80. `p-16` heißt **16px**. Tailwinds Zahlen-Spacing ist abgeschaltet. 44px nur für Mindest-Klickflächen.
- **Seitenbreite** 1200px, Rand 16 / 24 / 40px (Handy / Tablet / Desktop).
- **Abschnittsabstand** `--section-gap` 96px (Handy 64px) – Isla lebt von Luft.
- **Sektionskopf** `.sektion-kopf`: Haarlinie über die volle Breite, darunter rotes Label, darunter die H2.
- **Rundungen:** `rounded-knopf` 4px (Buttons, Felder) · `rounded-bild` 8px (Fotos, Flächen wie Terminbox). Keine Pillen.
- **Keine Schatten** (Basis-Reset `box-shadow: none`), keine Verläufe, keine Overlays.

## 5. Bausteine

### Buttons
- **Primär** `.btn .btn-primary`: Rot gefüllt, weiße Schrift 600, 4px Rundung, mind. 48px hoch. Hover: Tiefrot. Haupteinsatz: „Online-Termin buchen“.
- **Sekundär** `.btn .btn-outline`: 1px roter Rahmen, rote Schrift. Hover: rot gefüllt. Einsatz: „… anrufen“ (`tel:`).
- **Kompakt** `.btn-compact` im Header (44px).
- Kein Doctolib-Logo, kein Doctolib-Blau. Darunter als Caption „über Doctolib“, Link als „öffnet in neuem Fenster“ gekennzeichnet.

### Links
- **Aktion** `.link-action` („Mehr erfahren“, „Alle Fragen“): Rot, 600, 1px Unterstreichung, Hover Tiefrot und 2px. Klickfläche 44px hoch.
- **Fließtext-Link** `.link` und Links in `.inhalt`: Rot, unterstrichen.
- **Navigation** `.nav-link`: Tiefgrau ohne Unterstreichung; Hover und aktive Seite (`aria-current`) Rot mit 2px Unterstreichung.

### Formulare
`.field`: weiß, 1px Tiefgrau, 4px Rundung, mind. 48px hoch, Platzhalter in Untergrenze-Grau. Checkbox mit `accent-rot`.

### Header
- Links Signet (44px) und Wortmarke „Dentanea“ in Rot (Open Sans 600, 20px), darunter als Caption „Zahnarztpraxis Dr. Adali“. Der Zusatz grenzt von ähnlich klingenden Namen ab.
- Rechts: Sprachumschalter · Telefon · „Online-Termin“.
- Ab 1024px zweizeilig mit Navigation darunter; darunter ein Menü ohne JavaScript (`<details>`). Haarlinien in `--color-linie`.

### Sprachumschalter
„DE · EN · ES · TR“, aktive Sprache markiert (`aria-current`), keine Flaggen. Jeder Link mit `lang` und `hreflang`; zugänglicher Name enthält das Kürzel (WCAG 2.5.3).

### Startseite
- **Hero:** rotes Label („Zahnarztpraxis Dr. Adali“) → Hero-Titel → Intro in Light → Primär- und Sekundärbutton. Foto rechts (Desktop) bzw. darunter (Handy), 8px Rundung. **Nie Text auf Fotos.**
- **Vertrauensleiste:** Haarlinien oben und unten, Sekundärtext, rote Trennpunkte.
- **Ablauf:** Fläche Hellgrau, große rote Ziffern in Light („01“…).
- **Abschluss:** Hellgraue Fläche mit 8px Rundung und Terminbuttons.

### Fotos
Über `<Foto>` mit 8px Rundung, `object-cover`, ohne Rahmen. Stockfotos nie als Praxis, Arzt, Team oder Patient beschriften; keine KI-Bilder von Menschen oder Zähnen.

### Footer
Mehrspaltig, weiß, Haarlinie oben, rote Wortmarke, nur Textlinks. Keine Social-Icons, kein Newsletter.

### Mobile Leiste (unter 768px)
Fixiert unten, weiß, Haarlinie oben, drei gleich breite Felder: Online-Termin · Anrufen · Anfahrt. Berücksichtigt die Safe-Area.

## 6. Signet und Logo

- **Platzhalter** bis zum finalen Logo (`[[PLATZHALTER]]`): weißes, geometrisches **„D“ im weichen roten Quadrat** nach Brand Book (`src/assets/logo/logo-platzhalter.svg`).
- Favicon und App-Icon zeigen dasselbe Signet: `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` (ohne eigene Rundung, iOS rundet selbst).
- Brand-Book-Regeln: Signet ab 16px, darüber die Wortmarke. Wortmarke digital ab 96px Breite. Schutzzone rundum = Versalhöhe des D.
- **OG-Bilder** (`src/pages/og/…`): weiß, rotes Label, Titel in Open Sans 600 Tiefgrau, rote Wortmarke, Haarlinie, Seitenfoto rechts.

## 7. Technische Leitplanken

- **CSP:** keine Inline-Skripte, keine `style`-Attribute und keine `<style>`-Blöcke im ausgelieferten HTML. Die Tests schlagen sonst fehl.
- Keine externen Requests beim Seitenaufruf: Schriften und Bilder liegen lokal, kein Google-Fonts-CDN.
- Utilities gibt es nur für Werte aus diesem Dokument (Tailwind-Standardpaletten, -Schatten, -Rundungen und Zahlen-Spacing sind entfernt).
- Klickflächen ≥ 44 × 44px. Kein seitlicher Überlauf bei 320 / 390 / 1280px (geprüft in `test:a11y`).

## 8. Nicht im Website-Design umgesetzt

Das Brand Book beschreibt außerdem eine Markenarchitektur mit fünf Bereichen (Zahnmedizin, Implantologie, Studio, Lab, Akademie), Kasack-Farben, Beschilderung und Drucksachen für einen Standort „Winterhude“. Diese Inhalte passen nicht zur Praxis in Berlin und sind auf der Website **nicht** übernommen. Übernommen sind nur Farben, Schrift, Signet und das Mengenverhältnis. Die Bereichsfarben Rosé, Sand und Grau stehen als Tokens bereit, werden aber derzeit nicht verwendet.
