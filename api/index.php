<?php
// Simple PHP API bootstrap for low-end LAMP servers
// Provides a minimal router and JSON responses

header('Content-Type: application/json; charset=utf-8');
$allowedOrigin = $_ENV['ALLOWED_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $allowedOrigin");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function json($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Determine action: GET ?action=... or POST JSON { action }
$action = $_GET['action'] ?? null;
$ct = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
if (!$action && str_starts_with($ct, 'application/json')) {
    $raw = file_get_contents('php://input');
    $payload = json_decode($raw, true);
    if (json_last_error() === JSON_ERROR_NONE && isset($payload['action'])) {
        $action = $payload['action'];
    }
}

// Basic routing
switch ($action) {
    case 'hello':
        json([
            'ok' => true,
            'command' => 'helloAPI',
            'message' => '^#65eeab^Hello from the ^#ab6599^PHP API 👋',
            'timestamp' => date('c'),
        ]);
        break;

    default:
        json([
            'ok' => false,
            'error' => 'Unknown action',
            'hint' => 'Try action=hello',
        ], 404);
}
?>