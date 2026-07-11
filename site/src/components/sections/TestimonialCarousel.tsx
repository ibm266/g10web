"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Section";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/lib/content";
import { REVIEW_PRIMARY_URL, REVIEW_STATS } from "@/lib/reviews";

export function TestimonialCarousel({ compact = false }: { compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState<number>(REVIEW_STATS.count);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 600, 1);
      setCount(Math.floor(REVIEW_STATS.count * p));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <Container>
      <div
        id="reviews"
        className={`relative overflow-hidden ${compact ? "" : "rounded-[20px] bg-[#f3ede2] p-8 md:p-12"}`}
      >
        {!compact && (
          <span
            className="pointer-events-none absolute left-1.5 top-1.5 font-display text-[180px] leading-none text-accent/10 animate-drift md:text-[220px]"
            aria-hidden
          >
            &ldquo;
          </span>
        )}
        <div className="relative flex flex-wrap items-end gap-3">
          <div className="font-display text-[56px] font-medium leading-none text-accent">
            {count}+
          </div>
          <div className="min-w-0 flex-1">
            <StarRating size="md" className="mb-1.5" />
            <div className="text-[13px] leading-snug text-text-muted">
              {REVIEW_STATS.shortLabel}
              <br />
              {REVIEW_STATS.platformsLabel}
            </div>
          </div>
        </div>

        <a
          href={REVIEW_PRIMARY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-2 hover:underline"
        >
          Read reviews for yourself
          <span aria-hidden="true">→</span>
        </a>

        <blockquote className="relative mt-6 min-h-[140px] font-display text-[23px] italic leading-snug md:text-[30px] md:leading-tight">
          {t.text}
        </blockquote>
        <p className="relative mt-4 text-[13px] font-medium uppercase tracking-wider text-text-muted">
          {t.name}
          {!compact && (
            <>
              <br />
              <span className="font-normal normal-case tracking-normal">
                {t.venue}, {t.year}
              </span>
            </>
          )}
        </p>

        <div className="relative mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to quote ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 cursor-pointer rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-2 bg-border"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#d9cfbc]"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#d9cfbc]"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
