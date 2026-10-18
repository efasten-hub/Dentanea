# Dentaviva – Website der Zahnarztpraxis Dr. Adali

Statische, viersprachige Website (Deutsch, Englisch, Spanisch, Türkisch) für **Dentaviva – Zahnarztpraxis Dr. Adali**, Schönhauser Allee 10–11, 10119 Berlin.

- **Technik:** [Astro](https://astro.build) (statisch) + Tailwind CSS v4. Es läuft kein Node-Server: Das Ergebnis ist ein Ordner mit HTML-, CSS- und Bilddateien für das Hetzner-Webhosting (Apache). Nur das Anfrageformular nutzt ein kleines PHP-Skript.
- **Design:** verbindlich in [`DESIGN.md`](DESIGN.md) (Tokens 1:1 aus dem Refero-Export, Abweichungen für die Arztpraxis dokumentiert).
- **Datenschutz:** keine Cookies, kein Tracking, keine externen Schriften. Doctolib ist nur verlinkt. Die Karte lädt erst nach Klick.
- **Offene Punkte für die Praxis:** [`PLATZHALTER.md`](PLATZHALTER.md)

---

## Inhalt

1. [Schnellstart](#1-schnellstart)
2. [Projektaufbau](#2-projektaufbau)
3. [Inhalte pflegen](#3-inhalte-pflegen)
4. [Prüfungen und Tests](#4-prüfungen-und-tests)
5. [Veröffentlichen auf Hetzner](#5-veröffentlichen-auf-hetzner)
6. [Domain und DNS (STRATO → Hetzner)](#6-domain-und-dns-strato--hetzner)
7. [TLS-Zertifikat (HTTPS)](#7-tls-zertifikat-https)
8. [Anfrageformular einrichten](#8-anfrageformular-einrichten)
9. [.htaccess: Weiterleitungen, Sicherheit, Caching](#9-htaccess-weiterleitungen-sicherheit-caching)
10. [Optionale Funktionen](#10-optionale-funktionen)
11. [Checkliste für den Livegang](#11-checkliste-für-den-livegang)

---

## 1. Schnellstart

Voraussetzung: [Node.js](https://nodejs.org) 22 oder neuer.

```bash
npm ci              # Abhängigkeiten installieren
npm run dev         # Entwicklungsserver: http://localhost:4321
npm run build       # fertige Website in dist/ (inkl. .htaccess)
npm run preview     # dist/ lokal ansehen: http://localhost:4321
```

Interne Seiten gibt es nur mit `npm run dev`, nie im fertigen Build:
- `/intern/designsystem`: Vorschau des Designsystems
- `/_bildauswahl`: Bildfreigabe aus Phase 3

## 2. Projektaufbau

| Pfad | Inhalt |
|---|---|
| `src/config/site.ts` | **Alle Praxisdaten an einer Stelle**: Name, Adresse, Telefon, Sprechzeiten, Doctolib, Sprachen, Qualifikationen, Team, Schalter |
| `src/content/<sprache>/<seite>.md` | Seitentexte je Sprache (Markdown mit Kopfdaten) |
| `src/i18n/{de,en,es,tr}.json` | Oberflächentexte (Buttons, Formular, Hinweise) |
| `src/i18n/routen.ts` | URL-Zuordnung je Sprache (Slugs), Grundlage für Sprachumschalter, hreflang und Sitemap |
| `src/assets/fotos/bilder.json` | Bildmanifest: Quelle, Lizenz, Fotograf, Alt-Texte in vier Sprachen |
| `src/vorlagen/` | Seitenvorlagen (Startseite, Leistung, Kontakt, FAQ …) |
| `src/components/` | Bausteine (Header, Footer, `Terminbuchung`, Foto …) |
| `src/lib/schema.ts` | Strukturierte Daten (JSON-LD) für Google |
| `src/lib/llms.ts` | `llms.txt` für KI-Assistenten |
| `public/anfrage.php` | Versand des Anfrageformulars (PHP, SMTP) |
| `server/` | Vorlagen für den Server: `.htaccess`, Formular-Zugangsdaten |
| `scripts/` | Prüfskript, Tests, Bildbearbeitung, `.htaccess`-Erzeugung |
| `docs/` | Bestandsaufnahme der alten Website, Texte der alten Seiten |

**URLs:** Deutsch ohne Präfix (`/leistungen/implantologie/`), alle anderen Sprachen mit Präfix und übersetztem Slug (`/en/services/dental-implants/`, `/tr/tedaviler/implant/`).

## 3. Inhalte pflegen

### Praxisdaten ändern (Telefon, Sprechzeiten, Adresse …)
Nur in `src/config/site.ts`. Header, Footer, Kontaktseite, Impressum, JSON-LD, `llms.txt` und die mobile Leiste übernehmen die Änderung automatisch.

### Seitentext ändern
Datei unter `src/content/de/…md` öffnen. Oben stehen die Kopfdaten:
- `titel`: Überschrift
- `seo_titel`: höchstens 60 Zeichen
- `beschreibung`: höchstens 155 Zeichen
- `antwort`, `faq` und weitere Felder

Darunter folgt der Text in Markdown. Danach dieselbe Änderung in `src/content/en|es|tr/…md` nachziehen.

Für Übersetzungen gibt es zwei Felder:
- `uebersetzt: false`: Die Seite erscheint in dieser Sprache nicht. Der Sprachumschalter führt dann zur deutschen Fassung mit Hinweis.
- `uebersetzung_geprueft: true`: erst setzen, wenn eine muttersprachliche Person mit zahnmedizinischem Verständnis die Seite geprüft hat.

### Leistung ab- oder anschalten
In `site.ts` unter `leistungen` auf `false` setzen. Die Seite verschwindet dann überall: Navigation, Übersicht, Sitemap, JSON-LD und `llms.txt`.

### Online-Terminbuchung
`site.ts` → `terminbuchung`:
- `modus: "link"` (Standard): eigener Button, beim Laden keine Verbindung zu Doctolib.
- `modus: "widget"`: Der Doctolib-Kalender lädt erst nach Klick. Dafür muss der Einbettungscode in `widget_embed` stehen. Die Content-Security-Policy erweitert sich beim Build automatisch.
- `aktiv: false`: Überall erscheinen stattdessen Telefon und Anfrageformular.

### Fotos tauschen
Neue Datei nach `src/assets/fotos/` legen und den Eintrag in `bilder.json` anpassen (`datei`, `quelle: "eigen"`, `stock: false`, Alt-Texte). Mit `npm run bilder` bekommt das Bild den einheitlichen warmen Look. Der Bildnachweis im Impressum aktualisiert sich selbst.

### Markierungen
Offene Stellen sind im Text markiert:
- `[[PLATZHALTER]]`: Angabe fehlt
- `[[PRÜFEN …]]`: Angabe ist nicht bestätigt
- `[[PREIS]]`: Preis fehlt
- `[[DATUM]]`: Prüfdatum fehlt

In der Vorschau sind sie gestrichelt umrandet. `npm run pruefen` zählt sie, `npm run pruefen -- --schreiben` aktualisiert die Liste in `PLATZHALTER.md`.

## 4. Prüfungen und Tests

| Befehl | Was passiert |
|---|---|
| `npm run pruefen` | Inhaltsprüfung: Markierungen, Übersetzungsstand, fehlende Texte, Slugs, Bildmanifest, Titel- und Beschreibungslängen. Läuft automatisch vor jedem Build (nur Warnungen). |
| `npm run pruefen -- --streng` | Wie oben, bricht aber bei offenen Punkten ab. **Vor dem Livegang muss das grün sein.** |
| `npm test` | Build und technische Tests von `dist/`: eine H1 je Seite, Canonical, gegenseitige hreflang-Verweise, interne Links, keine fremden Einbindungen, keine Inline-Skripte oder -Styles (CSP), gültiges JSON-LD, Sitemap, robots.txt, `llms.txt`, `.htaccess` |
| `npm run test:a11y` | Browser-Tests aller Seiten: Barrierefreiheit (axe, WCAG 2.2 AA), kein seitlicher Überlauf bei 320/390/1280 px, keine Verbindungen zu fremden Servern. Einmalig nötig: `npx playwright install chromium` |
| `npm run check` | TypeScript- und Astro-Prüfung |

GitHub führt Build, `test:dist` und `test:a11y` bei jedem Push automatisch aus (Workflow „Prüfen“).

**Stand der letzten Messung** (Lighthouse 12, lokaler Apache mit der `.htaccess` aus diesem Projekt):

| Messung | Leistung | Barrierefreiheit | Best Practices | SEO | LCP |
|---|---|---|---|---|---|
| Desktop | 100 | 100 | 100 | 100 | 0,4 s |
| Mobil (simuliertes langsames 4G) | 98–99 | 100 | 100 | 100 | 1,8–2,3 s |

## 5. Veröffentlichen auf Hetzner

Die Website wird automatisch per **GitHub Action** (`.github/workflows/deploy.yml`) per SFTP hochgeladen.

### Einmalig einrichten

1. **Hetzner Webhosting** buchen (z. B. Paket „Level 1“ oder höher; PHP und SSH/SFTP müssen enthalten sein).
2. In der **konsoleH** die Domain `zahnarzt-adali.de` als „externe Domain“ anlegen (sie bleibt bei STRATO registriert, siehe [Abschnitt 6](#6-domain-und-dns-strato--hetzner)).
3. In der konsoleH die **SSH/SFTP-Zugangsdaten** ablesen: Server (z. B. `www123.your-server.de`), Benutzer, Passwort, Port. Hetzner-Webhosting nutzt für SSH/SFTP meist **Port 222** – bitte in der konsoleH bestätigen.
4. In GitHub unter **Settings → Secrets and variables → Actions** diese Secrets anlegen:

   | Secret | Beispiel |
   |---|---|
   | `SFTP_HOST` | `www123.your-server.de` |
   | `SFTP_PORT` | `222` |
   | `SFTP_BENUTZER` | `dentaviva` |
   | `SFTP_PASSWORT` | (Passwort aus der konsoleH; keine Anführungszeichen im Passwort) |
   | `SFTP_ZIEL` | `/public_html` (Web-Verzeichnis der Domain) |

   Zugangsdaten gehören **nie** in Dateien des Repositorys.
5. Unter **Settings → Environments** die Umgebung `produktion` anlegen. Optional „Required reviewers“ aktivieren: Dann wartet jede Veröffentlichung auf eine Freigabe.

### Veröffentlichen
- **Automatisch:** jeder Push auf den Branch `main`. Die Entwicklung läuft auf einem eigenen Branch. Zum Veröffentlichen wird er per Pull Request in `main` übernommen.
- **Von Hand:** GitHub → Actions → „Veröffentlichen“ → *Run workflow*.

Ablauf: `npm ci` → `pruefen --streng` → Build → Tests → Upload.
- Die strenge Prüfung bricht ab, solange `[[…]]`-Markierungen offen sind. So geht nichts Unfertiges online.
- Für eine Vorschau lässt sich die Prüfung beim manuellen Start mit „Trotz offener Markierungen veröffentlichen“ übergehen. Dann aber nicht auf die Live-Domain veröffentlichen.
- Der Upload spiegelt `dist/` und löscht veraltete Dateien. Den Ordner `.well-known/` (Let's Encrypt) und `anfrage-konfiguration.php` lässt er unangetastet.

### Manuell (ohne GitHub)
`npm run build`, danach den **Inhalt** von `dist/` per SFTP-Programm (z. B. FileZilla) ins Web-Verzeichnis kopieren. Achtung: `dist/.htaccess` ist eine versteckte Datei und muss mit hochgeladen werden.

## 6. Domain und DNS (STRATO → Hetzner)

Stand Oktober 2026 liegen Domain, DNS und **E-Mail** bei **STRATO**:
- Nameserver `docks19.rzone.de`, `shades10.rzone.de`
- Mailserver (MX) `smtpin.rzone.de`
- Die alte Website (MyWebsite NOW bei IONOS) ist über A-Einträge eingebunden: `212.227.172.251` für die Domain, `217.160.0.193` für `www`.

Die Domain bleibt bei STRATO. Nur die Website zieht zu Hetzner:

1. Im STRATO-Kundenlogin → Domainverwaltung → DNS-Einstellungen **für `zahnarzt-adali.de` und `www`**:
   - **A-Eintrag** (bisher die IONOS-Adressen, siehe oben) auf die IPv4-Adresse des Hetzner-Webhostings (konsoleH → Übersicht)
   - **AAAA-Eintrag** auf die IPv6-Adresse (falls angezeigt)
2. **MX-Einträge NICHT ändern.** Die E-Mail-Postfächer (z. B. `kontakt@zahnarzt-adali.de`) bleiben bei STRATO und funktionieren weiter.
3. Empfohlen für die Zustellbarkeit der Praxis-E-Mails: SPF-Eintrag (TXT) laut STRATO-Hilfe, z. B. `v=spf1 include:_spf.strato.com ~all`. Bitte den genauen Wert bei STRATO nachsehen.
4. Bis die Änderung überall gilt, kann es bis zu 24 Stunden dauern. Erst danach das TLS-Zertifikat beantragen.

Die Domain ist in `src/config/site.ts` (`domain`) und in `astro.config.mjs` (`site`) eingetragen. Ändert sie sich, beide anpassen. Canonical, Sitemap, hreflang, JSON-LD, `llms.txt` und die Weiterleitung `www → ohne www` richten sich danach.

## 7. TLS-Zertifikat (HTTPS)

1. konsoleH → Domain → **SSL-Manager** → kostenloses **Let's-Encrypt-Zertifikat** für `zahnarzt-adali.de` und `www.zahnarzt-adali.de` beantragen (erst, wenn die DNS-Einträge auf Hetzner zeigen).
2. Die `.htaccess` leitet danach automatisch auf `https://zahnarzt-adali.de` um (auch von `www` und `http`).
3. Die `.htaccess` setzt HSTS (`Strict-Transport-Security`, 2 Jahre), aber nur bei HTTPS-Aufrufen. Browser merken sich danach: nur noch HTTPS. Deshalb das Zertifikat nicht ablaufen lassen; Let's Encrypt verlängert bei Hetzner automatisch.
4. Test: [SSL Labs](https://www.ssllabs.com/ssltest/) und [securityheaders.com](https://securityheaders.com).

## 8. Anfrageformular einrichten

Das Formular sendet an `public/anfrage.php`. Das Skript prüft die Angaben, wehrt Spam ab (verstecktes Feld, höchstens 5 Anfragen pro Stunde und IP) und verschickt eine E-Mail per SMTP. Danach leitet es auf die Bestätigungsseite der jeweiligen Sprache weiter. Die Sprache der Anfrage steht in der E-Mail.

1. Bei **STRATO** ein Postfach für den Versand anlegen, z. B. `website@zahnarzt-adali.de`. Über STRATO zu senden ist wichtig, weil der Mailserver der Domain dort liegt. So landen die Anfragen nicht im Spam.
2. `server/anfrage-konfiguration.beispiel.php` kopieren, als `anfrage-konfiguration.php` speichern und ausfüllen:
   - SMTP-Server `smtp.strato.de`, Port 465
   - Benutzer und Passwort des Postfachs
   - Empfänger `kontakt@zahnarzt-adali.de`
3. Die Datei per SFTP **eine Ebene über** dem Web-Verzeichnis ablegen (neben `public_html/`). Notfalls geht auch das Web-Verzeichnis selbst; die `.htaccess` sperrt den Abruf.
4. Eine Testanfrage in allen vier Sprachen senden.

## 9. .htaccess: Weiterleitungen, Sicherheit, Caching

Die Datei entsteht bei jedem Build aus `server/htaccess.vorlage` (Skript `scripts/htaccess.mjs`). Änderungen bitte in der Vorlage machen.

- **HTTPS und Domain:** `http://` und `www.` werden per 301 auf `https://zahnarzt-adali.de` umgeleitet.
- **Alte Adressen** (301):
  - `/die-praxis/` → `/praxis-team/`
  - `/uber-dr-adali/` → `/ueber-dr-adali/`
  - `/kontakt-and-infos/` → `/termin-kontakt/`
  - `/datenschutzerklarung/` → `/datenschutz/`
- **Fehlerseiten** je Sprache: `/404.html`, `/en/404/`, `/es/404/`, `/tr/404/`.
- **Sicherheit:**
  - Content-Security-Policy: nur eigene Dateien, keine Inline-Skripte; Karte von OpenStreetMap erst nach Klick
  - HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`
  - Gesperrt: versteckte Dateien (`.git`, `.env`), Verzeichnislisten und die Formular-Zugangsdaten
- **Caching:** Dateien in `/_astro/` und `/fonts/` haben eindeutige Namen und werden ein Jahr gecacht. HTML, `robots.txt`, `sitemap.xml` und `llms.txt` werden bei jedem Aufruf neu geprüft.
- **Komprimierung** (gzip) für HTML, CSS, JS, SVG, Text.

Diese `.htaccess` ist auf einem Apache 2.4 getestet: Weiterleitungen, Fehlerseiten je Sprache, Sperren, Header und Caching. Alle 116 Seiten wurden unter der strengen CSP ohne einen einzigen Verstoß geladen.

## 10. Optionale Funktionen

- **Besucherstatistik ohne Cookies** (Plausible oder Umami): `site.ts` → `schalter.analytics`, standardmäßig aus. Vorher die Datenschutzerklärung ergänzen. Die CSP passt sich automatisch an.
- **Vorher-Nachher-Bilder:** `schalter.vorher_nachher`, standardmäßig aus. Nur mit schriftlicher Einwilligung und nach rechtlicher Prüfung (HWG § 11).
- **Hinweis auf Browsersprache:** `schalter.browsersprache_hinweis`. Er zeigt einen dezenten Hinweis „Diese Seite gibt es auch auf …“, ohne Cookie und ohne automatische Weiterleitung.
- **Seite für Zahnärzte:** `schalter.fuer_zahnaerzte`.

## 11. Checkliste für den Livegang

Fachliche und rechtliche Punkte der Praxis: siehe [`PLATZHALTER.md`](PLATZHALTER.md). Technisch:

- [ ] `npm run pruefen -- --streng` ohne Fehler (alle Markierungen erledigt)
- [ ] `npm test` und `npm run test:a11y` grün
- [ ] Hetzner-Webhosting gebucht, GitHub-Secrets eingetragen, erste Veröffentlichung erfolgreich
- [ ] DNS bei STRATO: A/AAAA für `@` und `www` auf Hetzner, **MX unverändert**
- [ ] Let's-Encrypt-Zertifikat aktiv, `http://` und `www.` leiten auf `https://zahnarzt-adali.de` um
- [ ] Alte Adressen leiten um (z. B. `/die-praxis/`)
- [ ] Anfrageformular: Konfiguration abgelegt, Testanfragen in allen Sprachen angekommen
- [ ] E-Mail an `kontakt@zahnarzt-adali.de` funktioniert weiterhin
- [ ] Google Search Console und Bing Webmaster Tools: Domain bestätigt, `sitemap.xml` eingereicht
- [ ] Google-Unternehmensprofil mit identischem Namen, Adresse und Telefon; Link in `site.ts` eintragen
- [ ] securityheaders.com und SSL Labs mindestens „A“
- [ ] Altes Hosting (MyWebsite NOW bei IONOS) erst kündigen, wenn alles läuft und die DNS-Umstellung überall angekommen ist
