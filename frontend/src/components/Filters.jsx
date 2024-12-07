import React, { useState } from "react";
import "../index.css";

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

  const handleInputChange = (key, index, value) => {
    const updatedRange = [...filters[key]];
    updatedRange[index] = value;
    const updatedFilters = { ...filters, [key]: updatedRange };
    setFilters(updatedFilters);

    console.log("Filters updated:", updatedFilters);
    if (onFilterChange) {
      console.log("Calling onFilterChange");
      onFilterChange(updatedFilters);
    } else {
      console.log("onFilterChange is not defined");
    }
  };

  const handleTypeChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-gray-100 p-4 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Numeric Filters */}
      {Object.entries(filters)
        .filter(([key, value]) => Array.isArray(value))
        .map(([key, range]) => (
          <div key={key} className="mb-6">
            <label htmlFor={key} className="block font-medium mb-1 capitalize">
              {key.replace("_", " ")}:
            </label>
            <div className="flex justify-between gap-2">
              <input
                type="number"
                value={range[0]}
                onChange={(e) =>
                  handleInputChange(key, 0, Number(e.target.value))
                }
                className="w-20 px-2 py-1 border rounded"
                placeholder="Min"
              />
              <input
                type="number"
                value={range[1]}
                onChange={(e) =>
                  handleInputChange(key, 1, Number(e.target.value))
                }
                className="w-20 px-2 py-1 border rounded"
                placeholder="Max"
              />
            </div>
          </div>
        ))}

      {/* Dropdown for Types */}
      <div className="mb-6">
        <label htmlFor="type1" className="block font-medium mb-1">
          Type 1:
        </label>
        <select
          id="type1"
          value={filters.type1}
          onChange={(e) => handleTypeChange("type1", e.target.value)}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="">All</option>
          <option value="Grass">Grass</option>
          <option value="Fire">Fire</option>
          <option value="Water">Water</option>
          <option value="Electric">Electric</option>
          {/* Add more types as needed */}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="type2" className="block font-medium mb-1">
          Type 2:
        </label>
        <select
          id="type2"
          value={filters.type2}
          onChange={(e) => handleTypeChange("type2", e.target.value)}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="">All</option>
          <option value="Flying">Flying</option>
          <option value="Poison">Poison</option>
          <option value="Dragon">Dragon</option>
          {/* Add more types as needed */}
        </select>
      </div>
    </div>
  );
};

export default Filters;
