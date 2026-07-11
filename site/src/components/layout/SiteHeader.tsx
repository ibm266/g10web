"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { BurgerButton } from "@/components/layout/BurgerButton";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";

export const HEADER_HEIGHT_PX = 68;

type Props = {
  variant?: "transparent" | "solid";
  backHref?: string;
};

export function SiteHeader({ variant = "solid", backHref }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightControls, setLightControls] = useState(variant === "transparent");

  const isOverHero = variant === "transparent";

  useEffect(() => {
    if (!isOverHero) {
      setLightControls(false);
      return;
    }

    const onScroll = () => {
      const hero = document.querySelector("[data-site-hero]");
      if (!hero) {
        setLightControls(false);
        return;
      }
      setLightControls(hero.getBoundingClientRect().bottom > HEADER_HEIGHT_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isOverHero]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const barClass = isOverHero
    ? "bg-transparent border-b border-transparent"
    : "bg-bg border-b border-border";

  /** Fixed mobile controls always use frosted glass */
  const glassControlClass = "glass-control text-text-on-dark";

  const desktopControlClass = isOverHero && lightControls
    ? glassControlClass
    : "border border-border bg-bg/95 text-text shadow-sm backdrop-blur-md";

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <>
      <header
        className={`${isOverHero ? "absolute" : "relative"} top-0 left-0 right-0 z-40 ${barClass}`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-4 px-5 md:px-12">
          <div className="flex min-w-[44px] items-center lg:min-w-0">
            {backHref ? (
              <Link
                href={backHref}
                aria-label="Go back"
                data-ui="button"
                className={`hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full text-lg transition-transform duration-200 active:scale-95 lg:flex ${desktopControlClass}`}
              >
                ←
              </Link>
            ) : null}
            <span className="h-11 w-11 lg:hidden" aria-hidden="true" />
            <div className="hidden lg:block">
              <SiteLogo />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="lg:hidden">
              <SiteLogo />
            </div>
            <DesktopNav light={lightControls && isOverHero} />
          </div>

          <div className="h-11 w-11 shrink-0" aria-hidden="true" />
        </div>
      </header>

      <div className="pointer-events-none fixed top-3 left-5 z-50 md:top-4 md:left-12">
        {backHref ? (
          <Link
            href={backHref}
            aria-label="Go back"
            data-ui="button"
            className={`pointer-events-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-lg transition-transform duration-200 active:scale-95 lg:hidden ${glassControlClass}`}
          >
            ←
          </Link>
        ) : (
          <BurgerButton
            open={menuOpen}
            onClick={toggleMenu}
            light
            className={`pointer-events-auto lg:hidden ${glassControlClass}`}
          />
        )}
      </div>

      <MobileNavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
