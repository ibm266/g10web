"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ROUTES } from "@/lib/routes";

const footerLinks = {
  photography: [
    { label: "Home", href: ROUTES.home },
    { label: "Wedding", href: ROUTES.photographyWedding },
    { label: "Family", href: ROUTES.photographyFamily },
    { label: "Couple", href: ROUTES.photographyCouple },
    { label: "Solo", href: ROUTES.photographySolo },
  ],
  videography: [
    { label: "Wedding", href: ROUTES.videographyWedding },
    { label: "Events", href: ROUTES.videography },
    { label: "Reels", href: ROUTES.videography },
    { label: "Commercial", href: ROUTES.videography },
  ],
  explore: [
    { label: "Inquire", href: ROUTES.inquire },
    { label: "About", href: ROUTES.about },
  ],
};

export function SiteFooter({ condensed = false }: { condensed?: boolean }) {
  return (
    <footer className="bg-bg-dark text-text-on-dark">
      <Container className="py-16 md:py-20">
        {!condensed && (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
                Photography
              </h3>
              <ul className="space-y-2">
                {footerLinks.photography.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-on-dark/80 hover:text-highlight">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
                Videography
              </h3>
              <ul className="space-y-2">
                {footerLinks.videography.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-on-dark/80 hover:text-highlight">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
                Explore
              </h3>
              <ul className="space-y-2">
                {footerLinks.explore.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-on-dark/80 hover:text-highlight">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
                Subscribe
              </h3>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="h-[52px] flex-1 rounded-full border border-white/20 bg-bg-dark-2 px-4 text-base text-text-on-dark placeholder:text-text-on-dark/50"
                />
                <button
                  type="submit"
                  className="h-[52px] rounded-full bg-accent px-5 text-sm font-medium text-text-on-dark"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        )}

        <p className="mt-10 font-display text-lg italic text-text-on-dark/90 md:mt-14">
          We proudly welcome everyone regardless of religion, gender, race, or sexual orientation!
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-text-on-dark/70 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>info@g10.studio · +297 6992469</p>
            <p>Westraat #4, Oranjestad, Aruba</p>
          </div>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/g10.studio/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com/g10.studio" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://www.pinterest.com/g10studio/" target="_blank" rel="noopener noreferrer">
              Pinterest
            </a>
          </div>
          <p>© {new Date().getFullYear()} G10 Studio</p>
        </div>
      </Container>
    </footer>
  );
}
