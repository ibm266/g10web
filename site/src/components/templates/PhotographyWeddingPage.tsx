import { PhotoImage } from "@/components/ui/PhotoImage";
import { StarRating } from "@/components/ui/StarRating";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { HeroKenBurns } from "@/components/hero/HeroKenBurns";
import { FeaturedMarquee } from "@/components/sections/FeaturedMarquee";
import { ReviewsClaim } from "@/components/sections/ReviewsClaim";
import { WhyG10Grid } from "@/components/sections/WhyG10Grid";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { DarkCTA, PlanningGuideCTA } from "@/components/sections/CTA";
import { Filmstrip } from "@/components/sections/GalleryGrid";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Typography";
import { ArrowLink } from "@/components/ui/Button";
import { slotGalleryItems, slotImageMeta } from "@/lib/images";
import { ROUTES } from "@/lib/routes";

const weddingFaq = [
  { q: "What is your photography style?", a: "A mixture of documentarian and editorial, with posed show-stoppers plus natural candid emotion." },
  { q: "How far in advance should I book?", a: "We recommend booking at least 6 months prior for weddings. A deposit secures your date." },
  { q: "When will I receive my gallery?", a: "Typically within 4-6 weeks after your wedding." },
  { q: "How many photos will I receive?", a: "All edited photos from your coverage. RAW files not included per policy." },
  { q: "What venues do you shoot at?", a: "All Aruba venues plus worldwide destination weddings." },
  { q: "What are your prices?", a: "Wedding packages starting at $2,000. Custom packages available upon request." },
  { q: "Do you charge travel fees?", a: "Destination weddings may include travel fees depending on location." },
];

const guidedSteps = [
  { num: "01", title: "Let's meet 👋", body: "We'll chat over email or Zoom to discuss your vision and make sure we're a great fit." },
  { num: "02", title: "Preparations ⏳", body: "I'll help with poses, outfit choices, timeline planning, and everything in between." },
  { num: "03", title: "The Big Day is here 💒", body: "We meet, loosen up, chat first, then capture every moment with documentarian + editorial flair." },
  { num: "04", title: "Et Violà, Your Final Gallery 🖼️", body: "Your personal online gallery with download, print, and album options through G10 Studio Shop." },
];

type Props = {
  eyebrow?: string;
  portfolioLink?: string;
  imagePage?: string;
};

export function PhotographyWeddingTemplate({
  eyebrow = "The wedding experience",
  portfolioLink = ROUTES.portfolioWeddings,
  imagePage = "photography-wedding",
}: Props) {
  const styleBlocks = [
    {
      slot: "style-1",
      title: (
        <>
          <span className="italic">My photography style</span> is a mixture of{" "}
          <span className="italic">documentarian and editorial</span>…
        </>
      ),
      body: "Which means sometimes I'll pose you for those show-stopping photos, but most of the time I'll be capturing everything as it happens naturally, with authentic emotion.",
    },
    {
      slot: "style-2",
      title: (
        <>
          My editing is <span className="italic">timeless, vibrant</span>, and sometimes a{" "}
          <span className="italic">dramatic</span> black and white…
        </>
      ),
      body: "It all depends on what your love story is, the emotions that were there in the moment, and how I want you to feel when you look back onto your beautiful lifelong memories.",
    },
  ] as const;

  return (
    <>
      <SiteHeader variant="transparent" />
      <HeroKenBurns
        page={imagePage}
        eyebrow={eyebrow}
        headline={[
          { text: "Luxury", italic: true, gold: true },
          { text: "wedding photographer" },
          { text: "in Aruba" },
        ]}
        subline="Moments like these only last for a second… but the memories last forever."
        ctas={[
          { label: "Check my date", href: ROUTES.inquire },
          { label: "See the work", href: portfolioLink, variant: "outline-light" },
        ]}
      />
      <FeaturedMarquee />
      <Section>
        <Container className="space-y-16">
          {styleBlocks.map((block) => {
            const meta = slotImageMeta(imagePage, block.slot);
            return (
            <div key={block.slot} className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-border/30">
                <PhotoImage
                  src={meta?.src ?? ""}
                  alt=""
                  fill
                  focalX={meta?.focalX}
                  focalY={meta?.focalY}
                />
              </div>
              <div>
                <h2 className="font-display text-3xl font-medium leading-tight md:text-4xl">
                  {block.title}
                </h2>
                <p className="mt-4 leading-relaxed text-text-muted">{block.body}</p>
              </div>
            </div>
            );
          })}
        </Container>
      </Section>
      <Section dark>
        <Container>
          <SectionHeading dark>
            The step-by-step <span className="italic">guided experience</span>
          </SectionHeading>
          <div className="mt-8 border-t border-white/15">
            {guidedSteps.map((step, i) => (
              <details key={step.num} className="group border-b border-white/15" open={i === 0}>
                <summary className="flex cursor-pointer items-center gap-4 py-5 text-text-on-dark">
                  <span className="font-display text-3xl text-highlight">{step.num}</span>
                  <span className="flex-1 font-medium">{step.title}</span>
                </summary>
                <p className="pb-5 pl-14 text-sm leading-relaxed text-text-on-dark/80">
                  {step.body}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeading>
            Capturing your special moments with{" "}
            <span className="italic">Aruba wedding photography</span>
          </SectionHeading>
        </Container>
        <Filmstrip items={slotGalleryItems(imagePage, "gallery")} />
        <Container>
          <ArrowLink href={portfolioLink} className="mt-6">
            See the full wedding portfolio
          </ArrowLink>
        </Container>
      </Section>
      <Section className="!py-20 text-center">
        <Container>
          <p className="font-display text-4xl font-medium tracking-wide md:text-6xl">
            MEMORIES THAT LAST LIFETIMES
          </p>
        </Container>
      </Section>
      <Section>
        <FAQAccordion items={weddingFaq} />
      </Section>
      <Section>
        <Container narrow>
          <ReviewsClaim variant="centered" />
        </Container>
      </Section>
      <Section>
        <WhyG10Grid textOnly />
      </Section>
      <Section className="!py-12 bg-[#f3ede2]">
        <Container narrow className="text-center">
          <StarRating size="lg" className="justify-center" />
          <p className="mt-4 font-display text-4xl font-bold uppercase tracking-wider text-accent">
            HE IS MAGIC!
          </p>
          <blockquote className="mt-6 font-display text-2xl italic">
            Jiten captured our day perfectly: fun, professional, and absolutely magical.
          </blockquote>
          <p className="mt-4 text-sm uppercase tracking-wider text-text-muted">
            Mike & Carissa Scarfo
          </p>
        </Container>
      </Section>
      <DarkCTA
        title="Inquire for the wedding experience"
        subtitle="I'll respond within 72 hours with packages and prices."
        primaryLabel="Inquire"
        primaryHref={ROUTES.inquireWedding}
      />
      <PlanningGuideCTA />
      <SiteFooter />
      <StickyInquireBar hint="packages from $2,000" />
    </>
  );
}
