import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { DarkCTA } from "@/components/sections/CTA";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { PAGE_CONTENT_CLASS, PageIntro, Section } from "@/components/ui/Section";
import { portfolioGalleryItems } from "@/lib/images";

export const metadata = { title: "Portfolio | G10 Studio" };

export default function PortfolioHubPage() {
  return (
    <>
      <SiteHeader />
      <PageIntro
        headline={[
          { text: "The work," },
          { text: "up close.", italic: true, gold: true },
        ]}
      />
      <Section className={PAGE_CONTENT_CLASS}>
        <GalleryGrid
          items={portfolioGalleryItems()}
          filters={["All", "Weddings", "Couples", "Family", "Solo"]}
        />
      </Section>
      <Section className="!pt-6 !pb-14 md:!pt-8 md:!pb-16">
        <TestimonialCarousel />
      </Section>
      <DarkCTA title="Picture yourselves here" primaryLabel="Inquire" />
      <SiteFooter />
      <StickyInquireBar />
    </>
  );
}
