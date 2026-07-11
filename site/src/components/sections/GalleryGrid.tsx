"use client";

import { GalleryTile, FilmstripTile } from "@/components/sections/GalleryTile";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Section";
import type { GalleryItem } from "@/lib/images";
import { galleryItemFromId } from "@/lib/images";

type Item = GalleryItem | { src: string; category?: string; id?: string };

function normalizeItem(item: Item, index: number): GalleryItem {
  if ("focalX" in item && "focalY" in item) {
    return item;
  }
  const id = item.id ?? `legacy-${index}`;
  if (item.id) {
    return galleryItemFromId(item.id, item.category);
  }
  return {
    id,
    src: item.src,
    category: item.category,
    orientation: "portrait",
    isLandscape: false,
    focalX: 50,
    focalY: 32,
    focalPosition: "50% 32%",
  };
}

export function GalleryGrid({
  items,
  filters,
}: {
  items: Item[];
  filters?: string[];
}) {
  const [filter, setFilter] = useState(filters?.[0] ?? "All");

  const normalized = items.map(normalizeItem);
  const filtered =
    filter === "All" || !filters
      ? normalized
      : normalized.filter((item) => item.category === filter);

  return (
    <Container>
      {filters && (
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`h-10 cursor-pointer rounded-full px-5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-accent text-[#f5efe6]"
                  : "border border-border bg-bg text-text"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="self-center text-sm text-text-muted">{filtered.length} photos</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {filtered.map((item) => (
          <GalleryTile key={item.id} item={item} />
        ))}
      </div>
    </Container>
  );
}

export function Filmstrip({
  images,
  items,
}: {
  page?: string;
  slot?: string;
  images?: string[];
  items?: GalleryItem[];
}) {
  const tiles =
    items ??
    (images ?? []).map((src, i) => ({
      id: `filmstrip-${i}`,
      src,
      orientation: "portrait" as const,
      isLandscape: false,
      focalX: 50,
      focalY: 32,
      focalPosition: "50% 32%",
    }));

  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller || tiles.length === 0) return;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(center - itemCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActive(closest);
  }, [tiles.length]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    updateActive();
    scroller.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      scroller.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  const scrollTo = (index: number) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  if (tiles.length === 0) return null;

  return (
    <div>
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory scroll-smooth gap-3 overflow-x-auto px-[max(1.25rem,calc(50%-39vw))] pb-2 md:px-[max(3rem,calc(50%-10rem))]"
      >
        {tiles.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            <FilmstripTile item={item} />
          </div>
        ))}
      </div>

      {tiles.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 px-5 md:px-12" role="tablist" aria-label="Gallery slides">
          {tiles.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to photo ${i + 1} of ${tiles.length}`}
              onClick={() => scrollTo(i)}
              className={`h-2 shrink-0 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-accent" : "w-2 bg-accent/25 hover:bg-accent/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
