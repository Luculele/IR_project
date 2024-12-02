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
    form: "",
    type1: "",
    type2: "",
  });

  const handleRangeChange = (key, e) => {
    const [min, max] = e.target.value.split(",").map(Number);
    const updatedFilters = { ...filters, [key]: [min, max] };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleInputChange = (key, index, value) => {
    const updatedRange = [...filters[key]];
    updatedRange[index] = value;
    const updatedFilters = { ...filters, [key]: updatedRange };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-gray-100 p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      {/* Filter: Total */}
      <div className="filter-range">
        <label htmlFor="total">Total:</label>
        <input
          type="range"
          id="total"
          min="1"
          max="2000"
          step="1"
          value={filters.total.join(",")}
          onChange={(e) => handleRangeChaxnge("total", e)}
        />
        <div>
          <input
            type="number"
            value={filters.total[0]}
            onChange={(e) =>
              handleInputChange("total", 0, Number(e.target.value))
            }
            placeholder="Min"
          />
          <input
            type="number"
            value={filters.total[1]}
            onChange={(e) =>
              handleInputChange("total", 1, Number(e.target.value))
            }
            placeholder="Max"
          />
        </div>
      </div>

      {/* Filter: HP */}
      <div className="filter-range">
        <label htmlFor="hp">HP:</label>
        <input
          type="range"
          id="hp"
          min="1"
          max="255"
          step="1"
          value={filters.hp.join(",")}
          onChange={(e) => handleRangeChange("hp", e)}
        />
        <div>
          <input
            type="number"
            value={filters.hp[0]}
            onChange={(e) => handleInputChange("hp", 0, Number(e.target.value))}
            placeholder="Min"
          />
          <input
            type="number"
            value={filters.hp[1]}
            onChange={(e) => handleInputChange("hp", 1, Number(e.target.value))}
            placeholder="Max"
          />
        </div>
      </div>

      {/* Additional filters go here, such as Attack, Speed, etc. */}
      {/* Repeat for attributes like attack, defense, etc. */}
    </div>
  );
};

export default Filters;
