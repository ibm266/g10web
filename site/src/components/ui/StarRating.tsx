"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type StarRatingProps = {
  count?: number;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  animated?: boolean;
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

const sizeClasses: Record<NonNullable<StarRatingProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
  xl: "h-10 w-10 md:h-11 md:w-11",
  "2xl": "h-12 w-12 md:h-16 md:w-16",
};

export function StarRating({
  count = 5,
  size = "md",
  animated = false,
  className = "",
}: StarRatingProps) {
  const reduced = useReducedMotion();
  const sizeClass = sizeClasses[size];
  const shouldAnimate = animated && !reduced;

  return (
    <span
      className={`inline-flex items-center justify-center gap-2 text-accent md:gap-2.5 ${className}`}
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) =>
        shouldAnimate ? (
          <motion.span
            key={i}
            className="inline-flex"
            initial={{ opacity: 0, scale: 0.15, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: i * 0.22,
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <StarIcon className={sizeClass} />
          </motion.span>
        ) : (
          <StarIcon key={i} className={sizeClass} />
        ),
      )}
    </span>
  );
}

/** Stagger stars when scrolled into view */
export function StarRatingReveal({
  count = 5,
  size = "xl",
  className = "",
}: Omit<StarRatingProps, "animated">) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();

  return (
    <span ref={ref} className="inline-flex">
      <StarRating count={count} size={size} animated={inView && !reduced} className={className} />
    </span>
  );
}
