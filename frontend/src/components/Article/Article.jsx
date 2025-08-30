import "./Article.sass";
import { BASE_URL } from "../../services/api";

export default function Article({ article }) {
  if (!article || !article.id) {
    return null;
  }

  const handleClick = () => {
    if (article.file_path) {
      window.open(`${BASE_URL}/${article.file_path}`, "_blank");
    }
  };

  return (
    <div className="containerArticle" onClick={handleClick}>
      <div id={article.id} className="articleCard">
        {article.cover_image && (
          <img
            src={`${BASE_URL}/${article.cover_image}`}
            alt={article.title || "Sem título"}
            className="imgArticles"
          />
        )}
        <h1 className="titleArticles">{article.title || "Sem título"}</h1>
      </div>
    </div>
  );
}