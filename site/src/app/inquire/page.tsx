import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CategoryCard } from "@/components/sections/CTA";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { PlanningGuideCTA } from "@/components/sections/CTA";
import { Container, PAGE_CONTENT_CLASS, PageIntro, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Typography";
import { INQUIRE_ROUTER_SLOTS } from "@/lib/images";
import { ROUTES } from "@/lib/routes";

const cards = [
  {
    slot: INQUIRE_ROUTER_SLOTS[0],
    title: "For Weddings",
    subtitle: "Photo & video · from $2,000 · worldwide",
    href: ROUTES.inquireWedding,
    delay: 200,
  },
  {
    slot: INQUIRE_ROUTER_SLOTS[1],
    title: "For Couple's Portraits",
    subtitle: "Proposals, engagements, anniversaries · Aruba",
    href: ROUTES.inquireSession,
    delay: 340,
  },
  {
    slot: INQUIRE_ROUTER_SLOTS[2],
    title: "For Family Portraits",
    subtitle: "Mini & full sessions · Aruba",
    href: ROUTES.inquireSession,
    delay: 480,
  },
] as const;

export const metadata = { title: "Inquire — G10 Studio" };

export default function InquireRouterPage() {
  return (
    <>
      <SiteHeader />
      <PageIntro
        eyebrow={<Eyebrow accent>Inquire</Eyebrow>}
        headline={[
          { text: "How can we" },
          { text: "help you?", italic: true },
        ]}
      >
        <p className="mt-4 max-w-lg text-[15px] font-light leading-relaxed text-text-muted">
          Pick your session — you&apos;ll get the right form, and I&apos;ll reply with packages
          and prices.
        </p>
      </PageIntro>
      <Section className={PAGE_CONTENT_CLASS}>
        <Container className="flex flex-col gap-3.5">
          {cards.map((card) => (
            <CategoryCard
              key={card.title}
              page="inquire-router"
              slot={card.slot}
              title={card.title}
              subtitle={card.subtitle}
              href={card.href}
              delay={card.delay}
            />
          ))}
        </Container>
      </Section>
      <Section className="!py-12">
        <TestimonialCarousel compact />
      </Section>
      <PlanningGuideCTA />
      <SiteFooter />
    </>
  );
}
