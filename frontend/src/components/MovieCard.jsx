// MovieCard.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

import {
  addToWishlist,
  removeFromWishlist,
} from "../services/movieApi";

const FALLBACK_POSTER =
  "https://via.placeholder.com/300x450?text=No+Poster";

const MovieCard = ({
  movie,
  isWishlisted,
  onWishlistChange,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleWishlistClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (isWishlisted) {
        await removeFromWishlist(movie.imdbID);
      } else {
        await addToWishlist(movie);
      }

      onWishlistChange(movie.imdbID);
    } catch (error) {
      console.error("Wishlist Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update wishlist"
      );
    }
  };

  const poster =
    !imageError &&
    movie.Poster &&
    movie.Poster !== "N/A"
      ? movie.Poster
      : FALLBACK_POSTER;

  return (
    <Link
      to={`/movies/${movie.imdbID}`}
      className="block h-full"
    >
      <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl">

        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">

          <img
            src={poster}
            alt={movie.Title || "Movie poster"}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-xl">
              View Details
            </span>
          </div>

          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={
              isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-lg backdrop-blur-md transition-all duration-200 ${
              isWishlisted
                ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                : "bg-black/60 text-white hover:bg-red-500 hover:scale-110"
            }`}
          >
            {isWishlisted ? "♥" : "♡"}
          </button>

          {/* Year */}
          <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
            {movie.Year || "N/A"}
          </div>

        </div>

        {/* Card content */}
        <div className="flex flex-col p-4">

          <h2 className="min-h-[48px] line-clamp-2 text-base font-semibold leading-6 text-white">
            {movie.Title || "Unknown Title"}
          </h2>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-500">
              🎬 Movie
            </span>

            <span className="text-gray-500">
              IMDb
            </span>
          </div>

          {/* Wishlist button */}
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`mt-4 w-full rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${
              isWishlisted
                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {isWishlisted
              ? "♥  Saved to Wishlist"
              : "♡  Add to Wishlist"}
          </button>

        </div>

      </article>
    </Link>
  );
};

export default MovieCard;