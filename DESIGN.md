# Incommonwith — Style Reference
> Editorial atelier in oxblood ink — warm cream pages, sunlit interior photography, and a single deep burgundy ink that carries every word, border, and link like fine letterpress.

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

In Common With operates as a printed design quarterly, not a storefront: warm cream-white paper (#fafaf9) is the canvas, full-bleed golden-hour interior photography carries visual weight, and a single deep oxblood ink (#4a0a05) serves as every text element, border, and link. The type system pairs a classical Caslon Ionic serif at 24px for headlines with a neo-grotesque Mier A sans for body, navigation, and UI — a literary tension that recurs across hero overlays, category names, and journal titles. Layout is unhurried: full-bleed hero, sidebar date stamps, horizontal product carousels, and generous negative space let the photography lead. Surfaces are flat, corners are sharp, shadows are absent — depth comes from photography and warm color temperature, never from elevation.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Oxblood Ink | `#4a0a05` | `--color-oxblood-ink` | All body text, headings, links, borders, outlined actions, and footer type — the singular chromatic voice; warmth and gravity without aggression |
| Cream Paper | `#fafaf9` | `--color-cream-paper` | Primary page background; the warm off-white that gives the site its paper-stock feel |
| Aged Linen | `#f8f7f1` | `--color-aged-linen` | Secondary surface, subtle card backgrounds, and pill-tag fills — slightly greener/warmer than the page, used for soft differentiation |
| Warm Stone | `#bcb6a6` | `--color-warm-stone` | Muted background wash and tertiary surface — the only mid-tone neutral, used sparingly for section backgrounds |
| Dusty Clay | `#a2827f` | `--color-dusty-clay` | Muted captions, helper text, and de-emphasized UI labels. Do not promote it to the primary CTA color |

## Tokens — Typography

### Mier A — Primary UI and body sans — used for navigation, body copy, captions, dates, links, and all functional text. Weight 400 only; the system trusts size and color contrast to carry hierarchy, never weight. Substitute: Inter or Untitled Sans (free: Inter). · `--font-mier-a`
- **Substitute:** Inter
- **Weights:** 400
- **Sizes:** 13px, 14px, 18px, 26px
- **Line height:** 1.20
- **Letter spacing:** normal
- **Role:** Primary UI and body sans — used for navigation, body copy, captions, dates, links, and all functional text. Weight 400 only; the system trusts size and color contrast to carry hierarchy, never weight. Substitute: Inter or Untitled Sans (free: Inter).

### Caslon Ionic — Sole serif — reserved exclusively for category names, journal headlines, and brand wordmark at 24px. The single appearance of a classical letterform creates a literary counterpoint to the neo-grotesque UI. Substitute: Cormorant Garamond or Libre Caslon Text. · `--font-caslon-ionic`
- **Substitute:** Cormorant Garamond
- **Weights:** 400
- **Sizes:** 24px
- **Line height:** 1.20
- **Letter spacing:** normal
- **Role:** Sole serif — reserved exclusively for category names, journal headlines, and brand wordmark at 24px. The single appearance of a classical letterform creates a literary counterpoint to the neo-grotesque UI. Substitute: Cormorant Garamond or Libre Caslon Text.

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|--------|------|-------------|----------------|-------|
| caption | — | — | 13px | 1.2 | — | `--text-caption` |
| body | — | — | 18px | 1.2 | — | `--text-body` |
| subheading | — | — | 24px | 1.2 | — | `--text-subheading` |
| heading | — | — | 26px | 1.2 | — | `--text-heading` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 56 | 56px | `--spacing-56` |
| 60 | 60px | `--spacing-60` |
| 80 | 80px | `--spacing-80` |

### Border Radius

| Element | Value |
|---------|-------|
| tags | 9999px |
| cards | 0px |
| pills | 9999px |
| images | 0px |
| buttons | 0px |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 64px
- **Card padding:** 0px
- **Element gap:** 12px

## Components

### Editorial Top Navigation
**Role:** Primary site navigation

Transparent background, no border. Left: 'Shop' at 14px Mier A, #4a0a05. Center: 'Collections', 'Showroom' at 14px Mier A, #4a0a05. Right: 'Info', 'Trade', 'Search', 'Sign In', 'Cart (0)' at 14px Mier A, #4a0a05. 12px gap between items. No fill, no shadow, no logo container — the wordmark appears separately in content.

### Full-Bleed Hero with Overlaid Headline
**Role:** Landing page hero

Full-viewport-width interior photograph as background. Headline 'In Common With' in white, 24px Caslon Ionic, positioned lower-left at ~30% from top. Subtitle 'A dialogue between light, material, and form' in white, 13px Mier A, directly below. 'Explore Outdoor' as a white text link at 14px Mier A below the subtitle. No button — just a text-link entry point.

### Product Category Card
**Role:** Catalog category tile

Full-bleed interior photograph filling the card edge-to-edge (0px radius, 0px padding). Below image: category name at 24px Caslon Ionic, #4a0a05, with a small superscript count number (e.g. 'Floor Lamps⁵'). 'Shop' text link at 14px Mier A, #4a0a05, with a 1px #4a0a05 underline, positioned 8px below the name. White (#fafaf9) background. No border, no shadow.

### Journal Editorial Card
**Role:** Editorial/press content card

Full-bleed editorial photograph (0px radius, 0px padding). Date stamp at 13px Mier A, #4a0a05, positioned 12px above the image. Headline at 24px Caslon Ionic, #4a0a05, positioned 12px below the image. 'Read More' text link at 14px Mier A, #4a0a05, underlined, 12px below headline. White (#fafaf9) background. No border, no shadow.

### Text Link / Outlined Action
**Role:** Primary interactive element

No fill, no large button shape. 14px Mier A, #4a0a05, with a 1px #4a0a05 bottom border acting as underline. Padding: 0px vertical, 0px horizontal — the text is the control. On hover: border-color darkens or thickens to 1.5px. This is the site's only action style; there are no filled buttons.

### Sidebar Section Label
**Role:** Section identifier

Small text at 14px Mier A, #4a0a05, left-aligned in a narrow ~120px column at the far left of the page width. Labels include 'Our Catalog', 'Lathely', 'Featured', product names like 'Verso Surface Mount'. No border, no background — just text in a separate column from main content, connected by a thin horizontal rule (#4a0a05, 1px).

### Horizontal Scroll Carousel
**Role:** Product category browser

Row of Product Category Cards with 12px column gap. Arrow controls (← →) at the right edge, rendered as 14px Mier A, #4a0a05, no background. Cards scroll horizontally; no pagination dots. A thin 1px #4a0a05 line above the carousel acts as a section rule.

### Section Divider
**Role:** Vertical rhythm separator

Thin 1px horizontal line, #4a0a05 or #bcb6a6, spanning the full content width. Used to separate catalog sections, journal sections, and footer. No vertical dividers, no decorative elements — just a hairline.

### Pill Tag
**Role:** Category or filter label

9999px border-radius. Background: #f8f7f1. Text: 13px Mier A, #4a0a05. Padding: 4px 12px. No border. Used sparingly for product tags or filters.

### Multi-Column Footer
**Role:** Site footer with contact and navigation

White (#fafaf9) background, 1px #4a0a05 top border. Multi-column text links at 13px Mier A, #4a0a05. Columns: brand info, showroom addresses, contact email. No social icons (text links only), no newsletter form. Generous vertical padding (40-64px).

## Do's and Don'ts

### Do
- Use #4a0a05 oxblood for all text, borders, and links — it is the only chromatic color and must carry every word, rule, and interactive element
- Pair Caslon Ionic serif at 24px for category names, journal headlines, and the wordmark with Mier A sans at 13-18px for all body, nav, and UI text
- Let photography fill its container edge-to-edge with 0px border-radius and 0px padding — images are full-bleed, never framed or rounded
- Use 12px gaps in navigation rows and between related elements; 64px between major sections to let photography breathe
- Set page backgrounds to #fafaf9 warm cream — never pure #ffffff; the warm off-white is essential to the paper-stock feel
- Use horizontal scroll carousels with small arrow controls for product categories rather than paginated grids or filters
- Date-stamp journal cards with small sidebar labels in a separate column, not badges or pills overlaid on images

### Don't
- Don't use filled colored buttons — the system is entirely text-link driven; an outlined/underlined text link in #4a0a05 is the only action style
- Don't apply border-radius to images, cards, or panels — only pill tags at 9999px may be rounded; everything else is sharp
- Don't use drop shadows for elevation — depth comes from photography and warm color temperature, never from box-shadow
- Don't use pure white (#ffffff) backgrounds — always use #fafaf9 or #f8f7f1; the warmth is the brand
- Don't introduce accent colors beyond oxblood — the palette is intentionally narrow; adding blue, green, or other hues breaks the editorial coherence
- Don't use system fonts or substitute the Caslon/Mier pairing — the serif-sans tension is the brand's typographic identity
- Don't center-align body text or use large display headlines — the system is left-aligned and restrained; headlines are 24px, not 48px+

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Cream Paper | `#fafaf9` | Page background; the default canvas for all editorial content |
| 1 | Aged Linen | `#f8f7f1` | Subtle surface lift for tags, secondary panels, and quiet differentiation |
| 2 | Warm Stone | `#bcb6a6` | Mid-tone wash for section backgrounds or accent surfaces |

## Elevation

No shadows. Depth and hierarchy are created through warm color temperature, full-bleed photography, and generous negative space. Elements sit on the same flat plane; the eye moves between them through contrast in color temperature and scale, not elevation. This is a deliberate editorial choice — the design reads as printed paper, not a screen UI.

## Imagery

Full-bleed interior photography dominates the visual field. All images are atmospheric, warm-toned scenes of rooms and objects in context — golden-hour light, candlelit interiors, textured walls, no people, no isolated product shots on white. Images have no border-radius, no padding around them, no visible frames; they sit flush against the cream page. Color treatment is consistently warm: amber, terracotta, deep shadow, muted greens from plants. Photography serves as both content and atmosphere — it IS the page chrome. No illustrations, no icons, no decorative graphics; the wordmark and category names do the work of branding.

## Layout

Full-bleed hero with overlaid serif headline positioned lower-left. Below the fold: centered max-width content (~1200px) with a persistent narrow left sidebar column for section labels ('Our Catalog', 'Lathely', 'Featured'). Horizontal scroll product carousel with small arrow controls at the right edge. Two-column side-by-side journal cards with date stamps. Footer with multi-column text links. The layout rhythm alternates between full-bleed photographic moments and quiet, text-driven editorial pages — photography is the punctuation, text is the prose. Navigation is a single thin top bar of text links, no background fill, no border.

## Agent Prompt Guide

## Quick Color Reference
- Text: #4a0a05
- Background: #fafaf9
- Surface/secondary: #f8f7f1
- Border: #4a0a05
- Accent: #4a0a05
- primary action: #4a0a05 (outlined action border)

## Example Component Prompts

1. **Full-bleed hero with overlaid headline**: Full-viewport-width warm interior photograph. White serif headline 'In Common With' at 24px Caslon Ionic, left-aligned, positioned at ~30% from top. White sans subtitle 'A dialogue between light, material, and form' at 13px Mier A directly below. White text link 'Explore Outdoor' at 14px Mier A with 1px white underline, 8px below subtitle. No button shapes.

2. **Product category card**: Full-bleed interior photograph (0px border-radius, 0px padding). Category name 'Floor Lamps' at 24px Caslon Ionic, #4a0a05, with superscript count '5'. 'Shop' text link at 14px Mier A, #4a0a05, with 1px #4a0a05 underline, 8px below the name. White #fafaf9 card background, no border, no shadow.

3. **Journal editorial card**: Full-bleed editorial photograph. Date stamp 'May 13, 2024' at 13px Mier A, #4a0a05, 12px above image. Headline 'Welcome to Quarters' at 24px Caslon Ionic, #4a0a05, 12px below image. 'Read More' text link at 14px Mier A, #4a0a05, underlined, 12px below headline. White #fafaf9 background.

4. **Top navigation bar**: Transparent background, no border. Left: 'Shop' at 14px Mier A, #4a0a05. Center: 'Collections', 'Showroom' at 14px Mier A, #4a0a05. Right: 'Info', 'Trade', 'Search', 'Sign In', 'Cart (0)' at 14px Mier A, #4a0a05. 12px gap between items. No logo in nav — the wordmark appears in content.

5. **Sidebar section label with content**: Narrow ~120px left column with 'Our Catalog' at 14px Mier A, #4a0a05, left-aligned. Thin 1px #4a0a05 horizontal rule extending right from the label across the full content width. Main content begins to the right of the sidebar column.

## Similar Brands

- **Hem** — Same warm minimal furniture aesthetic with photography-driven product presentation and text-link commerce
- **Menu Space** — Same lighting category with warm interior photography, restrained typography, and minimal UI chrome
- **Allied Maker** — Same editorial layout language with serif headlines over sans body, full-bleed product photography, and oxblood/dark text on warm white
- **Workstead** — Same warm interior photography, narrow sans-serif UI, and serif accent on category and journal titles
- **Apparatus Studio** — Same lighting brand aesthetic with moody warm photography, text-link navigation, and a single dark accent color on cream backgrounds

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-oxblood-ink: #4a0a05;
  --color-cream-paper: #fafaf9;
  --color-aged-linen: #f8f7f1;
  --color-warm-stone: #bcb6a6;
  --color-dusty-clay: #a2827f;

  /* Typography — Font Families */
  --font-mier-a: 'Mier A', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-caslon-ionic: 'Caslon Ionic', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.2;
  --text-body: 18px;
  --leading-body: 1.2;
  --text-subheading: 24px;
  --leading-subheading: 1.2;
  --text-heading: 26px;
  --leading-heading: 1.2;

  /* Typography — Weights */
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-60: 60px;
  --spacing-80: 80px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 64px;
  --card-padding: 0px;
  --element-gap: 12px;

  /* Border Radius */
  --radius-full: 9999px;

  /* Named Radii */
  --radius-tags: 9999px;
  --radius-cards: 0px;
  --radius-pills: 9999px;
  --radius-images: 0px;
  --radius-buttons: 0px;

  /* Surfaces */
  --surface-cream-paper: #fafaf9;
  --surface-aged-linen: #f8f7f1;
  --surface-warm-stone: #bcb6a6;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-oxblood-ink: #4a0a05;
  --color-cream-paper: #fafaf9;
  --color-aged-linen: #f8f7f1;
  --color-warm-stone: #bcb6a6;
  --color-dusty-clay: #a2827f;

  /* Typography */
  --font-mier-a: 'Mier A', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-caslon-ionic: 'Caslon Ionic', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.2;
  --text-body: 18px;
  --leading-body: 1.2;
  --text-subheading: 24px;
  --leading-subheading: 1.2;
  --text-heading: 26px;
  --leading-heading: 1.2;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-60: 60px;
  --spacing-80: 80px;

  /* Border Radius */
  --radius-full: 9999px;
}
```

---

## Anpassungen für Arztpraxis

> Alles oberhalb dieser Linie ist der **unveränderte Original-Export** von Refero (Stil „Incommonwith“, https://styles.refero.design/style/1f9089e1-4170-482f-b988-afe1124a70a9). Er bleibt verbindlich, soweit dieser Abschnitt nichts anderes festlegt. Jede Abweichung ist hier mit Grund dokumentiert.
>
> Technische Umsetzung: `src/styles/global.css` (Tailwind-v4-`@theme`) und `src/styles/fonts.css`.

### A1 Tokens: 1:1 übernommen

Alle Tokens des Exports stehen mit **identischem Namen und Wert** im Theme. Wo A4 eine Größe oder Zeilenhöhe aus Lesbarkeitsgründen anhebt, wird der Token im Theme danach überschrieben, mit Kommentar. Betroffen sind nur `--text-caption` (13 → 14px) und die Zeilenhöhen.
- Farben `--color-oxblood-ink`, `--color-cream-paper`, `--color-aged-linen`, `--color-warm-stone`, `--color-dusty-clay`
- Spacing `--spacing-4` … `--spacing-80`
- Typo-Scale `--text-caption`, `--text-body`, `--text-subheading`, `--text-heading` mit `--leading-*`
- `--font-weight-regular`, `--radius-full`
- Layout `--page-max-width`, `--section-gap`, `--card-padding`, `--element-gap`
- benannte Radien `--radius-*`, Surfaces `--surface-*`

Die Tailwind-Standardpaletten (Farben, Schatten, Rundungen, Zahlen-Spacing) sind entfernt. Utilities gibt es nur für Werte aus diesem Dokument. `p-16` bedeutet hier **16px** (Export-Token `--spacing-16`), nicht Tailwinds 4rem.

Schriftgrößen sind in `rem` notiert (13px = 0.8125rem usw.). Bei Standard-Browsereinstellung sind die Werte identisch. Patienten mit größer eingestellter Browserschrift bekommen aber größere Schrift.

### A2 Farben: Rollen und Kontraste (WCAG 2.2 AA)

Gemessen nach WCAG-Formel:

| Text ↓ / Fläche → | Cream Paper `#fafaf9` | Aged Linen `#f8f7f1` | Warm Stone `#bcb6a6` |
|---|---|---|---|
| Oxblood Ink `#4a0a05` | **15,0 : 1** ✓ | **14,6 : 1** ✓ | **7,8 : 1** ✓ |
| Oxblood Muted `#764642` *(Ergänzung)* | **7,4 : 1** ✓ | **7,2 : 1** ✓ | 3,8 : 1 ✗ |
| Oxblood Subtle `#885e5a` *(Ergänzung)* | **5,3 : 1** ✓ | **5,2 : 1** ✓ | 2,7 : 1 ✗ |
| Dusty Clay `#a2827f` *(Export)* | 3,3 : 1 ✗ | 3,2 : 1 ✗ | 1,7 : 1 ✗ |

- **Abweichung: Dusty Clay nie für Text.** Der Export sieht `#a2827f` für Captions, Hilfstexte und Labels vor. Mit 3,3 : 1 verfehlt die Farbe AA (4,5 : 1). Der Token bleibt im Theme, ist auf dieser Website aber **für Text gesperrt**. Er wird nur dort verwendet, wo kein Kontrast nötig ist, derzeit nirgends.
- **Ergänzung: zwei abgestufte Oxblood-Töne für Sekundärtext.** Beide sind reine Mischungen aus Oxblood Ink und Cream Paper, also keine neue Farbe:
  - `--color-oxblood-muted: #764642` für Captions, Datumsangaben und Unterzeilen
  - `--color-oxblood-subtle: #885e5a` als Untergrenze, z. B. für Platzhaltertext in Formularfeldern
  - Beide nur auf Cream Paper oder Aged Linen.
- **Warm Stone** (`#bcb6a6`) ist eine Fläche bzw. Linie (Section Divider laut Export). Darauf steht ausschließlich Oxblood Ink.
- **Aged Linen** (`#f8f7f1`) dient als stille Zweitfläche (Terminbuchungs-Box, Hinweise).
- **Linien und Rahmen:** Formularrahmen und alle interaktiven Kanten sind Oxblood Ink (15 : 1, über den 3 : 1 für UI-Komponenten). Warm Stone nur für rein dekorative Trennlinien.
- **Fokus:** 2px Oxblood-Outline mit 3px Abstand an jedem fokussierbaren Element (WCAG 2.4.7, 2.4.11).
- **Keine weitere Farbe.** Kein Türkis, kein Zahnarzt-Blau, kein Doctolib-Blau, kein Weiß `#ffffff`.

### A3 Schriften

Caslon Ionic und Mier A sind kommerziell. Ersatz gemäß den Substitute-Hinweisen des Exports:

| Export | Ersatz | Schnitte | Verwendung |
|---|---|---|---|
| Mier A (`--font-mier-a`) | **Inter** (vom Export genannter freier Ersatz) | 400 | Fließtext, Navigation, UI, Captions |
| Caslon Ionic (`--font-caslon-ionic`) | **Libre Caslon Text** (vom Export genannt) | 400 | Wortmarke, Kategorien, `subheading` 24px |
| Caslon Ionic, große Größen | **Libre Caslon Display** | 400 | vergrößerte Headlines (A4), optisch für große Grade gezeichnet |

- **Nur Gewicht 400**, wie im Export („the system trusts size and color contrast to carry hierarchy, never weight“). Fett und kursiv werden nicht ausgeliefert.
- **Korrektur am Export:** Dort steht als Fallback für `--font-caslon-ionic` eine Sans-Serif-Kette. Das ist ein offensichtlicher Exportfehler. Hier fällt die Serife auf `Georgia, "Times New Roman", serif` zurück.
- **Lizenz:** SIL Open Font License 1.1, Lizenztexte unter `public/fonts/OFL-*.txt`. Quelle: Fontsource 5.3.0.
- **Selbst gehostet** als woff2 unter `/public/fonts/`. Kein Google-Fonts-CDN (DSGVO).
- **Zeichenabdeckung geprüft** (fontTools, für jede Datei passend zu ihrer `unicode-range`):
  `ä ö ü Ä Ö Ü ß ñ Ñ á é í ó ú Á É Í Ó Ú ¿ ¡ ç Ç ğ Ğ ı İ ş Ş â î û – — „ “ ” ‚ ‘ ’ « » · € §`.
  Das Ergebnis ist **vollständig** in allen Schnitten. Ein Ausweichen auf eine andere Serife ist nicht nötig.
- **Subsetting:** pro Schnitt `latin` und `latin-ext`. Latin Extended-A ist vollständig enthalten. Der Browser lädt `latin-ext` nur, wenn Zeichen wie ğ ş İ vorkommen. Gemessen: Die deutsche Startseite lädt nur die zwei `latin`-Dateien.
- **Preload** für `libre-caslon-display-latin-400` und `inter-latin-400`, `font-display: swap`.

### A4 Typografie-Skala

Der Export kennt vier Größen (13 / 18 / 24 / 26px) plus 14px für Navigation und Links, alle mit Zeilenhöhe 1.2. Dazu sagt er „Don't use large display headlines — headlines are 24px, not 48px+“. Für die Praxis gilt:

| Stufe | Token | Schrift | Größe | Zeilenhöhe | Herkunft |
|---|---|---|---|---|---|
| Hero | `--text-hero` | Libre Caslon Display | clamp 42→76px | 1.05 | **Abweichung** (Präsenz im Hero) |
| H1 | `--text-display` | Libre Caslon Display | clamp 36→56px | 1.1 | **Abweichung** |
| H2 | `--text-title` | Libre Caslon Display | clamp 28→40px | 1.15 | **Abweichung** |
| Kategorie, H3, Wortmarke | `--text-subheading` | Libre Caslon Text | **24px** | 1.2 | Export |
| Intro, Antwortabsatz | `--text-heading` | Inter | **26px** | 1.35 | Export (Größe), Zeilenhöhe erhöht |
| Fließtext | `--text-body` | Inter | **18px** | **1.6** | Export (Größe), Zeilenhöhe erhöht |
| Navigation, Buttons, Links | `--text-nav` | Inter | **16px** | 1.4 | Export: 14px → erhöht |
| Caption, Datum, Meta, Labels | `--text-caption` | Inter | **14px** | 1.4 | Export: 13px → erhöht |

- **Große Headlines (Abweichung, vom Auftrag ausdrücklich erlaubt):** H1, H2 und Hero werden größer als 24px und responsiv gesetzt, damit die Startseite Präsenz hat. Unterhalb der H2 gilt wieder die Export-Größe 24px.
- **Lesbarkeit für ältere Patienten (Abweichung):**
  - Fließtext 18px wie im Export, aber Zeilenhöhe 1.6 statt 1.2. Bei 1.2 sind mehrzeilige Absätze schwer lesbar. WCAG 1.4.12 setzt 1.5 als Referenz.
  - Navigation 16px statt 14px, Captions 14px statt 13px.
- **Keine weiteren Zwischengrößen.** Es gibt nur diese acht Stufen.
- **Ausrichtung:** linksbündig, auch in der Hero-Headline („Don't center-align body text“).
- **Lange Übersetzungen:** Spanisch und Deutsch laufen 20–30 % länger als Englisch. Buttons, Navigation und Sprachumschalter haben keine festen Breiten. Sie wachsen mit dem Inhalt und brechen per `flex-wrap` um.
- **Uppercase:** Der Export verwendet keine Versal-Labels. Standard ist daher Normalschreibung. Wo Versalien doch nötig werden, nur per CSS `text-transform: uppercase` mit korrektem `lang`, nie im Quelltext. So wird im Türkischen i → İ korrekt umgesetzt.
- `hyphens: auto` und `text-wrap: pretty` im Fließtext, `text-wrap: balance` in Überschriften.

### A5 Spacing, Layout, Radien

- **Spacing:** ausschließlich die Export-Skala 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 56 / 60 / 80px.
  - **Ergänzung `--spacing-44: 44px`** nur für Mindest-Klickflächen (44 × 44px, über WCAG 2.5.8).
- **Seitenbreite:** `--page-max-width` 1200px (Export). Seitenrand 16px (Handy), 24px (Tablet), 40px (Desktop), alles Werte aus der Skala.
- **Section-Abstand:** `--section-gap` 64px (Export) oben und unten je Sektion, also 128px zwischen Inhalten zweier Sektionen.
- **Element-Gap:** `--element-gap` 12px (Export).
  - **Ausnahme Hauptnavigation:** 24px, proportional zur auf 16px vergrößerten Navigationsschrift.
- **Radien (Abweichung):** Pill-Tags mit 9999px sieht der Export vor. Laut Auftrag gelten auf dieser Website **ausnahmslos scharfe Ecken**. Pill-Tags werden nicht verwendet. Der Token `--radius-full` bleibt 1:1 im Theme, ein Basis-Reset setzt aber jedes Element auf `border-radius: 0`.
- **Sidebar Section Label** (Export) ist das Standardmuster für Sektionsköpfe: Label (14px) in einer schmalen Spalte von ca. 120px links, rechts davon 1px-Oxblood-Haarlinie über die volle Breite. Auf dem Handy steht das Label über der Linie.

### A6 Buttons und Conversion (Abweichung)

Der Export kennt nur Textlinks („there are no filled buttons“). Für die Praxis sind Termine das Ziel, deshalb:

- **Primär:** gefüllter Oxblood-Button „Online-Termin buchen“
  - Flach, 0px Radius, mindestens 48px hoch.
  - Hover invertiert (Ink ↔ Paper), keine neue Farbe.
  - Kein Doctolib-Logo, kein Doctolib-Blau.
  - Darunter in Caption-Größe „über Doctolib“, der Link ist als „öffnet in neuem Fenster“ gekennzeichnet.
- **Sekundär:** Outline-Button „030 44 26 84 3 anrufen“ (`tel:`), 1px Oxblood.
- **Alle übrigen Aktionen** („Mehr erfahren“, „Zur Leistung“) folgen dem Export: Textlink mit 1px-Unterstreichung, beim Hover 1.5px. Technisch als `text-decoration` statt `border-bottom`, damit die Klickfläche 44px hoch sein kann, ohne dass die Linie vom Text wegrutscht.
- **Mobile Leiste** (unter 768px):
  - fixiert unten, Cream Paper, 1px-Oxblood-Haarlinie oben
  - drei gleich breite Felder mit kleinen Labels (14px): Online-Termin · Anrufen · Anfahrt
  - berücksichtigt die Safe-Area, der Seiteninhalt bekommt unten Platz
- **Kein WhatsApp** (Gesundheitsdaten, DSGVO).

### A7 Hero und Fotos (Abweichung)

- Der Export legt die Headline in Weiß **auf** das Foto. Hier gilt: **keine Texte, Badges oder Siegel auf Fotos.** Headline, kurze Unterzeile und CTAs stehen **neben** dem Foto (Desktop) bzw. darüber (Handy), in Oxblood auf Cream.
- **Personen:** Der Export zeigt nur Räume ohne Menschen. Für die Praxis sind das echte Porträt von Dr. Adali, Teamfotos und, zurückhaltend, Menschen auf Stockfotos zulässig, nach den Regeln aus Phase 3.
- Die Bildsprache bleibt wie im Export: warm, Tageslicht, randlos, 0px Radius, keine Rahmen, keine Overlays.

### A8 Header, Navigation, Logo

- **Abweichung vom Export** (dort: Navigation ohne Logo, Wortmarke im Inhalt). Der Header zeigt links das Logo-Monogramm und die **Serif-Wortmarke „Dentanea“** (24px, Libre Caslon Text), darunter in Caption-Größe „Zahnarztpraxis Dr. Adali“. Der Zusatz grenzt den Namen von ähnlich klingenden Praxen ab (siehe `docs/bestandsaufnahme.md`, Abschnitt 10).
- **Logo: [[PLATZHALTER]].** Bis zum finalen Logo steht ein Monogramm „D“ aus Libre Caslon Display, als Vektorpfad in Oxblood mit 1px-Haarlinienrahmen (`src/assets/logo/logo-platzhalter.svg`). Favicon und App-Icon zeigen dasselbe „D“ in Cream auf Oxblood (`public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`). Das finale Logo muss ebenfalls in Oxblood/Cream funktionieren, einfarbig und ohne Verlauf.
- Das alte Logo (Zahn mit „A“, Magenta) entfällt mit dem neuen Namen. Archiv: `docs/alte-website/logo-alt-magenta.png`.
- **Zweizeiliger Header ab 1024px:**
  - Zeile 1: Wortmarke | Sprachumschalter · Telefon · „Online-Termin“
  - Zeile 2: Navigation (16px, 24px Abstand)
  - Eine Haarlinie trennt den Header vom Inhalt. Der Header bleibt transparent, ohne Fläche.
  - So verdrängen längere Übersetzungen nichts.
- **Unter 1024px:** Menü als `<details>`/`<summary>`, funktioniert ohne JavaScript, mit Navigation, Sprachumschalter und Anruf-Button.

### A9 Sprachumschalter

- Kürzel **„DE · EN · ES · TR“** im Stil der Navigation, die aktive Sprache unterstrichen (`aria-current`). Keine Flaggen.
- Jeder Link trägt `lang` und `hreflang`.
- Der zugängliche Name enthält das sichtbare Kürzel („DE Deutsch“), damit Sprachsteuerung per „DE“ funktioniert (WCAG 2.5.3).
- Auf dem Handy steht der Umschalter oben unter der Wortmarke und zusätzlich im Menü.

### A10 Footer (Abweichung)

Aufbau wie im Export: mehrspaltig, Cream Paper, 1px-Oxblood-Linie oben, nur Textlinks, keine Social-Icons, kein Newsletter. Schriftgröße 16px statt 13px, aus Lesbarkeitsgründen.

### A11 Technische Leitplanken

- Keine Inline-Styles (`style="…"`) und keine Inline-Event-Handler (`onclick="…"`), damit eine strikte Content-Security-Policy möglich bleibt (Phase 7).
- Beim Seitenaufruf gibt es keine externen Requests. Schriften und Bilder liegen lokal.
- Keine Schatten (Basis-Reset `box-shadow: none`), keine Verläufe.
