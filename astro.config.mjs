// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Statischer Build für Hetzner Webhosting (Apache, ohne Node-Server).
// Sprachen und Slugs: src/config/site.ts und src/i18n/routen.ts.
export default defineConfig({
  site: "https://zahnarzt-adali.de", // identisch zu site.ts → domain [[PRÜFEN: Domain]]
  output: "static",
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en", "es", "tr"],
    // Deutsch ohne Präfix, alle anderen Sprachen mit /en, /es, /tr. Keine Weiterleitung nach Browsersprache.
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  trailingSlash: "ignore",
  // CSS immer als Datei (nie inline) – Voraussetzung für style-src 'self' in der CSP
  build: { format: "directory", inlineStylesheets: "never" },
  // Scripts immer als eigene Datei (nie inline) – Voraussetzung für eine strikte Content-Security-Policy
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
