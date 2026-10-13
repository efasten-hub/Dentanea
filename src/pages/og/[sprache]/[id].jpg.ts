/**
 * OG-Bilder (Social-Media-Vorschau) – pro Seite und Sprache beim Build erzeugt:
 *   /og/<sprache>/<seiten-id>.jpg  (1200 × 630)
 * Links Cream Paper mit Seitentitel (Libre Caslon Display, Oxblood) und Wortmarke,
 * rechts das Seitenbild aus dem Manifest im einheitlichen Look. Texte nur hier, nie in Fotos.
 */
import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { site, type Sprache } from "../../../config/site";
import { seitenVerfuegbar } from "../../../i18n";
import manifest from "../../../assets/fotos/bilder.json";

const W = 1200, H = 630, BILD_B = 480;
const INK = "#4a0a05", PAPER = "#fafaf9", MUTED = "#764642";
const WURZEL = process.cwd();
const font = (paket: string, datei: string) => readFileSync(join(WURZEL, "node_modules/@fontsource", paket, "files", datei));
// Je Schrift zwei Dateien (latin + latin-ext); satori braucht sie als getrennte Familien in einer Fallback-Liste
const F = { caslon: "Caslon, CaslonExt", caslonText: "CaslonText, CaslonTextExt", inter: "Inter, InterExt" };
const FONTS = [
  { name: "Caslon", data: font("libre-caslon-display", "libre-caslon-display-latin-400-normal.woff"), weight: 400 as const },
  { name: "CaslonExt", data: font("libre-caslon-display", "libre-caslon-display-latin-ext-400-normal.woff"), weight: 400 as const },
  { name: "CaslonText", data: font("libre-caslon-text", "libre-caslon-text-latin-400-normal.woff"), weight: 400 as const },
  { name: "CaslonTextExt", data: font("libre-caslon-text", "libre-caslon-text-latin-ext-400-normal.woff"), weight: 400 as const },
  { name: "Inter", data: font("inter", "inter-latin-400-normal.woff"), weight: 400 as const },
  { name: "InterExt", data: font("inter", "inter-latin-ext-400-normal.woff"), weight: 400 as const },
];
/** Standardbild, solange eine Seite kein eigenes Bild hat */
const STANDARD_BILD = "hero-atmosphaere";

export const getStaticPaths = (async () => {
  const verfuegbar = await seitenVerfuegbar();
  return [...verfuegbar].flatMap(([id, sprachen]) => [...sprachen].map((sprache) => ({ params: { sprache, id } })));
}) satisfies GetStaticPaths;

type V = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, ...children: (V | string)[]): V => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ params }) => {
  const sprache = params.sprache as Sprache;
  const id = params.id as string;
  const daten = (await getEntry("seiten", `${sprache}/${id}`))!.data;
  const m = manifest as unknown as Record<string, { datei: string }>;
  const bildDatei = m[daten.bild ?? ""]?.datei ?? m[STANDARD_BILD]?.datei;
  const foto = bildDatei
    ? await sharp(join(WURZEL, "src/assets/fotos", bildDatei)).resize(BILD_B, H, { fit: "cover", position: "attention" }).jpeg({ quality: 85 }).toBuffer()
    : null;
  const titel = daten.titel;
  const groesse = titel.length > 60 ? 52 : titel.length > 34 ? 60 : 72;

  const svg = await satori(
    el("div", { width: W, height: H, display: "flex", backgroundColor: PAPER },
      el("div", { width: W - BILD_B, height: H, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px 56px 64px" },
        el("div", { display: "flex", flexDirection: "column" },
          el("div", { fontFamily: F.inter, fontSize: 22, color: MUTED, display: "flex" }, site.praxiszusatz),
          el("div", { fontFamily: F.caslon, fontSize: groesse, lineHeight: 1.08, color: INK, marginTop: 28, display: "flex" }, titel),
        ),
        el("div", { display: "flex", flexDirection: "column", borderTop: `1px solid ${INK}`, paddingTop: 20 },
          el("div", { fontFamily: F.caslonText, fontSize: 36, color: INK, display: "flex" }, site.praxisname),
          el("div", { fontFamily: F.inter, fontSize: 20, color: MUTED, marginTop: 6, display: "flex" }, `${site.adresse.strasse}, ${site.adresse.ort} · ${site.domain.replace(/^https?:\/\//, "")}`),
        ),
      ),
      foto
        ? ({ type: "img", props: { src: `data:image/jpeg;base64,${foto.toString("base64")}`, width: BILD_B, height: H, style: { width: BILD_B, height: H, objectFit: "cover" } } } as V)
        : el("div", { width: BILD_B, height: H, backgroundColor: "#f8f7f1", display: "flex" }),
    ) as unknown as Parameters<typeof satori>[0],
    { width: W, height: H, fonts: FONTS },
  );
  const png = new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng();
  const jpg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { "Content-Type": "image/jpeg" } });
};
