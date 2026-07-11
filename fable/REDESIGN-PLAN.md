# Redesign plan — implementation handoff

> **Audience:** This document is written by Claude Design (Fable) for a **build agent** (Cursor, Claude Code, etc.) to implement the site. It must be complete enough that the builder does not need to re-interpret mockups or re-read the entire `fable/` folder.
>
> **Status:** `[DRAFT — Fable fills this in Phase 1, updates after Phase 2 mockups]`

---

## 1. Project summary

| Field | Value |
|-------|-------|
| Site | g10.studio — G10 Studio, Jiten Melwani |
| Direction | Design 1a evolved — golden-hour editorial, modern, mobile-first |
| Pages in scope | 16 core pages (see §6) |
| Content source | `fable/content/pages/{id}.md` |
| Images (production) | Repo `scraped/assets/images/by-page/` — match via `core-pages.json` |
| Images (mockups) | `fable/placeholders/{id}/` |

**Builder instruction:** Read this file first. Use mockups + §4 component specs + §6 page specs to implement. Do not change copy without checking `content/pages/`.

---

## 2. Design system (implementation tokens)

### Colors

```css
/* Fable: fill in final values */
--color-bg:        #faf7f2;
--color-bg-dark:   #2b2620;
--color-text:      #2b2620;
--color-text-muted:#8a7b64;
--color-accent:    #b3663f;
--color-highlight: #e8c9a8;
--color-border:    #e5ddcf;
--color-surface:   #ffffff;
```

### Typography

| Token | Font | Size (mobile) | Size (desktop) | Weight |
|-------|------|---------------|----------------|--------|
| `--font-display` | Cormorant Garamond | | | |
| `--font-body` | Jost | | | |
| `text-eyebrow` | Jost, uppercase, letter-spaced | | | 600 |
| `text-h1` | Cormorant | | | |
| `text-body` | Jost | | | 400 |

**No script/handwritten fonts.**

### Spacing & layout

| Token | Mobile | Desktop |
|-------|--------|---------|
| Page padding | | |
| Section gap | | |
| Max content width | 100% | |
| Grid columns | 1 | |

### Breakpoints

```
mobile:  …390px   (design default)
tablet:  …768px
desktop: …1024px
wide:    …1280px
```

---

## 3. Motion & animation strategy

**Principles:** Premium and purposeful. Prefer **innovative** motion at 2–3 hero moments per site — not animation on everything. Respect `prefers-reduced-motion`.

### Standard patterns (reuse across pages)

| Pattern | Use | Spec |
|---------|-----|------|
| Fade-up on scroll | Section entrances | duration, easing, stagger |
| Ken Burns | Hero slideshows | scale, pan, crossfade timing |
| Marquee | “Featured on” strip | speed, pause on hover? |
| Accordion | FAQ, how-it-works | height transition |
| Carousel | Testimonials | swipe + dots |
| Tab pills | Services | active state transition |
| Sticky CTA | Mobile bottom bar | slide-in on scroll |

### Innovative moments (Fable: specify 3–5 signature interactions)

_Fill in with concrete specs a builder can implement._

| Moment | Page(s) | Description | Implementation hint |
|--------|---------|-------------|---------------------|
| e.g. Kinetic headline | home | Words stagger in on load | CSS animation / Framer Motion |
| e.g. Parallax depth | wedding-landing | Hero layers move at different scroll rates | transform + scroll listener |
| e.g. Gallery reveal | portfolio-* | Images scale in with mask wipe | clip-path or GSAP |
| | | | |
| | | | |

### Motion tokens

```css
--ease-out-expo:  /* Fable: value */;
--duration-fast:  200ms;
--duration-base:  400ms;
--duration-slow:  800ms;
--stagger-step:   80ms;
```

### Reduced motion

- Disable Ken Burns → static hero image
- Replace scroll animations → instant show
- Keep functional transitions (accordion, menu) minimal

---

## 4. Component library (for build agent)

_For each component: name, variants, states, animation, which pages use it._

### `<SiteHeader />`

- **Variants:** transparent-over-hero, solid-on-scroll
- **Mobile:** hamburger → full-screen or slide drawer; portfolio sub-nav inside
- **Desktop:** horizontal nav + Inquire pill
- **Animation:**
- **Pages:** all

### `<SiteFooter />`

- **Sections:** photo links, video links, explore, social, newsletter, inclusivity line
- **Pages:** all

### `<HeroKenBurns />`

- **Props:** `images[]`, `headline`, `eyebrow`, `subline`, `ctas[]`
- **Animation:** innovative spec from §3
- **Pages:**

### `<FeaturedMarquee />`

### `<ServiceTabs />`

### `<ProcessSteps />`

- **Mobile:** accordion
- **Desktop:** optional horizontal stepper

### `<MeetPhotographer />`

### `<TestimonialCarousel />`

### `<WhyG10Grid />`

### `<FAQAccordion />`

### `<StickyInquireBar />`

- **Mobile only?** yes/no
- **Copy:** “2026 dates are going fast” + pricing hint
- **CTA:** “Inquire” → `/inquire` (same as “Check my date” on hero)

### `<GalleryGrid />`

- **Variants:** masonry, uniform grid, horizontal scroll on mobile
- **Pages:** portfolio-*, photography-*

### `<InquireForm />`

- **Variants:** wedding, session
- **Pages:** inquire-wedding, inquire-general

---

## 5. Global layout rules

### Mobile-first (390px)

- Touch targets ≥ 44px
- Sticky header behavior:
- Sticky bottom CTA on key pages:
- Section order pattern:
- Image aspect ratios:

### Desktop enhancements

- What changes at tablet/desktop:
- Max-width container:
- Multi-column sections:

---

## 6. Page specifications

_For each page: URL, sections in order, copy source, placeholder images, components used, mobile layout notes, animation notes._

### `home` — `/`

| Section | Component | Copy source | Images | Mobile layout | Animation |
|---------|-----------|-------------|--------|---------------|-----------|
| Hero | HeroKenBurns | BRIEF.md / content/pages/home.md | placeholders/home/ | | |
| Featured on | FeaturedMarquee | | | | |
| Services | ServiceTabs | content/pages/home.md | | | |
| How it works | ProcessSteps | | | | |
| Meet Jiten | MeetPhotographer | | placeholders/home/ | | |
| Testimonials | TestimonialCarousel | | | | |
| Why G10 | WhyG10Grid | | | | |
| FAQ | FAQAccordion | | | | |
| Sticky CTA | StickyInquireBar | | | | |

**Mockup reference:** _(Fable: link/describe after Phase 2)_

---

### `about` — `/about-jiten-melwani-aruba-photographer`

_(repeat table)_

---

### `wedding-landing` — `/wedding-photographer-in-aruba`

_(repeat table)_

---

### `photography-hub` — `/photography`

_(repeat table)_

---

### `photography-wedding` — `/photography/wedding-in-aruba`

_(repeat table)_

---

### `photography-couple` — `/photography/couple-in-aruba`

_(repeat table)_

---

### `photography-family` — `/photography/family-in-aruba`

_(repeat table)_

---

### `photography-solo` — `/photography/solo-in-aruba`

_(repeat table)_

---

### `videography-hub` — `/videography`

_(repeat table)_

---

### `videography-wedding` — `/videography/wedding-in-aruba`

_(repeat table)_

---

### `portfolio-hub` — `/portfolios`

_(repeat table)_

---

### `portfolio-weddings` — `/photo-portfolio-g10-studio-photographer/...`

_(repeat table)_

---

### `inquire-router` — `/inquiry-decision-wedding-photoshoot`

_(repeat table)_

---

### `inquire-wedding` — `/inquire-wedding-photography-g10-studio`

_(repeat table)_

---

### `inquire-general` — `/inquire-to-book-your-photoshoot`

_(repeat table)_

---

### `blog-index` — `/blog`

_(repeat table — one template for posts later)_

---

## 7. Routing & URL map

| Page ID | Legacy URL | Recommended new URL | Notes |
|---------|------------|---------------------|-------|
| home | `/` | `/` | |
| … | | | |

---

## 8. Build order (for implementation agent)

1. Design tokens + fonts + global layout shell
2. Shared components (§4) — header, footer, CTA bar
3. Homepage
4. _(Fable: ordered list of remaining pages)_
5. Blog index template
6. Polish: animations, reduced-motion, performance

---

## 9. Suggested tech stack

_Fable: recommend based on mockups — e.g. Next.js App Router, Tailwind, Framer Motion_

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | | |
| Styling | | |
| Animation | | |
| Forms | | |
| Image optimization | | |

---

## 10. Open decisions / locked choices

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Check my date vs Inquire | **Same URL `/inquire`** | Different labels, one conversion entry |
| URL structure | | |
| Pricing display | inquiry-gated / starting-at | |
| Blog posts | template only in v1 | |
| | | |

---

## 11. Mockup index

_Fable: list mockup files or descriptions after Phase 2_

| Page ID | Mobile mockup | Desktop mockup | Notes |
|---------|---------------|----------------|-------|
| home | | | |
| … | | | |

---

## 12. Builder checklist

- [ ] All 16 pages implemented with copy from `content/pages/{id}.md`
- [ ] Design tokens match §2
- [ ] Components match §4
- [ ] Innovative animations from §3 implemented with reduced-motion fallbacks
- [ ] Mobile-first responsive at all breakpoints
- [ ] Inquire CTAs on every major page
- [ ] Production images wired from `scraped/assets/images/by-page/`
- [ ] SEO: titles, meta, semantic headings preserved from content files
