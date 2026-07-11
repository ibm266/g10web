import { PhotoImage } from "@/components/ui/PhotoImage";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { DarkCTA } from "@/components/sections/CTA";
import { Container, PAGE_CONTENT_CLASS, PageIntro, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Typography";
import { slotImageMeta } from "@/lib/images";

const films = [
  {
    title: "Ritz-Carlton / Marriott ceremony film",
    subtitle: "Full ceremony coverage · Aruba",
  },
  {
    title: "Proposal & engagement teaser",
    subtitle: "Sunset beach · Aruba",
  },
  {
    title: "Renaissance Flamingo Beach film",
    subtitle: "Destination wedding trailer",
  },
];

export const metadata = { title: "Wedding Videography in Aruba | G10 Studio" };

export default function VideographyWeddingPage() {
  const featured = slotImageMeta("videography-wedding", "featured");

  return (
    <>
      <SiteHeader />
      <PageIntro
        eyebrow={<Eyebrow>Wedding videography · Aruba & worldwide</Eyebrow>}
        headline={[
          { text: "Professional destination" },
          { text: "wedding videographer", italic: true, gold: true },
        ]}
      >
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
          Cherish every moment of your big day with cinematic wedding films, from the getting
          ready to the last dance, captured with emotion and artistry.
        </p>
      </PageIntro>
      <Section className={PAGE_CONTENT_CLASS}>
        <Container>
          <div className="relative aspect-video overflow-hidden rounded-[20px] bg-border/30">
            <PhotoImage
              src={featured?.src ?? ""}
              alt="Featured wedding film"
              fill
              focalX={featured?.focalX}
              focalY={featured?.focalY}
            />
            <button
              type="button"
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent/90 text-2xl text-text-on-dark"
            >
              ▶
            </button>
          </div>
          <p className="mt-4 text-sm font-medium">Official Aruba wedding trailer: Alexis & Taylor</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            A cinematic highlight film capturing the essence of a destination wedding at The Little
            One Aruba: golden hour, candid moments, and pure joy.
          </p>
        </Container>
      </Section>
      <Section className="!pt-8 !pb-16">
        <Container className="divide-y divide-border border-t border-border">
          {films.map((film) => (
            <button
              key={film.title}
              type="button"
              className="flex w-full cursor-pointer items-center gap-4 py-5 text-left transition-colors hover:text-accent"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-accent">
                ▶
              </span>
              <div>
                <p className="font-medium">{film.title}</p>
                <p className="text-sm text-text-muted">{film.subtitle}</p>
              </div>
            </button>
          ))}
        </Container>
      </Section>
      <DarkCTA
        title="Or get in touch"
        subtitle="Photo + video packages available. One team, one vision."
        primaryLabel="Inquire"
      />
      <SiteFooter />
      <StickyInquireBar hint="photo + video, one team" />
    </>
  );
}
