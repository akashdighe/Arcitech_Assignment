import React from 'react';
import '../App.css';

const Filter = ({ genres, onFilterChange }) => {
  return (
    <div className="filter-select">
      {/* Dropdown container */}
      <div className="filter-dropdown">
        {/* Dropdown button */}
        <button>Filter by Genre</button>

        {/* Dropdown content */}
        <div className="filter-dropdown-content">
          {genres && genres.map((genre) => (
            <label key={genre.id}>
              <input type="checkbox" onChange={() => onFilterChange(genre.id)} />
              {genre.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;