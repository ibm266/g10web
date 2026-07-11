# Placeholder images (design mockups only)

Use **`placeholders.json`** + files in **`placeholders/`** — do not browse `scraped/assets/` (800+ images).

## How to pick images

```
placeholders.json → pages[pageId].images[]   # up to 4 per core page
placeholders.json → shared[]                 # fallback pool (blog, sparse pages)
```

| Page ID | Folder |
|---------|--------|
| `home` | `placeholders/home/` |
| `about` | `placeholders/about/` |
| `photography-wedding` | `placeholders/photography-wedding/` |
| … | See `core-pages.json` for all 16 IDs |

**Shared pool:** `placeholders/_shared/` — use when a page has few images or for generic gallery grids.

## Rules

- These are **real G10 photos** — fine for high-fidelity mockups
- For production, the full library lives in repo `scraped/assets/images/` (implementation phase)
- Regenerate after scrape updates: `python3 scripts/build_fable_placeholders.py`
