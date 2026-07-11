import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { DarkCTA } from "@/components/sections/CTA";
import { ReviewsClaim } from "@/components/sections/ReviewsClaim";
import { Container, PAGE_CONTENT_CLASS, PageIntro, Section } from "@/components/ui/Section";
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
      <Section className="!py-12 bg-[#f3ede2]">
        <Container>
          <ReviewsClaim variant="stat" />
          <blockquote className="mx-auto mt-8 max-w-xl text-center font-display text-2xl italic">
            Photography has little to do with the things you see and everything to do with the way
            you see them.
          </blockquote>
        </Container>
      </Section>
      <DarkCTA title="Picture yourselves here" primaryLabel="Inquire" />
      <SiteFooter />
      <StickyInquireBar />
    </>
  );
}
