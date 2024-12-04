import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";
import "../index.css";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches
    setLoading(true);
    try {
      const data = await searchPokemon(query);

      setResults(data);
    } catch (error) {
      console.error("Error during the searching", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container w-[400px]">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Please enter your query"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Submit
        </button>
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      <ul className="results-list">
        {results.map((pokemon, index) => (
          <li key={index}>
            <strong>{pokemon.name}</strong> - type:{" "}
            <span className="type">
              {pokemon.type1 || "Not Available"}
              {pokemon.type2 !== "No type" ? `, ${pokemon.type2}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
