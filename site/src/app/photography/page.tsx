import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { CategoryCard, DarkCTA } from "@/components/sections/CTA";
import { Container, PAGE_CONTENT_CLASS, PageIntro, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Typography";
import { PHOTOGRAPHY_HUB_SLOTS } from "@/lib/images";
import { ROUTES } from "@/lib/routes";

const categories = [
  { title: "Weddings", href: ROUTES.photographyWedding },
  { title: "Families", href: ROUTES.photographyFamily },
  { title: "Couples", href: ROUTES.photographyCouple },
  { title: "Solo", href: ROUTES.photographySolo },
] as const;

export const metadata = { title: "Photography Portfolio | G10 Studio" };

export default function PhotographyHubPage() {
  return (
    <>
      <SiteHeader />
      <PageIntro
        eyebrow={<Eyebrow>Photography portfolio · Aruba</Eyebrow>}
        headline={[
          { text: "All of the best," },
          { text: "for you to enjoy.", italic: true, gold: true },
        ]}
      >
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
          Browse wedding, couple, family, and solo photography, all shot in paradise with a
          documentarian meets editorial style.
        </p>
      </PageIntro>
      <Section className={PAGE_CONTENT_CLASS}>
        <Container className="grid gap-4 md:grid-cols-2">
          {categories.map((c, i) => (
            <CategoryCard
              key={c.title}
              page="photography-hub"
              slot={PHOTOGRAPHY_HUB_SLOTS[c.title]}
              title={c.title}
              subtitle="View portfolio →"
              href={c.href}
              delay={i * 100}
            />
          ))}
        </Container>
        <Container>
          <Link
            href={ROUTES.videography}
            className="mt-6 flex items-center justify-between border-t border-border py-5 font-medium"
          >
            Videography portfolio <span>→</span>
          </Link>
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
      <DarkCTA title="Ready to book?" primaryLabel="Inquire" />
      <StickyInquireBar hint="sessions & weddings in Aruba" />
      <SiteFooter condensed />
    </>
  );
}
