#!/usr/bin/env python3
"""Tag scraped G10 images with category + style metadata using path heuristics and PIL analysis."""

from __future__ import annotations

import colorsys
import hashlib
import json
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from statistics import pstdev

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES_ROOT = ROOT / "scraped/assets/images/by-page"
OUT_CATALOG = ROOT / "scraped/data/image-catalog.json"

SKIP_NAMES = {
    "weddingzlogo.png",
    "sticky-ret.png",
    "final+squareartboard+1_4x+copy+1.png",
}

PATH_CATEGORY_RULES: list[tuple[str, str]] = [
    ("photography__wedding-in-aruba", "wedding"),
    ("photography__couple-in-aruba", "couple"),
    ("photography__family-in-aruba", "family"),
    ("photography__solo-in-aruba", "solo"),
    ("wedding-photographer-in-aruba", "wedding"),
    ("wedding-in-aruba", "wedding"),
    ("couple-in-aruba", "couple"),
    ("family-in-aruba", "family"),
    ("solo-in-aruba", "solo"),
    ("inquire-wedding", "wedding"),
    ("inquire-to-book", "portrait"),
    ("inquiry-decision", "wedding"),
    ("about-jiten", "about"),
    ("videography", "videography"),
    ("destination-weddings", "wedding"),
    ("/blog/", "blog"),
]

EXCLUSIVE_CATEGORY_RULES: list[tuple[str, str]] = [
    ("portfolio/photography/photography__wedding-in-aruba/", "wedding"),
    ("portfolio/photography/photography__couple-in-aruba/", "couple"),
    ("portfolio/photography/photography__family-in-aruba/", "family"),
    ("portfolio/photography/photography__solo-in-aruba/", "solo"),
]

PATH_STYLE_RULES: list[tuple[str, str]] = [
    ("golden-hour", "golden-hour"),
    ("golden+hour", "golden-hour"),
    ("sunset", "sunset"),
    ("sunrise", "sunrise"),
    ("flamingo-beach", "beach"),
    ("beach", "beach"),
    ("candid", "candid"),
    ("editorial", "editorial"),
    ("drone", "drone"),
    ("dji_", "drone"),
]

FILENAME_STYLE_RULES: list[tuple[str, str]] = [
    ("_plu", "black-and-white"),
    ("-plu", "black-and-white"),
    ("b&w", "black-and-white"),
    ("bfc", "black-and-white"),
    ("copy2", "black-and-white"),
    ("_gv", "black-and-white"),
    ("_zf", "black-and-white"),
    ("dji_", "drone"),
]

SCAN_ROOTS = [
    IMAGES_ROOT / "portfolio/photography",
    IMAGES_ROOT / "pages",
    IMAGES_ROOT / "portfolio/portfolios",
    IMAGES_ROOT / "portfolio/videography",
]

DEFAULT_FOCAL = {"x": 50.0, "y": 32.0}


def stable_id(rel: str) -> str:
    return "img_" + hashlib.sha1(rel.encode()).hexdigest()[:10]


def infer_category(rel_lower: str) -> list[str]:
    for needle, category in EXCLUSIVE_CATEGORY_RULES:
        if needle in rel_lower:
            return [category]

    cats: list[str] = []
    for needle, cat in PATH_CATEGORY_RULES:
        if needle in rel_lower:
            cats.append(cat)
    if "family" in rel_lower and "family" not in cats:
        cats.append("family")
    if "couple" in rel_lower and "couple" not in cats:
        cats.append("couple")
    if not cats:
        cats.append("unknown")
    return sorted(set(cats))


def infer_path_styles(rel_lower: str, name_lower: str) -> list[str]:
    styles: list[str] = []
    for needle, style in PATH_STYLE_RULES:
        if needle in rel_lower:
            styles.append(style)
    for needle, style in FILENAME_STYLE_RULES:
        if needle in name_lower:
            styles.append(style)
    return styles


def orientation_from_size(width: int, height: int) -> tuple[str, bool]:
    if width <= 0 or height <= 0:
        return "portrait", False
    ratio = width / height
    if ratio >= 1.15:
        return "landscape", True
    if ratio <= 0.87:
        return "portrait", False
    return "square", False


def estimate_focal_point(
    gray: Image.Image,
    orientation: str,
    is_drone: bool,
) -> dict[str, float]:
    """Interest-weighted centroid from luminance variance blocks."""
    thumb = gray.copy()
    thumb.thumbnail((240, 240))
    w, h = thumb.size
    pixels = thumb.load()

    block = max(12, min(w, h) // 10)
    step = max(6, block // 2)
    scores: list[tuple[float, float, float]] = []

    for by in range(0, max(1, h - block), step):
        for bx in range(0, max(1, w - block), step):
            vals: list[int] = []
            for y in range(by, min(by + block, h)):
                for x in range(bx, min(bx + block, w)):
                    vals.append(pixels[x, y])
            if len(vals) < 8:
                continue
            score = pstdev(vals)
            cx = (bx + block / 2) / w * 100
            cy = (by + block / 2) / h * 100
            # Bias upper-center for portrait/event photography (faces, couples)
            portrait_bias = 1.0 + max(0, (55 - cy) / 110)
            scores.append((score * portrait_bias, cx, cy))

    if not scores:
        return dict(DEFAULT_FOCAL)

    scores.sort(key=lambda item: item[0], reverse=True)
    top = scores[:8]
    total = sum(item[0] for item in top) or 1.0
    fx = sum(item[0] * item[1] for item in top) / total
    fy = sum(item[0] * item[2] for item in top) / total

    if is_drone:
        fx, fy = 50.0, 45.0
    elif orientation == "landscape":
        fy = max(38.0, min(fy, 58.0))
        fx = max(20.0, min(fx, 80.0))
    elif orientation == "portrait":
        fy = max(24.0, min(fy, 48.0))
        fx = max(30.0, min(fx, 70.0))
    else:
        fy = max(30.0, min(fy, 50.0))

    return {"x": round(fx, 1), "y": round(fy, 1)}


def analyze_image(path: Path, name_lower: str) -> dict:
    try:
        with Image.open(path) as im:
            width, height = im.size
            rgb = im.convert("RGB")
            gray = im.convert("L")
    except Exception:
        return {
            "width": 0,
            "height": 0,
            "aspect_ratio": 1.0,
            "orientation": "portrait",
            "is_landscape": False,
            "focal_x": DEFAULT_FOCAL["x"],
            "focal_y": DEFAULT_FOCAL["y"],
            "avg_saturation": 0,
            "warmth": 0,
            "brightness": 0,
            "styles": ["color"],
        }

    orientation, is_landscape = orientation_from_size(width, height)
    is_drone = "dji_" in name_lower or "drone" in name_lower
    focal = estimate_focal_point(gray, orientation, is_drone)

    sample = rgb.copy()
    sample.thumbnail((220, 220))
    pixels = list(sample.getdata())
    rs, gs, bs, sats = [], [], [], []
    for r, g, b in pixels[::4]:
        rs.append(r)
        gs.append(g)
        bs.append(b)
        sats.append(colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)[1])

    avg_r = sum(rs) / len(rs) if rs else 0
    avg_g = sum(gs) / len(gs) if gs else 0
    avg_b = sum(bs) / len(bs) if bs else 0
    avg_sat = sum(sats) / len(sats) if sats else 0
    brightness = (avg_r + avg_g + avg_b) / 3
    warmth = avg_r - avg_b

    styles: list[str] = []
    if avg_sat < 0.14:
        styles.append("black-and-white")
    elif warmth > 28 and avg_r > 145 and brightness > 90:
        styles.append("sunset")
    elif warmth > 14 and avg_g > 105:
        styles.append("golden-hour")
    elif avg_sat > 0.38:
        styles.append("vibrant")
    else:
        styles.append("color")
    if brightness > 175:
        styles.append("bright")
    if brightness < 85:
        styles.append("moody")

    aspect = round(width / height, 3) if height else 1.0

    return {
        "width": width,
        "height": height,
        "aspect_ratio": aspect,
        "orientation": orientation,
        "is_landscape": is_landscape,
        "focal_x": focal["x"],
        "focal_y": focal["y"],
        "avg_saturation": round(avg_sat, 3),
        "warmth": round(warmth, 1),
        "brightness": round(brightness, 1),
        "styles": styles,
    }


def should_skip(path: Path) -> bool:
    if path.name.lower() in SKIP_NAMES:
        return True
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        return True
    if path.stat().st_size < 12_000:
        return False
    return False


def collect_files() -> list[Path]:
    files: list[Path] = []
    for root in SCAN_ROOTS:
        if not root.exists():
            continue
        for path in root.rglob("*"):
            if path.is_file() and not should_skip(path):
                files.append(path)
    return sorted(set(files))


def build_catalog() -> dict:
    entries = []
    for path in collect_files():
        rel = path.relative_to(ROOT / "scraped").as_posix()
        rel_lower = rel.lower()
        name_lower = path.name.lower()
        path_styles = infer_path_styles(rel_lower, name_lower)
        analysis = analyze_image(path, name_lower)

        styles = sorted(set(path_styles + analysis.get("styles", [])))
        categories = infer_category(rel_lower)

        entries.append(
            {
                "id": stable_id(rel),
                "path": rel,
                "filename": path.name,
                "categories": categories,
                "styles": styles,
                "primary_category": categories[0],
                "primary_style": styles[0] if styles else "color",
                "width": analysis["width"],
                "height": analysis["height"],
                "aspect_ratio": analysis["aspect_ratio"],
                "orientation": analysis["orientation"],
                "is_landscape": analysis["is_landscape"],
                "focal_x": analysis["focal_x"],
                "focal_y": analysis["focal_y"],
                "bytes": path.stat().st_size,
                "analysis": {
                    "avg_saturation": analysis.get("avg_saturation", 0),
                    "warmth": analysis.get("warmth", 0),
                    "brightness": analysis.get("brightness", 0),
                },
            }
        )

    by_category: dict[str, int] = defaultdict(int)
    by_style: dict[str, int] = defaultdict(int)
    by_orientation: dict[str, int] = defaultdict(int)
    for e in entries:
        for c in e["categories"]:
            by_category[c] += 1
        for s in e["styles"]:
            by_style[s] += 1
        by_orientation[e["orientation"]] += 1

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total": len(entries),
        "summary": {
            "by_category": dict(sorted(by_category.items())),
            "by_style": dict(sorted(by_style.items())),
            "by_orientation": dict(sorted(by_orientation.items())),
        },
        "images": entries,
    }


def main() -> None:
    catalog = build_catalog()
    OUT_CATALOG.parent.mkdir(parents=True, exist_ok=True)
    OUT_CATALOG.write_text(json.dumps(catalog, indent=2))
    print(f"Wrote {catalog['total']} images → {OUT_CATALOG}")
    print("Categories:", catalog["summary"]["by_category"])
    print("Styles:", catalog["summary"]["by_style"])
    print("Orientation:", catalog["summary"]["by_orientation"])


if __name__ == "__main__":
    main()
