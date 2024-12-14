import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import Filters from "./Filters";
import SearchBar from "./Searchbar";
import Logo from "./Logo";
import Results from "./Results";
import PokemonDetails from "./PokemonDetails";
import "../index.css";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact Theme
import "primereact/resources/primereact.min.css"; // Core CSS

const App = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleFiltersChange = (updatedFilters) => {
        setFilters(updatedFilters);
        console.log("Updated filters in app:", updatedFilters);
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-bulbasaur bg-cover bg-center bg-no-repeat">
                {/* Sidebar for Filters */}
                <Sidebar
                    visible={sidebarVisible}
                    onHide={() => setSidebarVisible(false)}
                    position="right" // This moves the sidebar to the right
                    modal={false} // Allows interaction with the rest of the page
                    dismissable={false} // Prevent sidebar from closing on interactions inside it
                >
                    {/*<h2 className="text-xl font-bold mb-4">Filters</h2>*/}
                    <Filters onFilterChange={handleFiltersChange} />
                </Sidebar>


                {/* Sidebar Toggle Button */}
                <div className="p-4">
                    <Button
                        icon="pi pi-arrow-right"
                        label="Filters"
                        onClick={() => setSidebarVisible(true)}
                        className="p-button-rounded p-button-secondary"
                    />
                </div>

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

                {/* Results Section */}
                <div className="flex flex-grow">
                    <div className="w-full p-6">
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
                </div>
            </div>
        </Router>
    );
};

export default App;
