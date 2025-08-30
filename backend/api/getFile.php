<?php
// Caminho base da pasta uploads
$uploadsDir = realpath(__DIR__ . '/uploads');

if (!isset($_GET['path'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Parâmetro path é obrigatório']);
    exit;
}

$requestedPath = $_GET['path'];

// Evita traversal de diretórios
$fullPath = realpath($uploadsDir . '/' . $requestedPath);

if (!$fullPath || !file_exists($fullPath) || strpos($fullPath, $uploadsDir) !== 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Arquivo não encontrado']);
    exit;
}

// Detecta e envia o tipo MIME
$mimeType = mime_content_type($fullPath) ?: 'application/octet-stream';
header('Content-Type: ' . $mimeType);
header('Content-Disposition: inline; filename="' . basename($fullPath) . '"');

// Envia o conteúdo do arquivo
readfile($fullPath);
exit;
