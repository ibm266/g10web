import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { HeroKenBurns } from "@/components/hero/HeroKenBurns";
import { FeaturedMarquee } from "@/components/sections/FeaturedMarquee";
import { ServiceTabs } from "@/components/sections/ServiceTabs";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { MeetPhotographer } from "@/components/sections/MeetPhotographer";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { WhyG10Grid } from "@/components/sections/WhyG10Grid";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { DarkCTA } from "@/components/sections/CTA";
import { Section } from "@/components/ui/Section";
import { StarRating } from "@/components/ui/StarRating";
import { homeFaq } from "@/lib/content";
import { REVIEW_STATS } from "@/lib/reviews";
import { ROUTES } from "@/lib/routes";

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="transparent" />
      <HeroKenBurns
        page="home"
        eyebrow="Aruba & worldwide"
        headline={[
          { text: "Timeless wedding" },
          { text: "photography," },
          { text: "shot in paradise.", italic: true, gold: true },
        ]}
        subline={
          <span className="block">
            Documentarian meets editorial
            <span className="mt-2 block text-text-on-dark/90">
              {REVIEW_STATS.count}+ {REVIEW_STATS.shortLabel}
            </span>
            <span className="mt-1.5 flex">
              <StarRating size="sm" className="text-hero-accent" />
            </span>
          </span>
        }
        ctas={[
          { label: "Check my date", href: ROUTES.inquire },
          { label: "Read reviews", href: "#reviews", variant: "outline-light" },
        ]}
        scrollDial
      />
      <FeaturedMarquee />
      <Section>
        <ServiceTabs />
      </Section>
      <Section dark id="how-it-works">
        <ProcessSteps />
      </Section>
      <Section className="!pb-10 md:!pb-12">
        <MeetPhotographer />
      </Section>
      <Section className="!pt-6 !pb-14 md:!pt-8 md:!pb-16">
        <TestimonialCarousel />
      </Section>
      <Section>
        <WhyG10Grid />
      </Section>
      <Section>
        <FAQAccordion items={homeFaq} />
      </Section>
      <DarkCTA
        title={
          <>
            Join the Aruban <span className="italic">Family!</span>
          </>
        }
        subtitle="Wedding Photography Packages starting at $2,000. Couples & Family Photoshoots starting at $700."
        secondaryLabel="See the work"
        secondaryHref={ROUTES.portfolio}
      />
      <SiteFooter />
      <StickyInquireBar />
    </>
  );
}
