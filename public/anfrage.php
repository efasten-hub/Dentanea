<?php
/**
 * Anfrageformular – Versand per E-Mail (Hetzner Webhosting, PHP ≥ 8.1, ohne Bibliotheken).
 *
 * Ablauf: POST vom Formular auf der Kontaktseite → prüfen → E-Mail an die Praxis → Weiterleitung
 * auf die Bestätigungsseite der jeweiligen Sprache (ziel_ok) bzw. zurück zum Formular (ziel_fehler#anfrage-fehler).
 *
 * Zugangsdaten stehen NICHT hier, sondern in anfrage-konfiguration.php (Vorlage: server/anfrage-konfiguration.beispiel.php),
 * am besten eine Ebene ÜBER dem Web-Verzeichnis. Versandweg austauschbar: "smtp" (empfohlen) oder "mail" (PHP mail()).
 *
 * Datenschutz: Keine Speicherung auf dem Server, kein Log der Inhalte. Für den Spam-Schutz wird nur ein
 * Hash der IP-Adresse für höchstens eine Stunde im temporären Verzeichnis gehalten.
 */
declare(strict_types=1);

// ------------------------------------------------------------------ Konfiguration
$konfig = null;
foreach ([dirname(__DIR__) . '/anfrage-konfiguration.php', __DIR__ . '/anfrage-konfiguration.php'] as $datei) {
    if (is_file($datei)) { $konfig = require $datei; break; }
}

function weiter(string $ziel): never {
    header('Location: ' . $ziel, true, 303);
    exit;
}
/** Nur Pfade dieser Website (verhindert offene Weiterleitungen) */
function sicherer_pfad(?string $p, string $rueckfall): string {
    return (is_string($p) && preg_match('#^/[A-Za-z0-9/_\-]*$#', $p) && !str_starts_with($p, '//')) ? $p : $rueckfall;
}
function feld(string $name, int $max): string {
    $w = isset($_POST[$name]) && is_string($_POST[$name]) ? trim($_POST[$name]) : '';
    return mb_substr($w, 0, $max, 'UTF-8');
}
function einzeilig(string $s): string { return preg_replace('/[\r\n\t]+/', ' ', $s) ?? ''; }

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { weiter('/'); }

$ziel_ok = sicherer_pfad($_POST['ziel_ok'] ?? null, '/anfrage-gesendet/');
$ziel_fehler = sicherer_pfad($_POST['ziel_fehler'] ?? null, '/termin-kontakt/') . '#anfrage-fehler';

// Honeypot ausgefüllt → so tun, als wäre alles in Ordnung
if (feld('website', 200) !== '') { weiter($ziel_ok); }

$SPRACHEN = ['de' => 'Deutsch', 'en' => 'Englisch', 'es' => 'Spanisch', 'tr' => 'Türkisch'];
$ANLIEGEN = ['erstberatung' => 'Erstberatung', 'zweitmeinung' => 'Zweitmeinung', 'implantat' => 'Implantat', 'zahnersatz' => 'Zahnersatz', 'aesthetik' => 'Ästhetik', 'kinder' => 'Kinder', 'sonstiges' => 'Sonstiges'];

$daten = [
    'name' => einzeilig(feld('name', 100)),
    'kontakt' => einzeilig(feld('kontakt', 200)),
    'wunschtermin' => einzeilig(feld('wunschtermin', 100)),
    'sprache_seite' => feld('sprache', 2),
    'sprache_wunsch' => feld('bevorzugte_sprache', 2),
    'anliegen' => feld('anliegen', 20),
    'nachricht' => feld('nachricht', 1500),
    'einwilligung' => feld('einwilligung', 3),
];

// ------------------------------------------------------------------ Prüfen
$fehler = $konfig === null
    || $daten['name'] === ''
    || $daten['kontakt'] === ''
    || $daten['einwilligung'] !== 'ja'
    || !isset($SPRACHEN[$daten['sprache_seite']])
    || ($daten['sprache_wunsch'] !== '' && !isset($SPRACHEN[$daten['sprache_wunsch']]))
    || ($daten['anliegen'] !== '' && !isset($ANLIEGEN[$daten['anliegen']]));
$ist_email = str_contains($daten['kontakt'], '@');
if ($ist_email && filter_var($daten['kontakt'], FILTER_VALIDATE_EMAIL) === false) { $fehler = true; }
if (!$ist_email && !preg_match('/^[0-9 +()\/\-.]{6,30}$/', $daten['kontakt'])) { $fehler = true; }
if ($fehler) { weiter($ziel_fehler); }

// Einfache Mengenbegrenzung: höchstens 5 Anfragen pro Stunde und IP (nur Hash, kein Klartext)
$hash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . date('YmdH') . ($konfig['geheimnis'] ?? ''));
$zaehler = sys_get_temp_dir() . '/anfrage-' . substr($hash, 0, 32);
$anzahl = is_file($zaehler) ? (int) file_get_contents($zaehler) : 0;
if ($anzahl >= 5) { weiter($ziel_fehler); }
@file_put_contents($zaehler, (string) ($anzahl + 1));
foreach (glob(sys_get_temp_dir() . '/anfrage-*') ?: [] as $alt) { if (filemtime($alt) < time() - 3600) { @unlink($alt); } }

// ------------------------------------------------------------------ E-Mail
$sprache_name = $SPRACHEN[$daten['sprache_seite']];
$wunsch_name = $daten['sprache_wunsch'] !== '' ? $SPRACHEN[$daten['sprache_wunsch']] : '–';
$anliegen_name = $daten['anliegen'] !== '' ? $ANLIEGEN[$daten['anliegen']] : '–';
$betreff = sprintf('Website-Anfrage [%s] %s – %s', strtoupper($daten['sprache_seite']), $anliegen_name, $daten['name']);
$text = implode("\r\n", [
    'Neue Anfrage über das Formular der Website.',
    '',
    'Name:               ' . $daten['name'],
    'Telefon/E-Mail:     ' . $daten['kontakt'],
    'Wunschtermin:       ' . ($daten['wunschtermin'] ?: '–'),
    'Anliegen:           ' . $anliegen_name,
    'Bevorzugte Sprache: ' . $wunsch_name,
    'Sprache der Seite:  ' . $sprache_name . ' (' . strtoupper($daten['sprache_seite']) . ')',
    'Einwilligung:       ja (Checkbox bestätigt)',
    'Gesendet am:        ' . date('d.m.Y, H:i') . ' Uhr',
    '',
    'Nachricht:',
    $daten['nachricht'] !== '' ? $daten['nachricht'] : '–',
    '',
    '--',
    'Bitte beantworten Sie die Anfrage in der gewünschten Sprache.',
    'Diese E-Mail enthält personenbezogene Daten. Nach Bearbeitung bitte gemäß Datenschutzkonzept löschen.',
]);
$antwort_an = $ist_email ? $daten['kontakt'] : null;

function kodiere(string $s): string { return '=?UTF-8?B?' . base64_encode($s) . '?='; }

function sende_mail(array $k, string $betreff, string $text, ?string $antwort_an): bool {
    $kopf = [
        'From: ' . kodiere($k['absender_name']) . ' <' . $k['absender'] . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    if ($antwort_an) { $kopf[] = 'Reply-To: ' . $antwort_an; }
    return mail($k['empfaenger'], kodiere($betreff), chunk_split(base64_encode($text)), implode("\r\n", $kopf), '-f' . $k['absender']);
}

/** Schlanker SMTP-Client: STARTTLS (Port 587) oder TLS (Port 465), AUTH LOGIN. */
function sende_smtp(array $k, string $betreff, string $text, ?string $antwort_an): bool {
    $s = $k['smtp'];
    $tls_direkt = (int) $s['port'] === 465;
    $kontext = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $v = @stream_socket_client(($tls_direkt ? 'ssl://' : 'tcp://') . $s['host'] . ':' . $s['port'], $en, $es, 15, STREAM_CLIENT_CONNECT, $kontext);
    if (!$v) { return false; }
    stream_set_timeout($v, 15);
    $lies = function () use ($v): string { $a = ''; while (($z = fgets($v, 515)) !== false) { $a .= $z; if (isset($z[3]) && $z[3] === ' ') { break; } } return $a; };
    $cmd = function (string $c, array $ok) use ($v, $lies): bool { fwrite($v, $c . "\r\n"); return in_array((int) substr($lies(), 0, 3), $ok, true); };
    $host = gethostname() ?: 'localhost';
    if ((int) substr($lies(), 0, 3) !== 220) { return false; }
    if (!$cmd('EHLO ' . $host, [250])) { return false; }
    if (!$tls_direkt) {
        if (!$cmd('STARTTLS', [220])) { return false; }
        if (!stream_socket_enable_crypto($v, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) { return false; }
        if (!$cmd('EHLO ' . $host, [250])) { return false; }
    }
    if (!$cmd('AUTH LOGIN', [334]) || !$cmd(base64_encode($s['benutzer']), [334]) || !$cmd(base64_encode($s['passwort']), [235])) { return false; }
    if (!$cmd('MAIL FROM:<' . $k['absender'] . '>', [250])) { return false; }
    foreach ((array) $k['empfaenger'] as $an) { if (!$cmd('RCPT TO:<' . $an . '>', [250, 251])) { return false; } }
    if (!$cmd('DATA', [354])) { return false; }
    $kopf = [
        'Date: ' . date('r'),
        'From: ' . kodiere($k['absender_name']) . ' <' . $k['absender'] . '>',
        'To: ' . implode(', ', (array) $k['empfaenger']),
        'Subject: ' . kodiere($betreff),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . substr(strrchr($k['absender'], '@'), 1) . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    if ($antwort_an) { $kopf[] = 'Reply-To: ' . $antwort_an; }
    $nachricht = implode("\r\n", $kopf) . "\r\n\r\n" . chunk_split(base64_encode($text));
    if (!$cmd($nachricht . "\r\n.", [250])) { return false; }
    $cmd('QUIT', [221]);
    fclose($v);
    return true;
}

$gesendet = match ($konfig['versand'] ?? 'smtp') {
    'mail' => sende_mail($konfig, $betreff, $text, $antwort_an),
    default => sende_smtp($konfig, $betreff, $text, $antwort_an),
};
weiter($gesendet ? $ziel_ok : $ziel_fehler);
