import axios from 'axios';

const API_KEY = 'f050c72fd44ca02ecf8925b913b7b709';  // Replace with your actual API key
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const searchMovies = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        api_key: API_KEY,
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting movie details:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list', {
      params: {
        api_key: API_KEY,
      },
    });

    console.log('Genres API Request URL:', response.config.url); // Log the API request URL
    console.log('Genres API Request Params:', response.config.params); // Log the API request parameters

    return response.data.genres;
  } catch (error) {
    console.error('Error getting genres:', error);
    throw error;
  }
};


export const getLatestMovies = async () => {
  try {
    const response = await api.get('/movie/now_playing', {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    const latestMovies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      genre_ids: movie.genre_ids, // Assuming genre_ids are available in the API response
    }));

    return latestMovies;
  } catch (error) {
    console.error('Error getting latest movies:', error);
    throw error;
  }
};
