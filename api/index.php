<?php
// IP whitelist for development only
$allowed_ips = ['127.0.0.1', '::1'];
if (!in_array($_SERVER['REMOTE_ADDR'], $allowed_ips)) {
    http_response_code(403);
    die('Access denied');
}

// Add additional authentication here
phpinfo();
?>