import React from 'react';
import './MovieDetails.css'; // Import your custom CSS file for MovieDetail styles

const MovieDetail = ({ movies, onMovieClick }) => {
  return (
    <div className="movie-list-container">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-item" onClick={() => onMovieClick(movie.id)}>
          <img className='imgCard' src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          <div>
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieDetail;
