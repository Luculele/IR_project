import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";
import "../index.css";
import glass from "../img/magnifying_search_searching.png";
const SearchBar = ({ setResults, setLoading, filters }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    // if (!query.trim()) return;
    // setLoading(true);
    try {
      const data = await searchPokemon(query, filters);
      console.log("Data from API:", data);
      setResults(data);
    } catch (error) {
      console.error("Error during search:", error);
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
    <div className="flex flex-col items-center justify-start h-screen pt-[15vh] w-[800px]">
      <div className="flex items-center rounded-full overflow-hidden shadow-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Please enter your query"
          className="px-5 py-3 text-base outline-none border-none w-[800px] h-[70px] rounded-tl-full rounded-bl-full"
        />
        <button
          onClick={handleSearch}
          className="w-[85px] h-[70px] px-6 py-4 text-base bg-blue-500 border-none rounded-tr-full rounded-br-full cursor-pointer transition-colors duration-300 hover:bg-blue-600"
        >
          <img src={glass} alt="Glass" className="w-6" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
