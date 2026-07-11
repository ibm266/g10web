# Assets Guide (implementation only)

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
