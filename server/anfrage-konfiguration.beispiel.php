<?php
/**
 * Zugangsdaten für das Anfrageformular (public/anfrage.php).
 *
 * 1. Diese Datei kopieren nach:  anfrage-konfiguration.php
 * 2. Ablegen EINE EBENE ÜBER dem Web-Verzeichnis (z. B. neben public_html/), damit sie nie abrufbar ist.
 *    Notfalls im Web-Verzeichnis – dann sperrt die .htaccess den Abruf.
 * 3. Werte eintragen. NIE ins Git-Repository einchecken (steht in .gitignore).
 *
 * Versand über das E-Mail-Postfach der Domain. Die E-Mails von zahnarzt-adali.de liegen bei
 * STRATO (MX smtpin.rzone.de, Stand 10/2026). Deshalb über STRATO versenden – dann passen
 * Absender und Mailserver zusammen und die Anfragen landen nicht im Spam:
 *   SMTP-Server smtp.strato.de, Port 465 (TLS) oder 587 (STARTTLS),
 *   Benutzer = vollständige E-Mail-Adresse eines STRATO-Postfachs (z. B. website@zahnarzt-adali.de anlegen).
 */
return [
    // "smtp" (empfohlen, authentifiziert) oder "mail" (PHP mail() des Servers)
    'versand' => 'smtp',
    // Empfänger: Postfach der Praxis (eine Adresse oder Liste)
    'empfaenger' => 'kontakt@zahnarzt-adali.de',
    // Absender: Postfach auf derselben Domain, sonst landet die Mail im Spam
    'absender' => 'website@zahnarzt-adali.de',
    'absender_name' => 'Website Dentanea',
    'smtp' => [
        'host' => 'smtp.strato.de',
        'port' => 465,
        'benutzer' => 'website@zahnarzt-adali.de',
        'passwort' => '[[PLATZHALTER: SMTP-Passwort – nur auf dem Server eintragen]]',
    ],
    // Beliebige lange Zeichenkette (für den Spam-Schutz)
    'geheimnis' => '[[PLATZHALTER: zufällige Zeichenkette]]',
];
