import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";
import "../index.css";
import glass from "../img/magnifying_search_searching.png";
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
    <div className="flex flex-col items-center justify-start h-screen pt-[15vh] w-[400px]">
      <div className="flex items-center rounded-full overflow-hidden shadow-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Please enter your query"
          className="px-5 py-3 text-base outline-none border-none w-[300px] h-[55px] rounded-tl-full rounded-bl-full"
        />
        <button
            onClick={handleSearch}
            className="px-6 py-4 text-base bg-blue-500 border-none rounded-tr-full rounded-br-full cursor-pointer transition-colors duration-300 hover:bg-blue-600"
        >
          <img src={glass} alt="Glass" className="w-6"/>
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
