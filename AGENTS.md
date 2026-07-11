# G10 Studio — Website Redesign

Attach **`@fable/`** for design sessions (Claude Design / Fable).

## Claude Design

Point at the **`fable/`** folder. Paste **`fable/PROMPT.md`** into Claude Design.

```
fable/                    ← single folder for Claude Design
├── CLAUDE.md             ← entry point + load tiers
├── design-1a.md          ← approved direction (1a only, no script fonts)
├── PROMPT.md             ← **paste this into Claude Design**
├── REDESIGN-PLAN.md      ← Fable writes this → build agent reads it
├── BUILD.md              ← start here for implementation agent
├── placeholders.json     ← image index for mockups
├── placeholders/         ← 62 curated photos (~71 MB)
├── screenshots/          ← current site (27 PNGs)
├── content/pages/        ← 16 core page copy files
├── core-pages.json       ← slim page index
└── do-not-load/          ← blog index etc. — not for design
```

## Project layout

```
fable/                    ← design context (Claude Design)
scraped/content/          ← all page copy (276 files)
scraped/assets/images/    ← images (~2.7 GB)
scripts/                  ← scrape + regenerate fable/
```

## Regenerate fable/ after scrape updates

```bash
python3 scripts/generate_design_context.py
```

Hand-maintained files (not overwritten): `CLAUDE.md`, `BRIEF.md`, `PROMPT.md`, `design-1a.md`, `REDESIGN-PLAN.md`, `design-dossier.md`, `site-architecture.md`, `brand.md`
