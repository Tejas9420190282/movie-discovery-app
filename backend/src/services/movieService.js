// movieService.js

const axios = require("axios");
const MovieCache = require("../models/MovieCache");

// Search movies
const searchMovies = async (query, page = 1) => {
  const cacheKey = `${query.trim().toLowerCase()}_${page}`;

  // Check cache first
  const cachedData = await MovieCache.findOne({
    cacheKey,
    expiresAt: { $gt: new Date() },
  });

  if (cachedData) {
    console.log("Returning movies from cache");

    return cachedData.data;
  }

  // Cache not found → call OMDb
  console.log("Fetching movies from OMDb");

  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: process.env.OMDB_API_KEY,
      s: query,
      type: "movie",
      page: page,
    },

    timeout: 5000,
  });

  const movieData = response.data;

  // Save response in cache
  if (movieData.Response === "True") {
    await MovieCache.findOneAndUpdate(
      { cacheKey },
      {
        cacheKey,
        data: movieData,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      {
        upsert: true,
        new: true,
      },
    );
  }

  return movieData;
};

// Get single movie details
const getMovieDetails = async (imdbId) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: process.env.OMDB_API_KEY,
      i: imdbId,
      plot: "full",
    },

    timeout: 5000,
  });

  return response.data;
};

const getFeaturedMovies = async () => {
  try {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: "Batman",
        type: "movie",
        page: 1,
      },

      timeout: 5000,
    });

    console.log("Featured API Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Featured API Error:", error.response?.data || error.message);

    throw error;
  }
};

const getMoviesByCategory = async (category, page = 1) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: process.env.OMDB_API_KEY,
      s: category,
      type: "movie",
      page: page,
    },

    timeout: 5000,
  });

  return response.data;
};

module.exports = {
  searchMovies,
  getMovieDetails,
  getFeaturedMovies,
  getMoviesByCategory,
};
