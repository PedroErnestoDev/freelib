<?php

class ArticleModel
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Criar artigo
    public function create($data)
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO articles (user_id, title, summary, cover_image, file_path, published_at)
            VALUES (:user_id, :title, :summary, :cover_image, :file_path, NOW())
        ");

        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':title', $data['title']);
        $stmt->bindParam(':summary', $data['summary']);
        $stmt->bindParam(':cover_image', $data['cover_image']);
        $stmt->bindParam(':file_path', $data['file_path']);

        return $stmt->execute();
    }

    // Listar todos os artigos
    public function listAll()
    {
        $stmt = $this->pdo->query("SELECT id, user_id, title, summary, cover_image, file_path, published_at FROM articles ORDER BY published_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function search($q = null)
    {
        if (!$q) return $this->listAll();
        $stmt = $this->pdo->prepare("SELECT id, user_id, title, summary, cover_image, file_path, published_at FROM articles WHERE title LIKE :q OR summary LIKE :q ORDER BY published_at DESC");
        $stmt->bindValue(':q', "%$q%", PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Listar artigos de um usuário específico
    public function findByUserId($userId)
    {
        $stmt = $this->pdo->prepare("
        SELECT id, user_id, title, summary, cover_image, file_path, published_at
        FROM articles 
        WHERE user_id = ?
        ORDER BY published_at DESC
    ");
        $stmt->execute([$userId]); // corresponde ao '?'
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
