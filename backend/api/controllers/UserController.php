<?php

require_once __DIR__ . "/../models/UserModel.php";

class UserController {
    private $model;

    public function __construct($pdo)
    {
        $this->model = new ProdutoModel($pdo);
    }

    public function createUser(){
        $input = json_decode(file_get_contents('php://input'), true);
        $data = $input;
        $success = $this->model->register($data);
        return $this->respond(['success' => $success], $success ? 201 : 500);
    }

    public function loginUser() {
        
    }

    private function respond($data, $status = 200) {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    private function validate($data) {
        return true;
    }
}
