import { PhotoImage } from "@/components/ui/PhotoImage";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { HeroKenBurns } from "@/components/hero/HeroKenBurns";
import { FeaturedMarquee } from "@/components/sections/FeaturedMarquee";
import { Filmstrip } from "@/components/sections/GalleryGrid";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { ReviewsClaim } from "@/components/sections/ReviewsClaim";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { DarkCTA } from "@/components/sections/CTA";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Typography";
import { ArrowLink } from "@/components/ui/Button";
import { slotGalleryItems, slotImageMeta } from "@/lib/images";
import { ROUTES } from "@/lib/routes";

const faq = [
  { q: "What is the booking process?", a: "Inquire, receive packages, pay deposit online. First come, first served." },
  { q: "When will I receive my gallery?", a: "Wedding galleries typically within 4-6 weeks; sessions within 1-2 weeks." },
  { q: "How many photos will I receive?", a: "You'll receive all edited photos from your coverage. No RAW files policy." },
  { q: "What venues do you shoot at?", a: "All Aruba venues plus worldwide destination weddings." },
  { q: "What are your prices?", a: "Wedding packages starting at $2,499. Custom packages available upon request." },
  { q: "Can I add videography?", a: "Yes! Photo + video packages available. Inquire for combined pricing." },
  { q: "Do you charge travel fees?", a: "Aruba sessions included; destination weddings may include travel fees depending on location." },
];

const services = [
  { title: "Wedding Photography", href: ROUTES.photographyWedding },
  { title: "Couple's Session", href: ROUTES.photographyCouple },
  { title: "Family Session", href: ROUTES.photographyFamily },
];

export const metadata = { title: "Wedding Photographer in Aruba | G10 Studio" };

export default function WeddingLandingPage() {
  const story = slotImageMeta("wedding-landing", "story");

  return (
    <>
      <SiteHeader variant="transparent" />
      <HeroKenBurns
        page="wedding-landing"
        eyebrow="Check availability & start your journey"
        headline={[
          { text: "Wedding & Couple" },
          { text: "Photographer in" },
          { text: "Aruba", italic: true, gold: true },
        ]}
        ctas={[
          { label: "Check my date", href: ROUTES.inquire },
          { label: "See the work", href: ROUTES.portfolio, variant: "outline-light" },
        ]}
        scrollDial
      />
      <FeaturedMarquee />
      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-border/30">
              <PhotoImage src={story?.src ?? ""} alt="" fill focalX={story?.focalX} focalY={story?.focalY} />
            </div>
            <div>
              <SectionHeading>
                Your photography partner in{" "}
                <span className="italic">capturing memories</span>
              </SectionHeading>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                I&apos;m dedicated to capturing the essence of your love story. Every couple has a
                unique story, and with over six years of experience, I bring documentarian meets
                editorial style to every wedding.
              </p>
              <ArrowLink href={ROUTES.about} className="mt-4">
                More about me
              </ArrowLink>
            </div>
          </div>
        </Container>
      </Section>
      <Section className="!pt-0">
        <Container>
          <SectionHeading>
            See the happy faces <span className="italic">live here</span>
          </SectionHeading>
        </Container>
        <Filmstrip items={slotGalleryItems("wedding-landing", "filmstrip")} />
        <Container>
          <ArrowLink href={ROUTES.portfolio} className="mt-6">
            Browse the full portfolio
          </ArrowLink>
        </Container>
      </Section>
      <Section dark>
        <Container>
          <SectionHeading dark>
            Capture <span className="italic">the moment</span>
          </SectionHeading>
          <p className="mt-3 text-text-on-dark/80">Professional photography & videography in Aruba and worldwide.</p>
          <div className="mt-8 divide-y divide-white/15 border-t border-white/15">
            {services.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="flex items-center justify-between py-5 text-text-on-dark hover:text-highlight"
              >
                <span className="font-display text-xl">{s.title}</span>
                <span>→</span>
              </a>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeading>
            Checkout the reviews <span className="italic">I have</span>
          </SectionHeading>
          <div className="mt-4">
            <ReviewsClaim variant="compact" />
          </div>
        </Container>
        <div className="mt-6">
          <TestimonialCarousel compact />
        </div>
      </Section>
      <Section>
        <FAQAccordion items={faq} />
      </Section>
      <DarkCTA
        title={
          <>
            Reserve <span className="italic">your date</span>
          </>
        }
        subtitle="Fill out the contact form and I'll reply with packages and prices within 72 hours."
        primaryLabel="Inquire"
      />
      <SiteFooter />
      <StickyInquireBar hint="packages from $2,499" />
    </>
  );
}
