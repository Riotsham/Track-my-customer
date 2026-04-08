<?php
header('Content-Type: application/json; charset=UTF-8');

try {
    require __DIR__ . '/config.php';
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Server configuration error.']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
$identifier = trim($payload['identifier'] ?? '');
$password = $payload['password'] ?? '';

if ($identifier === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Missing credentials.']);
    exit;
}

$stmt = $pdo->prepare("SELECT username, email, password_hash FROM users WHERE username = :identifier OR email = :identifier LIMIT 1");
$stmt->execute([':identifier' => $identifier]);
$user = $stmt->fetch();

if (!$user || empty($user['password_hash']) || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'message' => 'Invalid username or password.']);
    exit;
}

echo json_encode(['ok' => true]);
