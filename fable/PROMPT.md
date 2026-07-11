# G10 Studio — full site redesign (Claude Design / Fable)

Point Claude Design at the **`fable/`** folder and paste everything below the line.

---

## Brief

Redesign **g10.studio** for Jiten Melwani (G10 Studio) — Aruba wedding & portrait photographer.

**Goals:**
- **Modern** look and feel — evolved from the approved Design 1a direction
- **Mobile-first** — optimised for phone; every page must work beautifully at ~390px width
- **Interactive & innovative motion** — classy animations everywhere they help UX, plus **2–5 signature innovative moments** (e.g. kinetic type, scroll-linked depth, gallery reveals, magnetic CTAs) that feel fresh for a photography site. Premium, not gimmicky — always with `prefers-reduced-motion` fallbacks
- **Same content, better presentation** — keep the existing page structure, sections, and copy from our content pack. You may completely rethink *how* information is laid out, stacked, and revealed on mobile
- **All core pages** — deliver redesign concepts for every page listed in `core-pages.json` (16 pages), not just the homepage

**Approved visual direction:** Read **`design-1a.md`** first. Build from **Design 1a only** (golden-hour editorial: cream `#faf7f2`, charcoal `#2b2620`, terracotta `#b3663f`). Push it to feel more exciting and contemporary.

**Typography:** Do **not** use handwritten or script fonts (no Caveat, brush, or “handwritten quote” styling). Use **Cormorant Garamond** for headlines and **Jost** for body/UI. Voice lives in the words — e.g. keep *"— see you at the beach, Jiten"* in italic serif, not script.

**CTAs — same destination:** **"Check my date"** (hero/marketing) and **"Inquire"** (header, sticky bar, footer) are the **same primary conversion action**. Both link to **`/inquire`** (current live URL: `/inquiry-decision-wedding-photoshoot`). Do not create separate flows or forms for these two labels — only the label changes, the destination is identical. That page lets the user choose wedding vs couple/family session, then continues to the appropriate form.

**Live site scan:** Before designing, do a **quick browse of [g10.studio](https://www.g10.studio/)** — homepage plus 2–3 key pages (about, a portfolio page, inquire). This is in addition to `screenshots/` and `BRIEF.md`. Get a holistic feel for Jiten's voice, energy, and how pages flow in practice. The folder content is the source of truth for copy; the live site is for tone and UX context.

---

## Critical deliverable: `REDESIGN-PLAN.md`

**This is the handoff document for a build agent** (Cursor / Claude Code) who will implement the site in code.

You **must** write and maintain **`REDESIGN-PLAN.md`** in this folder:

1. **Phase 1 (before mockups):** Fill in the template — design tokens, motion strategy (including innovative moments), component library, page specs, build order, tech stack recommendation
2. **Phase 2 (after mockups):** Update §6 page specs and §11 mockup index so the builder can implement without guessing

The build agent should be able to read **`REDESIGN-PLAN.md` alone** (+ `content/pages/{id}.md` for copy) and know exactly what to build.

---

## What to read (in order)

0. **Quick scan:** Browse **[g10.studio](https://www.g10.studio/)** — homepage, about, one portfolio page, inquire router. Feel the voice holistically before designing.
1. **`design-1a.md`** — approved direction, palette, section structure, typography rules
2. **`BRIEF.md`** — business context + homepage copy (brand voice)
3. **`site-architecture.md`** — nav, user flows, page relationships
4. **`core-pages.json`** — list of all 16 pages to redesign
5. **`REDESIGN-PLAN.md`** — template to fill in (your main output for the builder)
6. **`page-briefs.md`** — section wireframes per page (load when designing that page)
7. **`screenshots/`** — current Squarespace site for reference
8. **`placeholders.json`** + **`placeholders/`** — images for mockups (do NOT dig through scraped assets)

**Per-page copy:** When designing a specific page, read **one** file from `content/pages/{id}.md` — never bulk-load all 16.

---

## Phase 1 — Write `REDESIGN-PLAN.md` first

Before creating mockups, **fully fill in `REDESIGN-PLAN.md`** including:

1. **Design system tokens** — CSS-ready colors, type scale, spacing, breakpoints
2. **Motion strategy** — standard patterns + **3–5 innovative signature animations** with implementation hints (duration, easing, library suggestion)
3. **Component library** — every shared component with variants, props, which pages use it
4. **Page specifications** — all 16 pages: sections in order, components, copy source, placeholder images, mobile layout notes
5. **Build order** — for the implementation agent
6. **Tech stack recommendation** — framework, styling, animation library

---

## Phase 2 — Design all pages + update plan

For **each** of the 16 core pages:

- Use copy from `content/pages/{id}.md` and wireframe hints from `page-briefs.md`
- Use images from `placeholders/{id}/` or `placeholders/_shared/` per `placeholders.json`
- Mobile-first mockup (390px), plus desktop where useful
- Same sections/content as the current page — new layout and components
- Apply innovative animation ideas from the plan where they fit

**After each page (or at end):** Update **`REDESIGN-PLAN.md`** §6 and §11 with mockup references and any spec changes.

**Pages to cover:**

`home` · `about` · `wedding-landing` · `photography-hub` · `photography-wedding` · `photography-couple` · `photography-family` · `photography-solo` · `videography-hub` · `videography-wedding` · `portfolio-hub` · `portfolio-weddings` · `inquire-router` · `inquire-wedding` · `inquire-general` · `blog-index`

---

## Constraints

- **Primary CTA:** **"Check my date"** and **"Inquire"** → same URL (`/inquire`). Different labels, identical destination. Secondary CTA: **"See the work"** → portfolio
- Trust signals: 250+ reviews, platform badges, named testimonials
- Pricing signals: from $2,000 weddings / $700 sessions (inquiry-gated is fine)
- Inclusive welcome statement in footer
- Blog: one template for posts later — only redesign **blog-index** now
- Do not load `do-not-load/` (151 blog posts index)
- Animations: innovative where it elevates the brand; never at the cost of performance or accessibility

---

## Deliverables

1. **`REDESIGN-PLAN.md`** — complete implementation handoff for build agent (required)
2. **Redesign mockups** — all 16 core pages, mobile-first
3. **Updated plan** — mockup index + final specs in `REDESIGN-PLAN.md`

**Workflow:** Write plan → design pages → update plan. Start now with Phase 1.
