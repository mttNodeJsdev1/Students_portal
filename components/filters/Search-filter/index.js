"use client";
import React, { useEffect, useState } from "react";

const SearchFilter = ({
  onSearch,
  placeholder,
  suggestions,
  value,
  clearSuggestions,
  clear,
}) => {
  const [searchValue, setSearchValue] = useState(value || "");
  useEffect(() => {
    if (clear) setSearchValue("");
  }, [clear]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    onSearch(suggestion);
    clearSuggestions();
  };

  return (
    <div className=" text-black relative w-full">
      <input
        onChange={handleInputChange}
        value={searchValue}
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 w-full border-2 border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>

      {/* Custom Search Icon (instead of RiSearchLine) */}
      {/* <span className="absolute right-4 text-gray-500 hover:text-blue-400 cursor-pointer">
          🔍
        </span> */}
      {/* Suggestions Dropdown */}
      {searchValue && suggestions.length > 0 && (
        <div
          className="absolute w-full max-h-60 mt-2 border border-gray-200 rounded-md shadow-lg bg-white z-50 overflow-y-auto"
          style={{ top: "100%", position: "absolute" }}
        >
          <ul className="divide-y divide-gray-200">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
