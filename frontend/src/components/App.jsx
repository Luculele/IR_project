import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { searchPokemon } from "../utils/solrApi";
import Filters from "./Filters";
import SearchBar from "./Searchbar";
import Logo from "./Logo";
import Results from "./Results";
import PokemonDetails from "./PokemonDetails";
import "../index.css";

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters);
    console.log("Updated filters in app:", updatedFilters);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-bulbasaur bg-cover bg-center bg-no-repeat">
        {/* Title Section */}
        <div className="w-full p-4">
          <Logo />
        </div>

        {/* Search Bar */}
        <div className="w-full p-4">
          <SearchBar
            setResults={setResults}
            setLoading={setLoading}
            filters={filters}
          />
        </div>

        {/* Results and Filters */}
        <div className="flex flex-grow">
          {/* Results Section */}
          <div className="w-3/4 p-6">
            <Routes>
              <Route
                path="/"
                element={<Results results={results} loading={loading} />}
              />
              <Route
                path="/pokemon/:id"
                element={<PokemonDetails data={results} />}
              />
            </Routes>
          </div>

          {/* Filters Section */}
          <div className="w-1/4 p-6 bg-gray-100 border-l border-gray-300">
            <Filters onFilterChange={handleFiltersChange} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
