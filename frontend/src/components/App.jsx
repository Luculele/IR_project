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
            <div className="app-container flex flex-row bg-bulbasaur min-h-screen bg-cover bg-center bg-no-repeat">
                <div className="Suggestions"></div>
                <div>
                    <Logo />
                </div>
                <div>
                    <SearchBar
                        setResults={setResults}
                        setLoading={setLoading}
                        filters={filters}
                    />
                </div>
                <div>
                    <Filters onFilterChange={handleFiltersChange} />
                </div>
                <Routes>
                    {/* Default Results Page */}
                    <Route
                        path="/"
                        element={<Results results={results} loading={loading} />}
                    />
                    {/* Pokémon Details Page */}
                    <Route
                        path="/pokemon/:id"
                        element={<PokemonDetails data={results} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
