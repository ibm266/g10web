import catalogData from "@/data/image-catalog.json";
import slotsData from "@/data/page-slots.json";

export type PageKey = keyof typeof slotsData;
export type ImageCategory =
  | "wedding"
  | "couple"
  | "family"
  | "solo"
  | "about"
  | "blog"
  | "videography"
  | "portrait"
  | "unknown";

export type ImageOrientation = "landscape" | "portrait" | "square";

export type CatalogImage = {
  id: string;
  src: string;
  categories: string[];
  styles: string[];
  primary_category: string;
  primary_style: string;
  filename: string;
  width?: number;
  height?: number;
  aspect_ratio?: number;
  orientation: ImageOrientation;
  is_landscape: boolean;
  focal_x: number;
  focal_y: number;
};

export type GalleryItem = {
  id: string;
  src: string;
  category?: string;
  orientation: ImageOrientation;
  isLandscape: boolean;
  focalX: number;
  focalY: number;
  focalPosition: string;
};

const catalog = catalogData as Record<string, CatalogImage>;
const slots = slotsData as Record<string, Record<string, string[]>>;

const DEFAULT_FOCAL = { x: 50, y: 32 };

/** @deprecated Use slotImage / imageSrc — kept for any legacy references */
export function placeholder(page: string, file: string) {
  return `/placeholders/${page}/${file}`;
}

export function focalPosition(focalX: number, focalY: number): string {
  return `${focalX}% ${focalY}%`;
}

export function imageSrc(id: string): string {
  return catalog[id]?.src ?? `/media/${id}.jpg`;
}

export function imageMeta(id: string): CatalogImage | undefined {
  return catalog[id];
}

export function galleryItemFromId(id: string, category?: string): GalleryItem {
  const meta = catalog[id];
  const focalX = meta?.focal_x ?? DEFAULT_FOCAL.x;
  const focalY = meta?.focal_y ?? DEFAULT_FOCAL.y;
  const isLandscape = meta?.is_landscape ?? false;
  const orientation = meta?.orientation ?? (isLandscape ? "landscape" : "portrait");

  return {
    id,
    src: meta?.src ?? imageSrc(id),
    category,
    orientation,
    isLandscape,
    focalX,
    focalY,
    focalPosition: focalPosition(focalX, focalY),
  };
}

export function galleryItemsFromIds(ids: string[], category?: string): GalleryItem[] {
  return ids.map((id) => galleryItemFromId(id, category));
}

export function slotIds(page: string, slot: string): string[] {
  return slots[page]?.[slot] ?? [];
}

export function slotImages(page: string, slot: string): string[] {
  return slotIds(page, slot).map(imageSrc);
}

export function slotGalleryItems(page: string, slot: string, category?: string): GalleryItem[] {
  return galleryItemsFromIds(slotIds(page, slot), category);
}

export function slotImage(page: string, slot: string, index = 0): string {
  const ids = slotIds(page, slot);
  return ids[index] ? imageSrc(ids[index]) : "/media/placeholder.jpg";
}

export function slotImageMeta(page: string, slot: string, index = 0): GalleryItem | undefined {
  const ids = slotIds(page, slot);
  return ids[index] ? galleryItemFromId(ids[index]) : undefined;
}

export function imagesByCategory(category: ImageCategory): CatalogImage[] {
  return Object.values(catalog).filter((img) => img.categories.includes(category));
}

export function imagesByStyle(style: string): CatalogImage[] {
  return Object.values(catalog).filter((img) => img.styles.includes(style));
}

export function portfolioGalleryItems(): GalleryItem[] {
  const page = "portfolio-hub";
  const categories: { slot: string; label: string }[] = [
    { slot: "gallery-wedding", label: "Weddings" },
    { slot: "gallery-couple", label: "Couples" },
    { slot: "gallery-family", label: "Family" },
    { slot: "gallery-solo", label: "Solo" },
  ];

  return categories.flatMap(({ slot, label }) => slotGalleryItems(page, slot, label));
}

export const HOME_SERVICE_SLOTS = [
  "service-wedding",
  "service-couple",
  "service-family",
] as const;

export const WHY_G10_SLOTS = [
  "why-g10-0",
  "why-g10-1",
  "why-g10-2",
  "why-g10-3",
] as const;

export const PHOTOGRAPHY_HUB_SLOTS = {
  Weddings: "wedding",
  Families: "family",
  Couples: "couple",
  Solo: "solo",
} as const;

export const INQUIRE_ROUTER_SLOTS = ["wedding", "couple", "family"] as const;
