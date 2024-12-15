import React from "react";
import { Link } from "react-router-dom";

const typeColors = {
  Grass: "bg-green-500 text-white",
  Poison: "bg-purple-500 text-white",
  Fire: "bg-red-500 text-white",
  Water: "bg-blue-500 text-white",
  Electric: "bg-yellow-500 text-black",
  Flying: "bg-indigo-500 text-white",
  Bug: "bg-green-700 text-white",
  Psychic: "bg-pink-500 text-white",
  Rock: "bg-gray-500 text-white",
  Ground: "bg-yellow-700 text-white",
  Ice: "bg-cyan-500 text-black",
  Dragon: "bg-orange-500 text-white",
  Dark: "bg-gray-800 text-white",
  Fairy: "bg-pink-300 text-black",
  Steel: "bg-gray-300 text-black",
  Fighting: "bg-red-700 text-white",
  Ghost: "bg-purple-800 text-white",
  Normal: "bg-gray-200 text-black",
};

const Results = ({ results, loading, sidebarVisible }) => {
  console.log("Results received by Results component:", results);

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Loading...</p>;
  }

  if (results.length === 0) {
    return <p className="text-center mt-4 text-gray-600">No results found</p>;
  }

  return (
    <div
      className="results-container p-4 rounded max-h-[600px] overflow-y-auto no-scrollbar"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 #f1f5f9" }}
    >
      {/* Conditionally adjust layout */}
      <div
        className={`grid gap-10 transition-all duration-300${
          sidebarVisible
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        }`}
        style={{
          marginLeft: sidebarVisible ? "0px" : "0px",
          paddingLeft: sidebarVisible ? "0px" : "0px",
          paddingRight: sidebarVisible ? "20px" : "20px",
        }}
      >
        {results.map((pokemon) => (
          <Link
            className="pokemon-card bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition transform hover:scale-105 "
            to={`/pokemon/${pokemon.id}`}
            key={pokemon.id}
          >
            <div className="pokemon-inner-card bg-white rounded-lg shadow-lg p-2 flex flex-col items-center hover:shadow-xl transition-shadow">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {pokemon.name}
              </h3>
              {pokemon.form && String(pokemon.form).trim() !== "No form" ? (
                <h3 className="text-lg font-semibold text-gray-500 text-center">
                  {pokemon.form}
                </h3>
              ) : (
                <div className="h-6"></div>
              )}
              <p className="text-sm text-gray-600 mt-2 text-center h-7">
                #{pokemon.number}
              </p>
              <div className="flex space-x-2 mt-2">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${
                    typeColors[pokemon.type1] || "bg-gray-300 text-black"
                  }`}
                >
                  {pokemon.type1}
                </span>
                {pokemon.type2 &&
                  String(pokemon.type2).trim() !== "No type" && (
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        typeColors[pokemon.type2]
                      }`}
                    >
                      {pokemon.type2}
                    </span>
                  )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Results;
