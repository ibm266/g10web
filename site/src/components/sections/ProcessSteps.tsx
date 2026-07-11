"use client";

import { useState } from "react";
import { Eyebrow, SectionHeading } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Section";
import { processSteps } from "@/lib/content";

export function ProcessSteps({ dark = true }: { dark?: boolean }) {
  const [open, setOpen] = useState(0);

  return (
    <Container>
      <Eyebrow className={dark ? "!text-highlight" : ""} accent={!dark}>
        Four easy steps (that&apos;s it!)
      </Eyebrow>
      <SectionHeading dark={dark} className="mt-2.5">
        So… <span className="italic">how does it all work?</span>
      </SectionHeading>

      <div className={`mt-6 border-t md:mt-8 ${dark ? "border-white/15" : "border-border"}`}>
        {processSteps.map((step, i) => {
          const isOpen = open === i;
          return (
            <div
              key={step.num}
              className={`border-b ${dark ? "border-white/15" : "border-border"}`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`flex w-full items-center gap-4 py-[18px] text-left ${dark ? "text-text-on-dark" : "text-text"}`}
              >
                <span className="font-display w-10 text-[30px] font-medium text-highlight">
                  {step.num}
                </span>
                <span className="flex-1 text-base font-medium tracking-wide">{step.title}</span>
                <span
                  className={`text-lg transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  ↓
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-[450ms] ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p
                    className={`pb-5 pl-14 text-[15px] font-light leading-relaxed md:max-w-xl ${dark ? "text-text-on-dark/82" : "text-text-muted"}`}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 hidden gap-6 md:grid md:grid-cols-4">
        {processSteps.map((step) => (
          <div key={step.num} className="relative">
            <span className="font-display pointer-events-none absolute -top-2 text-[80px] font-medium text-highlight/20">
              {step.num}
            </span>
            <h3 className={`relative text-base font-medium ${dark ? "text-text-on-dark" : ""}`}>
              {step.title}
            </h3>
            <p
              className={`relative mt-2 text-sm leading-relaxed ${dark ? "text-text-on-dark/75" : "text-text-muted"}`}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
