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
import "primeicons/primeicons.css";

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
        <div className="transition-all duration-300">
          <Sidebar
            visible={sidebarVisible}
            onHide={() => setSidebarVisible(false)}
            position="right"
            modal={false}
            dismissable={false}
          >
            {/*<h2 className="text-xl font-bold mb-4">Filters</h2>*/}
            <Filters onFilterChange={handleFiltersChange} />
          </Sidebar>
        </div>

        <div
          className={`fixed top-1/2 transform -translate-y-1/2 rotate-90 z-50 flex items-center justify-center bg-blue-500 text-white w-16 h-12 shadow-lg hover:bg-blue-600 transition-all duration-300 clip-path-trapezoid ${
            sidebarVisible ? "right-[311px]" : "right-[-8px]"
          }`}
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          <i
            className={`pi ${
              sidebarVisible ? "pi-arrow-up" : "pi-arrow-down"
            } text-xl`}
          ></i>
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
