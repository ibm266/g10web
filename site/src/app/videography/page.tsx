import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { HeroKenBurns } from "@/components/hero/HeroKenBurns";
import { DarkCTA } from "@/components/sections/CTA";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow, KineticHeadline } from "@/components/ui/Typography";
import { ROUTES } from "@/lib/routes";

const categories = [
  { title: "Wedding films", subtitle: "Full ceremonies & trailers", href: ROUTES.videographyWedding },
  { title: "Events", subtitle: "Corporate & celebrations", href: ROUTES.videography },
  { title: "Reels", subtitle: "Short-form social content", href: ROUTES.videography },
  { title: "Commercial", subtitle: "Brand & product films", href: ROUTES.videography },
];

export const metadata = { title: "Videography Portfolio — G10 Studio" };

export default function VideographyHubPage() {
  return (
    <>
      <SiteHeader variant="transparent" />
      <HeroKenBurns
        page="videography-hub"
        eyebrow="Videography portfolio"
        headline={[
          { text: "Aruba weddings" },
          { text: "and events, in motion", italic: true, gold: true },
        ]}
        ctas={[{ label: "Check my date", href: ROUTES.inquire }]}
      />
      <Section>
        <Container narrow>
          <p className="text-base leading-relaxed text-text-muted">
            From cinematic wedding films to event coverage and short-form reels — G10 Studio
            captures your story in motion with the same warmth and professionalism as our
            photography.
          </p>
        </Container>
      </Section>
      <Section className="!pt-0">
        <Container className="divide-y divide-border border-t border-border">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="flex items-center justify-between py-6 hover:text-accent"
            >
              <div>
                <h3 className="font-display text-2xl font-medium">{cat.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{cat.subtitle}</p>
              </div>
              <span className="text-xl">→</span>
            </Link>
          ))}
        </Container>
      </Section>
      <Section className="!py-16 bg-[#f3ede2]">
        <Container narrow className="text-center">
          <blockquote className="font-display text-2xl italic leading-relaxed md:text-3xl">
            Photography has little to do with the things you see and everything to do with the way
            you see them.
          </blockquote>
        </Container>
      </Section>
      <DarkCTA title="Let's film your story" primaryLabel="Inquire" />
      <SiteFooter />
      <StickyInquireBar hint="photo + video, one team" />
    </>
  );
}
