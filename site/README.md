# G10 Studio — Website POC

Proof-of-concept implementation of the [REDESIGN-PLAN](../G10%20Studio%20Redesign%20Brief/REDESIGN-PLAN.md) using Next.js App Router, Tailwind CSS v4, and Framer Motion.

## Run locally

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## What's included

- **16 core pages** with routing per §7 of the redesign plan
- **Design system** — cream/charcoal/terracotta tokens, Cormorant Garamond + Jost
- **Shared components** — header, footer, hero (Ken Burns), marquee, service tabs, process steps, testimonials, FAQ, gallery, forms, sticky inquire bar
- **Signature motion** — kinetic headlines (S1), Ken Burns, marquee, curtain reveal, CTA pulse, count-up testimonials; `prefers-reduced-motion` fallbacks
- **Production images** — curated set in `public/media/` (built from scrape via `scripts/build_site_media.py`)
- **Inquire API** — `POST /api/inquire` (logs to console; wire to Resend in production)

## Key routes

| Page | URL |
|------|-----|
| Home | `/` |
| Inquire router | `/inquire` |
| Wedding form | `/inquire/wedding` |
| Session form | `/inquire/session` |
| Portfolio | `/portfolio` |
| Blog index | `/blog` |

Legacy URLs `/portfolios` and `/inquiry-decision-wedding-photoshoot` redirect to new paths.

## Next steps (post-POC)

- Wire production images from `scraped/assets/images/by-page/`
- Connect forms to Resend email API
- Add remaining 301 redirects for all legacy URLs
- Implement blog post template + migrate 151 posts
- Lighthouse polish (hero preload, font-display swap audit)
