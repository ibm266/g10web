# Design direction — 1a only (approved)

**Status:** Client-approved concept. Build from **Design 1a ("Golden-hour editorial")** only — do not use or blend in other design options (1b, 1c, etc.).

**What landed:** The tone felt right — warm, personal, Aruba, like Jiten talking to you. Lines like **"— see you at the beach, Jiten"** and the overall voice resonated. Use this as the creative foundation; push it to feel **more modern, mobile-first, and interactive** while keeping that personality.

---

## Concept (1a, evolved)

**Golden-hour editorial** — warm evolution of the current brand, not a cold luxury template.

- Full-bleed **Ken Burns** hero slideshow (slow zoom/pan on wedding & family photos)
- **Kinetic serif headlines** — words stagger in; mix upright + italic
- Cream + charcoal + terracotta palette — golden hour, not stark white minimalism
- **Classy motion** — scroll reveals, smooth transitions, micro-interactions
- **Innovative moments** — 2–5 signature interactions across the site (kinetic headlines, scroll-linked depth, gallery reveals, etc.) that feel fresh for a photography brand — spec them in `REDESIGN-PLAN.md` so a build agent can implement them

---

## Visual system

| Role | Value |
|------|-------|
| Background | `#faf7f2` cream |
| Text | `#2b2620` charcoal |
| Accent | `#b3663f` terracotta |
| Gold highlight | `#e8c9a8` |
| Muted text | `#8a7b64` |
| Dark sections | `#2b2620` with cream text |

**Type (professional — no handwritten fonts):**

| Role | Font | Notes |
|------|------|-------|
| Headlines | **Cormorant Garamond** | Editorial serif; use *italic* for emphasis |
| Body & UI | **Jost** | Clean sans for readability on mobile |
| Accent labels | **Jost** (uppercase, letter-spaced) or italic Cormorant | e.g. "Aruba & worldwide", sign-offs |

**Do NOT use:** Caveat, brush scripts, handwritten fonts, or script type for quotes/sign-offs. The original 1a mockup used handwritten accents — **drop that**. Keep voice in the *words*, not the typeface.

**UI:** Pill buttons, soft borders (`#e5ddcf`), rounded cards, uppercase micro-labels with letter-spacing.

---

## Voice & copy cues to keep

Tone in the copy matters; type stays professional:

| Cue | Use |
|-----|-----|
| **"Aruba & worldwide"** | Hero eyebrow — small caps or italic serif, not script |
| **"Timeless wedding photography, shot in paradise."** | Hero headline pattern |
| **"Four easy steps (that's it!)"** | Process section — casual, reassuring |
| **"Hey! I'm Jiten, a.k.a. G10"** | About / meet section |
| **"— see you at the beach, Jiten"** | Sign-off — italic serif or muted sans, not handwriting |
| **"What are we shooting?"** | Services — conversational, not stiff |
| **"Why couples book G10"** | Differentiators — client-focused |
| **"Questions? Answers."** | FAQ — short, confident |

Documentarian meets editorial. Stress-free, like a friend on your wedding day — not a distant luxury brand.

---

## Homepage sections (1a structure)

Same information architecture — you may redesign how each block is displayed for mobile:

1. **Hero** — Ken Burns slideshow, gradient overlay, staggered headline, dual CTAs
2. **Featured-on marquee** — The Knot, WeddingWire, etc.
3. **Services** — tabbed pills + card with pricing hint
4. **How it works** — dark band, accordion or expandable steps
5. **Meet Jiten** — portrait + bio + sign-off
6. **Testimonials** — carousel, 250+ reviews
7. **Why G10** — image cards (reviews, personality, experience, style)
8. **FAQ** — accordion
9. **Sticky CTA** — dates urgency + inquire pill (mobile-friendly)
10. **Footer** — dark charcoal

---

## Direction for this pass

- **Start from 1a** — warmth, voice, section logic
- **Modern + mobile-first** — design for 390px first; desktop scales up
- **Interactive + innovative** — standard UX motion plus a few signature animated moments (see `REDESIGN-PLAN.md` §3)
- **Same content, new presentation** — keep all copy/sections from `content/pages/`; change layout/components
- **Do not** use handwritten/script fonts
- **Do not** pivot to a different design language or merge other design options

---

## Hero copy reference

- Eyebrow: *Aruba & worldwide* (professional accent type)
- Headline: *Timeless wedding photography, shot in paradise.*
- Subline: *Documentarian meets editorial · 250+ five-star reviews across 6 years.*

CTAs: **Check my date** (primary) · **See the work** (outline)

Both **Check my date** and **Inquire** (nav/sticky) → **`/inquire`** — same entry point, different labels only.
