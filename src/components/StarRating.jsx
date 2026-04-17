import { useState } from "react";

export default function StarRating({
  rating = 0,
  onRate,
  size = "md",
  interactive = true,
  showValue = true,
  totalVotes = null,
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
    xl: "text-xl",
  };

  const starSize = sizeClasses[size] || sizeClasses.md;
  const textSize = textSizes[size] || textSizes.md;

  const renderStar = (index) => {
    const starValue = index + 1;
    const currentRating = hoverRating || rating;
    const isFilled = starValue <= currentRating;
    const isHalf = !isFilled && starValue - 0.5 <= currentRating;

    return (
      <button
        key={index}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && onRate && onRate(starValue)}
        onMouseEnter={() => interactive && setHoverRating(starValue)}
        onMouseLeave={() => interactive && setHoverRating(0)}
        className={`relative transition-all duration-200 ${
          interactive
            ? "cursor-pointer hover:scale-125 active:scale-95"
            : "cursor-default"
        }`}
        id={`star-${index + 1}`}
      >
        {/* Background star (empty) */}
        <svg
          className={`${starSize} text-surface-600/50`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>

        {/* Filled star overlay */}
        <svg
          className={`${starSize} absolute inset-0 transition-all duration-300 ${
            isFilled || isHalf
              ? hoverRating
                ? "text-yellow-300 star-glow"
                : "text-accent-amber star-glow"
              : "text-transparent"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          style={
            isHalf && !isFilled
              ? { clipPath: "inset(0 50% 0 0)" }
              : undefined
          }
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map(renderStar)}
      </div>
      {showValue && (
        <div className="flex items-center gap-1.5">
          <span
            className={`${textSize} font-bold text-accent-amber`}
          >
            {(hoverRating || rating).toFixed(1)}
          </span>
          {totalVotes !== null && (
            <span className="text-xs text-surface-400">
              ({totalVotes.toLocaleString()})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
