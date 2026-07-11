"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Section";
import { StarRatingReveal } from "@/components/ui/StarRating";
import { testimonials } from "@/lib/content";
import { REVIEW_PRIMARY_URL, REVIEW_STATS, reviewPlatforms } from "@/lib/reviews";

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

  if (compact) {
    return (
      <Container>
        <blockquote className="font-display text-xl italic leading-snug">{t.text}</blockquote>
        <p className="mt-3 text-sm text-text-muted">{t.name}</p>
      </Container>
    );
  }

  return (
    <Container>
      <div id="reviews" className="flex flex-col items-center text-center">
        <span className="font-display text-[52px] font-medium leading-none text-accent tabular-nums md:text-[64px]">
          {count}+
        </span>
        <StarRatingReveal size="2xl" className="mt-4" />
        <p className="mt-3 text-sm text-text-muted md:text-base">{REVIEW_STATS.shortLabel}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {reviewPlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent underline-offset-2 transition-colors hover:text-accent-deep hover:underline"
            >
              {platform.name}
            </a>
          ))}
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-[20px] bg-[#f3ede2] p-8 md:mt-8 md:p-12">
        <span
          className="pointer-events-none absolute left-1.5 top-1.5 font-display text-[180px] leading-none text-accent/10 animate-drift md:text-[220px]"
          aria-hidden
        >
          &ldquo;
        </span>

        <blockquote className="relative min-h-[140px] font-display text-[23px] italic leading-snug md:text-[30px] md:leading-tight">
          {t.text}
        </blockquote>
        <p className="relative mt-4 text-[13px] font-medium uppercase tracking-wider text-text-muted">
          {t.name}
          <br />
          <span className="font-normal normal-case tracking-normal">
            {t.venue}, {t.year}
          </span>
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

      <a
        href={REVIEW_PRIMARY_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-ui="button"
        className="mx-auto mt-6 flex h-[52px] w-fit items-center justify-center rounded-full bg-accent px-6 text-[15px] font-medium tracking-wide text-[#f5efe6] transition-colors duration-200 hover:bg-accent-deep md:mt-8"
      >
        Read reviews for yourself
      </a>
    </Container>
  );
}
