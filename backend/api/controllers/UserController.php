<?php

require_once __DIR__ . "/../models/UserModel.php";
require_once __DIR__ . "/../models/ArticleModel.php";

require_once __DIR__ . "/../../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UserController
{
    private $model;
    private $articleModel;
    private $jwtSecret = "pedroç"; // Use uma chave segura
    private $jwtAlgo = "HS256"; // algoritmo recomendado


    public function __construct($pdo)
    {
        $this->model = new UserModel($pdo);
        $this->articleModel = new ArticleModel($pdo);
    }

    private function setJWT(int $userId)
    {
        try {
            $payload = [
                'iss' => 'http://localhost:8000',
                'iat' => time(),
                'exp' => time() + 3600, // 1 hora
                'sub' => $userId,       // id do usuário
            ];

            $token = JWT::encode($payload, $this->jwtSecret, $this->jwtAlgo);

            return ["token" => $token, "error" => false];
        } catch (Exception $ex) {
            return ["token" => null, "error" => true];
        }
    }

    public function profile($id)
    {

        $user = $this->model->findById($id);

        if (!$user) {
            return $this->respond(['error' => 'Usuário nao encontrado'], 404);
        }

        $articles = $this->articleModel->findByUserId($id);

        return $this->respond([
            'user' => $user,
            'articles' => $articles
        ]);
    }

    public function createUser()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        $name = $input['name'] ?? '';
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (!$name || !$email || !$password) {
            return $this->respond(['error' => 'Name, E-mail and password are necessarily']);
        }

        $data = $input;
        $success = $this->model->register($data);

        return $this->respond(['success' => $success], $success ? 201 : 500);
    }

    public function loginUser()
    {
        $input = json_decode(file_get_contents('php://input'), true);

        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (!$email || !$password) {
            return $this->respond(['error' => 'Email e senha são obrigatórios'], 400);
        }

        // Deve retornar o usuário (ex.: ['id'=>..., 'email'=>..., 'name'=>..., 'password'=>...])
        $user = $this->model->login($email, $password);

        if (!$user) {
            return $this->respond(['success' => false, 'error' => 'Email ou senha inválidos'], 401);
        }

        // Se seu model->login já usa password_verify internamente, ok.
        // Se NÃO usa, faça:
        // if (!password_verify($password, $user['password'])) {
        //     return $this->respond(['success'=>false,'error'=>'Email ou senha inválidos'],401);
        // }

        $jwt = $this->setJWT((int)$user['id']);

        if ($jwt['error'] === true || !$jwt['token']) {
            return $this->respond(['error' => 'Erro ao gerar token'], 500);
        }

        return $this->respond([
            'success' => true,
            'token'   => $jwt['token'],
            'user'    => [
                'id'    => $user['id'],
                'email' => $user['email'],
                'name'  => $user['name'] ?? null,
            ],
        ], 200);
    }

    private function respond($data, $status = 200)
    {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    private function validate($data)
    {
        return true;
    }
}
