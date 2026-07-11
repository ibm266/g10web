# Design Dossier — G10 Studio Redesign

**Audience:** Claude Design / planning  
**Goal:** New site design that converts inquiries while preserving brand voice and SEO value.

## What "done" looks like

1. **Sitemap** — 16 core pages + blog template (posts as CMS, not designed individually)
2. **Homepage** — section list informed by copy in `BRIEF.md` and `content/pages/home.md`
3. **Visual direction** — luxury destination wedding, warm/authentic, Aruba; not generic template
4. **Component set** — hero, gallery grid, testimonial slider, service cards, FAQ, inquire CTA
5. **Mobile** — portfolio sub-nav, sticky header, thumb-friendly inquire path
6. **Conversion path** — every major page routes to `/inquire` (wedding vs session split)

## Constraints (non-negotiable)

| Constraint | Detail |
|------------|--------|
| Brand voice | First-person Jiten, humor OK, luxury + relaxed |
| Geography | Aruba-based; worldwide weddings |
| Pricing signal | From $2,000 weddings / $700 sessions; packages inquiry-gated |
| Trust | 250+ reviews, platform badges, named testimonials, Pixieset galleries |
| Inclusivity | Welcome all religions, genders, orientations |
| Media | Use screenshots for current look; scraped photos live in repo only |

## Out of scope (phase 1)

- Individual blog post layouts (151 posts — one template)
- Store add-ons (14 products — optional later)
- Member/login area
- Rebuilding Pixieset galleries (link out)

## Key user journeys

1. **Wedding couple (destination)** → Home or `/weddings` → portfolio → inquire (wedding form)
2. **Vacation portrait** → Home → couple/family portfolio → inquire (session form)
3. **SEO visitor** → Blog post → related CTA → inquire
4. **Trust seeker** → About Jiten → testimonials/galleries → inquire

## Reference files (load in order)

1. `site-architecture.md` — nav, flows, page types
2. `brand.md` — voice, services, CTAs
3. `page-briefs.md` — per-page section wireframes
4. `core-pages.json` — exact content file paths

## Validation checks

- [ ] Every core page in dossier maps to a `contentFile` in `core-pages.json`
- [ ] Homepage sections account for hero, gallery, services, FAQ, process, testimonials, CTA
- [ ] Inquire flow covers wedding vs couple vs family routing
- [ ] Footer matches service taxonomy (photo + video columns)
- [ ] No dependency on reading all 813 images or 151 blog files
