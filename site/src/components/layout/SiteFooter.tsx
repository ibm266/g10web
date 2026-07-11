"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ROUTES } from "@/lib/routes";
import { reviewPlatforms } from "@/lib/reviews";

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
    { label: "Portfolio", href: ROUTES.portfolio },
    { label: "Blog", href: ROUTES.blog },
  ],
};

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-text-on-dark/80 hover:text-highlight">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ condensed = false }: { condensed?: boolean }) {
  return (
    <footer className="bg-bg-dark text-text-on-dark">
      <Container className="py-10 md:py-12">
        {!condensed && (
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <LinkColumn title="Photography" links={footerLinks.photography} />
              <LinkColumn title="Videography" links={footerLinks.videography} />
              <LinkColumn title="Explore" links={footerLinks.explore} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
                  Reviews
                </h3>
                <ul className="space-y-1.5">
                  {reviewPlatforms.map((platform) => (
                    <li key={platform.name}>
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-on-dark/80 hover:text-highlight"
                      >
                        {platform.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
                  Subscribe
                </h3>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="h-11 min-w-0 flex-1 rounded-full border border-white/20 bg-bg-dark-2 px-4 text-sm text-text-on-dark placeholder:text-text-on-dark/50"
                  />
                  <button
                    type="submit"
                    className="h-11 shrink-0 rounded-full bg-accent px-5 text-sm font-medium text-text-on-dark"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {condensed && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {reviewPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-on-dark/80 hover:text-highlight"
              >
                {platform.name} reviews
              </a>
            ))}
          </div>
        )}

        <p
          className={`font-display text-base italic text-text-on-dark/90 md:text-lg ${condensed ? "mt-5" : "mt-8"}`}
        >
          We proudly welcome everyone regardless of religion, gender, race, or sexual orientation!
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-text-on-dark/70 md:flex-row md:items-center md:justify-between">
          <div className="space-y-0.5">
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
