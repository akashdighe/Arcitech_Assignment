// SearchBar.js
import React, { useState } from 'react';
import '../App.css'; // Import your CSS file

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search movies"
      value={query}
      onChange={handleChange}
      className="search-bar"
    />
  );
};

export default SearchBar;
