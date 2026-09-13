// movies.js

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
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
      type: Number,
      index: true,
    },

    runtime: {
      type: Number,
    },

    genres: [
      {
        type: String,
        index: true,
      },
    ],

    rating: {
      type: Number,
      min: 0,
      max: 10,
      index: true,
    },

    votes: {
      type: Number,
      default: 0,
    },

    poster: {
      type: String,
      default: "",
    },

    overview: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model("Movie", movieSchema);
