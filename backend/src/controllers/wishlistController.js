// wishlistController.js

const Wishlist = require("../models/Wishlist");

// Add movie to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { imdbId, title, year, poster } = req.body;

    if (!imdbId || !title) {
      return res.status(400).json({
        success: false,
        message: "IMDb ID and title are required",
      });
    }

    const existingMovie = await Wishlist.findOne({ imdbId });

    if (existingMovie) {
      return res.status(409).json({
        success: false,
        message: "Movie already exists in wishlist",
      });
    }

    const movie = await Wishlist.create({
      imdbId,
      title,
      year,
      poster,
    });

    return res.status(201).json({
      success: true,
      message: "Movie added to wishlist",
      data: movie,
    });
  } catch (error) {
    console.error("Add Wishlist Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to add movie to wishlist",
    });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const movies = await Wishlist.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error("Get Wishlist Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
    });
  }
};

// Remove movie from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { imdbId } = req.params;

    const movie = await Wishlist.findOneAndDelete({
      imdbId,
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found in wishlist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie removed from wishlist",
    });
  } catch (error) {
    console.error(
      "Remove Wishlist Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to remove movie from wishlist",
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};