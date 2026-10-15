/**
 * Gliederung der Leistungsübersicht. Überschriften stehen in src/i18n (leistungen.gruppen.<schluessel>).
 * Abgeschaltete Leistungen (site.ts → leistungen) und fehlende Übersetzungen werden automatisch ausgelassen.
 */
export const leistungsgruppen: { schluessel: string; ids: string[] }[] = [
  { schluessel: "zahnersatz", ids: ["zahnersatz", "implantologie", "adhaesivbruecke", "implantat-alternativen", "labor-digital"] },
  { schluessel: "aesthetik_funktion", ids: ["aesthetik", "cmd-schienen"] },
  { schluessel: "kinder", ids: ["kinder-zahnersatz", "mih-syndrome"] },
  { schluessel: "zahnerhalt", ids: ["prophylaxe", "fuellungen", "endodontie", "parodontologie", "oralchirurgie"] },
];
