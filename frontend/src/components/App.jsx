import React, { useState } from "react";
import { searchPokemon } from "../utils/solrApi";
import NavBar from "./NavBar";
import SearchBar from "./Searchbar";
import "../index.css";

const App = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filter state with min/max ranges
    const [filters, setFilters] = useState({
        total: [175, 1125],
        hp: [1, 255],
        attack: [5, 190],
        defense: [5, 250],
        sp_atk: [10, 194],
        sp_def: [20, 255],
        speed: [5, 200],
        form: "",
        type1: "",
        type2: "",
    });

    const handleSearch = async () => {
        setLoading(true);
        try {
            const combinedQuery = {
                query,
                filters,
            };
            const data = await searchPokemon(combinedQuery);
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

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    return (
        <div className="app-container">
            {/* Search Bar */}
            <SearchBar filters={filters} handleSearch={handleSearch} handleKeyPress={handleKeyPress} />

            {/* Navigation Bar for filters */}
            {/*<NavBar filters={filters} onFilterChange={handleFilterChange} />*/}
        </div>
    );
};

export default App;
