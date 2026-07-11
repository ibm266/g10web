# G10 Studio — Website Redesign

Content scraped from [g10.studio](https://www.g10.studio/) for a new site build.

## Claude Design (start here)

Point Claude Design at the **`fable/`** folder.

```
fable/
├── CLAUDE.md             ← entry point — load tiers, do-not-load rules
├── BRIEF.md              ← business facts + homepage copy
├── PROMPT.md             ← copy-paste starter prompt
├── manifest.json         ← token tiers
├── screenshots/          ← current site reference (27 PNGs)
├── design-dossier.md     ← goals & constraints (optional)
├── site-architecture.md  ← nav, flows (multi-page design)
├── brand.md              ← voice, services, CTAs
├── page-briefs.md        ← wireframes for 16 pages
├── core-pages.json       ← slim index → content/pages/{id}.md
├── content/pages/        ← 16 core page markdown files
└── do-not-load/          ← blog index (151 posts) — NOT for design
```

**Minimal design session:** `BRIEF.md` + `screenshots/` (~7 KB text + images)

## Folder structure

```
fable/              # Claude Design context pack (self-contained)
scraped/
├── content/        # All page copy as Markdown
├── assets/images/  # Image library (~2.7 GB)
├── html/           # Raw HTML backup
└── data/           # manifest, video URLs
scripts/            # scrape + regenerate fable/
```

## Regenerate fable/ after scrape

```bash
python3 scripts/scrape_g10.py
python3 scripts/generate_design_context.py
```

## Re-running the scrape

```bash
python3 scripts/scrape_g10.py
python3 scripts/extract_video_urls.py
```
