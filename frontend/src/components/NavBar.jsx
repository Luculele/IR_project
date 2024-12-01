import React from "react";
import "../index.css";

const NavBar = ({ filters, onFilterChange }) => {
  const handleRangeChange = (key, e) => {
    const [min, max] = e.target.value.split(",").map(Number);
    onFilterChange(key, [min, max]);
  };

  const handleInputChange = (key, e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      onFilterChange(key, value);
    }
  };

  return (
    <div className="filter-panel">
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
          onChange={(e) => handleRangeChange("total", e)}
        />
        <div>
          <input
            type="number"
            value={filters.total[0]}
            onChange={(e) => handleInputChange("total", e)}
            placeholder="Min"
          />
          <input
            type="number"
            value={filters.total[1]}
            onChange={(e) => handleInputChange("total", e)}
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
            onChange={(e) => handleInputChange("hp", e)}
            placeholder="Min"
          />
          <input
            type="number"
            value={filters.hp[1]}
            onChange={(e) => handleInputChange("hp", e)}
            placeholder="Max"
          />
        </div>
      </div>

      {/* Additional filters go here, such as Attack, Speed, etc. */}
      {/* Repeat for attributes like attack, defense, etc. */}
    </div>
  );
};

export default NavBar;
