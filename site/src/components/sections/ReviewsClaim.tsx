import Link from "next/link";
import { StarRating } from "@/components/ui/StarRating";
import { REVIEW_PRIMARY_URL, REVIEW_STATS } from "@/lib/reviews";

type Props = {
  variant?: "stat" | "inline" | "compact" | "centered";
  count?: number;
  dark?: boolean;
  showLink?: boolean;
  linkLabel?: string;
  className?: string;
};

export function ReviewsClaim({
  variant = "inline",
  count = REVIEW_STATS.count,
  dark = false,
  showLink = true,
  linkLabel = "Read reviews for yourself",
  className = "",
}: Props) {
  const textMuted = dark ? "text-text-on-dark/75" : "text-text-muted";
  const textMain = dark ? "text-text-on-dark" : "text-text";
  const linkClass = dark
    ? "text-hero-accent hover:text-text-on-dark"
    : "text-accent hover:text-accent-deep";

  const link = showLink ? (
    <a
      href={REVIEW_PRIMARY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sm font-medium underline-offset-2 hover:underline ${linkClass}`}
    >
      {linkLabel}
      <span aria-hidden="true">→</span>
    </a>
  ) : null;

  if (variant === "stat") {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <StarRating size="lg" className="justify-center" />
        <p className="mt-3 font-display text-5xl font-medium text-accent">{count}+</p>
        <p className={`mt-2 text-sm ${textMuted}`}>
          {REVIEW_STATS.shortLabel} across {REVIEW_STATS.platformsLabel}
        </p>
        {link && <div className="mt-4">{link}</div>}
      </div>
    );
  }

  if (variant === "centered") {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center gap-2">
          <StarRating size="md" />
          <span className={`text-sm font-medium ${textMain}`}>
            {count}+ {REVIEW_STATS.shortLabel}
          </span>
        </div>
        <p className={`mt-1 text-xs ${textMuted}`}>{REVIEW_STATS.platformsLabel}</p>
        {link && <div className="mt-3">{link}</div>}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
        <div className="flex items-center gap-2">
          <StarRating size="sm" />
          <span className={`text-sm ${textMain}`}>
            <span className="font-medium">{count}+</span> {REVIEW_STATS.shortLabel}
          </span>
        </div>
        {link}
      </div>
    );
  }

  // inline
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <StarRating size="sm" className={dark ? "text-hero-accent" : undefined} />
      <span className={dark ? "text-text-on-dark/90" : "text-text-muted"}>
        {count}+ {REVIEW_STATS.shortLabel}
      </span>
      {link}
    </span>
  );
}

/** Anchor target for in-page “see reviews” links */
export function ReviewsSectionAnchor({ id = "reviews" }: { id?: string }) {
  return <span id={id} className="sr-only">
    Client reviews
  </span>;
}

export function ReviewsSectionLink({
  href = "#reviews",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium text-accent underline-offset-2 hover:underline ${className}`}
    >
      See reviews on the site
    </Link>
  );
}
