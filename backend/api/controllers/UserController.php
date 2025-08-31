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

    private function setJWT($user){
        try {
            $payload = [
            'iss' => 'http://localhost:8000', // emissor
            'aud' => 'http://localhost:5173', // audiência (frontend)
            'iat' => time(), // hora de emissão
            'exp' => time() + 3600, // expira em 1 hora
            'userId' => $user, // id do usuário
        ];

        $token = JWT::encode($payload, $this->jwtSecret, $this->jwtAlgo);

        return [
            "token" => $token,
            "error" => false
        ];
    } catch(Exception $ex){
        return [
            "token" => null,
            "error" => true
        ];
    }
        
    }

    public function profile($id)
    {
        $user = AuthMiddleware::validateToken();

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

        $user = $this->model->login($email, $password);

        $jwt = $this->setJWT($user);

        if($jwt['error'] == true && $jwt['token'] == null){
            return $this->respond(['error' => 'Unknown error']);
        }

        if ($user) {
            return $this->respond([
                'success' => true,
                'token' => $jwt["token"], // ou JWT real
                'user'  => $user
            ], 200);
        } else {
            return $this->respond(['success' => false, 'error' => 'Email ou senha inválidos'], 401);
        }
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
