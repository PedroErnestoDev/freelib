<?php
header("Content-Type: application/json");

class db {
    private $host = "localhost";
    private $password = "root";
    private $username = "root";
    private $dbName = "freelib";
    public $conn;

    function conexao(){
        try {
            $this->conn = new PDO("mysql:host={$this->host};dbname={$this->dbName}", 
            $this->username, $this->password);

            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conn;
            
        }
        catch (PDOException $e) {
            die("Falha na conexao" . $e->getMessage());
        }
    }
}