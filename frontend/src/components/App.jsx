import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";
import Filters from "./Filters";
import SearchBar from "./Searchbar";
import Logo from "./Logo";
import "../index.css";
import Results from "./Results";

const App = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});

    const handleFiltersChange = (updatedFilters) => {
        setFilters(updatedFilters);
        console.log("Updated filters:", updatedFilters);
    };

    return (
        <div className="app-container flex flex-row bg-bulbasaur min-h-screen bg-cover bg-center bg-no-repeat">
            <div className="Suggestions"></div>
            <div className="">
                <Logo />
            </div>
            <div className="">
                <SearchBar
                    setResults={setResults}
                    setLoading={setLoading}
                    filters={filters}
                />
            </div>
            {results.length > 0 && (
                <div className="pokemon-results">
                    <Results results={results} loading={loading} />
                </div>
            )}
            <div className="">
                <Filters onFiltersChange={handleFiltersChange} />
            </div>
        </div>
    );
};

export default App;
