<?php
function loadEnvFile(string $path): void
{
    if (!is_file($path) || !is_readable($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }

        $key = trim($parts[0]);
        $value = trim($parts[1]);

        if ($key === '') {
            continue;
        }

        if ((str_starts_with($value, '"') && str_ends_with($value, '"')) ||
            (str_starts_with($value, "'") && str_ends_with($value, "'"))
        ) {
            $value = substr($value, 1, -1);
        }

        if (getenv($key) === false) {
            putenv("{$key}={$value}");
        }

        $_ENV[$key] = $value;
    }
}

loadEnvFile(__DIR__ . '/../.env');

$dbHost = getenv('MYSQL_HOST') ?: '127.0.0.1';
$dbPort = getenv('MYSQL_PORT') ?: '3306';
$dbName = getenv('MYSQL_DB') ?: 'track_my_customer';
$dbUser = getenv('MYSQL_USER') ?: 'root';
$dbPass = getenv('MYSQL_PASSWORD') ?: '';

$dsnRoot = "mysql:host={$dbHost};port={$dbPort};charset=utf8mb4";
$pdoRoot = new PDO($dsnRoot, $dbUser, $dbPass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);

$safeDbName = preg_replace('/[^a-zA-Z0-9_]/', '', $dbName);
if ($safeDbName === '') {
    throw new RuntimeException('Invalid MYSQL_DB name.');
}

$pdoRoot->exec("CREATE DATABASE IF NOT EXISTS `{$safeDbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

$dsnDb = "mysql:host={$dbHost};port={$dbPort};dbname={$safeDbName};charset=utf8mb4";
$pdo = new PDO($dsnDb, $dbUser, $dbPass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

$pdo->exec("
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(190) NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
");

$defaultUsername = 'admin';
$defaultPassword = 'admin@1123';

$stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username LIMIT 1");
$stmt->execute([':username' => $defaultUsername]);
$existing = $stmt->fetch();

if (!$existing) {
    $insert = $pdo->prepare("INSERT INTO users (username, password_hash) VALUES (:username, :password_hash)");
    $insert->execute([
        ':username' => $defaultUsername,
        ':password_hash' => password_hash($defaultPassword, PASSWORD_DEFAULT),
    ]);
}
