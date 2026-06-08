import { useState } from "react";
import { articles } from "./data";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const filteredArticles = articles.filter((article) => {
    const text =
      article.title.toLowerCase() +
      " " +
      article.content.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  const highlightText = (text) => {
    if (!search) return text;

    const parts = text.split(
      new RegExp(`(${search})`, "gi")
    );

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container">
      <h1>Search</h1>

      <input
      className="search-input"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{filteredArticles.length} posts were found.</p>

      {filteredArticles.map((article) => (
        <div key={article.id} className="article">
          <h2>{highlightText(article.title)}</h2>

          <small>{article.date}</small>

          <p>{highlightText(article.content)}</p>
        </div>
      ))}
    </div>
  );
}

export default App;