import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ searchQuery, onSearchChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
  id="main-navbar"
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled
      ? "glass shadow-2xl shadow-black/30 py-2.5 border-none" // Added border-none here
      : "bg-gradient-to-b from-black/50 to-transparent py-4 border-none" // Added border-none here for safety
  }`}
>
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ── Logo ───────────────────────── */}
          <Link to="/" className="flex items-center gap-3 group" id="logo-link">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-all duration-300 group-hover:scale-110">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent-emerald rounded-full animate-pulse border-2 border-surface-950"></div>
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight">
              <span className="gradient-text">Movie</span>
              <span className="text-white">Review</span>
            </span>
          </Link>

          {/* ── Desktop Search ──────────────── */}
          {isHome && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div
                className={`relative w-full transition-all duration-300 ${
                  searchFocused ? "scale-[1.03]" : ""
                }`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className={`w-4 h-4 transition-colors duration-300 ${
                      searchFocused ? "text-brand-400" : "text-surface-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search movies, actors, directors..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full pl-11 pr-10 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 outline-none placeholder:text-surface-500 ${
                    searchFocused
                      ? "bg-surface-800/90 border-brand-500/40 text-white ring-2 ring-brand-500/15 shadow-lg shadow-brand-500/10"
                      : "bg-surface-800/50 border-surface-700/40 text-surface-200 hover:bg-surface-800/70"
                  } border`}
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-500 hover:text-white transition-colors"
                    id="clear-search-btn"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── Desktop Nav Links ──────────── */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isHome
                  ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                  : "text-surface-400 hover:text-white hover:bg-surface-800/40"
              }`}
              id="nav-home"
            >
              Home
            </Link>
            <div className="ml-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-800/30 border border-surface-800/50">
              <div className="w-1.5 h-1.5 bg-accent-emerald rounded-full animate-pulse"></div>
              <span className="text-[11px] font-medium text-surface-500">
                18 Movies
              </span>
            </div>
          </div>

          {/* ── Mobile Menu Button ─────────── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-surface-800/50 transition-colors"
            id="mobile-menu-btn"
          >
            <svg className="w-5 h-5 text-surface-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile Menu ──────────────────── */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass animate-slide-down">
            {isHome && (
              <div className="mb-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="mobile-search-input"
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-800/80 border border-surface-700/40 text-sm text-white placeholder:text-surface-500 outline-none focus:border-brand-500/40 focus:ring-2 focus:ring-brand-500/15"
                  />
                </div>
              </div>
            )}
            <Link
              to="/"
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-surface-200 hover:bg-surface-800/50 transition-colors"
            >
              Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}