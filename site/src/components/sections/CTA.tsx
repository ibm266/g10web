"use client";

import { PhotoImage } from "@/components/ui/PhotoImage";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";
import { slotImage, slotImageMeta } from "@/lib/images";

type Props = {
  title: React.ReactNode;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function DarkCTA({
  title,
  subtitle,
  primaryLabel = "Check my date",
  primaryHref = ROUTES.inquire,
  secondaryLabel,
  secondaryHref,
}: Props) {
  return (
    <section className="bg-bg-dark py-[72px] text-text-on-dark md:py-[120px]">
      <Container className="text-center">
        <h2 className="font-display text-[34px] font-medium leading-tight md:text-[56px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-lg text-[15px] font-light leading-relaxed text-text-on-dark/85">
            {subtitle}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={primaryHref}>{primaryLabel}</Button>
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant="outline-light">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}

export function CategoryCard({
  page,
  slot,
  src,
  title,
  subtitle,
  href,
  delay = 0,
  overlay = "dark",
}: {
  page: string;
  slot: string;
  src?: string;
  title: string;
  subtitle: string;
  href: string;
  delay?: number;
  /** dark = cream text on dark gradient; light = terracotta/charcoal text, no image overlay */
  overlay?: "dark" | "light";
}) {
  const meta = slotImageMeta(page, slot);

  const isLight = overlay === "light";

  return (
    <Link
      href={href}
      className="group relative block h-[250px] overflow-hidden rounded-[20px] bg-border/30 md:h-[300px]"
    >
      <PhotoImage
        src={src ?? meta?.src ?? slotImage(page, slot)}
        alt={title}
        fill
        hoverZoom
        focalX={meta?.focalX}
        focalY={meta?.focalY}
        sizes="(max-width: 768px) 100vw, 400px"
      />
      {overlay === "dark" && (
        <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-dark/70" />
      )}
      <span
        className={`absolute bottom-4 left-5 right-5 ${isLight ? "text-text" : "text-text-on-dark"}`}
      >
        <span
          className={`block font-display text-[28px] italic font-medium ${
            isLight ? "text-accent-deep [text-shadow:0_1px_3px_rgba(250,247,242,0.95),0_0_16px_rgba(250,247,242,0.75)]" : ""
          }`}
        >
          {title}
        </span>
        <span className="mt-1 flex items-center justify-between">
          <span
            className={`text-[13px] ${
              isLight
                ? "text-text [text-shadow:0_1px_2px_rgba(250,247,242,0.95),0_0_10px_rgba(250,247,242,0.7)]"
                : "text-text-on-dark/85"
            }`}
          >
            {subtitle}
          </span>
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-transform group-hover:translate-x-1 ${
              isLight
                ? "border-accent/50 bg-bg/80 text-accent-deep"
                : "border-white/60"
            }`}
          >
            →
          </span>
        </span>
      </span>
    </Link>
  );
}

export function PlanningGuideCTA() {
  return (
    <section className="bg-highlight/40 py-12 md:py-16">
      <Container className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <p className="font-display text-2xl font-medium md:text-3xl">
          Download your free Aruba Wedding Planning Guide today!
        </p>
        <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email"
            className="h-[52px] flex-1 rounded-full border border-border bg-surface px-4 text-base"
          />
          <button
            type="submit"
            className="h-[52px] shrink-0 rounded-full bg-accent px-6 text-sm font-medium text-[#f5efe6]"
          >
            Get guide
          </button>
        </form>
      </Container>
    </section>
  );
}
