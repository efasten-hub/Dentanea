# Checkliste für Dr. Adali und das Praxisteam

Diese Liste zeigt, was vor dem Start der neuen Website noch fehlt. Bitte die Punkte abhaken (`[x]`) oder die Antwort direkt dahinter schreiben. Technische Änderungen übernimmt die Person, die die Website betreut. Fast alles wird an **einer** Stelle eingetragen: `src/config/site.ts`.

Den aktuellen Stand zeigt jederzeit der Befehl `npm run pruefen`. Er zählt alle offenen Markierungen:
- `[[PLATZHALTER]]`: Angabe fehlt
- `[[PRÜFEN]]`: Angabe steht da, ist aber nicht bestätigt

---

## 1. Praxisdaten bestätigen

- [ ] **Praxisname:** „Dentaviva – Zahnarztpraxis Dr. Adali“. Genau so überall verwenden: Website, Google, Doctolib, Jameda, Dr. Flex.
- [ ] **Name rechtlich prüfen lassen:** In Berlin-Mitte gibt es die Praxis „Denta Vita“ (Oranienburger Straße 37), ein Buchstabe Unterschied. Bitte vor dem Start von einer Anwältin oder einem Anwalt für Markenrecht prüfen lassen.
- [ ] **Domain:** Bleibt es bei zahnarzt-adali.de? Soll zusätzlich eine Dentaviva-Domain gesichert werden?
- [ ] **Ortsangabe:** Die Hausnummer liegt laut Stadtplan im Ortsteil **Prenzlauer Berg**, direkt an der Grenze zu Mitte. Was soll auf der Website stehen: „Berlin-Mitte“, „Prenzlauer Berg“ oder „an der Grenze von Mitte und Prenzlauer Berg“ (derzeitiger Vorschlag)?
- [ ] **Sprechzeiten von Dr. Adali:** Bitte die genauen Tage und Uhrzeiten nennen. Laut Doctolib sind freie Termine Mo, Di, Do und Fr, nie mittwochs. Die alte Website nennt Mo, Mi und Fr. Die Zeiten stehen im Doctolib-Kalender der Praxis (Doctolib Pro → Einstellungen → Öffnungszeiten).
- [ ] **Bus und Bahn:** U2 Senefelderplatz (ca. 4 Min.), U2 Rosa-Luxemburg-Platz (ca. 5 Min.), Tram M2 Prenzlauer Allee/Metzer Straße (ca. 8 Min.). Stimmen die Fußwege?
- [ ] **Eingang:** Aufgang A, links, 2. OG, mit Aufzug. Richtig?
- [ ] **Sprachen im Team:** Dr. Adali spricht Deutsch, Englisch, Spanisch und Türkisch. Welche Sprachen spricht das übrige Team?
- [ ] **Team:** Name des Zahntechnikermeisters; weitere Teammitglieder mit Rolle und Sprachen.
- [ ] **Rechtsform:** Einzelpraxis innerhalb einer Praxisgemeinschaft mit Dr. Kleinert? Gibt es eine USt-IdNr.?
- [ ] **Berufshaftpflicht:** Ist die Deutsche Ärzte Finanz noch der Versicherer?
- [ ] **Google-Unternehmensprofil:** Link zum Profil.
- [ ] **Werdegang:** Seit wann war Dr. Adali (leitender) Oberarzt an der Charité?
- [ ] **Seite „Für Zahnärzte“** (Überweiser): gewünscht? Wenn ja: Ablauf der Überweisung und Rückbericht beschreiben.

## 2. Doctolib-Profil prüfen

Das Profil heißt noch „Praxisgemeinschaft Dr. Adali / Dr. Kleinert“. Für Google und KI-Assistenten müssen Name, Adresse und Telefon überall **genau gleich** sein.

- [ ] Profilname an den neuen Praxisnamen anpassen (oder ein eigenes Profil für Dentaviva anlegen)
- [ ] Sprachen ergänzen: bisher nur Deutsch und Englisch. Spanisch und Türkisch eintragen.
- [ ] Parken: „Kostenlose Parkplätze in der Tiefgarage“ statt „in der Nähe“
- [ ] Profiltext: Das Wort „Spezialistenpraxis“ ist werberechtlich heikel (HWG/Berufsordnung). Bitte prüfen lassen.
- [ ] Eigene Fotos statt Stockbildern hochladen (Praxis, Team)
- [ ] Qualifikationen gleichlautend zur Website: „Spezialist für Prothetik (DGPro)“, „Zertifizierter Implantologe (DGI)“
- [ ] Terminarten prüfen: Welche Termine sollen online buchbar sein, welche nur telefonisch (z. B. Erstberatung Implantat, Zweitmeinung, Kinder mit Syndromen)?
- [ ] Link zurück zur neuen Website eintragen
- [ ] Gewünscht, dass Klicks auf „Online-Termin“ per UTM-Parameter gezählt werden? (Standard: nein)

## 3. Texte freigeben

- [ ] Alle medizinischen Texte auf Deutsch durch Dr. Adali freigeben. Das Prüfdatum wird bei jeder Leistungsseite angezeigt.
- [ ] Formulierungen mit `[[PRÜFEN HWG/BO]]` rechtlich prüfen lassen
- [ ] Impressum und Datenschutzerklärung juristisch prüfen lassen

## 4. Übersetzungen prüfen lassen

Jede Übersetzung muss eine **muttersprachliche Person mit zahnmedizinischem Verständnis** prüfen. Das gilt besonders für Leistungs- und Kostentexte. Auch Übersetzungen unterliegen dem Heilmittelwerbegesetz und der Berufsordnung.

So geht es: Seite lesen, Korrekturen notieren, danach in der Datei `uebersetzung_geprueft: true` setzen. Die folgende Liste aktualisiert sich mit `npm run pruefen -- --schreiben`.

<!-- AUTO:UEBERSETZUNGEN:START -->

_Automatisch erzeugt mit `npm run pruefen -- --schreiben` am 2026-10-11._

**English** – zu prüfen: 2

- [ ] kontakt → `/en/appointment-contact/`
- [ ] startseite → `/en/`

- fuer-zahnaerzte (noch nicht veröffentlicht)

**Español** – zu prüfen: 2

- [ ] kontakt → `/es/cita-contacto/`
- [ ] startseite → `/es/`

**Türkçe** – zu prüfen: 2

- [ ] kontakt → `/tr/randevu-iletisim/`
- [ ] startseite → `/tr/`

<!-- AUTO:UEBERSETZUNGEN:ENDE -->

Zusätzlich zu prüfen: die Oberflächentexte `src/i18n/en.json`, `es.json` und `tr.json` (Buttons, Formulare, Hinweise).

## 5. Fotos

### Bilder der alten Website
- [ ] **Porträt Dr. Adali:** Wer hat es fotografiert? Darf es auf der Website verwendet werden (Nutzungsrecht des Fotografen)?
- [ ] **Klinische Fotos** (Zähne von Patientinnen und Patienten, auch von einem Kind): Liegen schriftliche Einwilligungen vor? Ohne Einwilligung werden sie nicht verwendet.
- Die übrigen Bilder der alten Seite waren Stockfotos ohne nachweisbare Lizenz und werden ersetzt.

### Stockfotos, die durch eigene Fotos ersetzt werden sollen
Diese Liste füllt sich in Phase 3 aus dem Bildmanifest (`src/assets/fotos/bilder.json`, Feld `ersetzen_durch_eigenes`).

<!-- AUTO:STOCKFOTOS:START -->

- noch keine Stockfotos eingebaut

<!-- AUTO:STOCKFOTOS:ENDE -->

### Shotliste für das Fotoshooting
Natürliches, warmes Licht, ruhig, aufgeräumt, Querformat. Keine Patientinnen oder Patienten ohne schriftliche Einwilligung.

- [ ] Dr. Adali im Gespräch mit einem Patienten (Einwilligung!)
- [ ] Dr. Adali bei der Planung am Bildschirm (3D-Implantatplanung, keine lesbaren Patientendaten)
- [ ] Der Zahntechnikermeister im eigenen Labor
- [ ] Intraoralscanner und CAD/CAM im Einsatz
- [ ] Empfang und Wartebereich
- [ ] Behandlungszimmer
- [ ] Hauseingang mit Aufgang A, damit Patienten die Praxis finden
- [ ] Team-Gruppenfoto und Einzelporträts
- [ ] Neues Porträt von Dr. Adali im warmen Licht, passend zur Website (das heutige stammt von 2018)

## 6. Logo

- [ ] Bis jetzt gibt es einen **Platzhalter** (Buchstabe „D“ in Oxblood). Das endgültige Logo sollte einfarbig in Oxblood (#4a0a05) und auf Cream (#fafaf9) funktionieren, ohne Verlauf.
