# G10 Studio — Claude Design

Redesign [g10.studio](https://www.g10.studio/) — wedding & portrait photography in Aruba by Jiten "G10" Melwani.

**Point Claude Design at this folder only.** Paste **`PROMPT.md`**.

---

## Two-agent workflow

| Agent | Role | Primary output |
|-------|------|----------------|
| **Claude Design (Fable)** | Design + plan | Mockups + **`REDESIGN-PLAN.md`** |
| **Build agent** (Cursor / Claude Code) | Implement in code | Reads **`REDESIGN-PLAN.md`** + `content/pages/` |

Fable must **fill in `REDESIGN-PLAN.md` first**, then design pages, then **update the plan** with mockup references. The build agent should not need to re-interpret designs from scratch.

---

## Full redesign workflow

| Phase | What | Output |
|-------|------|--------|
| 1 | Read briefs, write specs | **`REDESIGN-PLAN.md`** (complete) |
| 2 | Design all 16 pages (mobile-first) | Mockups + updated **`REDESIGN-PLAN.md`** |

**Starter:** `PROMPT.md` · **Handoff template:** `REDESIGN-PLAN.md`

---

## Load tiers

| Priority | File / folder | Why |
|----------|---------------|-----|
| 1 | **PROMPT.md** | Full brief for Claude Design |
| 2 | **REDESIGN-PLAN.md** | Template to fill → build agent handoff |
| 3 | **design-1a.md** | Approved direction (1a only, no script fonts) |
| 4 | **BRIEF.md** | Business + homepage copy |
| 5 | **site-architecture.md** | Nav, flows, 16 pages |
| 6 | **screenshots/** | Current site reference |
| 7 | **placeholders.json** + **placeholders/** | Images for mockups |
| 8 | **page-briefs.md** + **content/pages/{id}.md** | One page at a time |

---

## Rules

- **Mobile-first** (~390px), modern, innovative animations where they elevate the brand
- **Same content** from `content/pages/` — new layout only
- **All 16 pages** in `core-pages.json`
- **No handwritten/script fonts** — Cormorant Garamond + Jost only
- **CTAs:** "Check my date" and "Inquire" → same `/inquire` URL
- **`REDESIGN-PLAN.md` is mandatory** — implementation handoff for next agent
- **Live site:** quick scan of g10.studio recommended for holistic voice (see PROMPT.md)

Load tiers: **manifest.json**
