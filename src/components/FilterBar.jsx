import { allGenres, allYears } from "../data/movies";

export default function FilterBar({
  selectedGenre,
  onGenreChange,
  selectedYear,
  onYearChange,
  sortBy,
  onSortChange,
  movieCount,
}) {
  const selectClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-surface-800/70 border border-surface-700/40 text-sm text-white outline-none appearance-none cursor-pointer hover:border-brand-500/20 focus:border-brand-500/40 focus:ring-2 focus:ring-brand-500/15 transition-all duration-300";
  const labelClass =
    "block text-[9px] font-bold text-surface-500 uppercase tracking-[0.12em] mb-1.5";

  const ChevronIcon = () => (
    <div className="absolute right-3 bottom-3.5 pointer-events-none">
      <svg
        className="w-3.5 h-3.5 text-surface-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  const hasActiveFilters = selectedGenre || selectedYear || sortBy !== "rating-desc";

  return (
    <div
      id="filter-bar"
      className="animate-slide-up"
      style={{ animationDelay: "150ms", animationFillMode: "both" }}
    >
      <div className="glass-card rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          {/* Label area */}
          <div className="flex items-center gap-3 flex-shrink-0 lg:pb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/15 to-violet-600/15 flex items-center justify-center border border-brand-500/15">
              <svg
                className="w-3.5 h-3.5 text-brand-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white leading-none">Filters</h3>
              <p className="text-[10px] text-surface-500 mt-0.5">
                {movieCount} movie{movieCount !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-10 bg-surface-700/30 self-center"></div>

          {/* Filter controls */}
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <label className={labelClass}>Genre</label>
              <select
                id="genre-filter"
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
                className={selectClass}
              >
                <option value="">All Genres</option>
                {allGenres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>

            <div className="relative flex-1">
              <label className={labelClass}>Year</label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                className={selectClass}
              >
                <option value="">All Years</option>
                {allYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>

            <div className="relative flex-1">
              <label className={labelClass}>Sort By</label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className={selectClass}
              >
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
                <option value="year-desc">Newest First</option>
                <option value="year-asc">Oldest First</option>
                <option value="title-asc">A → Z</option>
                <option value="title-desc">Z → A</option>
              </select>
              <ChevronIcon />
            </div>
          </div>

          {/* Clear button */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                onGenreChange("");
                onYearChange("");
                onSortChange("rating-desc");
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-500/8 border border-red-500/15 text-red-400 text-xs font-semibold hover:bg-red-500/15 hover:border-red-500/25 transition-all duration-300 self-end"
              id="clear-filters-btn"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
