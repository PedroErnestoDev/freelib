<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../models/ArticleModel.php";
require_once __DIR__ . "/../middlewares/AuthMiddleware.php";

class ArticleController
{
    private $model;
    private $pdo;

    public function __construct($pdo)
    {
        $this->model = new ArticleModel($pdo);
        $this->pdo = $pdo;
    }

    public function createArticle()
    {
        $user = AuthMiddleware::validateToken();

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return $this->respond(['error' => 'Método inválido'], 405);
        }

        $filesDir  = __DIR__ . '/../uploads/files/';
        $coversDir = __DIR__ . '/../uploads/covers/';

        $title   = $_POST['fileTitle'] ?? null;
        $summary = $_POST['fileSummary'] ?? null;
        $userId  = $_POST['user_id'] ?? null;

        $file      = $_FILES['file'] ?? null;
        $fileCover = $_FILES['fileCover'] ?? null;

        if (!$title || !$summary || !$userId || !$file) {
            return $this->respond(['error' => 'Campos obrigatórios faltando'], 400);
        }

        $filePath = $filesDir . basename($file['name']);
        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            return $this->respond(['error' => 'Falha ao salvar arquivo'], 500);
        }

        $coverPath = null;
        if ($fileCover) {
            $coverPath = $coversDir . basename($fileCover['name']);
            if (!move_uploaded_file($fileCover['tmp_name'], $coverPath)) {
                return $this->respond(['error' => 'Falha ao salvar capa'], 500);
            }
        }

        $data = [
            'user_id'     => $userId,
            'title'       => $title,
            'summary'     => $summary,
            'cover_image' => $coverPath ? 'uploads/covers/' . basename($fileCover['name']) : null,
            'file_path'   => 'uploads/files/' . basename($file['name']),
        ];

        error_log("Tentando criar artigo com user_id: " . $userId);
        
        try {
            $success = $this->model->create($data);
            if (!$success) {
                $errorInfo = $this->pdo->errorInfo();
                return $this->respond([
                    'success' => false,
                    'error'   => $errorInfo[2] ?? 'Erro desconhecido no insert'
                ], 500);
            }
            return $this->respond(['success' => true], 201);
        } catch (Exception $e) {
            return $this->respond(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }



    public function listAll()
    {
        try {
            $q = $_GET['q'] ?? null;
            error_log("Query recebida: $q"); // Adicione isso
            if ($q) {
                $articles = $this->model->search($q);
            } else {
                $articles = $this->model->listAll();
            }
            error_log("Artigos retornados: " . json_encode($articles)); // Adicione isso
            return $this->respond($articles, 200);
        } catch (Exception $e) {
            error_log("Erro no listAll: " . $e->getMessage()); // Adicione isso
            return $this->respond(['error' => $e->getMessage()], 500);
        }
    }

    public function listByUser($user_id)
    {
        $articles = $this->model->findByUserId($user_id);
        return $this->respond($articles);
    }


    private function respond($data, $status = 200)
    {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}
