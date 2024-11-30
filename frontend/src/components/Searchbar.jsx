import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchPokemon(query);
      setResults(data);
    } catch (error) {
      console.error("Errore durante la ricerca:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pokemon Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca un Pokémon"
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px",
        }}
      />
      <button onClick={handleSearch} style={{ padding: "10px" }}>
        Cerca
      </button>
      {loading && <p>Caricamento...</p>}
      <ul>
        {results.map((pokemon, index) => (
          <li key={index}>
            <strong>{pokemon.name}</strong> - Tipo:{" "}
            {pokemon.type || "Sconosciuto"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
