// MovieGrid.jsx

import MovieCard from "./MovieCard";

const MovieGrid = ({
  movies,
  wishlistIds,
  onWishlistChange,
}) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-20 text-center">
        <div className="mb-3 text-4xl">
          🎬
        </div>

        <p className="text-lg font-medium text-gray-300">
          No movies found
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Try another search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isWishlisted={wishlistIds?.includes(movie.imdbID)}
          onWishlistChange={onWishlistChange}
        />
      ))}
    </div>
  );
};

export default MovieGrid;