import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { DarkCTA } from "@/components/sections/CTA";
import { ArrowLink } from "@/components/ui/Button";
import { Container, PAGE_CONTENT_CLASS, PageIntro, Section } from "@/components/ui/Section";
import { slotGalleryItems } from "@/lib/images";
import { ROUTES } from "@/lib/routes";

export const metadata = { title: "Wedding Portfolio | G10 Studio" };

export default function PortfolioWeddingsPage() {
  const items = slotGalleryItems("portfolio-hub", "gallery-wedding", "Weddings");

  return (
    <>
      <SiteHeader />
      <PageIntro
        headline={[
          { text: "Wedding" },
          { text: "portfolio.", italic: true, gold: true },
        ]}
      />
      <Section className={PAGE_CONTENT_CLASS}>
        <GalleryGrid items={items} />
        <Container className="mt-8">
          <ArrowLink href={ROUTES.portfolio}>View full portfolio</ArrowLink>
          <span className="mx-3 text-text-muted">·</span>
          <ArrowLink href={ROUTES.photographyWedding}>The wedding experience</ArrowLink>
        </Container>
      </Section>
      <DarkCTA title="Picture yourselves here" primaryLabel="Inquire" />
      <SiteFooter />
      <StickyInquireBar />
    </>
  );
}
