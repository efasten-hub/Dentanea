/**
 * llms.txt (https://llmstxt.org) – Zusammenfassung der Website für KI-Assistenten (GEO).
 *
 *   /llms.txt            Deutsch
 *   /en/llms.txt …       Englisch, Spanisch, Türkisch
 *   /llms-full.txt       ausführlicher Volltext aller deutschen Seiten
 *
 * Alles wird beim Build aus site.ts, den i18n-Texten und den Seiteninhalten erzeugt –
 * keine zweite Datenquelle. Offene Markierungen werden nie als Fakten ausgegeben:
 * Sätze mit [[PREIS]] entfallen, andere [[…]]-Hinweise werden entfernt.
 */
import { getEntry } from "astro:content";
import { site, type Sprache } from "../config/site";
import { t, sprachListe, seitenVerfuegbar, terminLink, SPRACHEN, STANDARD } from "../i18n";
import { pfad, routen } from "../i18n/routen";
import { leistungsgruppen } from "../config/leistungsgruppen";

const abs = (p: string) => new URL(p, site.domain).href;

/** Entfernt offene Markierungen; Sätze/Listenpunkte mit Preisplatzhaltern fallen ganz weg. */
export function bereinigen(text: string): string {
  return text
    .split("\n")
    .map((zeile) => {
      if (!/\[\[PREIS/.test(zeile)) return zeile;
      // Listenpunkt oder ganze Zeile mit Preis → weglassen; sonst nur den betroffenen Satz
      if (/^\s*([-*]|\d+\.)\s/.test(zeile)) return null;
      return zeile.split(/(?<=[.!?])\s+/).filter((satz) => !/\[\[PREIS/.test(satz)).join(" ");
    })
    .filter((z): z is string => z !== null)
    // Einleitungszeilen („… je nach Befund:“), deren Liste komplett entfallen ist, ebenfalls weglassen
    .filter((z, i, alle) => {
      if (!/:\s*$/.test(z) || /^\s*([-*]|\d+\.)\s/.test(z)) return true;
      const naechste = alle.slice(i + 1).find((x) => x !== null && x.trim() !== "");
      return naechste !== undefined && /^\s*([-*]|\d+\.)\s/.test(naechste);
    })
    .join("\n")
    .replace(/\s*\[\[[A-ZÄÖÜ][^\]]*\]\]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function eintrag(id: string, sprache: Sprache) {
  return (await getEntry("seiten", `${sprache}/${id}`))?.data;
}

function fakten(sprache: Sprache): string[] {
  const sz = site.sprechzeiten.zeiten
    .map((z) => `${z.tage.map((d) => t(sprache, `sprechzeiten.tage.${d}`)).join(", ")} ${t(sprache, "sprechzeiten.uhr", { von: z.von, bis: z.bis })}`)
    .join("; ");
  const zeilen = [
    `- ${t(sprache, "llms.adresse")}: ${site.praxisname_voll}, ${site.adresse.strasse}, ${site.adresse.plz} ${site.adresse.ort} (${t(sprache, "anfahrt.aufgang")}${site.adresse.aufzug ? `, ${t(sprache, "anfahrt.aufzug")}` : ""})`,
    `- ${t(sprache, "llms.telefon")}: ${site.telefon_anzeige} (${site.telefon})`,
    `- ${t(sprache, "llms.email")}: ${site.email}`,
    `- ${t(sprache, "llms.sprechzeiten")}: ${sz}${site.sprechzeiten.nach_vereinbarung ? `, ${t(sprache, "sprechzeiten.nach_vereinbarung")}` : ""}`,
  ];
  if (site.terminbuchung.aktiv) zeilen.push(`- ${t(sprache, "llms.termin")}: ${terminLink(sprache)} (${site.terminbuchung.anbieter_name})`);
  zeilen.push(
    `- ${t(sprache, "llms.sprachen")}: ${sprachListe(sprache, site.gesprochene_sprachen.dr_adali)}`,
    `- ${t(sprache, "llms.versicherung")}: ${t(sprache, "versicherung.alle")}`,
    `- ${t(sprache, "llms.anfahrt")}: ${site.oepnv.map((o) => `${o.linie} ${o.haltestelle} (${t(sprache, "anfahrt.fussweg", { min: o.fussweg_min })})`).join(", ")}; ${t(sprache, "anfahrt.parken")}`,
    `- ${t(sprache, "llms.inhaber")}: ${site.inhaber.name_voll}`,
    `- ${t(sprache, "llms.qualifikationen")}: ${site.qualifikationen.map((q) => `${q.titel} (${q.kuerzel}, ${q.gesellschaft})`).join("; ")}`,
    `- ${t(sprache, "llms.labor")}`,
  );
  return zeilen.map(bereinigen);
}

async function linkliste(ids: string[], sprache: Sprache): Promise<string[]> {
  const verfuegbar = await seitenVerfuegbar();
  const zeilen: string[] = [];
  for (const id of ids) {
    if (!verfuegbar.get(id)?.has(sprache) || routen[id].noindex) continue;
    const d = (await eintrag(id, sprache))!;
    const text = bereinigen(d.kurz ?? d.beschreibung);
    const titel = id === "startseite" ? site.praxisname_voll : d.titel;
    zeilen.push(`- [${titel}](${abs(pfad(id, sprache)!)}): ${text}`);
  }
  return zeilen;
}

/** llms.txt einer Sprache */
export async function llmsTxt(sprache: Sprache): Promise<string> {
  const verfuegbar = await seitenVerfuegbar();
  const kern = bereinigen(t(sprache, "geo.kernsatz", { sprachen: sprachListe(sprache, site.gesprochene_sprachen.dr_adali) }));
  const leistungen = leistungsgruppen.flatMap((g) => g.ids);
  const ratgeber = Object.entries(routen).filter(([, r]) => r.typ === "ratgeber").map(([id]) => id);
  const teile: string[] = [
    `# ${site.praxisname_voll}`,
    "",
    `> ${kern}`,
    "",
    t(sprache, "llms.hinweis"),
    "",
    `## ${t(sprache, "llms.fakten")}`,
    "",
    ...fakten(sprache),
    "",
    `## ${t(sprache, "llms.leistungen")}`,
    "",
    ...(await linkliste(["leistungen", ...leistungen], sprache)),
    "",
    `## ${t(sprache, "llms.praxis")}`,
    "",
    ...(await linkliste(["startseite", "ueber-dr-adali", "praxis-team", "fuer-zahnaerzte"], sprache)),
    "",
  ];
  const artikel = await linkliste(["ratgeber", ...ratgeber], sprache);
  if (artikel.length) teile.push(`## ${t(sprache, "llms.ratgeber")}`, "", ...artikel, "");
  teile.push(`## ${t(sprache, "llms.service")}`, "", ...(await linkliste(["faq", "kontakt", "impressum", "datenschutz", "barrierefreiheit"], sprache)), "");
  teile.push(
    `## ${t(sprache, "llms.andere")}`,
    "",
    ...SPRACHEN.filter((s) => s !== sprache && verfuegbar.get("startseite")?.has(s)).map((s) => `- [${site.sprachen.bezeichnungen[s]}](${abs(s === STANDARD ? "/llms.txt" : `/${s}/llms.txt`)})`),
    "",
    "## Optional",
    "",
    `- [${t(sprache, "llms.volltext")}](${abs("/llms-full.txt")})`,
    `- [Sitemap](${abs("/sitemap.xml")})`,
    "",
  );
  return teile.join("\n");
}

/** llms-full.txt: alle deutschen Seiten im Volltext (Markdown), Rechtstexte ausgenommen */
export async function llmsFullTxt(): Promise<string> {
  const sprache = STANDARD;
  const verfuegbar = await seitenVerfuegbar();
  const teile: string[] = [
    `# ${site.praxisname_voll}`,
    "",
    `> ${bereinigen(t(sprache, "geo.kernsatz", { sprachen: sprachListe(sprache, site.gesprochene_sprachen.dr_adali) }))}`,
    "",
    t(sprache, "llms.hinweis"),
    "",
    `## ${t(sprache, "llms.fakten")}`,
    "",
    ...fakten(sprache),
    "",
  ];
  const AUSSCHLUSS = new Set(["impressum", "datenschutz", "barrierefreiheit", "anfrage-gesendet"]);
  for (const id of Object.keys(routen)) {
    if (AUSSCHLUSS.has(id) || routen[id].noindex || !verfuegbar.get(id)?.has(sprache)) continue;
    const e = await getEntry("seiten", `${sprache}/${id}`);
    if (!e) continue;
    const d = e.data;
    teile.push("---", "", `## ${d.titel}`, "", `URL: ${abs(pfad(id, sprache)!)}`, "");
    if (d.unterzeile) teile.push(bereinigen(d.unterzeile), "");
    if (d.antwort) teile.push(bereinigen(d.antwort), "");
    // Überschriften des Seitentexts eine Ebene tiefer, damit ## die Seiten trennt
    const body = bereinigen((e.body ?? "").replace(/^(#{2,5}) /gm, "#$1 "));
    if (body) teile.push(body, "");
    const fragen = [...d.faq, ...d.faq_gruppen.flatMap((g) => g.fragen)];
    if (fragen.length) {
      teile.push(`### ${t(sprache, "seite.faq_titel")}`, "");
      for (const f of fragen) teile.push(`**${bereinigen(f.frage)}**`, bereinigen(f.antwort), "");
    }
    if (d.quellen.length) teile.push(`### ${t(sprache, "seite.quellen")}`, "", ...d.quellen.map((q) => `- ${q.titel}${q.url ? ` (${q.url})` : ""}`), "");
  }
  // Interne Links absolut, damit sie außerhalb der Website funktionieren
  return teile.join("\n").replace(/\]\(\//g, `](${site.domain}/`).replace(/\n{3,}/g, "\n\n");
}
