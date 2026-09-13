// Home.jsx

import { useState, useEffect, useRef } from "react";

import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";
import SortFilter from "../components/SortFilter";

import {
  searchMovies,
  getFeaturedMovies,
  getMoviesByCategory,
  getWishlist,
} from "../services/movieApi";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [featuredMovies, setFeaturedMovies] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [sortBy, setSortBy] = useState("default");

  const [wishlistIds, setWishlistIds] = useState([]);

  const searchControllerRef = useRef(null);

  const handleSearch = async (page = 1) => {
    if (!searchQuery.trim()) {
      return;
    }

    // Cancel previous request
    if (searchControllerRef.current) {
      searchControllerRef.current.abort();
    }

    // Create new controller
    const controller = new AbortController();

    searchControllerRef.current = controller;

    try {
      setLoading(true);
      setError("");

      setSelectedCategory("");
      setSortBy("default");

      const response = await searchMovies(searchQuery, page, controller.signal);

      setMovies(response.data.movies);
      setTotalResults(response.data.totalResults);
      setCurrentPage(page);
    } catch (error) {
      // Ignore cancelled requests
      if (error.name === "CanceledError") {
        return;
      }

      console.error(error);

      setError(error.response?.data?.message || "Failed to fetch movies");

      setMovies([]);
      setTotalResults(0);
    } finally {
      // Only stop loading for the current request
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getFeaturedMovies();

        setFeaturedMovies(response.data.movies);
      } catch (error) {
        console.error(error);

        setError("Failed to load featured movies");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  const isSearching = searchQuery.trim() !== "";
  const isBrowsingCategory = selectedCategory !== "";

  const handleCategoryChange = async (category, page = 1) => {
    try {
      setLoading(true);
      setError("");

      setSelectedCategory(category);
      setSearchQuery("");
      setSortBy("default");

      const response = await getMoviesByCategory(category, page);

      setMovies(response.data.movies);
      setTotalResults(response.data.totalResults);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Failed to fetch category movies",
      );

      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);

    setMovies((currentMovies) => {
      const sortedMovies = [...currentMovies];

      if (value === "newest") {
        sortedMovies.sort((a, b) => Number(b.Year) - Number(a.Year));
      }

      if (value === "oldest") {
        sortedMovies.sort((a, b) => Number(a.Year) - Number(b.Year));
      }

      return sortedMovies;
    });
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist();

        const ids = response.data.map((movie) => movie.imdbId);

        setWishlistIds(ids);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleWishlistChange = (imdbId) => {
    setWishlistIds((currentIds) => {
      if (currentIds.includes(imdbId)) {
        return currentIds.filter((id) => id !== imdbId);
      }

      return [...currentIds, imdbId];
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_30%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 mb-6">
              🎬 Movie Discovery
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Discover your next
              <span className="block text-red-500">favorite movie.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-gray-400 leading-relaxed">
              Search movies, explore categories, discover new favorites, and
              save the ones you never want to forget.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-4xl">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={() => handleSearch(1)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Categories */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Browse by category</h2>

            <p className="text-sm text-gray-500 mt-1">
              Explore movies by genre
            </p>
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={(category) => handleCategoryChange(category, 1)}
          />
        </section>

        {/* Sort */}
        {(isSearching || isBrowsingCategory) && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">{totalResults} results</p>
            </div>

            <SortFilter sortBy={sortBy} onSortChange={handleSortChange} />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="flex items-center gap-3 text-gray-400">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
              Loading movies...
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
            <div className="text-3xl mb-3">⚠️</div>

            <p className="text-red-400 font-medium">{error}</p>

            <p className="mt-2 text-sm text-gray-500">
              Please try again in a moment.
            </p>
          </div>
        )}

        {/* Featured */}
        {!loading && !error && !isSearching && !isBrowsingCategory && (
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Discover Movies
                </h2>

                <p className="text-gray-500 mt-1">
                  Explore something worth watching
                </p>
              </div>

              <span className="hidden sm:block text-sm text-gray-500">
                {featuredMovies.length} movies
              </span>
            </div>

            <MovieGrid
              movies={featuredMovies}
              wishlistIds={wishlistIds}
              onWishlistChange={handleWishlistChange}
            />
          </section>
        )}

        {/* Search / Category */}
        {!loading && !error && (isSearching || isBrowsingCategory) && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {isBrowsingCategory
                  ? `${selectedCategory} Movies`
                  : "Search Results"}
              </h2>

              <p className="text-gray-500 mt-1">
                Showing movies for your selection
              </p>
            </div>

            <MovieGrid
              movies={movies}
              wishlistIds={wishlistIds}
              onWishlistChange={handleWishlistChange}
            />

            <Pagination
              currentPage={currentPage}
              totalResults={totalResults}
              onPageChange={(page) => {
                if (isBrowsingCategory) {
                  handleCategoryChange(selectedCategory, page);
                } else {
                  handleSearch(page);
                }
              }}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
