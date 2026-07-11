"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { ROUTES } from "@/lib/routes";

const navLinks = [
  {
    label: "Weddings",
    href: ROUTES.weddingLanding,
    children: [
      { label: "Wedding photographer in Aruba", href: ROUTES.weddingLanding },
      { label: "The wedding experience", href: ROUTES.photographyWedding },
      { label: "Destination weddings worldwide", href: ROUTES.photographyDestinationWeddings },
    ],
  },
  {
    label: "Portfolio",
    href: ROUTES.portfolio,
    children: [
      { label: "Weddings", href: ROUTES.photographyWedding },
      { label: "Couple's Portraits", href: ROUTES.photographyCouple },
      { label: "Family Portraits", href: ROUTES.photographyFamily },
      { label: "Photography (all)", href: ROUTES.photography },
      { label: "Videography", href: ROUTES.videography },
    ],
  },
  { label: "About G10", href: ROUTES.about },
  { label: "Blog", href: ROUTES.blog },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavDrawer({ open, onClose }: Props) {
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [weddingsOpen, setWeddingsOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) {
      setPortfolioOpen(false);
      setWeddingsOpen(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const ease = [0.16, 1, 0.3, 1] as const;

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 12 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : 0.06 + i * 0.05,
        duration: reduced ? 0.15 : 0.35,
        ease,
      },
    }),
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.1 : 0.25 }}
            className="fixed inset-0 z-[55] cursor-pointer bg-bg-dark/35 backdrop-blur-[2px] lg:hidden"
            onClick={onClose}
          />

          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: reduced ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            className="glass-drawer fixed inset-x-0 top-0 z-[60] flex max-h-[100dvh] flex-col overflow-y-auto p-5 pb-8 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <SiteLogo onClick={onClose} />
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="glass-control flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-xl leading-none text-text transition-transform duration-200 active:scale-95"
              >
                ×
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link, i) =>
                link.children ? (
                  <motion.div key={link.label} custom={i} variants={itemVariants} initial="hidden" animate="show">
                    <button
                      type="button"
                      onClick={() => setPortfolioOpen((v) => !v)}
                      className="flex w-full cursor-pointer items-center justify-between py-3 font-display text-[32px] font-medium leading-tight text-text"
                      aria-expanded={portfolioOpen}
                    >
                      {link.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        aria-hidden
                        className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${portfolioOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M3 5.5L7 9.5l4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
                      style={{ gridTemplateRows: portfolioOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="mb-2 flex flex-col gap-1 border-l-2 border-accent/30 pl-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={onClose}
                              className="cursor-pointer py-2 text-[15px] text-text-muted transition-colors duration-200 hover:text-accent"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={link.label} custom={i} variants={itemVariants} initial="hidden" animate="show">
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block cursor-pointer py-3 font-display text-[32px] font-medium leading-tight text-text transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.28, duration: 0.3 }}
              className="mt-8"
            >
              <Button href={ROUTES.inquire} className="w-full" onClick={onClose}>
                Inquire
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
