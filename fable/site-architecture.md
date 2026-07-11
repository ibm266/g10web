# Site Architecture

## Business goal

Convert visitors into **inquiries** for wedding photography/videography (worldwide) and portrait sessions (Aruba). Secondary: SEO via blog, trust via portfolio galleries and testimonials.

## Primary user flows

```
                    ┌─────────────┐
                    │  Homepage   │
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
   ┌──────────────┐ ┌─────────────┐ ┌─────────────┐
   │   Wedding    │ │  Portfolio  │ │    About    │
   │   landing    │ │   browse    │ │    Jiten    │
   └──────┬───────┘ └──────┬──────┘ └─────────────┘
          │                │
          └────────┬───────┘
                   ▼
         ┌─────────────────────┐
         │  Inquire (router)   │
         │  Wedding vs Session │
         └─────────┬───────────┘
                   ▼
         ┌─────────────────────┐
         │  Inquiry form pages │
         └─────────────────────┘
```

## Navigation (current site)

**Header:** Weddings · Portfolio (dropdown) · About G10 · Blog · Inquire

**Portfolio dropdown:**
- Weddings → `/photography/wedding-in-aruba`
- Couple's Portraits → `/photography/couple-in-aruba`
- Family Portraits → `/photography/family-in-aruba`
- Photography (all) → `/photography`
- Videography → `/videography`

**Footer columns:**
- Photography: Home, Wedding, Family, Couple, Solo
- Videography: Wedding, Events, Reels, Commercial
- Explore: Inquire, About

## Page types

| Type | Count | Redesign priority | Notes |
|------|-------|-------------------|-------|
| Core marketing | 16 | **High** | See `page-briefs.md` |
| Blog posts | 151 | Medium | Template + CMS; see `do-not-load/blog-guide.md` |
| Blog categories/tags | ~50 | Low | Archive pages; auto-generate from tags |
| Store add-ons | 14 | Low | Upsells (drone, fast-track editing); optional in v1 |
| Inquiry confirmation | 2 | Low | Post-form thank-you pages |
| Member/login | 1 | Skip | Not part of public redesign |

## URL recommendations for new site

Keep SEO-friendly slugs where possible:

| Legacy | Suggested new |
|--------|---------------|
| `/` | `/` |
| `/wedding-photographer-in-aruba` | `/weddings` or keep legacy slug |
| `/photography/wedding-in-aruba` | `/portfolio/weddings` |
| `/photography/couple-in-aruba` | `/portfolio/couples` |
| `/photography/family-in-aruba` | `/portfolio/family` |
| `/videography/wedding-in-aruba` | `/videography/weddings` |
| `/inquiry-decision-wedding-photoshoot` | `/inquire` |
| `/blog/{slug}` | `/blog/{slug}` (keep slugs) |

## Page relationships

- **Homepage** duplicates much content with `/homepage` and `/wedding-photographer-in-aruba` — consolidate into one homepage + dedicated wedding page in redesign.
- **`/portfolios`** and **`/photography/wedding-in-aruba`** share similar gallery grid content — consider one portfolio system with filters.
- **Inquire router** (`/inquiry-decision-wedding-photoshoot`) splits to wedding form vs general session form; also embeds Pixieset gallery links as social proof.
- **Videography sub-pages** (events, reels, commercial) linked in footer but some URLs 404'd on scrape — content may live on hub page or legacy `/video-portfolio/*` paths. Wedding video content is in `videography-wedding` page copy.

## External integrations (not hosted locally)

- **Pixieset** — client photo/video galleries (20 links in repo `scraped/data/videos.json`)
- **Squarespace forms** — inquiry forms on current site; replace with new form backend
- **Instagram / Facebook / Pinterest** — social links throughout
- **Email:** info@g10.studio · **Phone:** +297 6992469
- **Address:** Westraat #4, Oranjestad, Aruba

## Global elements (every page)

- Header: logo, nav, Inquire CTA
- Footer: service links, newsletter signup, social, contact
- Mobile: hamburger menu with portfolio sub-nav
- Sticky/fixed header on scroll (current site behavior)
