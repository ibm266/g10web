"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export type HeadlineLine = { text: string; italic?: boolean; gold?: boolean };

type Props = {
  lines: HeadlineLine[];
  className?: string;
  dark?: boolean;
  variant?: "hero" | "page";
};

export function KineticHeadline({
  lines,
  className = "",
  dark = false,
  variant = "hero",
}: Props) {
  const reduced = useReducedMotion();
  const isPage = variant === "page";

  return (
    <h1
      className={`font-display font-medium text-[44px] leading-[1.05] tracking-tight md:text-[72px] md:leading-[1.02] lg:text-[88px] ${dark ? "text-text-on-dark" : "text-text"} ${className}`}
    >
      {lines.map((line, i) => {
        const accentClass = line.gold
          ? dark
            ? "text-hero-accent"
            : "text-accent"
          : "";

        if (isPage || reduced) {
          return (
            <span key={i} className="block">
              <span className={`inline-block ${line.italic ? "italic" : ""} ${accentClass}`}>
                {line.text}
              </span>
            </span>
          );
        }

        return (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className={`inline-block ${line.italic ? "italic" : ""} ${accentClass}`}
              initial={{ y: "110%", opacity: 0.85 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line.text}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}

export function Eyebrow({
  children,
  className = "",
  accent = false,
  bubble = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  /** Cream pill for legibility over photo heroes */
  bubble?: boolean;
}) {
  const textClass = bubble
    ? "text-accent"
    : accent
      ? "text-accent"
      : "text-text-muted";

  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.18em] md:text-xs ${bubble ? "inline-flex w-fit items-center rounded-full border border-border/50 bg-bg/95 px-3.5 py-1.5 shadow-[0_2px_12px_rgba(43,38,32,0.14)] backdrop-blur-sm" : ""} ${textClass} ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <h2
      className={`font-display text-[34px] font-medium leading-[1.1] md:text-[48px] lg:text-[56px] lg:leading-[1.06] ${dark ? "text-text-on-dark" : "text-text"} ${className}`}
    >
      {children}
    </h2>
  );
}
