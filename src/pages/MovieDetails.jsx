import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import movies from "../data/movies";
import Navbar from "../components/Navbar";
import StarRating from "../components/StarRating";
import Footer from "../components/Footer";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === Number(id));

  const defaultReviews = [
    {
      id: 1,
      author: "CinemaFanatic",
      rating: 4,
      text: "Absolutely gripping from start to finish. The performances were outstanding and the direction was top-notch!",
      date: "2024-12-15",
      avatar: "CF",
    },
    {
      id: 2,
      author: "MovieBuff22",
      rating: 5,
      text: "A masterpiece that redefines the genre. Every frame is a painting. I've watched it three times and still find new details.",
      date: "2024-11-28",
      avatar: "MB",
    },
    {
      id: 3,
      author: "FilmCritic_Pro",
      rating: 4,
      text: "Solid storytelling with brilliant technical execution. The soundtrack elevates every scene perfectly.",
      date: "2024-10-10",
      avatar: "FC",
    },
  ];

  // Load reviews from localStorage (per movie), seed defaults on first visit
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem(`reviews_${id}`);
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultReviews;
  });

  // Load user rating from localStorage (per movie)
  const [userRating, setUserRating] = useState(() => {
    try {
      const stored = localStorage.getItem(`rating_${id}`);
      if (stored) return Number(stored);
    } catch {}
    return 0;
  });

  const [showToast, setShowToast] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [posterError, setPosterError] = useState(false);

  // Persist reviews to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
    } catch {}
  }, [reviews, id]);

  // Persist rating to localStorage whenever it changes
  useEffect(() => {
    if (userRating > 0) {
      try {
        localStorage.setItem(`rating_${id}`, String(userRating));
      } catch {}
    }
  }, [userRating, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712]">
        <div className="text-6xl mb-6">🎬</div>
        <h1 className="font-display text-2xl font-bold text-white mb-3">Movie not found</h1>
        <p className="text-surface-400 text-sm mb-6">The movie you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-semibold hover:bg-brand-500/20 transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  const handleRate = (value) => {
    setUserRating(value);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.trim() || !userRating) return;
    setReviews((prev) => [
      {
        id: Date.now(),
        author: "You",
        rating: userRating,
        text: newReview.trim(),
        date: new Date().toISOString().split("T")[0],
        avatar: "YO",
      },
      ...prev,
    ]);
    setNewReview("");
  };

  const related = movies
    .filter((m) => m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g)))
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712]">
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          BACKDROP HERO
          ══════════════════════════════════════════════════════ */}
      <section className="relative h-[45vh] sm:h-[55vh] overflow-hidden" id="movie-hero">
        <img src={movie.backdrop} alt="" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-[#030712]/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030712] to-transparent"></div>

        {/* Back button */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-surface-300 text-sm font-medium hover:text-white hover:border-surface-600/50 transition-all duration-300"
            id="back-btn"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MOVIE INFO
          ══════════════════════════════════════════════════════ */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-36 sm:-mt-44 relative z-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 animate-slide-up">
          {/* ── Poster ────────────────────── */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="w-48 sm:w-56 lg:w-64 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-surface-800/30 ring-1 ring-white/5">
              {!posterError ? (
                <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover" id="movie-poster" onError={() => setPosterError(true)} />
              ) : (
                <div
                  className="w-full aspect-[2/3] flex flex-col items-center justify-center p-6"
                  style={{ background: `linear-gradient(135deg, ${movie.color || '#1e293b'}dd, ${movie.color || '#1e293b'}88, #0f172aee)` }}
                  id="movie-poster"
                >
                  <svg className="w-16 h-16 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  <p className="text-white/60 text-sm font-display font-bold text-center">{movie.title}</p>
                  <p className="text-white/30 text-xs mt-1">{movie.year}</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Details ────────────────────── */}
          <div className="flex-1 pt-2 lg:pt-12">
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-1 rounded-lg bg-brand-500/10 border border-brand-500/15 text-brand-400 text-[10px] font-bold uppercase tracking-[0.1em]"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-5"
              id="movie-title"
            >
              {movie.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-surface-300 text-sm mb-8">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  ),
                  text: movie.year,
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                  text: movie.runtime,
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  ),
                  text: movie.language,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-800/40 border border-surface-700/20">
                    <svg className="w-3.5 h-3.5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      {item.icon}
                    </svg>
                    <span className="text-surface-300 text-xs font-medium">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Rating cards */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="glass-card rounded-2xl p-5 flex-1">
                <p className="text-[9px] font-bold text-surface-500 uppercase tracking-[0.12em] mb-2">Community Rating</p>
                <StarRating
                  rating={movie.rating}
                  size="lg"
                  interactive={false}
                  showValue={true}
                  totalVotes={movie.totalVotes}
                />
              </div>
              <div className="glass-card rounded-2xl p-5 flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-violet-600/5 pointer-events-none"></div>
                <p className="text-[9px] font-bold text-surface-500 uppercase tracking-[0.12em] mb-2 relative">Your Rating</p>
                <div className="relative">
                  <StarRating
                    rating={userRating}
                    onRate={handleRate}
                    size="lg"
                    interactive={true}
                    showValue={true}
                  />
                </div>
              </div>
            </div>

            {/* Rating toast */}
            {showToast && (
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald text-sm font-medium animate-slide-up">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Rated {userRating}/5 — Thank you!
              </div>
            )}

            {/* Synopsis */}
            <div className="mb-8">
              <h2 className="font-display text-base font-bold text-white mb-3 flex items-center gap-2">
                <div className="w-0.5 h-5 rounded-full bg-gradient-to-b from-brand-500 to-violet-600"></div>
                Synopsis
              </h2>
              <p className="text-surface-300/90 text-sm leading-relaxed" id="movie-description">
                {movie.description}
              </p>
            </div>

            {/* Director & Cast */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="text-[9px] font-bold text-surface-500 uppercase tracking-[0.12em] mb-3">Director</h3>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500/20 to-violet-600/20 flex items-center justify-center text-brand-400 font-bold text-xs border border-brand-500/15">
                    {movie.director.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-white font-semibold text-sm">{movie.director}</span>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="text-[9px] font-bold text-surface-500 uppercase tracking-[0.12em] mb-3">Cast</h3>
                <div className="flex flex-wrap gap-1.5">
                  {movie.cast.map((actor) => (
                    <span
                      key={actor}
                      className="px-2.5 py-1 rounded-lg bg-surface-800/50 text-surface-300 text-[11px] font-medium border border-surface-700/20"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            REVIEWS SECTION
            ══════════════════════════════════════════════════════ */}
        <section className="mt-16" id="reviews-section">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-7 rounded-full bg-gradient-to-b from-brand-500 to-violet-600"></div>
            <h2 className="font-display text-xl font-bold text-white">
              Reviews{" "}
              <span className="text-surface-600 text-base font-normal ml-1">
                ({reviews.length})
              </span>
            </h2>
          </div>

          {/* Write a review */}
          <form onSubmit={handleSubmitReview} className="glass-card rounded-2xl p-5 sm:p-6 mb-6" id="review-form">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/20 to-violet-600/20 flex items-center justify-center text-brand-400 font-bold text-[10px] border border-brand-500/15">
                YO
              </div>
              <p className="text-sm font-semibold text-white">Write a review</p>
            </div>
            {!userRating && (
              <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-800/40 border border-surface-700/20">
                <svg className="w-3.5 h-3.5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[11px] text-surface-400">Rate the movie above before writing a review.</p>
              </div>
            )}
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-surface-800/60 border border-surface-700/30 text-sm text-white placeholder:text-surface-600 outline-none focus:border-brand-500/30 focus:ring-2 focus:ring-brand-500/10 transition-all duration-300 resize-none"
              id="review-textarea"
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={!userRating || !newReview.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/15 hover:shadow-brand-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                id="submit-review-btn"
              >
                Post Review
              </button>
            </div>
          </form>

          {/* Reviews list */}
          <div className="space-y-3">
            {reviews.map((review, i) => (
              <div
                key={review.id}
                className="glass-card rounded-2xl p-5 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
                id={`review-${review.id}`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500/20 to-violet-600/20 flex items-center justify-center text-brand-400 font-bold text-[10px] flex-shrink-0 border border-brand-500/15">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-white font-semibold text-sm">{review.author}</span>
                      <span className="text-[11px] text-surface-600">{review.date}</span>
                    </div>
                    <div className="mb-2">
                      <StarRating rating={review.rating} size="sm" interactive={false} showValue={false} />
                    </div>
                    <p className="text-surface-300/80 text-sm leading-relaxed">{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            RELATED MOVIES
            ══════════════════════════════════════════════════════ */}
        {related.length > 0 && (
          <section className="mt-16" id="related-movies">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-gradient-to-b from-accent-amber to-brand-500"></div>
              <h2 className="font-display text-xl font-bold text-white">
                You May Also <span className="gradient-text-gold">Like</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {related.map((m, i) => (
                <Link
                  key={m.id}
                  to={`/movie/${m.id}`}
                  className="group block animate-fade-in"
                  style={{ animationDelay: `${i * 70}ms`, animationFillMode: "both" }}
                >
                  <div className="relative rounded-2xl overflow-hidden card-hover card-shine bg-surface-900/80 border border-surface-800/40">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={m.poster}
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent opacity-60"></div>
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm border border-white/5">
                        <svg className="w-2.5 h-2.5 text-accent-amber" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-[10px] font-bold text-white">{m.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-display font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-brand-400 transition-colors duration-300">
                        {m.title}
                      </h3>
                      <p className="mt-1 text-[10px] text-surface-500">{m.year}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}