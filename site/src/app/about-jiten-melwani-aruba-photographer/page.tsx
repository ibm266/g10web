import { PhotoImage } from "@/components/ui/PhotoImage";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { HeroKenBurns } from "@/components/hero/HeroKenBurns";
import { Filmstrip } from "@/components/sections/GalleryGrid";
import { DarkCTA } from "@/components/sections/CTA";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Typography";
import { ArrowLink } from "@/components/ui/Button";
import { slotGalleryItems, slotImageMeta } from "@/lib/images";
import { ROUTES } from "@/lib/routes";

export const metadata = { title: "Meet Jiten | G10 Studio" };

export default function AboutPage() {
  const story = slotImageMeta("about", "story");

  return (
    <>
      <SiteHeader variant="transparent" />
      <HeroKenBurns
        page="about"
        eyebrow="About G10"
        headline={[
          { text: "Meet Jiten," },
          { text: "a.k.a. G10", italic: true, gold: true },
        ]}
        ctas={[{ label: "Check my date", href: ROUTES.inquire }]}
        tall={false}
      />
      <Section>
        <Container narrow>
          <SectionHeading>
            I&apos;m an Aruban, British & Indian{" "}
            <span className="italic">life-loving creative</span>…
          </SectionHeading>
          <div className="mt-5 flex flex-wrap gap-2">
            {["7+ years pro", "27 countries", "4 languages", "London → Aruba"].map((c) => (
              <span key={c} className="rounded-full border border-border px-3.5 py-2 text-sm text-text-muted">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed">
            I&apos;m an Aruban, British & Indian life-loving creative who started his photography
            journey in London and now calls Aruba home. Family and memories are everything to me,
            and that&apos;s why I do what I do.
          </p>
          <blockquote className="mt-8 border-l-2 border-highlight pl-5 font-display text-xl italic">
            So… memories of family?...invaluable.
          </blockquote>
        </Container>
      </Section>
      <Section className="!pt-0">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-border/30">
              <PhotoImage src={story?.src ?? ""} alt="" fill focalX={story?.focalX} focalY={story?.focalY} />
            </div>
            <div>
              <SectionHeading className="!text-3xl">
                An <span className="italic">extroverted introvert</span>
              </SectionHeading>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                I love connecting with my audience, from that first email to candid moments on your
                wedding day. No filter, just real conversation behind the lens.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Filmstrip items={slotGalleryItems("about", "filmstrip")} />
      <DarkCTA
        title={
          <>
            Let&apos;s create some <span className="italic">memories</span>
          </>
        }
        subtitle="see you at the beach, Jiten"
        secondaryLabel="See the work"
        secondaryHref={ROUTES.portfolio}
      />
      <SiteFooter condensed />
      <StickyInquireBar />
    </>
  );
}
