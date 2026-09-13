// SearchBar.jsx

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          🔎
        </span>

        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search for a movie..."
          aria-label="Search movies"
          className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 pl-11 text-sm text-white placeholder:text-gray-500 outline-none backdrop-blur-md transition focus:border-red-500/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-red-500/10"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-red-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600 hover:shadow-red-500/30 sm:w-auto"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;