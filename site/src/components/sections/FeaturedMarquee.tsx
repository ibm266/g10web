import { featuredLogos } from "@/lib/content";

export function FeaturedMarquee() {
  const items = [...featuredLogos, ...featuredLogos];

  return (
    <section className="overflow-hidden border-b border-border py-7">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        Featured on top wedding platforms
      </p>
      <div
        className="mt-[18px] overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="animate-marquee inline-flex gap-11 whitespace-nowrap px-5 hover:[animation-play-state:paused]">
          {items.map((logo, i) => (
            <span
              key={`${logo.name}-${i}`}
              className={`text-text transition-colors hover:text-accent ${
                logo.style === "serif"
                  ? "font-display text-xl font-semibold tracking-wider"
                  : logo.style === "italic"
                    ? "font-display text-xl italic"
                    : logo.style === "sans-sm"
                      ? "self-center text-[13px] font-semibold tracking-widest"
                      : "self-center text-[15px] font-semibold tracking-widest"
              }`}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
