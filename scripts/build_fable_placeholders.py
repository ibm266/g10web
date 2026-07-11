#!/usr/bin/env python3
"""Copy a small curated image set into fable/placeholders/ for design mockups."""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
FABLE = ROOT / "fable"
PLACEHOLDERS = FABLE / "placeholders"
CORE_PAGES = FABLE / "core-pages.json"
MANIFEST = ROOT / "scraped/data/manifest.json"
IMAGES_ROOT = ROOT / "scraped/assets/images"
PER_PAGE = 4
SHARED_POOL_SIZE = 8


def index_manifest_pages() -> dict[str, dict]:
    pages = json.loads(MANIFEST.read_text())["pages"]
    out: dict[str, dict] = {}
    for p in pages:
        if not p.get("success"):
            continue
        path = urlparse(p["url"]).path.rstrip("/") or "/"
        if path not in out or "www.g10.studio" in p["url"]:
            out[path] = p
    return out


def image_paths_from_page(page: dict | None) -> list[Path]:
    if not page:
        return []
    found: list[Path] = []
    for img in page.get("images", []):
        rel = img.get("path", "")
        if not rel:
            continue
        src = ROOT / "scraped" / rel
        if src.is_file():
            found.append(src)
    return found


def folder_images(page_id: str, md_rel: str | None) -> list[Path]:
    if not md_rel:
        return []
    md = Path(md_rel)
    folder = IMAGES_ROOT / "by-page" / md.parent.relative_to("content") / md.stem
    if not folder.is_dir():
        return []
    files = sorted(
        [f for f in folder.iterdir() if f.is_file() and f.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}],
        key=lambda f: f.stat().st_size,
    )
    return files


def pick_images(page_id: str, proposed_path: str, by_path: dict[str, dict], md_rel: str | None) -> list[Path]:
    from_manifest = image_paths_from_page(by_path.get(proposed_path))
    from_folder = folder_images(page_id, md_rel)
    # Prefer on-disk by-page folder; fall back to manifest paths
    pool = from_folder or from_manifest
    # Spread picks: first, middle, last-ish for variety
    if len(pool) <= PER_PAGE:
        return pool
    indices = [0, len(pool) // 3, (2 * len(pool)) // 3, len(pool) - 1]
    seen: set[Path] = set()
    picked: list[Path] = []
    for i in indices:
        p = pool[i]
        if p not in seen:
            seen.add(p)
            picked.append(p)
    return picked[:PER_PAGE]


def main() -> None:
    core = json.loads(CORE_PAGES.read_text())["corePages"]
    by_path = index_manifest_pages()

    # Map page id -> scraped md path via manifest
    id_to_md: dict[str, str | None] = {}
    for pid, pdata in core.items():
        p = by_path.get(pdata["proposedPath"])
        id_to_md[pid] = p.get("markdown_path") if p else None

    if PLACEHOLDERS.exists():
        shutil.rmtree(PLACEHOLDERS)
    PLACEHOLDERS.mkdir(parents=True)

    manifest_out: dict = {
        "instruction": "Use ONLY these images for mockups. Do not browse scraped/assets/.",
        "perPage": PER_PAGE,
        "pages": {},
        "shared": [],
    }

    fallback_pool: list[Path] = []

    for pid, pdata in core.items():
        dest_dir = PLACEHOLDERS / pid
        dest_dir.mkdir(parents=True, exist_ok=True)
        sources = pick_images(pid, pdata["proposedPath"], by_path, id_to_md[pid])

        if not sources and fallback_pool:
            sources = fallback_pool[:2]

        copied: list[str] = []
        for i, src in enumerate(sources):
            ext = src.suffix.lower() or ".jpg"
            dest = dest_dir / f"{i + 1:02d}{ext}"
            shutil.copy2(src, dest)
            copied.append(f"placeholders/{pid}/{dest.name}")
            if pid in ("home", "photography-wedding", "wedding-landing"):
                fallback_pool.append(src)

        manifest_out["pages"][pid] = {
            "title": pdata["title"],
            "contentFile": pdata["contentFile"],
            "images": copied,
        }

    # Shared pool for blog / pages with few images
    shared_dir = PLACEHOLDERS / "_shared"
    shared_dir.mkdir(exist_ok=True)
    shared_sources = list(dict.fromkeys(fallback_pool))[:SHARED_POOL_SIZE]
    for i, src in enumerate(shared_sources):
        ext = src.suffix.lower() or ".jpg"
        dest = shared_dir / f"{i + 1:02d}{ext}"
        shutil.copy2(src, dest)
        manifest_out["shared"].append(f"placeholders/_shared/{dest.name}")

    (FABLE / "placeholders.json").write_text(json.dumps(manifest_out, indent=2), encoding="utf-8")

    total = sum(len(v["images"]) for v in manifest_out["pages"].values()) + len(manifest_out["shared"])
    print(f"Wrote fable/placeholders/ ({total} images across {len(core)} pages + shared pool)")


if __name__ == "__main__":
    main()
