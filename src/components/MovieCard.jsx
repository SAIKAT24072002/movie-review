import { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function MovieCard({ movie, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
      id={`movie-card-${movie.id}`}
    >
      <div className="relative rounded-2xl overflow-hidden card-hover card-shine bg-surface-900/80 border border-surface-800/40">
        {/* ── Poster ──────────────────────── */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {!imgError ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Stylish fallback poster */
            <div
              className="w-full h-full flex flex-col items-center justify-center p-4"
              style={{
                background: `linear-gradient(135deg, ${movie.color || '#1e293b'}dd, ${movie.color || '#1e293b'}88, #0f172aee)`,
              }}
            >
              <svg className="w-12 h-12 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <p className="text-white/60 text-xs font-display font-bold text-center leading-tight">{movie.title}</p>
              <p className="text-white/30 text-[10px] mt-1">{movie.year}</p>
            </div>
          )}

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

          {/* Language badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 rounded-md bg-brand-500/90 text-white text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-lg shadow-brand-500/20">
              {movie.language}
            </span>
          </div>

          {/* Rating badge */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/5">
              <svg className="w-3 h-3 text-accent-amber" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-[11px] font-bold text-white">{movie.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Hover play icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-500">
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Year badge */}
          <div className="absolute bottom-3 right-3">
            <span className="px-1.5 py-0.5 rounded bg-surface-900/70 backdrop-blur-sm text-[9px] font-semibold text-surface-300 border border-surface-700/20">
              {movie.year}
            </span>
          </div>
        </div>

        {/* ── Card Content ────────────────── */}
        <div className="p-3.5">
          <h3 className="font-display font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-brand-400 transition-colors duration-300 mb-2">
            {movie.title}
          </h3>

          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {movie.genre.slice(0, 2).map((g) => (
              <span
                key={g}
                className="px-1.5 py-0.5 rounded bg-surface-800/70 text-[9px] font-medium text-surface-400 border border-surface-700/20"
              >
                {g}
              </span>
            ))}
            {movie.genre.length > 2 && (
              <span className="px-1.5 py-0.5 rounded bg-surface-800/70 text-[9px] font-medium text-surface-500 border border-surface-700/20">
                +{movie.genre.length - 2}
              </span>
            )}
          </div>

          {/* Rating Stars */}
          <StarRating rating={movie.rating} size="sm" interactive={false} showValue={false} />

          {/* Director */}
          <p className="mt-2 text-[10px] text-surface-500 truncate">
            <span className="text-surface-600">Dir.</span> {movie.director}
          </p>
        </div>
      </div>
    </Link>
  );
}