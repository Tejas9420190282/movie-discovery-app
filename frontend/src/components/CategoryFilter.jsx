// CategoryFilter.jsx

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = [
    "Action",
    "Comedy",
    "Drama",
    "Sci-Fi",
    "Horror",
    "Animation",
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 sm:px-5 py-2.5 rounded-full border text-sm sm:text-base font-medium transition-all duration-200 ${
              selectedCategory === category
                ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;