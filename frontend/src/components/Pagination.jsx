// Pagination.jsx

const Pagination = ({ currentPage, totalResults, onPageChange }) => {
  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Previous
      </button>

      <span className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400">
        Page <span className="font-semibold text-white">{currentPage}</span> of{" "}
        <span className="font-semibold text-white">{totalPages}</span>
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
