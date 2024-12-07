import React from "react";

const Results = ({ results, loading }) => {
  console.log("Results received by Results component:", results);
  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (results.length === 0) {
    return <p className="no-results-text">No results found</p>;
  }

  return (
    <div className="results-container p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Search Results</h2>
      <ul className="results-list">
        {results.map((pokemon, index) => (
          <li key={index} className="p-2 border-b last:border-b-0">
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

export default Results;
