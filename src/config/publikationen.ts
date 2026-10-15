/**
 * Wissenschaftliche Publikationen und Vorträge von Dr. Adali.
 * Quelle: alte Website „Über Dr. Adali“ (Stand 02.06.2026), ORCID 0000-0001-6557-2841.
 * Zitate bleiben in der Originalsprache (Englisch/Deutsch) und werden nicht übersetzt.
 * Neue Einträge oben anfügen.
 */
export interface Publikation {
  jahr: number;
  autoren: string;
  titel: string;
  quelle: string;
  doi?: string;
  zusatz?: string;
}

export const publikationen: Publikation[] = [
  { jahr: 2025, autoren: "Hupe VM, Beuer F, Sterzenbach G, Adali U", titel: "Comparison of marginal and internal fit of 10-unit fixed dental prostheses fabricated from cobalt chromium alloys or zirconia ceramics using digital workflows.", quelle: "J Prosthet Dent. 2025;134(3):761.e1–761.e8", doi: "10.1016/j.prosdent.2025.05.008" },
  { jahr: 2025, autoren: "Adali U, Kesler F, Yassine J, Schmidt F, Böse MWH, Zhu H, Sun C, Yang C, Li D, Nicic R, Soetebeer M, Sterzenbach G, Schwitalla AD", titel: "Bending moments of PEEK-based root analog implants (RAIs).", quelle: "J Biomech. 2025;184:112677", doi: "10.1016/j.jbiomech.2025.112677" },
  { jahr: 2025, autoren: "Sözen Yanık İ, Adalı U, Yassine J, Schmidt F, Hannak W, Ersu B", titel: "Novel nonmagnetic abutment designs for facial prostheses: an experimental study.", quelle: "Turk J Med Sci. 2025;55(1):152–160", doi: "10.55730/1300-0144.5953" },
  { jahr: 2024, autoren: "Adali U, Sütel M, Yassine J, Mao Z, Müller W-D, Schwitalla AD", titel: "Influence of sandblasting and bonding on the shear bond strength between differently pigmented PEEK and veneering composite after artificial aging.", quelle: "Dent Mater. 2024;40(8):1123–1127", doi: "10.1016/j.dental.2024.05.025" },
  { jahr: 2024, autoren: "Adali U", titel: "Kinder(zahn)medizin – Kompaktwissen für Pädiaterinnen.", quelle: "In: Fegeler U, Rodens K, Weiß-Becker C (Hrsg.). Praxishandbuch der pädiatrischen Grundversorgung. 3. Aufl. München: Elsevier; 2024. Kap. 4.1.7", zusatz: "ISBN 978-3-437-21154-6" },
  { jahr: 2023, autoren: "Naumann M, Adali U, Rosentritt M, Happe A, Frankenberger R, Sterzenbach G", titel: "Effect of apical root resection, orthodontic extrusion, and surgical crown lengthening on load capability.", quelle: "Clin Oral Investig. 2023;27(8):4379–4387", doi: "10.1007/s00784-023-05057-4" },
  { jahr: 2023, autoren: "Prause E, Hey J, Sterzenbach G, Beuer F, Adali U", titel: "Survival and success of veneered zirconia crowns: A 10-year follow-up study.", quelle: "Int J Comput Dent. 2023;26(3):247–255", doi: "10.3290/j.ijcd.b3796761" },
  { jahr: 2022, autoren: "Peroz S, Spies BC, Adali U, Beuer F, Wesemann C", titel: "Measured accuracy of intraoral scanners is highly dependent on methodical factors.", quelle: "J Prosthodont Res. 2022;66(2):318–325", doi: "10.2186/jpr.JPR_D_21_00023" },
  { jahr: 2022, autoren: "Adali U", titel: "The prosthetic superstructure as a risk factor for peri-implantitis.", quelle: "DZZ International. 2022" },
  { jahr: 2021, autoren: "Wesemann C, Spies BC, Schaefer D, Adali U, Beuer F, Pieralli S", titel: "Accuracy and its impact on fit of injection molded, milled and additively manufactured occlusal splints.", quelle: "J Mech Behav Biomed Mater. 2021;114:104179", doi: "10.1016/j.jmbbm.2020.104179" },
  { jahr: 2021, autoren: "Wemken G, Burkhardt F, Spies BC, Kleinvogel L, Adali U, Sterzenbach G, Beuer F, Wesemann C", titel: "Bond strength of conventional, subtractive, and additive manufactured denture bases to soft and hard relining materials.", quelle: "Dent Mater. 2021;37(5):928–938", doi: "10.1016/j.dental.2021.02.018" },
  { jahr: 2021, autoren: "Adali U, Peroz S, Schweyen R, Hey J", titel: "Replica denture technique: improvements through the use of CAD/CAM technology.", quelle: "Int J Comput Dent. 2021;24(4):439–448", zusatz: "PMID 34931779" },
  { jahr: 2020, autoren: "Wemken G, Spies BC, Pieralli S, Adali U, Beuer F, Wesemann C", titel: "Do hydrothermal aging and microwave sterilization affect the trueness of milled, additive manufactured and injection molded denture bases?", quelle: "J Mech Behav Biomed Mater. 2020;111:103975", doi: "10.1016/j.jmbbm.2020.103975" },
  { jahr: 2019, autoren: "Wachtel A, Zimmermann T, Sütel M, Adali U, Abou-Emara M, Müller W-D, Mühlemann S, Schwitalla AD", titel: "Bacterial leakage and bending moments of screw-retained, composite-veneered PEEK implant crowns.", quelle: "J Mech Behav Biomed Mater. 2019;91:32–37", doi: "10.1016/j.jmbbm.2018.11.027" },
  { jahr: 2018, autoren: "Adali U, Schober S, Beuer F, Spies B", titel: "Digital Impression-Taking Facilitates Prosthetic Rehabilitation of Microstomia Patients: A Case History Report.", quelle: "Int J Prosthodont. 2018;32(1):110–112", doi: "10.11607/ijp.5995" },
];

/** Redaktionelle Beiträge (nicht peer-reviewt) – Auswahl */
export const beitraege: Publikation[] = [
  { jahr: 2017, autoren: "Adali U (Journal Club)", titel: "Drehmomentschlüssel im Test.", quelle: "Zahnmedizin up2date. 2017;11(02):115", doi: "10.1055/s-0043-104748" },
  { jahr: 2016, autoren: "Adali U (Journal Club)", titel: "Bruchfestigkeit von trepanierten Lithiumdisilikat-Kronen.", quelle: "Zahnmedizin up2date. 2016;10(04):297", doi: "10.1055/s-0036-1585146" },
];

/** Vorträge, Lehre und Fortbildungen (Auswahl) – Namen nicht übersetzen */
export const vortraege: string[] = [
  "Charité – Universitätsmedizin Berlin",
  "Nobel Biocare",
  "bredent",
  "Philipp-Pfaff-Institut – Fortbildungszentrum der Zahnärztekammer Berlin",
  "APW – Akademie Praxis und Wissenschaft der DGZMK",
];
