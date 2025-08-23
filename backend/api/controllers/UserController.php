<?php

require_once __DIR__ . "/../models/UserModel.php";

class UserController {
    private $model;

    public function __construct($pdo)
    {
        $this->model = new userModel($pdo);
    }

    public function createUser(){
        $input = json_decode(file_get_contents('php://input'), true);

        $name = $input['name'] ?? '';
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (!$name || !$email || !$password){
            return $this->respond(['error' => 'Name, E-mail and password are necessarily']);
        }

        $data = $input;
        $success = $this->model->register($data);

        return $this->respond(['success' => $success], $success ? 201 : 500);
    }

    public function loginUser() {
        $input = json_decode(file_get_contents('php://input'), true);

        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (!$email || !$password) {
            return $this->respond(['error' => 'Email e senha são obrigatórios'], 400);
        }

        $user = $this->model->login($email, $password);

        if ($user) {
            // Você pode gerar um token JWT aqui para autenticação
            // Exemplo simples sem JWT:
            return $this->respond(['success' => true, 'user' => $user], 200);
        } else {
            return $this->respond(['success' => false, 'error' => 'Email ou senha inválidos'], 401);
        }
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
