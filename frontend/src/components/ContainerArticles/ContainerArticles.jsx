import { useState, useEffect } from 'react';
import Article from "../Article/Article"
import "./ContainerArticles.sass"

export default function ContainerArticles({ query }) {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async (query) => {
    console.log("Enviando requisição para:", `http://localhost:8000/api/article/all?q=${encodeURIComponent(query)}`);
    try {
      const res = await fetch(
        `http://localhost:8000/api/article/all?q=${encodeURIComponent(query)}`
      );
      console.log("Status da resposta:", res.status);
      if (!res.ok) {
        const text = await res.text();
        console.error("Resposta do servidor:", text);
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Resposta não é JSON:", await res.text());
        return [];
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar artigos:", error);
      return [];
    }
  };

  const loadArticles = async () => {
    const data = await fetchArticles(query);
    setArticles(data || []);
  };

  useEffect(() => {
    loadArticles();
  }, [query]);

  return (
    <div className="containerArticles">
      {articles.length === 0 ? (
        <p>Nenhum artigo encontrado.</p>
      ) : (
        articles.map((article) =>
          article && article.id ? (
            <Article key={article.id} article={article} />
          ) : null
        )
      )}
    </div>
  );
}