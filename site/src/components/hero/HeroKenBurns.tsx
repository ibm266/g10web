"use client";

import { PhotoImage } from "@/components/ui/PhotoImage";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, KineticHeadline } from "@/components/ui/Typography";
import { slotGalleryItems } from "@/lib/images";
import { ROUTES } from "@/lib/routes";

type CTA = { label: string; href: string; variant?: "primary" | "outline-light" };

type Props = {
  page: string;
  slot?: string;
  images?: string[];
  eyebrow: string;
  headline: { text: string; italic?: boolean; gold?: boolean }[];
  subline?: ReactNode;
  ctas: CTA[];
  tall?: boolean;
  scrollDial?: boolean;
};

export function HeroKenBurns({
  page,
  slot = "hero",
  images,
  eyebrow,
  headline,
  subline,
  ctas,
  tall = true,
  scrollDial = false,
}: Props) {
  const [slide, setSlide] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const slides = slotGalleryItems(page, slot);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    if (!tall || !scrollDial) return;

    const onScroll = () => setHasScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDial, tall]);

  return (
    <section
      data-site-hero
      className={`relative overflow-hidden bg-bg-dark ${tall ? "min-h-svh" : "min-h-[560px]"}`}
      data-scroll-dial={scrollDial || undefined}
    >
      {slides.map((item, i) => (
        <div
          key={item.id}
          className={`absolute inset-x-0 -top-[18vh] h-[118vh] transition-opacity duration-[1200ms] ${i === slide ? "opacity-100" : "opacity-0"}`}
        >
          <PhotoImage
            src={item.src}
            alt=""
            fill
            priority={i === 0}
            focalX={item.focalX}
            focalY={item.focalY}
            className="photo-cover-kb"
            sizes="100vw"
          />
        </div>
      ))}
      <div className="absolute inset-x-0 -top-[18vh] h-[118vh] bg-gradient-to-b from-bg-dark/40 via-bg-dark/10 to-bg-dark/70" />

      <div className="relative z-10 flex min-h-[inherit] flex-col justify-end px-5 pb-10 pt-20 md:px-12 md:pb-14 md:pt-24">
        <Eyebrow bubble>{eyebrow}</Eyebrow>
        <KineticHeadline lines={headline} dark className="mt-3.5 max-w-3xl" />
        {subline && (
          <p className="mt-4 max-w-lg text-[15px] font-light leading-relaxed text-text-on-dark/90 md:text-base">
            {subline}
          </p>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {ctas.map((cta) => (
            <Button
              key={cta.label}
              href={cta.href}
              variant={cta.variant ?? "primary"}
              magnetic={cta.variant !== "outline-light"}
            >
              {cta.label}
            </Button>
          ))}
        </div>
      </div>

      {tall && (
        <p
          className={`absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.18em] text-text-on-dark/70 transition-opacity duration-500 ${
            hasScrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          Scroll
        </p>
      )}
    </section>
  );
}

export function ShortHero({
  page,
  slot = "hero",
  eyebrow,
  headline,
}: {
  page: string;
  slot?: string;
  eyebrow: string;
  headline: { text: string; italic?: boolean; gold?: boolean }[];
}) {
  return (
    <HeroKenBurns
      page={page}
      slot={slot}
      eyebrow={eyebrow}
      headline={headline}
      ctas={[{ label: "Check my date", href: ROUTES.inquire }]}
      tall={false}
    />
  );
}
