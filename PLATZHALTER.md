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
- [ ] Formulierungen mit `[[PRÜFEN HWG/BO]]` rechtlich prüfen lassen. Besonders:
  - Leitgedanke „Zahnmedizin auf universitärem Niveau“ (Startseite, alle Sprachen)
  - „Feste Zähne an einem Tag“ / Sofortversorgung (Ratgeber und Seite Implantate)
  - Darstellung der Titel „Spezialist für Prothetik (DGPro)“ und „Zertifizierter Implantologe (DGI)“ samt Erklärung der Vergabekriterien (Seite Über Dr. Adali)
- [ ] **Kernsatz freigeben** (Kurzbeschreibung der Praxis in allen vier Sprachen, `src/i18n/*.json` → `geo.kernsatz`). Er steht wortgleich im Footer, auf „Über Dr. Adali“ und in den `llms.txt`-Dateien – diese Fassung übernehmen KI-Assistenten am ehesten.
- [ ] Preise eintragen: Alle Stellen mit `[[PREIS]]` sind Orientierungswerte für den Eigenanteil. Bitte realistische Spannen nennen oder den Satz streichen.
- [ ] Prüfdatum eintragen: `[[DATUM]]` bei jeder Leistungs- und Ratgeberseite (Feld `stand`) nach der Freigabe durch Dr. Adali
- [ ] Fachliche Einzelfragen (alle als `[[PRÜFEN: …]]` markiert): DVT vorhanden? Sedierung angeboten? Leistungsumfang des Labors, Regelversorgung Adhäsivbrücke, Kassenleistung Schnarchschiene, Abgrenzung Kasse/privat bei der Wurzelbehandlung, Ratenzahlung, KIM-Adresse für Überweiser
- [ ] Impressum und Datenschutzerklärung juristisch prüfen lassen (u. a. Datenschutzbeauftragte/r, Speicherdauer der Server-Logs, AV-Vertrag Doctolib, externe Abrechnungsstelle, Schlichtungsstelle)
- [ ] Anfrageformular: Einwilligungstext und Pflicht-Checkbox rechtlich bestätigen lassen

## 3a. Anfrageformular einrichten

- [ ] Auf dem Hetzner-Webhosting ein Postfach für den Versand anlegen (z. B. website@zahnarzt-adali.de)
- [ ] `server/anfrage-konfiguration.beispiel.php` als `anfrage-konfiguration.php` eine Ebene über dem Web-Verzeichnis ablegen und Passwort eintragen (nie ins Git)
- [ ] Testanfrage in allen vier Sprachen senden und Eingang prüfen

## 4. Übersetzungen prüfen lassen

Jede Übersetzung muss eine **muttersprachliche Person mit zahnmedizinischem Verständnis** prüfen. Das gilt besonders für Leistungs- und Kostentexte. Auch Übersetzungen unterliegen dem Heilmittelwerbegesetz und der Berufsordnung.

So geht es: Seite lesen, Korrekturen notieren, danach in der Datei `uebersetzung_geprueft: true` setzen. Die folgende Liste aktualisiert sich mit `npm run pruefen -- --schreiben`.

<!-- AUTO:UEBERSETZUNGEN:START -->

_Automatisch erzeugt mit `npm run pruefen -- --schreiben` am 2026-10-15._

**English** – zu prüfen: 32

- [ ] adhaesivbruecke → `/en/services/resin-bonded-bridge/`
- [ ] aesthetik → `/en/services/cosmetic-dentistry/`
- [ ] anfrage-gesendet → `/en/request-sent/`
- [ ] barrierefreiheit → `/en/accessibility/`
- [ ] cmd-schienen → `/en/services/tmd-splint-therapy/`
- [ ] datenschutz → `/en/privacy-policy/`
- [ ] deutsches-system → `/en/guide/dentist-berlin-german-system/`
- [ ] endodontie → `/en/services/root-canal-treatment/`
- [ ] faq → `/en/faq/`
- [ ] fuellungen → `/en/services/tooth-coloured-fillings/`
- [ ] fuer-zahnaerzte → `/en/for-dentists/`
- [ ] implantat-alternativen → `/en/services/implant-alternatives/`
- [ ] implantat-oder-klebebruecke → `/en/guide/implant-or-resin-bonded-bridge/`
- [ ] implantologie → `/en/services/dental-implants/`
- [ ] impressum → `/en/legal-notice/`
- [ ] kinder-zahnersatz → `/en/services/dental-prosthetics-children/`
- [ ] knirschen-schiene → `/en/guide/teeth-grinding-splint/`
- [ ] kontakt → `/en/appointment-contact/`
- [ ] kosten-zahnersatz → `/en/guide/cost-of-dental-prosthetics/`
- [ ] labor-digital → `/en/services/in-house-dental-lab/`
- [ ] leistungen → `/en/services/`
- [ ] mih-kinder → `/en/guide/mih-chalky-teeth-children/`
- [ ] mih-syndrome → `/en/services/mih-chalky-teeth-rare-conditions/`
- [ ] oralchirurgie → `/en/services/oral-surgery/`
- [ ] parodontologie → `/en/services/gum-disease-treatment/`
- [ ] praxis-team → `/en/practice-team/`
- [ ] prophylaxe → `/en/services/professional-teeth-cleaning/`
- [ ] ratgeber → `/en/guide/`
- [ ] sofortimplantate → `/en/guide/teeth-in-a-day/`
- [ ] startseite → `/en/`
- [ ] ueber-dr-adali → `/en/about-dr-adali/`
- [ ] zahnersatz → `/en/services/crowns-bridges-dentures/`

**Español** – zu prüfen: 25

- [ ] adhaesivbruecke → `/es/tratamientos/puente-adhesivo/`
- [ ] aesthetik → `/es/tratamientos/estetica-dental/`
- [ ] anfrage-gesendet → `/es/solicitud-enviada/`
- [ ] cmd-schienen → `/es/tratamientos/disfuncion-atm-ferulas/`
- [ ] datenschutz → `/es/politica-de-privacidad/`
- [ ] deutsches-system → `/es/guia/dentista-berlin-sistema-aleman/`
- [ ] endodontie → `/es/tratamientos/endodoncia/`
- [ ] faq → `/es/preguntas-frecuentes/`
- [ ] fuellungen → `/es/tratamientos/empastes-esteticos/`
- [ ] implantat-alternativen → `/es/tratamientos/alternativas-al-implante/`
- [ ] implantologie → `/es/tratamientos/implantes-dentales/`
- [ ] impressum → `/es/aviso-legal/`
- [ ] kinder-zahnersatz → `/es/tratamientos/protesis-dental-infantil/`
- [ ] kontakt → `/es/cita-contacto/`
- [ ] labor-digital → `/es/tratamientos/laboratorio-dental-propio/`
- [ ] leistungen → `/es/tratamientos/`
- [ ] mih-syndrome → `/es/tratamientos/mih-dientes-de-tiza/`
- [ ] oralchirurgie → `/es/tratamientos/cirugia-oral/`
- [ ] parodontologie → `/es/tratamientos/periodoncia/`
- [ ] praxis-team → `/es/clinica-equipo/`
- [ ] prophylaxe → `/es/tratamientos/limpieza-dental-profesional/`
- [ ] ratgeber → `/es/guia/`
- [ ] startseite → `/es/`
- [ ] ueber-dr-adali → `/es/sobre-el-dr-adali/`
- [ ] zahnersatz → `/es/tratamientos/protesis-dentales/`

**Türkçe** – zu prüfen: 25

- [ ] adhaesivbruecke → `/tr/tedaviler/yapiskan-kopru/`
- [ ] aesthetik → `/tr/tedaviler/estetik-dis-hekimligi/`
- [ ] anfrage-gesendet → `/tr/talep-gonderildi/`
- [ ] cmd-schienen → `/tr/tedaviler/cmd-gece-plagi/`
- [ ] datenschutz → `/tr/gizlilik-politikasi/`
- [ ] deutsches-system → `/tr/rehber/berlinde-dis-hekimi-alman-sistemi/`
- [ ] endodontie → `/tr/tedaviler/kanal-tedavisi/`
- [ ] faq → `/tr/sss/`
- [ ] fuellungen → `/tr/tedaviler/beyaz-dolgu/`
- [ ] implantat-alternativen → `/tr/tedaviler/implant-alternatifleri/`
- [ ] implantologie → `/tr/tedaviler/implant/`
- [ ] impressum → `/tr/kunye/`
- [ ] kinder-zahnersatz → `/tr/tedaviler/cocuklarda-protez/`
- [ ] kontakt → `/tr/randevu-iletisim/`
- [ ] labor-digital → `/tr/tedaviler/dis-laboratuvari/`
- [ ] leistungen → `/tr/tedaviler/`
- [ ] mih-syndrome → `/tr/tedaviler/mih-tebesir-dis/`
- [ ] oralchirurgie → `/tr/tedaviler/agiz-cerrahisi/`
- [ ] parodontologie → `/tr/tedaviler/dis-eti-tedavisi/`
- [ ] praxis-team → `/tr/klinik-ekip/`
- [ ] prophylaxe → `/tr/tedaviler/profesyonel-dis-temizligi/`
- [ ] ratgeber → `/tr/rehber/`
- [ ] startseite → `/tr/`
- [ ] ueber-dr-adali → `/tr/dr-adali-hakkinda/`
- [ ] zahnersatz → `/tr/tedaviler/protez-dis/`

<!-- AUTO:UEBERSETZUNGEN:ENDE -->

Ratgeberartikel gibt es auf Spanisch und Türkisch vorerst nur „Zum Zahnarzt in Berlin: So funktioniert das deutsche System“. Die fünf übrigen Artikel erscheinen dort als Link auf die englische Fassung. Für eine spanische oder türkische Fassung: Datei unter `src/content/es/` bzw. `src/content/tr/` anlegen.

Zusätzlich zu prüfen: die Oberflächentexte `src/i18n/en.json`, `es.json` und `tr.json` (Buttons, Formulare, Hinweise).

## 5. Fotos

### Bilder der alten Website
- [ ] **Porträt Dr. Adali:** Wer hat es fotografiert? Darf es auf der Website verwendet werden (Nutzungsrecht des Fotografen)?
- [ ] **Klinische Fotos** (Zähne von Patientinnen und Patienten, auch von einem Kind): Liegen schriftliche Einwilligungen vor? Ohne Einwilligung werden sie nicht verwendet.
- Die übrigen Bilder der alten Seite waren Stockfotos ohne nachweisbare Lizenz und werden ersetzt.

### Stockfotos, die durch eigene Fotos ersetzt werden sollen
Diese Liste füllt sich in Phase 3 aus dem Bildmanifest (`src/assets/fotos/bilder.json`, Feld `ersetzen_durch_eigenes`).

<!-- AUTO:STOCKFOTOS:START -->

- [ ] **hero-atmosphaere** (unsplash, Barney Goodman) – verwendet: Startseite Hero
- [ ] **zahnersatz** (unsplash, Bogdan condr) – verwendet: Leistung Zahnersatz, Schwerpunkt-Raster, Zielgruppe Zahnverlust
- [ ] **implantologie** (unsplash, Harold Hisona) – verwendet: Leistung Implantologie, Schwerpunkt-Raster, Ratgeber Sofortimplantate
- [ ] **adhaesivbruecke** (unsplash, Ozkan Guner) – verwendet: Leistung Klebebrücke, Leistung Implantat-Alternativen, Ratgeber Implantat oder Klebebrücke
- [ ] **aesthetik** (unsplash, Oliver Sharp) – verwendet: Leistung Ästhetik, Schwerpunkt-Raster, Zielgruppe Ästhetik
- [ ] **cmd-schienen** (unsplash, Aleksandar Kurešević) – verwendet: Leistung CMD & Schienen, Schwerpunkt-Raster, Zielgruppe CMD, Ratgeber Knirschen
- [ ] **zahnerhalt** (unsplash, Ozkan Guner) – verwendet: Leistung Endodontie, Leistung Parodontologie, Leistung Füllungen, Leistung Prophylaxe
- [ ] **oralchirurgie** (unsplash, Ozkan Guner) – verwendet: Leistung Oralchirurgie
- [ ] **kinder** (unsplash, Jon Flobrant) – verwendet: Leistung Zahnersatz bei Kindern, Leistung MIH & Syndrome, Zielgruppe Eltern, Ratgeber MIH
- [ ] **labor-digital** (unsplash, Adrian Sulyok) – verwendet: Leistung Dentallabor & digital, Startseite Labor-Sektion
- [ ] **international** (unsplash, Priscilla Du Preez 🇨🇦) – verwendet: Zielgruppe International, Ratgeber Deutsches System
- [ ] **ratgeber-kosten** (unsplash, Isaac Smith) – verwendet: Ratgeber Kosten Zahnersatz
- [ ] **praxis-atmosphaere** (unsplash, Katja Ano) – verwendet: Praxis & Team – ergänzend, nie als „unsere Praxis“ beschriftet

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

## 7. Nach dem Livegang (Google & Co.)

- [ ] **Google-Unternehmensprofil** anlegen bzw. übernehmen; Name, Adresse und Telefon exakt wie auf der Website. Den Link in `src/config/site.ts` → `online.google_business_profile_url` eintragen (erscheint dann in den strukturierten Daten).
- [ ] **Google Search Console** und **Bing Webmaster Tools** einrichten und die Sitemap einreichen: `https://zahnarzt-adali.de/sitemap.xml`
- [ ] Weiterleitungen der alten Adressen testen (z. B. `/die-praxis/` → `/praxis-team/`, `/uber-dr-adali/` → `/ueber-dr-adali/`)
- [ ] KI-Sichtbarkeit testen: ChatGPT, Claude, Perplexity und Gemini fragen, z. B. „Zahnarzt Berlin Prenzlauer Berg Türkisch“ oder „Spezialist für Prothetik Berlin Klebebrücke“. `/llms.txt` muss erreichbar sein.
- [ ] Mit dem Rich-Results-Test von Google eine Leistungsseite und die FAQ-Seite prüfen
- [ ] Gleiche Praxisdaten (NAP) bei Doctolib, Jameda, Dr. Flex, Gelbe Seiten und weiteren Verzeichnissen
- [ ] Echte Bewertungen: erst wenn sie in `site.ts` → `bewertungen` stehen, erscheinen Sterne in den strukturierten Daten
