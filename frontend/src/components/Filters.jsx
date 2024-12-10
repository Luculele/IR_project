import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Slider } from "primereact/slider";
import "../index.css";
// PrimeReact core styles
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme (choose one)
import 'primereact/resources/primereact.min.css';          // Core CSS

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

  // Pokémon types with colors
  const typeColors = {
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
    const { min, max } = attributeRanges[key];
    const clampedValue = [
      Math.min(value[0], filters[key][1]),
      Math.max(value[1], filters[key][0]),
    ];
    const updatedFilters = { ...filters, [key]: clampedValue };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleTypeChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const typeOptionTemplate = (option) => {
    return (
        <div className={`flex align-items-center p-2 ${typeColors[option]}`}>
          <div>{option}</div>
        </div>
    );
  };

  const selectedTypeTemplate = (option, props) => {
    return option ? (
        <div className={`flex align-items-center p-2 ${typeColors[option]}`}>
          <div>{option}</div>
        </div>
    ) : (
        <span>{props.placeholder}</span>
    );
  };

  return (
      <div className="fixed top-0 right-0 h-full w-64 bg-gray-100 p-4 shadow-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Numeric Filters with Sliders */}
        {Object.entries(filters)
            .filter(([key, value]) => Array.isArray(value))
            .map(([key, range]) => (
                <div key={key} className="mb-6">
                  <label htmlFor={key} className="block font-medium mb-1 capitalize">
                    {key.replace("_", " ")}:
                  </label>
                  <div className="mb-2 flex justify-between text-sm text-gray-700">
                    <span>Min: {range[0]}</span>
                    <span>Max: {range[1]}</span>
                  </div>
                  <Slider
                      value={filters[key]}
                      onChange={(e) => handleSliderChange(key, e.value)}
                      className="w-full"
                      range
                      min={attributeRanges[key].min}
                      max={attributeRanges[key].max}
                  />
                </div>
            ))}

        {/* Dropdown for Type 1 */}
        <div className="mb-6">
          <label htmlFor="type1" className="block font-medium mb-1">
            Type 1:
          </label>
          <Dropdown
              id="type1"
              value={filters.type1}
              onChange={(e) => handleTypeChange("type1", e.value)}
              options={Object.keys(typeColors)}
              optionLabel="name"
              placeholder="Select Type 1"
              valueTemplate={selectedTypeTemplate}
              itemTemplate={typeOptionTemplate}
              className="w-full"
          />
        </div>

        {/* Dropdown for Type 2 */}
        <div className="mb-6">
          <label htmlFor="type2" className="block font-medium mb-1">
            Type 2:
          </label>
          <Dropdown
              id="type2"
              value={filters.type2}
              onChange={(e) => handleTypeChange("type2", e.value)}
              options={Object.keys(typeColors)}
              optionLabel="name"
              placeholder="Select Type 2"
              valueTemplate={selectedTypeTemplate}
              itemTemplate={typeOptionTemplate}
              className="w-full"
          />
        </div>
      </div>
  );
};

export default Filters;
