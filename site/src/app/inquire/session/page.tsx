import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InquireForm } from "@/components/forms/InquireForm";
import { Container, PAGE_CONTENT_CLASS, PageIntro, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Typography";
import { sessionNotes } from "@/lib/content";
import { ROUTES } from "@/lib/routes";

export const metadata = { title: "Photoshoot Inquiry — G10 Studio" };

export default function InquireSessionPage() {
  return (
    <>
      <SiteHeader backHref={ROUTES.inquire} />
      <PageIntro
        narrow
        eyebrow={<Eyebrow accent>Photoshoot inquiry form</Eyebrow>}
        headline={[
          { text: "Inquire for your" },
          { text: "photography session!", italic: true, gold: true },
        ]}
      >
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          I&apos;ll respond within 48 hours. Interested in wedding photography?{" "}
          <Link href={ROUTES.inquireWedding} className="font-medium">
            Click here!
          </Link>
        </p>
      </PageIntro>
      <Section className={`${PAGE_CONTENT_CLASS} !pb-0`}>
        <Container narrow>
          <div className="rounded-[20px] border border-border bg-surface p-6">
            <h3 className="font-display text-xl font-medium">Before inquiring, please note…</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-muted">
              {sessionNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>
      <Section className="!pt-6">
        <InquireForm variant="session" />
      </Section>
      <Section className="!py-12 bg-[#f3ede2]">
        <Container narrow className="text-center">
          <p className="font-display text-xl">Want to check availability before inquiring?</p>
          <a href="mailto:info@g10.studio" className="mt-2 inline-block font-medium">
            info@g10.studio
          </a>
          <p className="mt-6 font-display italic text-text-muted">
            We proudly welcome everyone regardless of religion, gender, race, or sexual orientation!
          </p>
        </Container>
      </Section>
      <SiteFooter condensed />
    </>
  );
}
