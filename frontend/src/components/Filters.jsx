import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import "../index.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const Filters = ({ onFilterChange }) => {
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
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleTypeChange = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: value === "Any" ? "" : value,
    };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  return (
      <div className="fixed top-53 right-9 h-full w-64 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

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
                          setFilters(updatedFilters);
                        }}
                        className="w-16 text-center border border-gray-300 rounded-md"
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
                          setFilters(updatedFilters);
                        }}
                        className="w-16 text-center border border-gray-300 rounded-md"
                    />
                  </div>
                  <Slider
                      value={filters[key]}
                      onChange={(e) => {
                        handleSliderChange(key, e.value);
                      }}
                      className="w-full"
                      range
                      min={attributeRanges[key].min}
                      max={attributeRanges[key].max}
                  />
                </div>
            ))}

        <div className="mb-6">
          <label htmlFor="type1" className="block font-medium mb-1">
            Type 1:
          </label>
          <Dropdown
              id="type1"
              value={filters.type1}
              onChange={(e) => handleTypeChange("type1", e.value)}
              options={[...Object.keys(typeColors)]}
              optionLabel="name"
              placeholder="Select Type 1"
              className="w-full"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="type2" className="block font-medium mb-1">
            Type 2:
          </label>
          <Dropdown
              id="type2"
              value={filters.type2}
              onChange={(e) => handleTypeChange("type2", e.value)}
              options={[...Object.keys(typeColors)]}
              optionLabel="name"
              placeholder="Select Type 2"
              className="w-full"
          />
        </div>
      </div>
  );
};

export default Filters;
