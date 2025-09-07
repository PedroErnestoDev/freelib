import { useEffect, useState } from "react";
import Article from "../Article/Article";
import { BASE_URL } from "../../services/api";
import "./UserArticlesList.sass";

export default function UserArticlesList({ userId }) {
  const [articles, setArticles] = useState([]);

  const fetchUserArticles = async () => {
    if (!userId) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/article/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 🔑 Envia o JWT
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
      const data = await res.json();
      setArticles(data || []);
    } catch (err) {
      console.error("Erro ao buscar artigos do usuário:", err);
      setArticles([]);
    }
  };

  useEffect(() => {
    fetchUserArticles();
  }, [userId]);

  if (!articles.length) return <p>Nenhum artigo encontrado.</p>;

  return (
    <>
      <h1>Seus Arquivos</h1>
      <div className="userArticlesList">
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
