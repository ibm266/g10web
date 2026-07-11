import { PhotoImage } from "@/components/ui/PhotoImage";
import { StarRating } from "@/components/ui/StarRating";
import { Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Typography";
import { whyG10Cards } from "@/lib/content";
import { WHY_G10_SLOTS, slotImageMeta } from "@/lib/images";
import { REVIEW_PRIMARY_URL, REVIEW_STATS } from "@/lib/reviews";

export function WhyG10Grid({ textOnly = false }: { textOnly?: boolean }) {
  return (
    <Container>
      <SectionHeading>
        Why couples book <span className="italic">G10</span>
      </SectionHeading>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
        {whyG10Cards.map((card, i) => {
          const meta = slotImageMeta("home", WHY_G10_SLOTS[i]);
          const isReviewsCard = card.title.includes("250+");

          return (
            <article
              key={card.title}
              className="w-[78vw] shrink-0 snap-start overflow-hidden rounded-[20px] border border-border bg-surface md:w-auto"
            >
              {!textOnly && (
                <div className="relative h-40 bg-border/30">
                  <PhotoImage
                    src={meta?.src ?? ""}
                    alt=""
                    fill
                    hoverZoom
                    focalX={meta?.focalX}
                    focalY={meta?.focalY}
                    sizes="280px"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-display text-xl italic md:text-2xl">
                  {isReviewsCard ? (
                    <span className="flex flex-wrap items-center gap-2">
                      <span>{REVIEW_STATS.count}+ Testimonials</span>
                      <StarRating size="sm" />
                    </span>
                  ) : (
                    card.title
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{card.body}</p>
                {isReviewsCard && (
                  <a
                    href={REVIEW_PRIMARY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-2 hover:underline"
                  >
                    Read reviews for yourself
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Container>
  );
}
