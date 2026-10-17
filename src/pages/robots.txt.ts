/**
 * robots.txt – alles erlaubt außer technischen Pfaden; Verweis auf die Sitemap.
 * KI-Crawler (GPTBot, ClaudeBot, PerplexityBot …) werden in Phase 6 (GEO) ausdrücklich zugelassen.
 */
import type { APIRoute } from "astro";
import { site } from "../config/site";

export const GET: APIRoute = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      "Disallow: /anfrage.php",
      "Disallow: /intern/",
      "Disallow: /_bildauswahl",
      "",
      `Sitemap: ${site.domain}/sitemap.xml`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
