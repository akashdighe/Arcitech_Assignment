import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { searchMovies, getMovieDetails, getLatestMovies, getGenres } from './Component/Api';
import SearchBar from './Component/SearchBar';
import MovieList from './Component/MovieList';
import Filter from './Component/Filter';
import MovieDetails from './Component/MovieDetails';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestMovies = await getLatestMovies();
        setMovies(latestMovies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchGenresData = async () => {
      try {
        const movieGenres = await getGenres();
        setGenres(movieGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenresData();
  }, []);

  const handleSearch = async (query) => {
    if (query.trim() === '') {
      setMovies([]);
      return;
    }

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleFilterChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(Number(selectedGenre)))
    : movies;

  const handleMovieClick = async (movieId) => {
    try {
      const details = await getMovieDetails(movieId);
      setSelectedMovie(details);
    } catch (error) {
      console.error('Error getting movie details:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <div>
              <div className="filter-search-container">
                {/* SearchBar component with styling */}
                <SearchBar onSearch={handleSearch} />
                {/* Container for Filter and SearchBar with styling */}
                <Filter genres={genres} onFilterChange={handleFilterChange} />
              </div>

              {/* MovieList component */}
              <MovieList movies={filteredMovies} onMovieClick={handleMovieClick} />
            </div>
          )}
        />
        <Route
          path="/movie/:id"
          element={<MovieDetails movie={selectedMovie} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
