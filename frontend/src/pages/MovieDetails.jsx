// MovieDetails.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getMovieDetails,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../services/movieApi";

const FALLBACK_POSTER = "https://via.placeholder.com/500x750?text=No+Poster";

const MovieDetails = () => {
  const { imdbId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [imageError, setImageError] = useState(false);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");
        setImageError(false);

        const response = await getMovieDetails(imdbId);

        setMovie(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message || "Failed to fetch movie details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbId]);

  // Check whether this movie is already in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await getWishlist();

        const exists = response.data.some((movie) => movie.imdbId === imdbId);

        setIsWishlisted(exists);
      } catch (error) {
        console.error("Failed to check wishlist:", error);
      }
    };

    checkWishlist();
  }, [imdbId]);

  const handleWishlist = async () => {
    if (!movie || wishlistLoading) {
      return;
    }

    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        await removeFromWishlist(imdbId);

        setIsWishlisted(false);
      } else {
        await addToWishlist(movie);

        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Wishlist Error:", error);

      alert(error.response?.data?.message || "Failed to update wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-gray-400">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
          Loading movie details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
        <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <div className="text-4xl mb-4">⚠️</div>

          <h2 className="text-xl font-bold text-white mb-2">
            Something went wrong
          </h2>

          <p className="text-red-400 mb-6">{error}</p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 transition"
          >
            ← Back to Movies
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const poster =
    !imageError && movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : FALLBACK_POSTER;

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to Movies
        </button>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">
            {/* Poster */}
            <div className="relative bg-zinc-900">
              <img
                src={poster}
                alt={movie.Title || "Movie poster"}
                onError={() => setImageError(true)}
                className="h-full min-h-[480px] w-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Movie type */}
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 mb-5">
                🎬 Movie
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                {movie.Title || "Unknown Title"}
              </h1>

              {/* Meta */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                <span>
                  {movie.Year !== "N/A" ? movie.Year : "Year unavailable"}
                </span>

                <span className="text-gray-700">•</span>

                <span>
                  {movie.Runtime !== "N/A"
                    ? movie.Runtime
                    : "Runtime unavailable"}
                </span>

                <span className="text-gray-700">•</span>

                <span>
                  {movie.Genre !== "N/A" ? movie.Genre : "Genre unavailable"}
                </span>
              </div>

              {/* Rating */}
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
                <span className="text-2xl">⭐</span>

                <div>
                  <p className="text-lg font-bold text-white">
                    {movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}
                  </p>

                  <p className="text-xs text-gray-500">IMDb Rating</p>
                </div>
              </div>

              {/* Wishlist button */}
              <button
                type="button"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className={`mt-6 w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                  isWishlisted
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white text-black hover:bg-gray-200"
                } ${wishlistLoading ? "cursor-not-allowed opacity-60" : ""}`}
              >
                {wishlistLoading
                  ? "Updating..."
                  : isWishlisted
                    ? "♥ Saved to Wishlist"
                    : "♡ Add to Wishlist"}
              </button>

              {/* Divider */}
              <div className="my-8 h-px bg-white/10" />

              {/* Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Director
                  </p>

                  <p className="text-sm font-medium text-gray-200">
                    {movie.Director !== "N/A"
                      ? movie.Director
                      : "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Released
                  </p>

                  <p className="text-sm font-medium text-gray-200">
                    {movie.Released !== "N/A"
                      ? movie.Released
                      : "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Language
                  </p>

                  <p className="text-sm font-medium text-gray-200">
                    {movie.Language !== "N/A"
                      ? movie.Language
                      : "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    Country
                  </p>

                  <p className="text-sm font-medium text-gray-200">
                    {movie.Country !== "N/A" ? movie.Country : "Not available"}
                  </p>
                </div>
              </div>

              {/* Cast */}
              <div className="mt-7">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Cast
                </p>

                <p className="text-sm leading-6 text-gray-300">
                  {movie.Actors !== "N/A"
                    ? movie.Actors
                    : "Cast information unavailable"}
                </p>
              </div>

              {/* Overview */}
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-3">Overview</h2>

                <p className="text-sm sm:text-base leading-7 text-gray-400">
                  {movie.Plot !== "N/A"
                    ? movie.Plot
                    : "No description available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetails;
