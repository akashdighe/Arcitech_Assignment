import React, { useState } from 'react';
import './MovieDetails.css';
import MoviePopup from './MoviePopup';

const MovieList = ({ movies, onMovieClick }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClosePopup = () => {
    setSelectedMovie(null);
  };
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          <div className="movie-details">
            <h3>{movie.title}</h3>
            <p className="release-date">{movie.release_date}</p>
          </div>
        </div>
      ))}
      <MoviePopup movie={selectedMovie} onClose={handleClosePopup} />
    </div>
  );
};

export default MovieList;
