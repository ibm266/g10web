"use client";

import { PhotoImage } from "@/components/ui/PhotoImage";
import { useState } from "react";
import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Section";
import { homeServices } from "@/lib/content";
import { HOME_SERVICE_SLOTS, slotImageMeta } from "@/lib/images";

export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const service = homeServices[active];

  return (
    <Container>
      <Eyebrow accent>Our services</Eyebrow>
      <SectionHeading className="mt-2.5">
        What are we <span className="italic">shooting?</span>
      </SectionHeading>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory md:mt-6">
        {homeServices.map((svc, i) => (
          <button
            key={svc.tab}
            type="button"
            onClick={() => setActive(i)}
            className={`h-10 shrink-0 snap-start rounded-full px-5 text-sm font-medium transition-colors ${
              active === i
                ? "bg-accent text-[#f5efe6]"
                : "border border-border bg-surface text-text"
            }`}
          >
            {svc.tab}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-[20px] border border-border bg-surface md:rounded-3xl">
        <div className="relative h-[220px] bg-border/30">
          {HOME_SERVICE_SLOTS.map((slot, i) => {
            const meta = slotImageMeta("home", slot);
            if (!meta?.src) return null;

            return (
              <div
                key={slot}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  active === i ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={active !== i}
              >
                <PhotoImage
                  src={meta.src}
                  alt={homeServices[i].title}
                  fill
                  fadeOnLoad={false}
                  focalX={meta.focalX}
                  focalY={meta.focalY}
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={i === 0}
                />
              </div>
            );
          })}
        </div>
        <div className="p-5 md:p-6">
          <h3 className="font-display text-2xl font-medium md:text-[30px]">{service.title}</h3>
          <ul className="mt-3.5 space-y-2">
            {service.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-[15px] leading-snug">
                <span className="text-accent">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-[13px] text-text-muted">{service.price}</span>
            <ArrowLink href={service.href}>Explore</ArrowLink>
          </div>
        </div>
      </div>
    </Container>
  );
}
