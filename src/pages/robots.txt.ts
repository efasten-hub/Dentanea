/**
 * robots.txt – alles erlaubt außer technischen Pfaden; Verweis auf Sitemap und llms.txt.
 *
 * GEO (Phase 6): KI-Crawler und KI-Assistenten werden ausdrücklich zugelassen, damit
 * ChatGPT, Claude, Perplexity, Gemini & Co. die Praxis finden und zitieren können.
 * Wer einzelne Dienste sperren möchte: Namen aus KI_BOTS entfernen und unten mit
 * „Disallow: /“ eintragen.
 */
import type { APIRoute } from "astro";
import { site } from "../config/site";

const SPERREN = ["/anfrage.php", "/intern/", "/_bildauswahl"];

const KI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",          // OpenAI
  "ClaudeBot", "Claude-User", "Claude-SearchBot",      // Anthropic
  "PerplexityBot", "Perplexity-User",                  // Perplexity
  "Google-Extended",                                   // Google Gemini
  "Applebot", "Applebot-Extended",                     // Apple
  "Bingbot",                                           // Microsoft Copilot / Bing
  "meta-externalagent",                                // Meta AI
  "Amazonbot", "DuckAssistBot", "MistralAI-User", "CCBot",
];

const block = (agents: string[]) => [...agents.map((a) => `User-agent: ${a}`), "Allow: /", ...SPERREN.map((p) => `Disallow: ${p}`), ""];

export const GET: APIRoute = () =>
  new Response(
    [
      "# Dentanea – Zahnarztpraxis Dr. Adali",
      "# Suchmaschinen und KI-Assistenten sind willkommen. Zusammenfassung für KI: /llms.txt",
      "",
      ...block(["*"]),
      "# KI-Crawler und KI-Assistenten (ausdrücklich erlaubt)",
      ...block(KI_BOTS),
      `Sitemap: ${site.domain}/sitemap.xml`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
