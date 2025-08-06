import React from "react";
import "./Search.css";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="search-wrapper">
      <h1 className="search-heading">Explore Bharat Yatra Services</h1>
      <p className="search-subtext">Find info about offers, gift cards & more.</p>

      <div className="search-box">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search services or help..."
        />
        <button className="search-btn">Search</button>
      </div>
    </div>
  );
};

export default Search;
