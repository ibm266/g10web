#!/usr/bin/env python3
"""Generate fable/ docs for Claude Design. Run after scrape updates."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
FABLE = ROOT / "fable"
CONTENT_DIR = FABLE / "content" / "pages"
DO_NOT_LOAD = FABLE / "do-not-load"
MANIFEST = ROOT / "scraped/data/manifest.json"

CORE_PAGES = [
    ("home", "/"),
    ("about", "/about-jiten-melwani-aruba-photographer"),
    ("wedding-landing", "/wedding-photographer-in-aruba"),
    ("photography-hub", "/photography"),
    ("photography-wedding", "/photography/wedding-in-aruba"),
    ("photography-couple", "/photography/couple-in-aruba"),
    ("photography-family", "/photography/family-in-aruba"),
    ("photography-solo", "/photography/solo-in-aruba"),
    ("videography-hub", "/videography"),
    ("videography-wedding", "/videography/wedding-in-aruba"),
    ("portfolio-hub", "/portfolios"),
    (
        "portfolio-weddings",
        "/photo-portfolio-g10-studio-photographer/destination-weddings-aruba-and-worldwide-photographer",
    ),
    ("inquire-router", "/inquiry-decision-wedding-photoshoot"),
    ("inquire-wedding", "/inquire-wedding-photography-g10-studio"),
    ("inquire-general", "/inquire-to-book-your-photoshoot"),
    ("blog-index", "/blog"),
]


def extract_sections(md_path: Path, max_sections: int = 30) -> list[dict]:
    if not md_path.exists():
        return []
    text = md_path.read_text(errors="ignore")
    body = text.split("---", 2)[-1]
    sections = []
    for line in body.splitlines():
        if line.startswith("#"):
            level = len(line) - len(line.lstrip("#"))
            title = re.sub(r"\*\*", "", line.lstrip("#").strip())
            if title and len(title) < 140:
                sections.append({"level": level, "title": title})
    return sections[:max_sections]


def load_manifest() -> list[dict]:
    return json.loads(MANIFEST.read_text())["pages"]


def index_by_path(pages: list[dict]) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for p in pages:
        if not p.get("success"):
            continue
        path = urlparse(p["url"]).path.rstrip("/") or "/"
        if path not in out or "www.g10.studio" in p["url"]:
            out[path] = p
    return out


def build_core_briefs(by_path: dict[str, dict]) -> dict:
    briefs = {}
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    for key, path in CORE_PAGES:
        p = by_path.get(path)
        if not p:
            continue
        md_rel = p.get("markdown_path", "")
        src = ROOT / "scraped" / md_rel if md_rel else None
        dest = CONTENT_DIR / f"{key}.md"
        if src and src.exists():
            shutil.copy2(src, dest)

        briefs[key] = {
            "id": key,
            "proposedPath": path,
            "legacyUrl": f"https://www.g10.studio{'' if path == '/' else path}",
            "title": p.get("title", ""),
            "contentFile": f"content/pages/{key}.md",
            "imageCount": len(p.get("images", [])),
            "sections": extract_sections(src) if src else [],
        }
    return briefs


def build_blog_index(pages: list[dict]) -> list[dict]:
    posts = []
    seen: set[str] = set()
    for p in pages:
        if not p.get("success"):
            continue
        path = urlparse(p["url"]).path.strip("/")
        if not path.startswith("blog/") or path == "blog":
            continue
        if path.startswith("blog/category/") or path.startswith("blog/tag/"):
            continue
        slug = path.removeprefix("blog/")
        if slug in seen:
            continue
        seen.add(slug)
        md = p.get("markdown_path", "")
        posts.append(
            {
                "slug": slug,
                "path": f"/blog/{slug}",
                "title": p.get("title", "").replace(" — G10 Studio", "").replace("-G10 Studio", ""),
                "contentFile": f"scraped/{md}",
            }
        )
    posts.sort(key=lambda x: x["slug"])
    return posts


def write_core_pages_json(core: dict) -> None:
    """Slim index for design — no sections, no html paths."""
    slim = {
        k: {
            "id": v["id"],
            "proposedPath": v["proposedPath"],
            "legacyUrl": v["legacyUrl"],
            "title": v["title"],
            "contentFile": v["contentFile"],
            "imageCount": v["imageCount"],
        }
        for k, v in core.items()
    }
    payload = {
        "generatedFor": "G10 Studio — Claude Design",
        "loadTier": "page_copy_lookup",
        "instruction": "Load ONE contentFile at a time. Never bulk-read content/pages/.",
        "corePages": slim,
    }
    (FABLE / "core-pages.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")


def write_page_briefs_md(core: dict) -> None:
    lines = [
        "# Core Page Briefs",
        "",
        "Section outlines for marketing pages. **Full copy lives in `contentFile`** — do not duplicate here.",
        "",
        "Load one page at a time via `core-pages.json`.",
        "",
    ]
    for key, b in core.items():
        lines += [
            f"## {b['title'] or key}",
            "",
            f"| Field | Value |",
            f"|-------|-------|",
            f"| ID | `{key}` |",
            f"| Proposed path | `{b['proposedPath']}` |",
            f"| Content | `{b['contentFile']}` |",
            f"| Images (in repo) | {b['imageCount']} scraped files — not in this folder |",
            "",
            "**Sections (wireframe blocks):**",
            "",
        ]
        for s in b["sections"]:
            indent = "  " * (s["level"] - 1)
            lines.append(f"{indent}- {s['title']}")
        if not b["sections"]:
            lines.append("- _(open contentFile for structure)_")
        lines.append("")

    (FABLE / "page-briefs.md").write_text("\n".join(lines), encoding="utf-8")


def write_do_not_load(blog: list[dict]) -> None:
    DO_NOT_LOAD.mkdir(parents=True, exist_ok=True)

    blog_payload = {
        "generatedFor": "G10 Studio — implementation phase only",
        "loadTier": "never_load_for_design",
        "count": len(blog),
        "blogPosts": blog,
    }
    (DO_NOT_LOAD / "blog-posts.json").write_text(json.dumps(blog_payload, indent=2), encoding="utf-8")

    blog_guide = f"""# Blog Guide

**{len(blog)} posts** — phase 2. Do NOT load `blog-posts.json` during design.

## Template (one layout for all posts)

- Hero image + title + date
- Body copy (SEO article)
- Author bio block
- Related posts / CTA to inquire

## Lookup (when building blog)

```
do-not-load/blog-posts.json → blogPosts[] where slug matches
  → contentFile in repo scraped/content/blog/
```

Full slug index: `do-not-load/blog-posts.json` ({len(blog)} entries).
"""
    (DO_NOT_LOAD / "blog-guide.md").write_text(blog_guide, encoding="utf-8")

    assets_guide = """# Assets Guide (implementation only)

Do not load during Claude Design sessions.

## Images

- **813 unique files** (~2.7 GB) in repo `scraped/assets/images/`
- Per-page folders: `scraped/assets/images/by-page/` (match via scrape manifest)
- For design, use `screenshots/` in this folder instead

## Videos

- URL references only: repo `scraped/data/videos.json`
- 9 Squarespace native videos + 20 Pixieset gallery links
- Do not download or embed in design mockups — link out

## Lookup pattern (implementation)

```
core-pages.json → corePages[pageId]
  → contentFile   content/pages/{id}.md (in this folder)
  → imageCount    then fetch from scraped/assets/images/by-page/ in repo
```
"""
    (DO_NOT_LOAD / "assets-guide.md").write_text(assets_guide, encoding="utf-8")

    hosting = """# Hosting & CMS (implementation only)

Do not load during Claude Design sessions.

## Current stack

- Squarespace (legacy)
- Pixieset client galleries (external)
- Squarespace forms for inquiries

## New site considerations

- Static/SSR site (Next.js, Astro, etc.) or headless CMS for blog
- Form backend for inquire flows (wedding vs session split)
- Image CDN for portfolio galleries
- Keep SEO-friendly URLs from `site-architecture.md`

See repo `scraped/data/manifest.json` for full page inventory.
"""
    (DO_NOT_LOAD / "hosting-and-cms.md").write_text(hosting, encoding="utf-8")


def main() -> None:
    FABLE.mkdir(exist_ok=True)
    pages = load_manifest()
    by_path = index_by_path(pages)
    core = build_core_briefs(by_path)
    blog = build_blog_index(pages)
    write_core_pages_json(core)
    write_page_briefs_md(core)
    write_do_not_load(blog)
    print(f"Wrote fable/ ({len(core)} core pages, {len(blog)} blog posts in do-not-load/)")
    print("Hand-maintained: CLAUDE.md, BRIEF.md, PROMPT.md, design-1a.md, REDESIGN-PLAN.md, ...")

    # Curated placeholder images for design mockups
    script = ROOT / "scripts/build_fable_placeholders.py"
    if script.is_file():
        subprocess.run([sys.executable, str(script)], check=True)


if __name__ == "__main__":
    main()
