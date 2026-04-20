import { useState, useMemo } from "react";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("rating-desc");

  /* ── Filtering & Sorting Logic ─────────────────────────── */
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.cast.some((c) => c.toLowerCase().includes(q)) ||
          m.genre.some((g) => g.toLowerCase().includes(q))
      );
    }

    if (selectedGenre) {
      result = result.filter((m) => m.genre.includes(selectedGenre));
    }

    if (selectedYear) {
      result = result.filter((m) => m.year === Number(selectedYear));
    }

    const [sortKey, sortDir] = sortBy.split("-");
    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "rating") cmp = a.rating - b.rating;
      else if (sortKey === "year") cmp = a.year - b.year;
      else if (sortKey === "title") cmp = a.title.localeCompare(b.title);
      return sortDir === "desc" ? -cmp : cmp;
    });

    return result;
  }, [searchQuery, selectedGenre, selectedYear, sortBy]);

  /* Pick featured movie (highest rated) */
  const featuredMovie = movies.reduce((best, m) =>
    m.rating > best.rating ? m : best
  );

  /* ── Stats for hero badges ──────────────────────────────── */
  const avgRating = (movies.reduce((s, m) => s + m.rating, 0) / movies.length).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section id="hero-section" className="relative h-[72vh] sm:h-[76vh] overflow-hidden">
        {/* Backdrop image */}
        <img
          src={featuredMovie.backdrop}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105"   
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-[#030712]/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/80 via-[#030712]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent"></div>

        {/* Decorative blurs */}
        <div className="absolute top-32 right-16 w-80 h-80 bg-brand-500/8 rounded-full blur-[100px] animate-float pointer-events-none"></div>
        <div className="absolute bottom-24 left-16 w-64 h-64 bg-violet-600/8 rounded-full blur-[80px] animate-float pointer-events-none" style={{ animationDelay: "3s" }}></div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex items-end pb-20 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl animate-slide-up">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-accent-amber text-[11px] font-bold uppercase tracking-wider">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Featured
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-800/40 border border-surface-700/30 text-surface-300 text-[11px] font-medium backdrop-blur-sm">
                  {featuredMovie.language} • {featuredMovie.year}
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-800/40 border border-surface-700/30 text-surface-300 text-[11px] font-medium backdrop-blur-sm">
                  {featuredMovie.runtime}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] text-shadow-lg mb-4">
                {featuredMovie.title}
              </h1>

              {/* Description */}
              <p className="text-surface-300/90 text-sm sm:text-base leading-relaxed line-clamp-3 mb-8">
                {featuredMovie.description}
              </p>

              {/* CTA + Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={`/movie/${featuredMovie.id}`}
                  className="group/btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-violet-600 text-white font-semibold text-sm shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.04] active:scale-[0.98] transition-all duration-300"
                  id="hero-cta"
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  View Details
                </a>
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-surface-700/20">
                  <svg className="w-5 h-5 text-accent-amber star-glow" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-white font-bold text-sm">{featuredMovie.rating.toFixed(1)}</span>
                  <span className="text-surface-500 text-xs font-medium">/ 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAR
          ══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 relative z-20 mb-6">
        <div className="glass-card rounded-2xl p-4 sm:p-5 animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Total Movies", value: movies.length, icon: "🎬", color: "text-brand-400" },
              { label: "Avg Rating", value: avgRating, icon: "⭐", color: "text-accent-amber" },
              { label: "Languages", value: "5+", icon: "🌐", color: "text-accent-cyan" },
              { label: "Genres", value: "12+", icon: "🎭", color: "text-accent-violet" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <p className={`font-display text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] text-surface-500 uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════════════ */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
        {/* Section heading */}
        <div className="flex items-center justify-between mb-6 animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full bg-gradient-to-b from-brand-500 to-violet-600"></div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Explore <span className="gradient-text">Movies</span>
            </h2>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          sortBy={sortBy}
          onSortChange={setSortBy}
          movieCount={filteredMovies.length}
        />

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 mt-8"
            id="movie-grid"
          >
            {filteredMovies.map((m, i) => (
              <MovieCard key={m.id} movie={m} index={i} />
            ))}
          </div>
        ) : (
          /* ── Empty State ────────────────── */
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in" id="no-results">
            <div className="w-20 h-20 rounded-2xl bg-surface-800/40 flex items-center justify-center mb-5 border border-surface-700/20">
              <svg className="w-10 h-10 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">No movies found</h3>
            <p className="text-surface-500 text-sm text-center max-w-xs">
              Try adjusting your search or filters to discover more movies.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("");
                setSelectedYear("");
                setSortBy("rating-desc");
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-semibold hover:bg-brand-500/20 transition-all duration-300"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}