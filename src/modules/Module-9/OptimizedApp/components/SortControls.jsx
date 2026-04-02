// import RenderCounter from "../../shared/RenderCounter";
import React, { useMemo } from "react";

const SortControls = React.memo(function SortControls({ currentSort, onSort }) {

    console.log("SortControls rendered");

    const sortOptions = useMemo(() =>
        [
            { key: "name", label: "Name" },
            { key: "price-low", label: "low-Price " },
            { key: "price-high", label: "high-Price " },
            { key: "rating", label: "Rating" },
        ], [])

    return (
        <div className="sort-controls">
            <span className="sort-label">Sort by:</span>
            {sortOptions.map((option) => (
                <button
                    key={option.key}
                    className={`sort-btn ${currentSort === option.key ? "active" : ""}`}
                    onClick={() => onSort(option.key)}
                >
                    {option.label}
                </button>
            ))}
            {/* <RenderCounter name="Sort" /> */}
        </div>
    );
})

export default SortControls;