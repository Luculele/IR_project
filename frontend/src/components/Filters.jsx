import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { searchPokemon } from "../utils/solrApi";
import "../index.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const Filters = ({
  filters,
  query,
  onFilterChange,
  setResults,
  setLoading,
}) => {
  const defaultFilters = {
    total: [175, 1125],
    hp: [1, 255],
    attack: [5, 190],
    defense: [5, 250],
    sp_atk: [10, 194],
    sp_def: [20, 255],
    speed: [5, 200],
    type1: "",
    type2: "",
  };

  const attributeRanges = {
    total: { min: 175, max: 1125 },
    hp: { min: 1, max: 255 },
    attack: { min: 5, max: 190 },
    defense: { min: 5, max: 250 },
    sp_atk: { min: 10, max: 194 },
    sp_def: { min: 20, max: 255 },
    speed: { min: 5, max: 200 },
  };

  const handleSliderChange = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: [
        Math.max(attributeRanges[key].min, Math.min(value[0], filters[key][1])),
        Math.min(attributeRanges[key].max, Math.max(value[1], filters[key][0])),
      ],
    };
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleTypeChange = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: value === "Any" ? "" : value,
    };
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleReonFilterChange = () => {
    if (onFilterChange) onFilterChange(defaultFilters);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchPokemon(query, filters);
      console.log("Data from API:", data);
      setResults(data);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  const typeColors = {
    Any: "bg-gray-200 text-black",
    Grass: "bg-green-500 text-white",
    Poison: "bg-purple-500 text-white",
    Fire: "bg-red-500 text-white",
    Water: "bg-blue-500 text-white",
    Electric: "bg-yellow-500 text-black",
    Flying: "bg-indigo-500 text-white",
    Bug: "bg-green-700 text-white",
    Psychic: "bg-pink-500 text-white",
    Rock: "bg-gray-500 text-white",
    Ground: "bg-yellow-700 text-white",
    Ice: "bg-cyan-500 text-black",
    Dragon: "bg-orange-500 text-white",
    Dark: "bg-gray-800 text-white",
    Fairy: "bg-pink-300 text-black",
    Steel: "bg-gray-300 text-black",
    Fighting: "bg-red-700 text-white",
    Ghost: "bg-purple-800 text-white",
    Normal: "bg-gray-200 text-black",
  };

  const typeColorsHex = {
    Grass: "rgba(34, 139, 34, 0.4)",
    Poison: "rgba(128, 0, 128, 0.4)",
    Fire: "rgba(255, 69, 0, 0.4)",
    Water: "rgba(30, 144, 255, 0.4)",
    Electric: "rgba(255, 215, 0, 0.4)",
    Flying: "rgba(135, 206, 235, 0.4)",
    Bug: "rgba(34, 139, 34, 0.4)",
    Psychic: "rgba(255, 20, 147, 0.4)",
    Rock: "rgba(139, 69, 19, 0.4)",
    Ground: "rgba(210, 180, 140, 0.4)",
    Ice: "rgba(173, 216, 230, 0.4)",
    Dragon: "rgba(255, 140, 0, 0.4)",
    Dark: "rgba(47, 79, 79, 0.4)",
    Fairy: "rgba(255, 192, 203, 0.4)",
    Steel: "rgba(192, 192, 192, 0.4)",
    Fighting: "rgba(178, 34, 34, 0.4)",
    Ghost: "rgba(75, 0, 130, 0.4)",
    Normal: "rgba(169, 169, 169, 0.4)",
  };

  const typeColorsRGB = {
    Grass: "34, 139, 34",
    Poison: "128, 0, 128",
    Fire: "255, 69, 0",
    Water: "30, 144, 255",
    Electric: "255, 215, 0",
    Flying: "135, 206, 235",
    Bug: "34, 139, 34",
    Psychic: "255, 20, 147",
    Rock: "139, 69, 19",
    Ground: "210, 180, 140",
    Ice: "173, 216, 230",
    Dragon: "255, 140, 0",
    Dark: "47, 79, 79",
    Fairy: "255, 192, 203",
    Steel: "192, 192, 192",
    Fighting: "178, 34, 34",
    Ghost: "75, 0, 130",
    Normal: "169, 169, 169",
  };

  return (
    <div className="fixed top-53 right-9 h-100 w-64 p-4 overflow-y-auto bg-white  shadow-2xl rounded-xl">
      <h2 className="text-xl font-bold mb-4 place-self-center">Filters</h2>

      {Object.entries(filters)
        .filter(([key, value]) => Array.isArray(value))
        .map(([key, range]) => (
          <div key={key} className="mb-6">
            <label htmlFor={key} className="block font-medium mb-1 capitalize">
              {key.replace("_", " ")}:
            </label>
            <div className="mb-2 flex justify-between text-sm text-gray-700 items-center">
              <input
                type="number"
                min={attributeRanges[key].min}
                max={filters[key][1]}
                value={filters[key][0]}
                onBlur={(e) => {
                  const newMin = Number(e.target.value);
                  const clampedMin = Math.max(
                    attributeRanges[key].min,
                    Math.min(newMin, filters[key][1])
                  );
                  handleSliderChange(key, [clampedMin, filters[key][1]]);
                }}
                onChange={(e) => {
                  const newMin = Number(e.target.value);
                  const updatedFilters = { ...filters };
                  updatedFilters[key][0] = newMin;
                  onFilterChange(updatedFilters);
                }}
                className="w-16 text-center border border-green-400 focus:ring-2 focus:ring-green-300 rounded-lg bg-green-50 text-gray-700 placeholder-gray-400 shadow-md transition duration-200 ease-in-out"
                placeholder="Min"
              />
              <span className="mx-2">to</span>
              <input
                type="number"
                min={filters[key][0]}
                max={attributeRanges[key].max}
                value={filters[key][1]}
                onBlur={(e) => {
                  const newMax = Number(e.target.value);
                  const clampedMax = Math.min(
                    attributeRanges[key].max,
                    Math.max(newMax, filters[key][0])
                  );
                  handleSliderChange(key, [filters[key][0], clampedMax]);
                }}
                onChange={(e) => {
                  const newMax = Number(e.target.value);
                  const updatedFilters = { ...filters };
                  updatedFilters[key][1] = newMax;
                  onFilterChange(updatedFilters);
                }}
                className="w-16 text-center border border-blue-400 focus:ring-2 focus:ring-blue-300 rounded-lg bg-blue-50 text-gray-700 placeholder-gray-400 shadow-md transition duration-200 ease-in-out"
                placeholder="Max"
              />
            </div>
            <Slider
              value={filters[key]}
              onChange={(e) => {
                handleSliderChange(key, e.value);
              }}
              className="w-full custom-slider"
              range
              min={attributeRanges[key].min}
              max={attributeRanges[key].max}
            />
          </div>
        ))}

      <div className="mb-6">
        <label htmlFor="type1" className="block font-medium mb-1 text-gray-700">
          Type 1:
        </label>
        <Dropdown
          id="type1"
          value={filters.type1}
          onChange={(e) => handleTypeChange("type1", e.value)}
          options={Object.keys(typeColors)}
          optionLabel="name"
          placeholder="Select Type 1"
          className="w-full border rounded-lg shadow-md text-white transition duration-200 ease-in-out "
          style={{
            backgroundColor: filters.type1
              ? typeColorsHex[filters.type1]
              : "rgba(200, 200, 200, 0.8)",
            border: `2px solid rgba(${
              filters.type1 && filters.type1 !== "Any"
                ? typeColorsRGB[filters.type1]
                : "200, 200, 200"
            }, 1)`,
          }}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="type2" className="block font-medium mb-1 text-gray-700">
          Type 2:
        </label>
        <Dropdown
          id="type2"
          value={filters.type2}
          onChange={(e) => handleTypeChange("type2", e.value)}
          options={Object.keys(typeColors)}
          optionLabel="name"
          placeholder="Select Type 2"
          className="w-full border rounded-lg shadow-md text-white transition duration-200 ease-in-out "
          style={{
            backgroundColor: filters.type2
              ? typeColorsHex[filters.type2]
              : "rgba(200, 200, 200, 0.8)",
            border: `2px solid rgba(${
              filters.type2 && filters.type2 !== "Any"
                ? typeColorsRGB[filters.type2]
                : "200, 200, 200"
            }, 1)`,
          }}
        />
      </div>

      <div className="flex justify-around mt-6">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
          onClick={handleReonFilterChange}
        >
          Reset Filters
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
