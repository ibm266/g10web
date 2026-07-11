type StarRatingProps = {
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 1.6 12.2 7l5.5.8-4 3.9.9 5.5L10 14.8 5.4 17.2l.9-5.5-4-3.9 5.5-.8L10 1.6z"
      />
    </svg>
  );
}

export function StarRating({ count = 5, size = "md", className = "" }: StarRatingProps) {
  const sizeClass =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5";

  return (
    <span
      className={`inline-flex items-center gap-1 text-accent ${className}`}
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} className={sizeClass} />
      ))}
    </span>
  );
}
