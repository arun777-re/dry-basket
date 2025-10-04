"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";

type FiltersProps = {
  searchText: string;
  setSearchText: (val: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (val: string[]) => void;
  selectedWeights: string[];
  setSelectedWeights: (val: string[]) => void;
  priceRange: number[];
  setPriceRange: (val: number[]) => void;
  resetFilters: () => void;
  categories: string[];
  weights: string[];
};

const Filters: React.FC<FiltersProps> = ({
  searchText,
  setSearchText,
  selectedCategories,
  setSelectedCategories,
  selectedWeights,
  setSelectedWeights,
  priceRange,
  setPriceRange,
  resetFilters,
  categories,
  weights,
}) => {
  const toggleSelection = (value: string, setter: any, current: string[]) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  return (
    <div className="w-64 p-4 border-r border-gray-200 space-y-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded-md"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-2">Category</h4>
        {categories.map((cat) => (
          <label key={cat} className="block">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() =>
                toggleSelection(cat, setSelectedCategories, selectedCategories)
              }
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Weights */}
      <div>
        <h4 className="font-semibold mb-2">Weight</h4>
        {weights.map((w) => (
          <label key={w} className="block">
            <input
              type="checkbox"
              checked={selectedWeights.includes(w)}
              onChange={() =>
                toggleSelection(w, setSelectedWeights, selectedWeights)
              }
              className="mr-2"
            />
            {w}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-2">Price Range</h4>
        <Slider
          defaultValue={[0, 500]}
          value={priceRange}
          onValueChange={(val) => setPriceRange(val as number[])}
          max={500}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <button
        className="w-full py-2 bg-red-500 text-white rounded-md"
        onClick={resetFilters}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default Filters;
