import React from "react";
import "../index.css";

const NavBar = ({ filters, onFilterChange }) => {
    // Handle changes in range input (two circles - min and max)
    const handleRangeChange = (key, e) => {
        const [min, max] = e.target.value.split(",").map(Number); // Parse two values from range
        onFilterChange(key, [min, max]); // Update filters state
    };

    // Handle manual input (specific value for filters)
    const handleInputChange = (key, e) => {
        const value = Number(e.target.value);
        if (!isNaN(value)) { // Check if the value is a valid number
            onFilterChange(key, value); // Update the filter state with a single value
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
                    value={filters.total.join(",")} // Display both min and max values in range
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
