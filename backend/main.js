// main.js
const express = require("express");
const colors = require("colors");
const mongoDB = require("./config/db");
const movieRoutes = require("./src/routes/movieRoutes");
require("dotenv").config();
const cors = require('cors');
const wishlistRoutes = require("./src/routes/wishlistRoutes");


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/movies", movieRoutes);

app.use("/api/wishlist", wishlistRoutes);



const PORT = process.env.PORT || 7878;

const startServer = async () => {
  await mongoDB();

  app.listen(PORT, () => {
    try {
      console.log(`Server running on http://localhost:${PORT}`.bgGreen);

      console.log("API KEY EXISTS:", !!process.env.OMDB_API_KEY);
    } catch (error) {
      console.log(`Error in server : ${error.message}`.bgRed);
    }
  });
};

startServer();
