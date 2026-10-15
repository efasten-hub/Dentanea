<?php
/**
 * Zugangsdaten für das Anfrageformular (public/anfrage.php).
 *
 * 1. Diese Datei kopieren nach:  anfrage-konfiguration.php
 * 2. Ablegen EINE EBENE ÜBER dem Web-Verzeichnis (z. B. neben public_html/), damit sie nie abrufbar ist.
 *    Notfalls im Web-Verzeichnis – dann sperrt die .htaccess den Abruf.
 * 3. Werte eintragen. NIE ins Git-Repository einchecken (steht in .gitignore).
 *
 * Hetzner Webhosting: Postfach in der konsoleH anlegen (z. B. website@zahnarzt-adali.de),
 * SMTP-Server mail.your-server.de, Port 587 (STARTTLS) oder 465 (TLS).
 */
return [
    // "smtp" (empfohlen, authentifiziert) oder "mail" (PHP mail() des Servers)
    'versand' => 'smtp',
    // Empfänger: Postfach der Praxis (eine Adresse oder Liste)
    'empfaenger' => 'kontakt@zahnarzt-adali.de',
    // Absender: Postfach auf derselben Domain, sonst landet die Mail im Spam
    'absender' => 'website@zahnarzt-adali.de',
    'absender_name' => 'Website Dentaviva',
    'smtp' => [
        'host' => 'mail.your-server.de',
        'port' => 587,
        'benutzer' => 'website@zahnarzt-adali.de',
        'passwort' => '[[PLATZHALTER: SMTP-Passwort – nur auf dem Server eintragen]]',
    ],
    // Beliebige lange Zeichenkette (für den Spam-Schutz)
    'geheimnis' => '[[PLATZHALTER: zufällige Zeichenkette]]',
];
