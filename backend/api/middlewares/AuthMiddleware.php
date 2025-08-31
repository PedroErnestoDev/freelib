<?php
require_once __DIR__ . "/../../vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    private static $jwtSecret = "pedroç";
    private static $jwtAlgo = "HS256";

    /**
     * Verifica se o token é válido
     */
    public static function validateToken() {
        $headers = apache_request_headers();

        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(["error" => "Token não fornecido"]);
            exit;
        }

        $authHeader = $headers['Authorization'];
        $token = str_replace("Bearer ", "", $authHeader);

        try {
            $decoded = JWT::decode($token, new Key(self::$jwtSecret, self::$jwtAlgo));
            return $decoded; // retorna payload decodificado
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(["error" => "Token inválido", "details" => $e->getMessage()]);
            exit;
        }
    }
}
