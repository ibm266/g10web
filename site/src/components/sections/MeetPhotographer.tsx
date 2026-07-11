import { PhotoImage } from "@/components/ui/PhotoImage";
import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Section";
import { ROUTES } from "@/lib/routes";
import { slotImageMeta } from "@/lib/images";

export function MeetPhotographer() {
  const meta = slotImageMeta("home", "meet-jiten");

  return (
    <Container>
      <div className="relative mx-auto max-w-md md:max-w-none md:grid md:grid-cols-2 md:gap-12 md:items-center">
        <div className="relative">
          <div className="relative h-[380px] overflow-hidden rounded-[20px] bg-border/30 shadow-lg md:-rotate-2">
            <PhotoImage
              src={meta?.src ?? ""}
              alt="Jiten Melwani, a.k.a. G10"
              fill
              focalX={meta?.focalX}
              focalY={meta?.focalY}
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
          <span className="absolute -bottom-3.5 right-1.5 rotate-2 rounded-full bg-accent px-4 py-2 text-xs font-medium tracking-wider text-[#f5efe6]">
            a.k.a. G10
          </span>
        </div>

        <div className="mt-10 md:mt-0">
          <Eyebrow accent>Meet your photographer</Eyebrow>
          <SectionHeading className="mt-2.5">
            HEY! I&apos;m Jiten, <span className="italic">a.k.a. G10!</span>
          </SectionHeading>
          <p className="mt-4 text-base leading-relaxed">
            It&apos;s <em>not just photography</em> that I love… I love <em>people</em>, I love{" "}
            <em>smiles</em>, I love <em>capturing moments</em> and, of course, taking care of
            business. G10 Studio is a culmination of all of these things, with{" "}
            <em>
              <strong>love</strong>
            </em>{" "}
            at its center.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["27 countries visited", "4 languages", "6 years pro"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border px-3.5 py-2 text-[13px] text-text-muted"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[15px] font-light leading-relaxed text-text-muted">
            <em>
              Oh, and I&apos;m a wizz with wedding guests, especially old ladies. They always think
              my name is &quot;handsome&quot; for some reason! Must be the wine…
            </em>
          </p>
          <p className="mt-5 font-display text-xl italic md:text-2xl">
            — see you at the beach, Jiten
          </p>
          <ArrowLink href={ROUTES.about} className="mt-4">
            More about me
          </ArrowLink>
        </div>
      </div>
    </Container>
  );
}
