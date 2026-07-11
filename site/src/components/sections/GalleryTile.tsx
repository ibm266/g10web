import { PhotoImage } from "@/components/ui/PhotoImage";
import type { GalleryItem } from "@/lib/images";

type GalleryTileProps = {
  item: GalleryItem;
  hoverZoom?: boolean;
  sizes?: string;
  /** full = span 2 cols (landscape hero), auto = responsive landscape/portrait */
  layout?: "auto" | "portrait" | "landscape" | "full";
  className?: string;
};

export function galleryTileClassName(
  item: Pick<GalleryItem, "isLandscape">,
  layout: GalleryTileProps["layout"] = "auto",
): string {
  const isLandscape = layout === "landscape" || (layout === "auto" && item.isLandscape);
  const isPortrait = layout === "portrait" || (layout === "auto" && !item.isLandscape);
  const isFull = layout === "full";

  if (isFull || isLandscape) {
    return [
      "col-span-2",
      isFull ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3] md:aspect-[16/9]",
    ].join(" ");
  }

  if (isPortrait) {
    return "col-span-1 aspect-[3/4]";
  }

  return "col-span-1 aspect-[3/4]";
}

export function GalleryTile({
  item,
  hoverZoom = true,
  sizes = "(max-width: 768px) 50vw, 33vw",
  layout = "auto",
  className = "",
}: GalleryTileProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-border/30 ${galleryTileClassName(item, layout)} ${className}`}
    >
      <PhotoImage
        src={item.src}
        alt=""
        fill
        hoverZoom={hoverZoom}
        focalX={item.focalX}
        focalY={item.focalY}
        sizes={item.isLandscape ? "(max-width: 768px) 100vw, 66vw" : sizes}
      />
    </div>
  );
}

export function filmstripTileClassName(
  item: Pick<GalleryItem, "isLandscape">,
  size: "default" | "large" = "default",
): string {
  if (size === "large") {
    if (item.isLandscape) {
      return "relative h-[62vw] max-h-[22rem] w-[96vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-border/30 md:h-[26rem] md:w-[44rem]";
    }
    return "relative h-[72vw] max-h-[28rem] w-[88vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-border/30 md:h-[28rem] md:w-[22rem]";
  }

  if (item.isLandscape) {
    return "relative h-[52vw] max-h-64 w-[92vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-border/30 md:h-72 md:w-[36rem]";
  }
  return "relative h-56 w-[78vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-border/30 md:h-72 md:w-80";
}

export function FilmstripTile({
  item,
  size = "default",
}: {
  item: GalleryItem;
  size?: "default" | "large";
}) {
  return (
    <div className={filmstripTileClassName(item, size)}>
      <PhotoImage
        src={item.src}
        alt=""
        fill
        focalX={item.focalX}
        focalY={item.focalY}
        sizes={
          size === "large"
            ? item.isLandscape
              ? "96vw"
              : "88vw"
            : item.isLandscape
              ? "92vw"
              : "78vw"
        }
      />
    </div>
  );
}
