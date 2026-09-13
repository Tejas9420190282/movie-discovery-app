// Wishlist.js

const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    imdbId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: String,
    },

    poster: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);