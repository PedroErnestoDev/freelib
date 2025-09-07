<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware
{
    private static $jwtSecret = "pedroç";
    private static $jwtAlgo   = "HS256";

    public static function validateToken()
    {
        $headers = function_exists('getallheaders') ? getallheaders() : [];

        // Alguns servidores podem fornecer 'authorization' em minúsculo
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

        if (!$authHeader || stripos($authHeader, 'Bearer ') !== 0) {
            http_response_code(401);
            echo json_encode(["error" => "Token não fornecido"]);
            exit;
        }

        $token = trim(substr($authHeader, 7)); // remove "Bearer "

        try {
            $decoded = JWT::decode($token, new Key(self::$jwtSecret, self::$jwtAlgo));
            // Retorne como array para facilitar
            return (array)$decoded;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(["error" => "Token inválido ou expirado"]);
            exit;
        }
    }
}
