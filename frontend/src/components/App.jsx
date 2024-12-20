import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import Filters from "./Filters";
import SearchBar from "./Searchbar";
import Logo from "./Logo";
import Results from "./Results";
import BrowsingButton from "./BrowsingButton";
import PokemonDetails from "./PokemonDetails";
import "../index.css";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";
import NotFound from "./NotFound";

const App = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
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
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [query, setQuery] = useState("");

  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters);
    console.log("Updated filters in app:", updatedFilters);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-bulbasaur bg-cover bg-center bg-no-repeat">
        {/* Sidebar for Filters */}
        <div className="sidebar transition-all duration-300 ">
          <Sidebar
            visible={sidebarVisible}
            onHide={() => setSidebarVisible(false)}
            position="right"
            modal={false}
            dismissable={false}
            style={{
              backgroundColor: "rgba(236, 236, 236, 0.85)",
              borderRadius: "1rem",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              height: "90vh",
            }}
          >
            <Filters
              filters={filters}
              query={query}
              onFilterChange={handleFiltersChange}
              setResults={(newResults) => {
                setResults(newResults);
                if (newResults.length >= 0) setIsResultsVisible(true);
              }}
              setLoading={setLoading}
            />
          </Sidebar>
        </div>

        {/* Sidebar Toggle */}
        <div
          className={`fixed top-1/2 transform -translate-y-1/2 rotate-90 z-50 flex items-center justify-center bg-blue-500 text-white w-14 h-10 shadow-lg hover:bg-blue-600 transition-all duration-300 clip-path-trapezoid ${
            sidebarVisible ? "right-[19.5em]" : "right-[-0.5rem]"
          }`}
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          <i
            className={`pi ${
              sidebarVisible ? "pi-arrow-up" : "pi-arrow-down"
            } text-lg`}
          ></i>
        </div>

        {/* Title Section */}
        <div className="w-full p-4 max-h-[15vh]">
          <Logo />
        </div>

        {/* Search Bar */}
        <div className=" w-[92vw] px-4 py-2 max-h-[6vh]  flex items-center space-x-10 justify-center">
          {/* Browsing button */}
          <BrowsingButton
            query={query}
            setQuery={setQuery}
            setResults={(newResults) => {
              setResults(newResults);
              if (newResults.length >= 0) setIsResultsVisible(true);
            }}
            setLoading={setLoading}
            filters={filters}
          />
          <SearchBar
            query={query}
            setQuery={setQuery}
            setResults={(newResults) => {
              setResults(newResults);
              if (newResults.length >= 0) setIsResultsVisible(true);
            }}
            setLoading={setLoading}
            filters={filters}
          />
        </div>

        {/* Results Section */}
        <div
          className={`rounded-3xl mx-4 md:mx-8 lg:mx-20 my-5 max-h-[70vh]  transition-all duration-300 ${
            isResultsVisible ? "flex" : "hidden"
          }`}
          style={{
            backgroundColor: "rgba(236, 236, 236, 0.95)",
            width: sidebarVisible ? "calc(90vw - 280px)" : "90vw",
            transition:
              "width 300ms ease-in-out, margin-right 300ms ease-in-out",
            marginRight: sidebarVisible ? "256px" : "0px",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                results.length === 0 ? (
                  <NotFound />
                ) : (
                  <Results
                    results={results}
                    loading={loading}
                    sidebarVisible={sidebarVisible}
                  />
                )
              }
            />
            <Route
              path="/pokemon/:id"
              element={<PokemonDetails results={results} />}
            />
          </Routes>
        </div>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
