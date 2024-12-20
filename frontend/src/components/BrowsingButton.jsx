import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const BrowsingButton = ({
  query,
  setQuery,
  setResults,
  setLoading,
  filters,
}) => {
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);
  const [defaultFilters, setDefaultFilters] = useState({
    total: [175, 1125],
    hp: [1, 255],
    attack: [5, 190],
    defense: [5, 250],
    sp_atk: [10, 194],
    sp_def: [20, 255],
    speed: [5, 200],
    type1: "",
    type2: "",
  });

  const handleSearch = async () => {
    // if (!query.trim()) return;
    // setLoading(true);
    setLoading(true);
    try {
      const data = await searchPokemon("", defaultFilters);
      console.log("Data from API:", data);

      if (data.length === 0) {
        setIsEmpty(true);
        setResults([]);
      } else {
        setIsEmpty(false);
        setResults(data);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during search:", error);
      setIsEmpty(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-blue-500 text-lg text-white px-4 py-2 rounded-3xl shadow-lg h-[5.2vh] hover:bg-blue-600 transition-all duration-300 ml-2"
      onClick={handleSearch}
    >
      Browsing
    </button>
  );
};

export default BrowsingButton;
