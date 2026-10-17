/** /en/llms.txt, /es/llms.txt, /tr/llms.txt – Zusammenfassung für KI-Assistenten je Sprache. */
import type { APIRoute, GetStaticPaths } from "astro";
import type { Sprache } from "../../config/site";
import { SPRACHEN, STANDARD, seitenVerfuegbar } from "../../i18n";
import { llmsTxt } from "../../lib/llms";

export const getStaticPaths = (async () => {
  const start = (await seitenVerfuegbar()).get("startseite");
  return SPRACHEN.filter((s) => s !== STANDARD && start?.has(s)).map((sprache) => ({ params: { sprache } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) =>
  new Response(await llmsTxt(params.sprache as Sprache), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
