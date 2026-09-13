// movieApi.js

import axios from "axios";

const API_URL = "http://localhost:1819/api";

export const searchMovies = async (query, page = 1, signal) => {
  const response = await axios.get(`${API_URL}/movies/search`, {
    params: {
      query,
      page,
    },
    signal,
  });

  return response.data;
};

export const getMovieDetails = async (imdbId) => {
  const response = await axios.get(`${API_URL}/movies/${imdbId}`);

  return response.data;
};

export const getFeaturedMovies = async () => {
  const response = await axios.get(`${API_URL}/movies/featured`);

  return response.data;
};

export const getMoviesByCategory = async (category, page = 1) => {
  const response = await axios.get(`${API_URL}/movies/category`, {
    params: {
      category,
      page,
    },
  });

  return response.data;
};

export const addToWishlist = async (movie) => {
  const response = await axios.post(`${API_URL}/wishlist`, {
    imdbId: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  });

  return response.data;
};

export const removeFromWishlist = async (imdbId) => {
  const response = await axios.delete(`${API_URL}/wishlist/${imdbId}`);

  return response.data;
};

export const getWishlist = async () => {
  const response = await axios.get(`${API_URL}/wishlist`);

  return response.data;
};
