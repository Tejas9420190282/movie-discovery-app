// Wishlist.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MovieGrid from "../components/MovieGrid";
import {
  getWishlist,
  removeFromWishlist,
} from "../services/movieApi";

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getWishlist();

      setWishlistMovies(response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load wishlist"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleWishlistChange = async (imdbId) => {
    try {
      await removeFromWishlist(imdbId);

      setWishlistMovies((currentMovies) =>
        currentMovies.filter(
          (movie) => movie.imdbId !== imdbId
        )
      );
    } catch (error) {
      console.error(error);

      setError("Failed to remove movie from wishlist");
    }
  };

  const moviesForGrid = wishlistMovies.map((movie) => ({
    imdbID: movie.imdbId,
    Title: movie.title,
    Year: movie.year,
    Poster: movie.poster,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-gray-400">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
          Loading wishlist...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-4">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <div className="text-3xl mb-3">⚠️</div>

          <p className="text-red-400 mb-5">
            {error}
          </p>

          <Link
            to="/"
            className="inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-200 transition"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 mb-4">
              ♥ Your Collection
            </div>

            <h1 className="text-3xl sm:text-4xl font-black">
              My Wishlist
            </h1>

            <p className="mt-2 text-gray-500">
              Movies you've saved for later.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 transition"
          >
            ← Browse Movies
          </Link>

        </div>

        {/* Empty state */}
        {wishlistMovies.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] py-24 text-center">

            <div className="text-5xl mb-5">
              ♡
            </div>

            <h2 className="text-xl font-bold mb-2">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mb-6">
              Save movies here and find them anytime.
            </p>

            <Link
              to="/"
              className="inline-flex rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600 transition"
            >
              Discover Movies
            </Link>

          </div>
        ) : (
          <>
            {/* Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {wishlistMovies.length}{" "}
                {wishlistMovies.length === 1
                  ? "movie"
                  : "movies"}{" "}
                saved
              </p>
            </div>

            <MovieGrid
              movies={moviesForGrid}
              wishlistIds={wishlistMovies.map(
                (movie) => movie.imdbId
              )}
              onWishlistChange={handleWishlistChange}
            />
          </>
        )}

      </main>
    </div>
  );
};

export default Wishlist;