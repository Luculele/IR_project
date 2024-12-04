import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";
import Filters from "./Filters";
import SearchBar from "./Searchbar";
import Logo from "./Logo";
import "../index.css";
import Results from "./Results";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters);
    console.log("Updated filters:", updatedFilters);
  };

  return (
    <div className="app-container flex flex-row">
      <div className="Suggestions"></div>
      <div className="">
        <Logo />
      </div>
      <div className="">
        <SearchBar filters={filters} />
      </div>
      <div className="pokemon-results hidden">
        <Results />
      </div>
      <div className="">
        <Filters onFiltersChange={handleFiltersChange} />
      </div>
    </div>
  );
};

export default App;
