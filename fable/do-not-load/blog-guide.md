# Blog Guide

**151 posts** — phase 2. Do NOT load `blog-posts.json` during design.

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

Full slug index: `do-not-load/blog-posts.json` (151 entries).
