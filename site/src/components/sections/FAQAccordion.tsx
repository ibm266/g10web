"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Typography";

type Item = { q: string; a: string };

export function FAQAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Container narrow>
      <SectionHeading>
        Questions? <span className="italic">Answers.</span>
      </SectionHeading>
      <div className="mt-8 border-t border-border">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-medium">{item.q}</span>
                <span className={`text-lg transition-transform ${isOpen ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-[450ms]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-[15px] leading-relaxed text-text-muted">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
