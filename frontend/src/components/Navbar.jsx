// Navbar.jsx

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
              🎬
            </div>

            <span className="text-lg sm:text-xl font-bold tracking-tight">
              Movie<span className="text-red-500">Verse</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">

            <Link
              to="/"
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                location.pathname === "/"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            <Link
              to="/wishlist"
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                location.pathname === "/wishlist"
                  ? "bg-red-500/10 text-red-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="mr-1">♥</span>
              Wishlist
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;