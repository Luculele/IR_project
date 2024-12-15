import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../index.css";
import glass from "../img/magnifying_search_searching.png";
const SearchBar = ({ query, setQuery, setResults, setLoading, filters }) => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    // if (!query.trim()) return;
    // setLoading(true);
    try {
      const data = await searchPokemon(query, filters);
      console.log("Data from API:", data);
      setResults(data);
      navigate("/");
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
    <div className="flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center rounded-full overflow-hidden shadow-lg w-full max-w-[600px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Please enter your query"
            className="px-5 py-3 text-2xl outline-none border-none flex-grow h-[60px] text-center"
            style={{ fontSize: "1.5rem", lineHeight: "1.5rem" }}
            aria-label="Search query input"
          />
          <Link
            to="/"
            onClick={handleSearch}
            className="w-[70px] h-[60px] bg-blue-500 text-white flex items-center justify-center border-none rounded-tr-full rounded-br-full transition-colors duration-300 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src={glass} alt="Search icon" className="w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
