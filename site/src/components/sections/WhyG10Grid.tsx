"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PhotoImage } from "@/components/ui/PhotoImage";
import { StarRating } from "@/components/ui/StarRating";
import { Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Typography";
import { whyG10Cards } from "@/lib/content";
import { WHY_G10_SLOTS, slotImageMeta } from "@/lib/images";
import { REVIEW_STATS } from "@/lib/reviews";

const ctaClassName =
  "mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-2 hover:underline";

export function WhyG10Grid({ textOnly = false }: { textOnly?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller || whyG10Cards.length === 0) return;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(center - itemCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActive(closest);
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    updateActive();
    scroller.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      scroller.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  const scrollTo = (index: number) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <>
      <Container>
        <SectionHeading>
          Why couples book <span className="italic">G10</span>
        </SectionHeading>
      </Container>

      <div
        ref={scrollRef}
        className="scrollbar-hide mt-8 flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto px-[max(1.25rem,calc(50%-39vw))] pb-2 md:px-[max(3rem,calc(50%-10rem))]"
      >
        {whyG10Cards.map((card, i) => {
          const meta = slotImageMeta("home", WHY_G10_SLOTS[i]);
          const isReviewsCard = card.title.includes("250+");

          return (
            <div
              key={card.title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="w-[85vw] shrink-0 snap-center md:w-80"
            >
            <article
              className="overflow-hidden rounded-[20px] border border-border bg-surface"
            >
              {!textOnly && (
                <div className="relative h-44 bg-border/30">
                  <PhotoImage
                    src={meta?.src ?? ""}
                    alt=""
                    fill
                    hoverZoom
                    focalX={meta?.focalX}
                    focalY={meta?.focalY}
                    sizes="320px"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-display text-xl italic md:text-2xl">
                  {isReviewsCard ? (
                    <span className="flex flex-wrap items-center gap-2">
                      <span>{REVIEW_STATS.count}+ Testimonials</span>
                      <StarRating size="sm" />
                    </span>
                  ) : (
                    card.title
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{card.body}</p>
                {card.cta &&
                  (card.cta.external ? (
                    <a
                      href={card.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ctaClassName}
                    >
                      {card.cta.label}
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <Link href={card.cta.href} className={ctaClassName}>
                      {card.cta.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
              </div>
            </article>
            </div>
          );
        })}
      </div>

      {whyG10Cards.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 px-5 md:px-12" role="tablist" aria-label="Why G10 slides">
          {whyG10Cards.map((card, i) => (
            <button
              key={card.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to ${card.title}`}
              onClick={() => scrollTo(i)}
              className={`h-2 shrink-0 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-accent" : "w-2 bg-accent/25 hover:bg-accent/40"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
