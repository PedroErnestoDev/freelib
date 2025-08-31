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
require_once __DIR__ . '/controllers/ArticleController.php';
require_once __DIR__ . '/config/db.php';

// Corrige o parsing da URL
$uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); // Pega só o caminho
$path = explode('/', trim($uri_path, '/'));
error_log("URL recebida: " . $_SERVER['REQUEST_URI']); // Depuração
error_log("Path: " . json_encode($path)); // Depuração
$resource = $path[1] ?? null; // ex: "article"
$action = $path[2] ?? null;   // ex: "all"
$id = $path[3] ?? null;       // se precisar de um id
$method = $_SERVER['REQUEST_METHOD'];
error_log("Resource: $resource, Action: $action"); // Depuração

$db = new db();
$conn = $db->conexao();

switch ($resource) {
    case 'user':
        $controller = new UserController($conn);

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
        } elseif ($method === 'GET') {
            if ($action === 'profile' && $id) {
                $controller->profile($id);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Action not found']);
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    case 'article':
        $controller = new ArticleController($conn);
        if ($method === 'POST') {
            if ($action === 'create') {
                $controller->createArticle();
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Action not found']);
            }
        } elseif ($method === 'GET') {
            if ($action === 'all') {
                $controller->listAll(); // Todos os artigos
            } elseif ($action === 'user' && $id) {
                $controller->listByUser($id); // Artigos do usuário específico
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Action not found']);
            }
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Resource not found']);
}
