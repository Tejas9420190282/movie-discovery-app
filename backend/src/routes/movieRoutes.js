// movieRoutes.js

const express = require("express");
const {
  searchMovieControllers,
  getMovieDetailsController,
  getFeaturedMoviesController,
  getMoviesByCategoryController,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/search", searchMovieControllers);

router.get("/featured", getFeaturedMoviesController);

router.get("/category", getMoviesByCategoryController);

router.get("/:imdbId", getMovieDetailsController);

module.exports = router;
