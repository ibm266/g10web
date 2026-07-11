"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Thin top bar — gives instant feedback while the next page loads */
export function NavigationProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setWidth(18);

    const grow = window.setTimeout(() => setWidth(62), 120);
    const finish = window.setTimeout(() => setWidth(100), 320);
    const hide = window.setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 520);

    return () => {
      window.clearTimeout(grow);
      window.clearTimeout(finish);
      window.clearTimeout(hide);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-[70] h-[2px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-accent shadow-[0_0_8px_rgba(179,102,63,0.45)] transition-[width] duration-300 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
