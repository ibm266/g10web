import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InquireForm } from "@/components/forms/InquireForm";
import { PlanningGuideCTA } from "@/components/sections/CTA";
import { PAGE_CONTENT_CLASS, PageIntro, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Typography";
import { ROUTES } from "@/lib/routes";

export const metadata = { title: "Wedding Experience Inquiry | G10 Studio" };

export default function InquireWeddingPage() {
  return (
    <>
      <SiteHeader backHref={ROUTES.inquire} />
      <PageIntro
        narrow
        eyebrow={<Eyebrow accent>Wedding experience inquiry form</Eyebrow>}
        headline={[
          { text: "The Wedding" },
          { text: "Experience", italic: true, gold: true },
        ]}
      >
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Fill out the form below and I&apos;ll respond within 72 hours with packages, prices, and
          next steps. First come, first served!
        </p>
      </PageIntro>
      <Section className={PAGE_CONTENT_CLASS}>
        <InquireForm variant="wedding" />
      </Section>
      <PlanningGuideCTA />
      <SiteFooter condensed />
    </>
  );
}
