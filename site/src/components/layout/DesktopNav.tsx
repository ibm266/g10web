"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ROUTES } from "@/lib/routes";

const portfolioLinks = [
  { label: "Weddings", href: ROUTES.photographyWedding },
  { label: "Couple's Portraits", href: ROUTES.photographyCouple },
  { label: "Family Portraits", href: ROUTES.photographyFamily },
  { label: "Photography (all)", href: ROUTES.photography },
  { label: "Videography", href: ROUTES.videography },
];

type Props = {
  light?: boolean;
};

export function DesktopNav({ light = false }: Props) {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPortfolio = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPortfolioOpen(true);
  };

  const closePortfolio = () => {
    closeTimer.current = setTimeout(() => setPortfolioOpen(false), 120);
  };

  const linkClass = light
    ? "text-text-on-dark/90 hover:text-text-on-dark"
    : "text-text/90 hover:text-text";

  return (
    <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
      <Link
        href={ROUTES.weddingLanding}
        className={`cursor-pointer text-sm font-medium tracking-wide transition-colors duration-200 ${linkClass}`}
      >
        Weddings
      </Link>

      <div
        className="relative"
        onMouseEnter={openPortfolio}
        onMouseLeave={closePortfolio}
        onFocus={openPortfolio}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) closePortfolio();
        }}
      >
        <Link
          href={ROUTES.portfolio}
          className={`inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium tracking-wide transition-colors duration-200 ${linkClass} ${portfolioOpen ? (light ? "text-text-on-dark" : "text-text") : ""}`}
          aria-haspopup="true"
          aria-expanded={portfolioOpen}
        >
          Portfolio
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden
            className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${portfolioOpen ? "rotate-180" : ""}`}
          >
            <path
              d="M2.5 4.5L6 8l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Hover bridge — prevents gap flicker between trigger and panel */}
        <div
          className={`absolute left-0 top-full z-40 pt-3 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            portfolioOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <div className="nav-dropdown min-w-[240px] rounded-2xl py-2">
            {portfolioLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block cursor-pointer px-4 py-2.5 text-sm text-text transition-colors duration-200 hover:bg-accent/8 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Link
        href={ROUTES.about}
        className={`cursor-pointer text-sm font-medium tracking-wide transition-colors duration-200 ${linkClass}`}
      >
        About G10
      </Link>
      <Link
        href={ROUTES.blog}
        className={`cursor-pointer text-sm font-medium tracking-wide transition-colors duration-200 ${linkClass}`}
      >
        Blog
      </Link>
    </nav>
  );
}
