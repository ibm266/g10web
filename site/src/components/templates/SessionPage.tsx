import { GalleryTile } from "@/components/sections/GalleryTile";
import { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { HeroKenBurns } from "@/components/hero/HeroKenBurns";
import { DarkCTA } from "@/components/sections/CTA";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Typography";
import { ArrowLink } from "@/components/ui/Button";
import { slotGalleryItems } from "@/lib/images";
import { ROUTES } from "@/lib/routes";

type HeadlineLine = { text: string; italic?: boolean; gold?: boolean };

export type SessionPageConfig = {
  page: string;
  eyebrow: string;
  headline: HeadlineLine[];
  intro: string;
  chips: string[];
  closingTitle: ReactNode;
  closingBody: string;
  priceHint?: string;
};

export function SessionPage({ config }: { config: SessionPageConfig }) {
  const gallery = slotGalleryItems(config.page, "gallery");
  const [hero, ...thumbs] = gallery;

  return (
    <>
      <SiteHeader variant="transparent" />
      <HeroKenBurns
        page={config.page}
        eyebrow={config.eyebrow}
        headline={config.headline}
        ctas={[
          { label: "Check my date", href: ROUTES.inquire },
          { label: "See the work", href: ROUTES.portfolio, variant: "outline-light" },
        ]}
      />
      <Section>
        <Container narrow>
          <p className="text-base leading-relaxed">{config.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {config.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border px-4 py-2 text-sm text-text-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="!pt-0">
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {hero && (
              <GalleryTile
                item={hero}
                layout={hero.isLandscape ? "full" : "portrait"}
                className="!col-span-2 md:row-span-2"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            )}
            {thumbs.slice(0, 2).map((item) => (
              <GalleryTile key={item.id} item={item} />
            ))}
          </div>
          <ArrowLink href={ROUTES.portfolio} className="mt-6">
            See the full gallery
          </ArrowLink>
        </Container>
      </Section>
      <Section>
        <Container narrow>
          <SectionHeading>{config.closingTitle}</SectionHeading>
          <p className="mt-4 leading-relaxed text-text-muted">{config.closingBody}</p>
        </Container>
      </Section>
      <DarkCTA
        title="Sessions from $700"
        subtitle="Book ideally 4 weeks prior · Aruba locations only"
        primaryLabel="Inquire"
        primaryHref={ROUTES.inquireSession}
      />
      <SiteFooter />
      <StickyInquireBar hint={config.priceHint ?? "sessions from $700"} />
    </>
  );
}
