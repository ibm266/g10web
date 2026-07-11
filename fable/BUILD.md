# Implementation handoff (build agent)

You are the **build agent**. Claude Design (Fable) has produced mockups and filled in **`REDESIGN-PLAN.md`**.

## Start here

1. Read **`REDESIGN-PLAN.md`** — design tokens, components, animations, page specs, build order
2. For copy: **`content/pages/{id}.md`** (one page at a time)
3. For production images: repo `scraped/assets/images/by-page/` (see `core-pages.json` image counts)
4. Reference mockups listed in REDESIGN-PLAN §11

## Do not

- Re-design from scratch — follow the plan
- Bulk-load all 16 content files or 800+ scraped images
- Load `do-not-load/` unless building blog posts

## Regenerate design pack after scrape

```bash
python3 scripts/generate_design_context.py
```
