"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";

type Props = {
  hint?: string;
  href?: string;
  label?: string;
};

function CollapseChevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 ${className}`}
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StickyInquireBar({
  hint = "2027 dates are going fast · from $2,000",
  href = ROUTES.inquire,
  label = "Inquire",
}: Props) {
  const [pastHero, setPastHero] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("[data-site-hero]");
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
        setPastHero(window.scrollY > heroBottom - 100);
      } else {
        setPastHero(window.scrollY > 120);
      }

      setNearBottom(
        window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 220,
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const show = pastHero && !nearBottom;
  if (!show) return null;

  const safeBottom = "pb-[max(1.25rem,env(safe-area-inset-bottom))]";

  if (collapsed) {
    return (
      <div
        className={`pointer-events-none fixed bottom-5 right-5 z-40 ${safeBottom} md:bottom-6 md:right-8`}
      >
        <Button
          href={href}
          className="pointer-events-auto !h-11 !px-5 !text-sm shadow-[0_8px_32px_rgba(43,38,32,0.28)]"
        >
          {label}
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none fixed bottom-5 right-5 z-40 w-[calc(100%-2.5rem)] max-w-md ${safeBottom} md:bottom-6 md:right-8 md:max-w-lg`}
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/15 bg-bg-dark/95 py-2 pl-1.5 pr-2 shadow-[0_8px_32px_rgba(43,38,32,0.28)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse inquire bar"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-on-dark/75 transition-colors hover:bg-white/10 hover:text-text-on-dark"
        >
          <CollapseChevron />
        </button>
        <p className="min-w-0 flex-1 truncate text-xs leading-snug text-text-on-dark/85 sm:text-[13px]">
          {hint}
        </p>
        <Button href={href} className="!h-9 shrink-0 !px-4 !text-sm">
          {label}
        </Button>
      </div>
    </div>
  );
}
