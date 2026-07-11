"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { HeadlineLine, KineticHeadline } from "@/components/ui/Typography";

/** Use on the section immediately after PageIntro to avoid double padding gaps */
export const PAGE_CONTENT_CLASS = "!pt-0";

export function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={inView ? (reduced ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
      transition={{
        duration: reduced ? 0.3 : 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 md:px-12 ${narrow ? "max-w-[720px]" : "max-w-[1200px]"} ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  dark = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${dark ? "bg-bg-dark text-text-on-dark" : "bg-bg text-text"} ${className}`}
    >
      {children}
    </section>
  );
}

export function PageIntro({
  eyebrow,
  headline,
  children,
  narrow = false,
  className = "",
}: {
  eyebrow?: ReactNode;
  headline: HeadlineLine[];
  children?: ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <section data-site-hero className={`bg-bg pb-8 pt-8 md:pb-10 md:pt-10 ${className}`}>
      <Container narrow={narrow}>
        {eyebrow && <div className="mb-3">{eyebrow}</div>}
        <KineticHeadline
          lines={headline}
          variant="page"
          className="!text-[42px] md:!text-[56px]"
        />
        {children}
      </Container>
    </section>
  );
}
