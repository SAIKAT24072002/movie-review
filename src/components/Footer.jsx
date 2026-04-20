import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-auto" id="footer">
      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent"></div>

      <div className="bg-surface-950/80 backdrop-blur-sm border-t border-surface-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* ── Brand ─────────────────────── */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4 group">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600 flex items-center justify-center shadow-lg shadow-brand-500/15 group-hover:shadow-brand-500/30 transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="font-display text-lg font-bold tracking-tight">
                  <span className="gradient-text">Movie</span>
                  <span className="text-white">Review</span>
                </span>
              </Link>
              <p className="text-surface-500 text-sm leading-relaxed max-w-xs">
                Your ultimate destination for Indian cinema — discover, rate, and review the best movies across all languages.
              </p>
            </div>

            {/* ── Quick Links ───────────────── */}
            <div>
              <h4 className="text-[9px] font-bold text-surface-400 uppercase tracking-[0.12em] mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Top Rated", "New Releases", "Genres"].map((link) => (
                  <li key={link}>
                    <Link to="/" className="text-surface-500 text-sm hover:text-brand-400 transition-colors duration-300 inline-flex items-center gap-1.5 group/link">
                      <span className="w-0 group-hover/link:w-2 h-px bg-brand-500 transition-all duration-300"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Languages ─────────────────── */}
            <div>
              <h4 className="text-[9px] font-bold text-surface-400 uppercase tracking-[0.12em] mb-5">Languages</h4>
              <ul className="space-y-3">
                {["Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"].map((lang) => (
                  <li key={lang}>
                    <Link to="/" className="text-surface-500 text-sm hover:text-brand-400 transition-colors duration-300 inline-flex items-center gap-1.5 group/link">
                      <span className="w-0 group-hover/link:w-2 h-px bg-brand-500 transition-all duration-300"></span>
                      {lang}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Newsletter ────────────────── */}
            <div>
              <h4 className="text-[9px] font-bold text-surface-400 uppercase tracking-[0.12em] mb-5">Stay Updated</h4>
              <p className="text-surface-500 text-sm mb-4 leading-relaxed">
                Get the latest reviews delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-surface-800/60 border border-surface-700/30 text-sm text-white placeholder:text-surface-600 outline-none focus:border-brand-500/30 focus:ring-2 focus:ring-brand-500/10 transition-all duration-300"
                  id="newsletter-email"
                />
                <button
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/15 hover:shadow-brand-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
                  id="newsletter-btn"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ──────────────────── */}
          <div className="mt-14 pt-6 border-t border-surface-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-surface-600 text-xs">
              © {new Date().getFullYear()} MovieReview. Built with ❤️ for Indian Cinema.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <Link key={item} to="/" className="text-surface-600 text-xs hover:text-surface-300 transition-colors duration-300">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
