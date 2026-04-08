<?php
// Default entry point: render the login page.
$loginFile = __DIR__ . '/login page/index.html';
if (!is_file($loginFile)) {
    http_response_code(500);
    echo 'Login page not found.';
    exit;
}

$html = file_get_contents($loginFile);
if ($html === false) {
    http_response_code(500);
    echo 'Unable to load login page.';
    exit;
}

if (stripos($html, '<base ') === false) {
    $html = preg_replace('/<head>/i', "<head>\n<base href=\"/login%20page/\">", $html, 1);
}

header('Content-Type: text/html; charset=UTF-8');
echo $html;
