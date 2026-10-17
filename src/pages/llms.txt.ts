/** /llms.txt – Zusammenfassung für KI-Assistenten (Deutsch). Erzeugt aus src/lib/llms.ts. */
import type { APIRoute } from "astro";
import { llmsTxt } from "../lib/llms";

export const GET: APIRoute = async () => new Response(await llmsTxt("de"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
