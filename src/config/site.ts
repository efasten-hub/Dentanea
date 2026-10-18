/**
 * ============================================================================
 *  ZENTRALE PRAXISDATEN – Dentaviva · Zahnarztpraxis Dr. Adali
 * ============================================================================
 *
 *  Alle sprachunabhängigen Angaben der Praxis stehen NUR hier.
 *  Header, Footer, Kontaktseite, Impressum, Schema.org (JSON-LD) und llms.txt
 *  lesen ihre Daten aus dieser Datei. Bitte nichts davon im Seitentext
 *  wiederholen – sonst laufen Angaben auseinander.
 *
 *  Texte in den vier Website-Sprachen stehen NICHT hier, sondern in
 *  src/i18n/{de,en,es,tr}.json (Oberfläche) und src/content/… (Seiteninhalte).
 *
 *  Markierungen:
 *    [[PLATZHALTER]] – Angabe fehlt noch, bitte ausfüllen
 *    [[PRÜFEN]]      – Angabe ist vorhanden, aber nicht bestätigt
 *  Das Prüfskript (npm run pruefen) listet alle Markierungen auf.
 *
 *  Quellen der Vorbefüllung: alte Website zahnarzt-adali.de, Doctolib-Profil,
 *  Angaben der Praxis (siehe docs/bestandsaufnahme.md).
 * ============================================================================
 */

export type Sprache = "de" | "en" | "es" | "tr";
export type Wochentag = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export const site = {
  // --------------------------------------------------------------------------
  // Praxis
  // --------------------------------------------------------------------------
  /** Markenname – wird in keiner Sprache übersetzt. */
  praxisname: "Dentaviva",
  /** Zusatz, der den Namen eindeutig macht (siehe docs/bestandsaufnahme.md, Abschnitt 10). */
  praxiszusatz: "Zahnarztpraxis Dr. Adali",
  /** Vollständiger Name für Google-Profil, Doctolib, Verzeichnisse und Schema.org – überall identisch (NAP). */
  praxisname_voll: "Dentaviva – Zahnarztpraxis Dr. Adali", // [[PRÜFEN: genaue Schreibweise auch bei Google/Doctolib übernehmen]]
  /** Website-Adresse ohne Schrägstrich am Ende. */
  domain: "https://zahnarzt-adali.de", // [[PRÜFEN: bleibt die Domain trotz neuem Namen?]]
  /** Eigene Praxis seit (Angabe der Praxis, 06.10.2026). */
  praxis_seit: 2025,

  inhaber: {
    name: "Dr. Ufuk Adali",
    titel: "Dr. med. dent.", // laut Impressum der alten Website
    name_voll: "Dr. med. dent. Ufuk Adali",
    /** Gesetzliche Berufsbezeichnung (Impressumspflicht). */
    berufsbezeichnung: "Zahnarzt",
    berufsbezeichnung_staat: "Bundesrepublik Deutschland",
  },

  // --------------------------------------------------------------------------
  // Adresse und Anfahrt
  // --------------------------------------------------------------------------
  adresse: {
    strasse: "Schönhauser Allee 10–11",
    plz: "10119",
    ort: "Berlin",
    /**
     * Laut OpenStreetMap liegt Schönhauser Allee 10 im Ortsteil Prenzlauer Berg (Kollwitzkiez,
     * Bezirk Pankow), direkt an der Grenze zu Mitte; die PLZ 10119 umfasst beide.
     * Die bisherige Website spricht von „Berlin-Mitte“.
     */
    ortsteil: "Prenzlauer Berg", // [[PRÜFEN: Ortsangabe „Berlin-Mitte“ oder „Prenzlauer Berg“ in Titeln und Texten?]]
    ortsteil_nachbar: "Mitte",
    land: "DE",
    /** Wegbeschreibung im Haus (wird übersetzt über i18n-Schlüssel „anfahrt.aufgang“). */
    aufgang: "Aufgang A, links, 2. OG",
    aufzug: true, // laut Doctolib-Profil „2. Stockwerk mit Aufzug“
  },
  /** Koordinaten für Schema.org und Karte. */
  geo: { lat: 52.53033, lng: 13.41156 }, // OpenStreetMap/Nominatim, Hausnummer 10 [[PRÜFEN: Eingang Aufgang A]]
  parken: "Kostenlose Parkplätze in der Tiefgarage", // Angabe der Praxis
  oepnv: [
    // Entfernungen aus OpenStreetMap (Luftlinie), Fußwege geschätzt [[PRÜFEN: vor Ort bestätigen]]
    { linie: "U2", haltestelle: "Senefelderplatz", fussweg_min: 4 },
    { linie: "U2", haltestelle: "Rosa-Luxemburg-Platz", fussweg_min: 5 },
    { linie: "Tram M2", haltestelle: "Prenzlauer Allee/Metzer Straße", fussweg_min: 8 },
  ],

  // --------------------------------------------------------------------------
  // Kontakt
  // --------------------------------------------------------------------------
  telefon: "+49304426843",
  telefon_anzeige: "030 44 26 84 3",
  fax: "+49304405406",
  fax_anzeige: "030 44 05 40 60",
  email: "kontakt@zahnarzt-adali.de",

  // --------------------------------------------------------------------------
  // Sprechzeiten
  // --------------------------------------------------------------------------
  sprechzeiten: {
    /**
     * Für Schema.org (openingHoursSpecification) und die Tabelle auf der Website.
     * Quelle: Doctolib-Öffnungszeiten der Praxisgemeinschaft. Freie Termine von
     * Dr. Adali gab es in der Stichprobe nur Mo, Di, Do, Fr (siehe Bestandsaufnahme).
     */
    // [[PRÜFEN: verbindliche Sprechzeiten von Dr. Adali – Mittwoch ja/nein?]]
    zeiten: [
      { tage: ["Monday"] as Wochentag[], von: "09:00", bis: "19:30" },
      { tage: ["Tuesday"] as Wochentag[], von: "12:00", bis: "19:30" },
      { tage: ["Wednesday"] as Wochentag[], von: "10:00", bis: "19:30" },
      { tage: ["Thursday"] as Wochentag[], von: "09:00", bis: "19:30" },
      { tage: ["Friday"] as Wochentag[], von: "09:00", bis: "16:00" },
    ],
    nach_vereinbarung: true,
    /** „Terminvereinbarung täglich telefonisch oder online möglich“ – Text in i18n. */
    terminvereinbarung_taeglich: true,
  },

  // --------------------------------------------------------------------------
  // Online-Terminbuchung
  // --------------------------------------------------------------------------
  terminbuchung: {
    /** false → überall automatisch Telefon + Anfrageformular statt Online-Buchung. */
    aktiv: true,
    anbieter: "doctolib",
    anbieter_name: "Doctolib",
    profil_url: "https://www.doctolib.de/zahnarztpraxis/berlin/zahnarztpraxis-dr-adali",
    /**
     * "link"   (Standard): eigener Button, Link auf profil_url, beim Laden KEINE Requests an Doctolib.
     * "widget" (optional): Doctolib-Widget lädt erst nach aktivem Klick (Zwei-Klick-Lösung).
     */
    modus: "link" as "link" | "widget",
    /** Nur für modus "widget": Einbettungscode von Doctolib (iFrame oder Script). */
    widget_embed: "[[DOCTOLIB-EMBED]]",
    /**
     * Doctolib-Oberfläche je Website-Sprache. Getestet am 08.10.2026:
     * ?locale=en liefert die englische Oberfläche, es/tr fallen auf Deutsch zurück.
     * Sprachen ohne Eintrag bekommen einen Hinweis neben dem Button.
     */
    sprach_parameter: { en: "locale=en" } as Partial<Record<Sprache, string>>,
    /**
     * UTM-Parameter nur nach ausdrücklicher Freigabe. Leer = keine.
     * Beispiel: "utm_source=website&utm_medium=referral&utm_campaign=online-termin"
     */
    utm: "", // [[PRÜFEN: Tracking per UTM gewünscht?]]
    /** Bei Doctolib frei buchbare Terminarten (Stand 08.10.2026, Agenda Dr. Adali). */
    terminarten_online: [
      "Erstuntersuchung Neupatient:in (auch mit PZR)",
      "Halbjährliche Kontrolluntersuchung",
      "Kinder – erste Zahnuntersuchung / Kontrolle",
      "Akute Beschwerden / Notfall",
      "Beratung Implantat",
      "Beratung Zahnersatz",
      "Beratung Schnarchschiene",
      "Beratung Ästhetik, Aligner, Bleaching",
      "Professionelle Zahnreinigung (PZR)",
    ],
  },

  // --------------------------------------------------------------------------
  // Website-Sprachen
  // --------------------------------------------------------------------------
  sprachen: {
    standard: "de" as Sprache,
    /** Einzelne Sprachen lassen sich hier abschalten. Deutsch muss immer aktiv sein. */
    aktiv: ["de", "en", "es", "tr"] as Sprache[],
    bezeichnungen: { de: "Deutsch", en: "English", es: "Español", tr: "Türkçe" } as Record<Sprache, string>,
    /** Open-Graph-Locales */
    og_locale: { de: "de_DE", en: "en_GB", es: "es_ES", tr: "tr_TR" } as Record<Sprache, string>,
  },

  /**
   * Sprachen, in denen behandelt und beraten wird.
   * Steuert: Hinweise auf Kontakt- und Teamseite, Schema.org knowsLanguage,
   * den Hinweis „Unser Team betreut Sie auf …“ in Website-Sprachen ohne Behandlungssprache.
   */
  gesprochene_sprachen: {
    dr_adali: ["de", "en", "es", "tr"] as Sprache[], // Angabe der Praxis, 06.10.2026
    team: ["de", "en"] as Sprache[], // [[PRÜFEN: Sprachen des Praxisteams]]
  },

  // --------------------------------------------------------------------------
  // Versicherung und Abrechnung
  // --------------------------------------------------------------------------
  kassen_und_privat: {
    gesetzlich: true,
    privat: true,
    selbstzahler: true,
    // Laut Doctolib: „Gesetzlich und privat Versicherte sowie Selbstzahlende“. Text in i18n.
  },

  // --------------------------------------------------------------------------
  // Rechtliches (Impressum)
  // --------------------------------------------------------------------------
  recht: {
    rechtsform: "Einzelpraxis", // [[PRÜFEN: Einzelpraxis innerhalb einer Praxisgemeinschaft?]]
    ust_id: "", // leer = keine USt-IdNr. (zahnärztliche Heilbehandlung ist umsatzsteuerfrei) [[PRÜFEN]]
    kammer: {
      name: "Zahnärztekammer Berlin",
      adresse: "Stallstraße 1, 10585 Berlin",
      url: "https://www.zaek-berlin.de",
    },
    kzv: {
      name: "Kassenzahnärztliche Vereinigung Berlin (KZV Berlin)",
      adresse: "Georg-Wilhelm-Straße 16, 10711 Berlin",
      url: "https://www.kzv-berlin.de",
    },
    berufsrecht: [
      { name: "Gesetz über die Ausübung der Zahnheilkunde (ZHG)", url: "https://www.gesetze-im-internet.de/zhg/" },
      { name: "Berliner Heilberufekammergesetz", url: "https://gesetze.berlin.de/" },
      { name: "Berufsordnung der Zahnärztekammer Berlin", url: "https://www.zaek-berlin.de" },
      { name: "Gebührenordnung für Zahnärzte (GOZ)", url: "https://www.gesetze-im-internet.de/goz_1987/" },
    ],
    berufshaftpflicht: {
      name: "Deutsche Ärzte Finanz",
      adresse: "Colonia-Allee 10–20, 51067 Köln",
      geltungsbereich: "Bundesrepublik Deutschland",
    }, // [[PRÜFEN: Versicherer noch aktuell?]]
    verantwortlich_inhalt: "Dr. med. dent. Ufuk Adali",
    hosting: {
      name: "Hetzner Online GmbH",
      adresse: "Industriestr. 25, 91710 Gunzenhausen",
    },
  },

  // --------------------------------------------------------------------------
  // Online-Profile (für Footer und Schema.org sameAs)
  // --------------------------------------------------------------------------
  online: {
    google_business_profile_url: "[[PLATZHALTER: Link zum Google-Unternehmensprofil]]",
    social: [] as { name: string; url: string }[],
    weitere_profile: [
      { name: "Doctolib", url: "https://www.doctolib.de/zahnarztpraxis/berlin/zahnarztpraxis-dr-adali" },
      { name: "ORCID (Dr. Adali)", url: "https://orcid.org/0000-0001-6557-2841" },
      { name: "DGPro-Mitgliedsprofil", url: "https://www.dgpro.de/mitglieder/12751" },
    ],
  },

  // --------------------------------------------------------------------------
  // Qualifikationen und Mitgliedschaften (Namen der Gesellschaften NICHT übersetzen)
  // --------------------------------------------------------------------------
  qualifikationen: [
    {
      kuerzel: "DGPro",
      titel: "Spezialist für Prothetik",
      gesellschaft: "Deutsche Gesellschaft für Prothetische Zahnmedizin und Biomaterialien",
      url: "https://www.dgpro.de",
    },
    {
      kuerzel: "DGI",
      titel: "Zertifizierter Implantologe",
      gesellschaft: "Deutsche Gesellschaft für Implantologie",
      url: "https://www.dginet.de",
    },
  ],
  mitgliedschaften: [
    { kuerzel: "DGPro", name: "Deutsche Gesellschaft für Prothetische Zahnmedizin und Biomaterialien", url: "https://www.dgpro.de" },
    { kuerzel: "DGI", name: "Deutsche Gesellschaft für Implantologie", url: "https://www.dginet.de" },
    { kuerzel: "APW", name: "Akademie Praxis und Wissenschaft (APW) der DGZMK", url: "https://www.apw.de" },
  ],
  auszeichnungen: [
    { jahr: 2020, name: "Praktikerpreis der Deutschen Gesellschaft für Kinderzahnmedizin (DGKiZ)" },
  ],
  werdegang: [
    { von: 2011, bis: 2011, text: "Staatsexamen Zahnmedizin, Charité – Universitätsmedizin Berlin" },
    {
      von: null, // [[PRÜFEN: Beginn der Tätigkeit als (leitender) Oberarzt]]
      bis: 2026,
      text: "Leitender Oberarzt, Abteilung für Zahnärztliche Prothetik, Alterszahnmedizin und Funktionslehre, Charité – Universitätsmedizin Berlin",
    },
    { von: 2026, bis: null, text: "Gastwissenschaftler, Abteilung für Zahnärztliche Prothetik, Alterszahnmedizin und Funktionslehre, Charité" },
    { von: 2021, bis: 2026, text: "Gewähltes Vorstandsmitglied der Zahnärztekammer Berlin, Referat „Aus- und Fortbildung Zahnmedizinische Fachangestellte“" },
    { von: 2026, bis: null, text: "Gewähltes Vorstandsmitglied der Zahnärztekammer Berlin, Referat „Fort- und Weiterbildung Zahnärztinnen und Zahnärzte“" },
    { von: 2025, bis: null, text: "Eigene Praxis in Berlin-Mitte (Dentaviva)" },
  ],
  orcid: "0000-0001-6557-2841",

  // --------------------------------------------------------------------------
  // Leistungen – einzeln an-/abschaltbar. Die Schlüssel entsprechen den Seiten-IDs
  // in src/i18n/routen.ts; abgeschaltete Leistungen erscheinen nirgends.
  // --------------------------------------------------------------------------
  leistungen: {
    "zahnersatz": true,
    "implantologie": true,
    "adhaesivbruecke": true,
    "implantat-alternativen": true,
    "aesthetik": true,
    "cmd-schienen": true,
    "endodontie": true,
    "parodontologie": true,
    "fuellungen": true,
    "prophylaxe": true,
    "oralchirurgie": true,
    "kinder-zahnersatz": true,
    "mih-syndrome": true,
    "labor-digital": true,
  } as Record<string, boolean>,

  // --------------------------------------------------------------------------
  // Team – Fotos: Dateiname in src/assets/fotos/ oder null (→ Fläche „FOTO FOLGT“, nie Stock)
  // --------------------------------------------------------------------------
  team: [
    {
      name: "Dr. Ufuk Adali",
      rolle: "zahnarzt_inhaber", // Rollen-Schlüssel, übersetzt in i18n „team.rollen“
      foto: "dr-ufuk-adali-portraet.jpg",
      sprachen: ["de", "en", "es", "tr"] as Sprache[],
    },
    {
      name: "[[PLATZHALTER: Name]]",
      rolle: "zahntechnikermeister",
      foto: null,
      sprachen: ["de"] as Sprache[], // [[PRÜFEN]]
    },
  ],

  /** Echte Bewertungen (mit Quelle). AggregateRating erscheint erst, wenn hier Einträge stehen. */
  bewertungen: [] as { quelle: string; sterne: number; text: string; datum: string; sprache: Sprache }[],

  // --------------------------------------------------------------------------
  // Schalter
  // --------------------------------------------------------------------------
  schalter: {
    /** Seite für überweisende Zahnärzte (/fuer-zahnaerzte). */
    fuer_zahnaerzte: true, // [[PRÜFEN: gewünscht?]]
    /** Vorher/Nachher-Komponente – nur nach rechtlicher Prüfung (HWG § 11, Berufsordnung). */
    vorher_nachher: false,
    /**
     * Cookiefreie Statistik (Plausible oder Umami) – standardmäßig AUS.
     * Einschalten nur nach Ergänzung der Datenschutzerklärung. Beispiel Plausible:
     *   { aktiv: true, anbieter: "plausible", domain: "zahnarzt-adali.de", website_id: "",
     *     script_url: "https://plausible.io/js/script.js" }
     * Umami: anbieter "umami", website_id aus dem Umami-Konto, script_url des Umami-Servers.
     * Die Content-Security-Policy in .htaccess passt sich beim Build automatisch an.
     */
    analytics: { aktiv: false, anbieter: "plausible" as "plausible" | "umami", domain: "", website_id: "", script_url: "" },
    /** Dezenter Hinweis „Diese Seite gibt es auch auf …“ anhand der Browsersprache (ohne Cookie). */
    browsersprache_hinweis: true,
  },
} as const;

export type Site = typeof site;
