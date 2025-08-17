<?php 

class ProdutoModel {
    private $pdo;
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    public function register($data){
        // post
        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];

        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $this->pdo->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $passwordHash);

        $userRegistered = $stmt->execute();
        return $userRegistered;
    }
    public function login($nome, $preco, $qtd, $id){
        // post
        
    }
}