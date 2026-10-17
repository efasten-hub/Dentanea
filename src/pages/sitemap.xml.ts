/**
 * sitemap.xml – alle veröffentlichten, indexierbaren Seiten in allen Sprachen,
 * je URL mit hreflang-Alternativen (xhtml:link) und x-default (deutsche Fassung, sonst Englisch).
 * Gleiche Regeln wie die hreflang-Tags im <head> (src/layouts/Basis.astro).
 */
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { site, type Sprache } from "../config/site";
import { seitenVerfuegbar, SPRACHEN, STANDARD } from "../i18n";
import { pfad, routen } from "../i18n/routen";

const abs = (p: string) => new URL(p, site.domain).href;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const iso = (s?: string) => (s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : undefined);

export const GET: APIRoute = async () => {
  const verfuegbar = await seitenVerfuegbar();
  const urls: string[] = [];
  // Reihenfolge wie in routen.ts (Startseite zuerst)
  for (const id of Object.keys(routen)) {
    const sprachen = verfuegbar.get(id);
    if (!sprachen) continue;
    if (routen[id].noindex) continue;
    const vorhanden = SPRACHEN.filter((s) => sprachen.has(s)) as Sprache[];
    const xDefault = vorhanden.includes(STANDARD) ? STANDARD : undefined;
    for (const sprache of vorhanden) {
      const d = (await getEntry("seiten", `${sprache}/${id}`))!.data;
      const lastmod = iso(d.stand) ?? iso(d.datum);
      const alt = vorhanden.map((s) => `    <xhtml:link rel="alternate" hreflang="${s}" href="${esc(abs(pfad(id, s)!))}"/>`);
      if (xDefault) alt.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(pfad(id, xDefault)!))}"/>`);
      urls.push(`  <url>\n    <loc>${esc(abs(pfad(id, sprache)!))}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}${vorhanden.length > 1 ? alt.join("\n") + "\n" : ""}  </url>`);
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
