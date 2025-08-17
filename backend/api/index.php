<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Pré-flight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/controllers/UserController.php';
require_once __DIR__ . '/config/db.php';

$path = explode('/', trim($_SERVER['REQUEST_URI'], '/')); 
$resource = $path[1] ?? null;   // ex: "user"
$action   = $path[2] ?? null;   // ex: "login" ou "register"
$id       = $path[3] ?? null;   // se precisar de um id no futuro
$method   = $_SERVER['REQUEST_METHOD'];

$db = new db();
$conn = $db->conexao();

switch ($resource) {
    case 'user':
        $controller = new UserController($conn);

        // sub-rotas de usuário
        if ($method === 'POST') {
            switch ($action) {
                case 'register':
                    $controller->createUser();
                    break;
                case 'login':
                    $controller->loginUser();
                    break;
                default:
                    http_response_code(404);
                    echo json_encode(['error' => 'Action not found']);
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
}