"use client";

import Image, { ImageProps } from "next/image";
import { useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";
import { focalPosition } from "@/lib/images";

/** Default crop bias when no per-image focal point is provided */
export const PHOTO_OBJECT_POSITION = focalPosition(50, 32);

type PhotoImageProps = Omit<ImageProps, "alt" | "onLoad" | "style"> & {
  alt?: string;
  hoverZoom?: boolean;
  /** Subtle opacity fade when the image finishes loading (default: true) */
  fadeOnLoad?: boolean;
  /** Focal point as percentages (0–100). Overrides object position when set. */
  focalX?: number;
  focalY?: number;
  objectPosition?: string;
  style?: ImageProps["style"];
  onLoad?: ImageProps["onLoad"];
};

export function PhotoImage({
  alt = "",
  className = "",
  hoverZoom = false,
  fadeOnLoad = true,
  focalX,
  focalY,
  objectPosition,
  style,
  onLoad,
  ...props
}: PhotoImageProps) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(event);
    },
    [onLoad],
  );

  const showFade = fadeOnLoad && !reduced;
  const opacityClass = showFade ? (loaded ? "opacity-100" : "opacity-0") : "opacity-100";
  const hasCoverClass = /photo-cover/.test(className);

  const position =
    objectPosition ??
    (focalX != null && focalY != null
      ? focalPosition(focalX, focalY)
      : PHOTO_OBJECT_POSITION);

  return (
    <Image
      alt={alt}
      onLoad={handleLoad}
      onLoadingComplete={() => setLoaded(true)}
      className={`transition-[opacity,transform] duration-300 ease-out ${opacityClass} ${
        !hasCoverClass ? "photo-cover" : ""
      } ${hoverZoom ? "hover:scale-[1.04]" : ""} ${className}`}
      style={{ objectPosition: position, ...style }}
      {...props}
    />
  );
}
