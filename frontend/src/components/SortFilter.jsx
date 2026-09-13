// SortFilter.jsx

const SortFilter = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-gray-400 whitespace-nowrap"
      >
        Sort by
      </label>

      <select
        id="sort"
        value={sortBy}
        onChange={(event) =>
          onSortChange(event.target.value)
        }
        className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition hover:border-white/20 focus:border-red-500"
      >
        <option value="default">Default</option>
        <option value="newest">Year: Newest</option>
        <option value="oldest">Year: Oldest</option>
      </select>
    </div>
  );
};

export default SortFilter;