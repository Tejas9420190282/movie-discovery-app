// wishlistRoutes.js

const express = require("express");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

// Add movie
router.post("/", addToWishlist);

// Get wishlist
router.get("/", getWishlist);

// Remove movie
router.delete("/:imdbId", removeFromWishlist);

module.exports = router;