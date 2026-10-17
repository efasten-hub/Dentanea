/**
 * Strukturierte Daten (Schema.org, JSON-LD) – je Seite ein @graph.
 *
 *  Dentist        – die Praxis (NAP aus site.ts, Sprechzeiten, Geo, ReserveAction → Doctolib)
 *  Person         – Dr. Adali (Qualifikationen mit vergebender Gesellschaft, Sprachen, ORCID)
 *  WebSite        – je Sprache
 *  Seite          – WebPage / MedicalWebPage / AboutPage / ContactPage / CollectionPage
 *  Service        – Leistungsseiten (about der MedicalWebPage)
 *  Article        – Ratgeber
 *  FAQPage        – Seiten mit Fragen (Feld faq bzw. faq_gruppen)
 *  BreadcrumbList – aus der Eltern-Kette in routen.ts
 *
 * Regeln: AggregateRating nur mit echten Bewertungen (site.ts → bewertungen);
 * Bild der Praxis/Person nur echte Fotos (stock: false im Bildmanifest), nie Stockfotos.
 * Werte mit [[…]]-Markierung werden weggelassen.
 */
import { getEntry, type CollectionEntry } from "astro:content";
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import { site, type Sprache } from "../config/site";
import { publikationen } from "../config/publikationen";
import manifest from "../assets/fotos/bilder.json";
import { t, terminLink, seitenVerfuegbar, seitenTitel, STANDARD } from "../i18n";
import { pfad, routen } from "../i18n/routen";

type Knoten = Record<string, unknown>;
const D = site.domain;
const abs = (p: string) => new URL(p, D).href;
const offen = (v: unknown) => typeof v === "string" && /\[\[/.test(v);
const id = (name: string) => `${D}/#${name}`;

const WOCHENTAG = { Monday: "Monday", Tuesday: "Tuesday", Wednesday: "Wednesday", Thursday: "Thursday", Friday: "Friday", Saturday: "Saturday", Sunday: "Sunday" };

// ---------------------------------------------------------------- Bilder
const dateien = import.meta.glob<{ default: ImageMetadata }>("../assets/fotos/*.{jpg,jpeg,png,webp}", { eager: true });
type ManifestEintrag = { datei: string; stock: boolean; alt: Record<Sprache, string> };
const m = manifest as unknown as Record<string, ManifestEintrag>;
const bildCache = new Map<string, string>();
/** Absolute URL eines Manifest-Bildes als JPEG (1200 px). */
export async function bildUrl(schluessel: string, nurEcht = false): Promise<string | undefined> {
  const e = m[schluessel];
  if (!e || (nurEcht && e.stock)) return undefined;
  const meta = dateien[`../assets/fotos/${e.datei}`]?.default;
  if (!meta) return undefined;
  if (!bildCache.has(schluessel)) {
    const bild = await getImage({ src: meta, width: Math.min(1200, meta.width), format: "jpg" });
    bildCache.set(schluessel, abs(bild.src));
  }
  return bildCache.get(schluessel);
}
/** Alle echten Fotos (keine Stockfotos) – für Dentist.image */
async function echteFotos(): Promise<string[]> {
  const out: string[] = [];
  for (const [k, e] of Object.entries(m)) if (!k.startsWith("_") && e.stock === false) { const u = await bildUrl(k, true); if (u) out.push(u); }
  return out;
}

// ---------------------------------------------------------------- Praxis und Person
async function praxis(sprache: Sprache, mitKatalog: boolean): Promise<Knoten> {
  const tb = site.terminbuchung;
  const sprachen = [...new Set([...site.gesprochene_sprachen.dr_adali, ...site.gesprochene_sprachen.team])];
  const fotos = await echteFotos();
  const sameAs = [site.online.google_business_profile_url, ...site.online.weitere_profile.filter((p) => !p.name.startsWith("ORCID") && !p.name.startsWith("DGPro")).map((p) => p.url), ...site.online.social.map((s) => s.url)].filter((u) => u && !offen(u));
  const knoten: Knoten = {
    "@type": "Dentist",
    "@id": id("praxis"),
    name: site.praxisname_voll,
    alternateName: site.praxisname,
    url: `${D}/`,
    logo: abs("/apple-touch-icon.png"),
    ...(fotos.length ? { image: fotos } : {}),
    telephone: site.telefon,
    faxNumber: site.fax,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adresse.strasse,
      postalCode: site.adresse.plz,
      addressLocality: site.adresse.ort,
      addressRegion: "Berlin",
      addressCountry: site.adresse.land,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: `https://www.openstreetmap.org/?mlat=${site.geo.lat}&mlon=${site.geo.lng}#map=18/${site.geo.lat}/${site.geo.lng}`,
    areaServed: { "@type": "City", name: "Berlin" },
    medicalSpecialty: "https://schema.org/Dentistry",
    isAcceptingNewPatients: true,
    knowsLanguage: sprachen,
    openingHoursSpecification: site.sprechzeiten.zeiten.map((z) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: z.tage.map((d) => `https://schema.org/${WOCHENTAG[d]}`),
      opens: z.von,
      closes: z.bis,
    })),
    founder: { "@id": id("dr-adali") },
    employee: { "@id": id("dr-adali") },
    ...(sameAs.length ? { sameAs } : {}),
  };
  if (tb.aktiv) {
    knoten.potentialAction = {
      "@type": "ReserveAction",
      name: t(sprache, "termin.online_buchen"),
      target: { "@type": "EntryPoint", urlTemplate: terminLink(sprache), inLanguage: sprache, actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] },
      result: { "@type": "Reservation", name: t(sprache, "termin.titel") },
    };
  }
  // Bewertungen nur, wenn echte vorliegen
  if (site.bewertungen.length > 0) {
    const summe = site.bewertungen.reduce((s, b) => s + b.sterne, 0);
    knoten.aggregateRating = { "@type": "AggregateRating", ratingValue: (summe / site.bewertungen.length).toFixed(1), reviewCount: site.bewertungen.length, bestRating: 5, worstRating: 1 };
  }
  if (mitKatalog) {
    const verfuegbar = await seitenVerfuegbar();
    const ids = Object.keys(site.leistungen).filter((l) => verfuegbar.get(l)?.has(sprache));
    knoten.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: t(sprache, "nav.leistungen"),
      itemListElement: await Promise.all(ids.map(async (l) => ({ "@type": "Offer", itemOffered: { "@type": "Service", "@id": abs(pfad(l, sprache)!) + "#leistung", name: await seitenTitel(l, sprache), url: abs(pfad(l, sprache)!) } }))),
    };
  }
  return knoten;
}

async function person(sprache: Sprache): Promise<Knoten> {
  const verfuegbar = await seitenVerfuegbar();
  const ueber = verfuegbar.get("ueber-dr-adali")?.has(sprache) ? pfad("ueber-dr-adali", sprache)! : pfad("ueber-dr-adali", STANDARD)!;
  const portraet = await bildUrl("portraet-dr-adali", true);
  return {
    "@type": "Person",
    "@id": id("dr-adali"),
    name: site.inhaber.name,
    honorificPrefix: site.inhaber.titel,
    givenName: "Ufuk",
    familyName: "Adali",
    jobTitle: t(sprache, "team.rollen.zahnarzt_inhaber"),
    url: abs(ueber),
    ...(portraet ? { image: portraet } : {}),
    worksFor: { "@id": id("praxis") },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Charité – Universitätsmedizin Berlin", url: "https://www.charite.de" },
    affiliation: { "@type": "CollegeOrUniversity", name: "Charité – Universitätsmedizin Berlin" },
    knowsLanguage: site.gesprochene_sprachen.dr_adali,
    hasCredential: site.qualifikationen.map((q) => ({
      "@type": "EducationalOccupationalCredential",
      name: `${q.titel} (${q.kuerzel})`,
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: q.gesellschaft, alternateName: q.kuerzel, url: q.url },
    })),
    memberOf: [
      ...site.mitgliedschaften.map((g) => ({ "@type": "Organization", name: g.name, alternateName: g.kuerzel, url: g.url })),
      { "@type": "Organization", name: site.recht.kammer.name, url: site.recht.kammer.url },
    ],
    award: site.auszeichnungen.map((a) => `${a.name}, ${a.jahr}`),
    knowsAbout: ["Prosthodontics", "Dental implants", "Resin-bonded bridges", "Temporomandibular disorders", "Molar incisor hypomineralisation", "Paediatric dentistry"],
    sameAs: [`https://orcid.org/${site.orcid}`, ...site.online.weitere_profile.filter((p) => p.name.startsWith("DGPro")).map((p) => p.url)],
  };
}

// ---------------------------------------------------------------- Hilfen
const ohneMarkdown = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s*\[\[[^\]]*\]\]/g, "").trim();
const isoDatum = (s?: string) => (s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : undefined);

async function brotkrumen(seitenId: string, sprache: Sprache): Promise<Knoten | null> {
  if (seitenId === "startseite") return null;
  const verfuegbar = await seitenVerfuegbar();
  const kette: string[] = [];
  for (let a: string | undefined = seitenId; a; a = routen[a]?.eltern) kette.unshift(a);
  const glieder = ["startseite", ...kette].filter((k) => verfuegbar.get(k)?.has(sprache));
  return {
    "@type": "BreadcrumbList",
    "@id": abs(pfad(seitenId, sprache)!) + "#brotkrumen",
    itemListElement: await Promise.all(glieder.map(async (k, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: k === "startseite" ? t(sprache, "nav.startseite") : await seitenTitel(k, sprache),
      item: abs(pfad(k, sprache)!),
    }))),
  };
}

const SEITENTYP: Record<string, string> = { kontakt: "ContactPage", "ueber-dr-adali": "ProfilePage", "praxis-team": "AboutPage", faq: "FAQPage", leistungen: "CollectionPage", ratgeber: "CollectionPage" };

// ---------------------------------------------------------------- Graph einer Seite
export async function jsonLd(seitenId: string, sprache: Sprache): Promise<Knoten | null> {
  const eintrag = (await getEntry("seiten", `${sprache}/${seitenId}`)) as CollectionEntry<"seiten"> | undefined;
  if (!eintrag) return null;
  const d = eintrag.data;
  const typ = routen[seitenId].typ;
  const url = abs(pfad(seitenId, sprache)!);
  const graph: Knoten[] = [];

  graph.push(await praxis(sprache, seitenId === "startseite" || seitenId === "leistungen"));
  graph.push(await person(sprache));
  graph.push({
    "@type": "WebSite",
    "@id": `${abs(pfad("startseite", sprache)!)}#website`,
    url: abs(pfad("startseite", sprache)!),
    name: site.praxisname_voll,
    inLanguage: sprache,
    publisher: { "@id": id("praxis") },
  });

  const bild = d.bild ? await bildUrl(d.bild) : undefined;
  const seite: Knoten = {
    "@type": typ === "leistung" || typ === "ratgeber" ? "MedicalWebPage" : SEITENTYP[seitenId] ?? "WebPage",
    "@id": `${url}#seite`,
    url,
    name: d.titel,
    headline: d.titel,
    description: d.beschreibung,
    inLanguage: sprache,
    isPartOf: { "@id": `${abs(pfad("startseite", sprache)!)}#website` },
    ...(bild ? { primaryImageOfPage: { "@type": "ImageObject", url: bild } } : {}),
  };
  const krumen = await brotkrumen(seitenId, sprache);
  if (krumen) seite.breadcrumb = { "@id": krumen["@id"] };

  if (typ === "leistung" || typ === "ratgeber") {
    seite.medicalAudience = { "@type": "MedicalAudience", audienceType: "Patient" };
    seite.reviewedBy = { "@id": id("dr-adali") };
    const geprueft = isoDatum(d.stand);
    if (geprueft) seite.lastReviewed = geprueft;
  }
  if (seitenId === "ueber-dr-adali") seite.mainEntity = { "@id": id("dr-adali") };
  if (seitenId === "kontakt" || seitenId === "startseite" || seitenId === "praxis-team") seite.about = { "@id": id("praxis") };

  if (typ === "leistung") {
    const leistung: Knoten = {
      "@type": "Service",
      "@id": `${url}#leistung`,
      name: d.titel,
      description: d.antwort ?? d.beschreibung,
      serviceType: d.titel,
      url,
      provider: { "@id": id("praxis") },
      areaServed: { "@type": "City", name: "Berlin" },
      ...(bild ? { image: bild } : {}),
    };
    graph.push(leistung);
    seite.about = { "@id": `${url}#leistung` };
  }

  if (typ === "ratgeber") {
    const datum = isoDatum(d.datum);
    graph.push({
      "@type": "Article",
      "@id": `${url}#artikel`,
      headline: d.titel.slice(0, 110),
      description: d.beschreibung,
      inLanguage: sprache,
      mainEntityOfPage: { "@id": `${url}#seite` },
      author: { "@id": id("dr-adali") },
      publisher: { "@id": id("praxis") },
      ...(bild ? { image: bild } : {}),
      ...(datum ? { datePublished: datum, dateModified: isoDatum(d.stand) ?? datum } : {}),
      ...(d.quellen.length ? { citation: d.quellen.map((q) => (q.url ? { "@type": "CreativeWork", name: q.titel, url: q.url } : q.titel)) } : {}),
    });
  }

  // Fragen und Antworten
  const fragen = [...d.faq, ...d.faq_gruppen.flatMap((g) => g.fragen)];
  if (fragen.length) {
    const fragenListe = fragen.map((f) => ({ "@type": "Question", name: ohneMarkdown(f.frage), acceptedAnswer: { "@type": "Answer", text: ohneMarkdown(f.antwort) } }));
    if (seitenId === "faq") seite.mainEntity = fragenListe;
    else graph.push({ "@type": "FAQPage", "@id": `${url}#fragen`, url, inLanguage: sprache, isPartOf: { "@id": `${url}#seite` }, mainEntity: fragenListe });
  }

  graph.push(seite);
  if (krumen) graph.push(krumen);

  // Publikationen nur auf der Über-Seite
  if (seitenId === "ueber-dr-adali") {
    for (const p of publikationen.filter((p) => p.doi)) {
      graph.push({ "@type": "ScholarlyArticle", name: p.titel, datePublished: String(p.jahr), author: { "@id": id("dr-adali") }, sameAs: `https://doi.org/${p.doi}` });
    }
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
