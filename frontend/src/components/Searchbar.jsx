import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import glass from "../img/magnifying_search_searching.png";
import NotFound from "./NotFound";

const SearchBar = ({ query, setQuery, setResults, setLoading, filters }) => {
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false); // New state to check empty results

  const handleSearch = async () => {
    // if (!query.trim()) return;
    // setLoading(true);
    try {
      const data = await searchPokemon(query, filters);
      console.log("Data from API:", data);

      if (data.length === 0) {
        setIsEmpty(true); // If no results, show NotFound
        setResults([]); // Clear previous results
      } else {
        setIsEmpty(false);
        setResults(data);
        navigate("/"); // Navigate to home or results page
      }
    } catch (error) {
      console.error("Error during search:", error);
      setIsEmpty(true); // Show NotFound on error as well
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch().then();
    }
  };

  return (
      <div className="flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center rounded-full overflow-hidden shadow-lg w-full max-w-[70vh] max-h-[6vh]">
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

        {/* Conditionally render NotFound if results are empty */}
        {isEmpty && <NotFound />}
      </div>
  );
};

export default SearchBar;
