const {
  searchMovies,
  getMovieDetails,
  getFeaturedMovies,
  getMoviesByCategory,
} = require("../services/movieService");

const searchMovieControllers = async (req, res) => {
  try {
    const { query } = req.query;

    const page = Number(req.query.page) || 1;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Movie search query is required",
      });
    }

    const movies = await searchMovies(query.trim(), page);

    // OMDb returned an error
    if (movies.Response === "False") {
      return res.status(404).json({
        success: false,
        message: movies.Error || "Movies not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        movies: movies.Search || [],
        totalResults: Number(movies.totalResults) || 0,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Movie API Error:", error.response?.data || error.message);

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        success: false,
        message:
          "Movie service is taking too long to respond. Please try again.",
      });
    }

    if (error.response) {
      return res.status(502).json({
        success: false,
        message:
          "Movie service is temporarily unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch movies",
    });
  }
};

const getMovieDetailsController = async (req, res) => {
  try {
    const { imdbId } = req.params;

    if (!imdbId) {
      return res.status(400).json({
        success: false,
        message: "IMDb ID is required",
      });
    }

    const movie = await getMovieDetails(imdbId);

    if (movie.Response === "False") {
      return res.status(404).json({
        success: false,
        message: movie.Error || "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error(
      "Movie Details API Error:",
      error.response?.data || error.message,
    );

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        success: false,
        message:
          "Movie service is taking too long to respond. Please try again.",
      });
    }

    if (error.response) {
      return res.status(502).json({
        success: false,
        message:
          "Movie service is temporarily unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch movie details",
    });
  }
};

const getFeaturedMoviesController = async (req, res) => {
  try {
    const movies = await getFeaturedMovies();

    if (movies.Response === "False") {
      return res.status(404).json({
        success: false,
        message: movies.Error || "Movies not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        movies: movies.Search || [],
      },
    });
  } catch (error) {
    console.error(
      "Featured Movies Controller Error:",
      error.response?.data || error.message,
    );

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        success: false,
        message:
          "Movie service is taking too long to respond. Please try again.",
      });
    }

    if (error.response) {
      return res.status(502).json({
        success: false,
        message:
          "Movie service is temporarily unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch featured movies",
    });
  }
};

const getMoviesByCategoryController = async (req, res) => {
  try {
    const { category } = req.query;
    const page = Number(req.query.page) || 1;

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const movies = await getMoviesByCategory(category.trim(), page);

    if (movies.Response === "False") {
      return res.status(404).json({
        success: false,
        message: movies.Error || "Movies not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        movies: movies.Search || [],
        totalResults: Number(movies.totalResults) || 0,
        currentPage: page,
        category: category.trim(),
      },
    });
  } catch (error) {
    console.error(
      "Category Movies API Error:",
      error.response?.data || error.message,
    );

    if (error.code === "ECONNABORTED") {
      return res.status(504).json({
        success: false,
        message:
          "Movie service is taking too long to respond. Please try again.",
      });
    }

    if (error.response) {
      return res.status(502).json({
        success: false,
        message:
          "Movie service is temporarily unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch category movies",
    });
  }
};

module.exports = {
  searchMovieControllers,
  getMovieDetailsController,
  getFeaturedMoviesController,
  getMoviesByCategoryController,
};
