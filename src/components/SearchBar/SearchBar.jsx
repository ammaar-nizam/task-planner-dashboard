import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "./SearchBar.css";

const SearchBar = ({ placeholder, onSearchChange }) => {
  const handleChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <MagnifyingGlassIcon className="search-icon" />
    </div>
  );
};

export default SearchBar;
