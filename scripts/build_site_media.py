#!/usr/bin/env python3
"""Pick tagged images for each site slot, copy to site/public/media, emit JSON manifests."""

from __future__ import annotations

import json
import re
import shutil
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = ROOT / "scraped/data/image-catalog.json"
MEDIA_DIR = ROOT / "site/public/media"
SITE_DATA = ROOT / "site/src/data"

# Category-facing pages only draw from the corresponding, manually organised
# source gallery. Generic homepage/blog folders are never allowed into these
# pools because their path names do not describe the people in the photo.
TRUSTED_CATEGORY_PATHS = {
    "wedding": "portfolio/photography/photography__wedding-in-aruba/",
    "couple": "portfolio/photography/photography__couple-in-aruba/",
    "family": "portfolio/photography/photography__family-in-aruba/",
    "solo": "portfolio/photography/photography__solo-in-aruba/",
}

STYLE_PRIORITY = [
    "sunset",
    "golden-hour",
    "black-and-white",
    "vibrant",
    "color",
    "candid",
    "editorial",
    "beach",
    "moody",
    "bright",
    "drone",
]

# page → slot → (category, count, style_mix)
SLOT_SPECS: dict[str, dict[str, tuple[str, int, bool]]] = {
    "home": {
        "hero": ("wedding", 4, True),
        "service-wedding": ("wedding", 1, False),
        "service-couple": ("couple", 1, False),
        "service-family": ("family", 1, False),
        "meet-jiten": ("about", 1, False),
        "why-g10-0": ("wedding", 1, True),
        "why-g10-1": ("couple", 1, True),
        "why-g10-2": ("family", 1, False),
        "why-g10-3": ("wedding", 1, True),
    },
    "about": {
        "hero": ("about", 1, False),
        "story": ("about", 1, False),
        "filmstrip": ("wedding", 4, True),
    },
    "wedding-landing": {
        "hero": ("wedding", 2, True),
        "story": ("wedding", 1, False),
        "filmstrip": ("wedding", 4, True),
    },
    "photography-hub": {
        "wedding": ("wedding", 1, True),
        "family": ("family", 1, False),
        "couple": ("couple", 1, True),
        "solo": ("solo", 1, False),
    },
    "photography-wedding": {
        "hero": ("wedding", 3, True),
        "style-1": ("wedding", 1, True),
        "style-2": ("wedding", 1, True),
        "gallery": ("wedding", 4, True),
    },
    "photography-couple": {
        "hero": ("couple", 2, True),
        "gallery": ("couple", 3, True),
    },
    "photography-family": {
        "hero": ("family", 2, False),
        "gallery": ("family", 3, False),
    },
    "photography-solo": {
        "hero": ("solo", 2, True),
        "gallery": ("solo", 3, True),
    },
    "videography-hub": {
        "hero": ("wedding", 1, True),
    },
    "videography-wedding": {
        "featured": ("wedding", 1, True),
    },
    "portfolio-hub": {
        "gallery-wedding": ("wedding", 8, True),
        "gallery-couple": ("couple", 6, True),
        "gallery-family": ("family", 6, True),
        "gallery-solo": ("solo", 4, True),
    },
    "portfolio-weddings": {
        "hero": ("wedding", 3, True),
        "style-1": ("wedding", 1, True),
        "style-2": ("wedding", 1, True),
        "gallery": ("wedding", 4, True),
    },
    "inquire-router": {
        "wedding": ("wedding", 1, True),
        "couple": ("couple", 1, True),
        "family": ("family", 1, False),
    },
    "inquire-wedding": {
        "accent": ("wedding", 2, True),
    },
    "inquire-general": {
        "accent": ("couple", 2, False),
    },
    "blog-index": {
        "featured": ("wedding", 1, True),
        "posts": ("wedding", 6, True),
    },
}

# Explicit image paths (relative to scraped/) for slots that must not auto-pick
PINNED_SLOTS: dict[str, dict[str, str]] = {
    "home": {
        "meet-jiten": (
            "assets/images/by-page/pages/about-jiten-melwani-aruba-photographer/"
            "jiten-melwani-throwing-camera.png"
        ),
    },
    "about": {
        "hero": (
            "assets/images/by-page/pages/about-jiten-melwani-aruba-photographer/"
            "IMG_7622.jpg"
        ),
        "story": (
            "assets/images/by-page/pages/about-jiten-melwani-aruba-photographer/"
            "jiten-melwani-throwing-camera.png"
        ),
    },
}


def slugify(name: str) -> str:
    base = re.sub(r"[^a-zA-Z0-9._-]+", "-", name).strip("-").lower()
    return base[:80] or "image"


def load_catalog() -> list[dict]:
    data = json.loads(CATALOG_PATH.read_text())
    return data["images"]


def catalog_by_path(catalog: list[dict]) -> dict[str, dict]:
    return {img["path"]: img for img in catalog}


def pinned_image(catalog: list[dict], rel_path: str) -> dict:
    by_path = catalog_by_path(catalog)
    if rel_path in by_path:
        return by_path[rel_path]
    raise RuntimeError(f"Pinned image not found in catalog: {rel_path}")


def bucket_by_style(images: list[dict]) -> dict[str, list[dict]]:
    buckets: dict[str, list[dict]] = defaultdict(list)
    for img in images:
        for style in img.get("styles", ["color"]):
            buckets[style].append(img)
    return buckets


def pick_images(
    pool: list[dict],
    count: int,
    diverse: bool,
    used: set[str],
) -> list[dict]:
    available = [i for i in pool if i["id"] not in used]
    if not available:
        return []

    if not diverse or count == 1:
        picked = available[:count]
    else:
        buckets = bucket_by_style(available)
        picked = []
        style_idx = 0
        while len(picked) < count and style_idx < len(STYLE_PRIORITY) * 3:
            style = STYLE_PRIORITY[style_idx % len(STYLE_PRIORITY)]
            style_idx += 1
            candidates = [i for i in buckets.get(style, []) if i["id"] not in {p["id"] for p in picked}]
            if candidates:
                picked.append(candidates[0])
        if len(picked) < count:
            for img in available:
                if img["id"] not in {p["id"] for p in picked}:
                    picked.append(img)
                if len(picked) >= count:
                    break

    for img in picked:
        used.add(img["id"])
    return picked[:count]


def main() -> None:
    if not CATALOG_PATH.exists():
        raise SystemExit("Run scripts/tag_scraped_images.py first")

    catalog = load_catalog()
    by_category: dict[str, list[dict]] = defaultdict(list)
    for img in catalog:
        for cat in img["categories"]:
            trusted_path = TRUSTED_CATEGORY_PATHS.get(cat)
            if trusted_path and trusted_path not in img["path"]:
                continue
            by_category[cat].append(img)

    # Prefer larger files (quality) within category
    for cat in by_category:
        by_category[cat].sort(key=lambda i: i["bytes"], reverse=True)

    if MEDIA_DIR.exists():
        shutil.rmtree(MEDIA_DIR)
    MEDIA_DIR.mkdir(parents=True)

    used_ids: set[str] = set()
    slots: dict[str, dict[str, list[str]]] = {}
    public_catalog: dict[str, dict] = {}

    for page, page_slots in SLOT_SPECS.items():
        slots[page] = {}
        for slot, (category, count, diverse) in page_slots.items():
            pin = PINNED_SLOTS.get(page, {}).get(slot)
            if pin:
                picked = [pinned_image(catalog, pin)]
                if picked[0]["id"] in used_ids:
                    used_ids.discard(picked[0]["id"])
                used_ids.add(picked[0]["id"])
            else:
                pool = by_category.get(category, [])
                if not pool:
                    raise RuntimeError(
                        f"No trusted images available for {page}/{slot} ({category})"
                    )
                picked = pick_images(pool, count, diverse, used_ids)
            slot_ids = []
            for img in picked:
                src = ROOT / "scraped" / img["path"]
                ext = src.suffix.lower()
                dest_name = f"{img['id']}{ext}"
                dest = MEDIA_DIR / dest_name
                shutil.copy2(src, dest)
                public_catalog[img["id"]] = {
                    "id": img["id"],
                    "src": f"/media/{dest_name}",
                    "categories": img["categories"],
                    "styles": img["styles"],
                    "primary_category": img["primary_category"],
                    "primary_style": img["primary_style"],
                    "filename": img["filename"],
                    "width": img.get("width"),
                    "height": img.get("height"),
                    "aspect_ratio": img.get("aspect_ratio"),
                    "orientation": img.get("orientation", "portrait"),
                    "is_landscape": img.get("is_landscape", False),
                    "focal_x": img.get("focal_x", 50.0),
                    "focal_y": img.get("focal_y", 32.0),
                }
                slot_ids.append(img["id"])
            slots[page][slot] = slot_ids

    SITE_DATA.mkdir(parents=True, exist_ok=True)
    (SITE_DATA / "image-catalog.json").write_text(json.dumps(public_catalog, indent=2))
    (SITE_DATA / "page-slots.json").write_text(json.dumps(slots, indent=2))

    total_files = len(list(MEDIA_DIR.iterdir()))
    print(f"Copied {total_files} images → {MEDIA_DIR}")
    print(f"Wrote manifests → {SITE_DATA}")


if __name__ == "__main__":
    main()
