# Doodle visual language + 3D hero + motion layer

## Context

The portfolio (`app/`, `components/`) currently uses a minimal, content-first
design: flat backgrounds, hairline borders, CSS-only fade-in-up on mount, a
single hand-drawn accent (the sun/moon `WeatherDoodle` toggle). The user likes
this direction and does not want another ground-up redesign — several were
built and abandoned earlier in this project's history before the current
design was settled on.

This spec adds three things as an **enhancement layer** on top of the
existing structure/content/IA, not a rebuild:

1. A hand-drawn ("doodle") visual language for existing UI chrome.
2. A contained 3D hero scene.
3. A GSAP-driven motion layer, plus lightweight ambient/scattered doodle
   accents elsewhere on the page.

Confirmed via brainstorming (including a visual mockup comparison the user
picked from directly):

- Doodle intensity: **bold** — visible wobble on borders/tags/buttons, wavy
  underlines on headings (style "B" in the mockup), not just a subtle border
  tweak and not a full hand-lettered/notebook overhaul.
- 3D content: **abstract/generative** shapes, not literal (no network-graph
  imagery, despite that being thematically on-the-nose for this user's actual
  work) — and specifically **not** a generic floating-particle node graph as
  the hero, since that's the single most common "AI portfolio" template look
  right now. Chosen style: sketchy toon-outline 3D shapes (mockup style "A"),
  which doubles as the bridge between "3D" and "doodle" instead of being two
  unrelated trends bolted together.
- Placement: the user wants all three — a hero accent, a persistent
  background presence, and scattered small elements. This spec satisfies
  that by using exactly **one** WebGL canvas (the hero) and cheaper
  Canvas2D/SVG techniques for the background and scattered placements (see
  Architecture below for why).
- GSAP scope: scroll-triggered reveals, hover micro-animations, section/page
  transitions, and driving the 3D scene — all four.
- Mobile/reduced-motion fallback: swap the 3D canvas for a static
  illustration below a breakpoint; honor `prefers-reduced-motion` throughout.
- Rollout: three phases, each independently shippable and checkable, matching
  how this project has been worked all session.

## Goals

- Existing content, structure, routes, and data model (`lib/apps.ts`, etc.)
  are unchanged.
- Existing theming (`app/globals.css` custom properties, light/dark) remains
  the single source of truth for color — new visual elements read from it,
  they don't hardcode colors.
- Each phase ships independently and the site is fully usable/correct with
  only a subset of phases applied.
- No regression to Lighthouse/Core Web Vitals on desktop; mobile stays fast
  by not mounting WebGL at all below the breakpoint.

## Non-goals

- No change to page structure, routing, or content.
- No literal/representational 3D scene (no mini agent-pipeline diagram, no
  recognizable objects).
- No page-transition library beyond GSAP (no View Transitions API, no
  routing framework changes).
- No redesign of typography or the color palette itself.

## Architecture

### Why one WebGL context, not three

The user wants 3D-ish presence in three places (hero, persistent background,
scattered elements), but three independent Three.js scenes means three
WebGL contexts. Mobile GPUs and some browsers cap concurrent WebGL contexts
(commonly single digits to ~16 depending on device), and each context has
non-trivial memory/GPU overhead regardless of scene complexity. Instead:

- **Hero** — the one real `@react-three/fiber` `<Canvas>`, contained to the
  intro-card area.
- **Persistent background** — a `<canvas>` 2D (not WebGL) particle
  constellation, very low opacity, fixed-position, behind content.
- **Scattered elements** — small hand-drawn inline SVGs (same family as
  `WeatherDoodle`), positioned near specific section headings, animated via
  GSAP ScrollTrigger. No canvas/WebGL at all.

This keeps "3D everywhere" a visual impression rather than a literal
implementation, which is both cheaper and more consistent with the
"abstract/generative, not gimmicky" brief.

### New dependencies

| Package | Phase | Why |
|---|---|---|
| `roughjs` | 1 | Procedural hand-drawn SVG/canvas shapes, sized correctly at any content dimensions (a static hand-authored wobble path only works for one fixed size, which doesn't hold for responsive cards). |
| `three` | 2 | 3D rendering. |
| `@react-three/fiber` | 2 | Idiomatic React/Next integration for Three.js — declarative scene graph, plays correctly with React's render cycle. |
| `@react-three/drei` | 2 | Helper utilities (e.g. `Float` for bobbing motion), avoids hand-rolling common R3F patterns. |
| `gsap` | 3 | Animation engine — timelines, easing, `ScrollTrigger` (bundled free as of the current GSAP license, no paid tier needed). |
| `@gsap/react` | 3 | Official `useGSAP()` hook — scopes/cleans up GSAP context correctly inside React components (avoids manual `useEffect` teardown bugs). |

## Phase 1 — Doodle visual language

**Scope:** restyle existing UI chrome only. No new components beyond the
sketch primitives themselves.

- `components/sketch/` — a small set of client components wrapping
  `roughjs`:
  - `SketchBorder` — renders a rough rounded-rect outline sized to its
    children (via `ResizeObserver`), used behind project cards, the intro
    card, and FAQ items.
  - `SketchUnderline` — CSS `text-decoration: underline wavy` (no `roughjs`
    needed here — native CSS support is good enough and avoids a JS-drawn
    underline reflowing with text).
  - `SketchDivider` — rough horizontal line replacing `border-hairline`
    section dividers.
- Buttons and tag pills get a slight rotation + rough border (matches mockup
  style B) via a shared `sketchy` class/variant rather than one-off inline
  styles, so the look stays consistent as new components are added later.
- Colors: `roughjs` `stroke`/`fill` read from the existing CSS custom
  properties (`--accent`, `--status-done`, etc.) at render time, so dark/light
  theme switching works without extra plumbing.
- All existing components (`project-row.tsx`, the intro card in `page.tsx`,
  `faq-section.tsx`, `current-work.tsx`) get their `border-hairline`/plain
  borders swapped for the sketch primitives. Layout, spacing, and click
  behavior (the clickable-card behavior from the previous change) are
  unchanged.

**Testing:** `npx tsc --noEmit`, `npx eslint`, visual check via
Playwright screenshots in both themes (established pattern this session) —
confirm rough borders render, resize correctly at card content length, and
theme colors are correct.

## Phase 2 — 3D hero scene

**Scope:** one new component, mounted once.

- `components/hero-scene.tsx` (`"use client"`) — an R3F `<Canvas>` sized to
  sit behind/beside the sticky intro card. Dynamically imported via
  `next/dynamic(() => import(...), { ssr: false })` from `page.tsx` so
  Three.js's bundle weight and WebGL init never block first paint/LCP.
- Scene: 2-3 primitives (icosahedron, torus) with the toon-outline look via
  the standard inverted-hull technique — each mesh rendered twice: once with
  a flat/toon material at normal scale, once slightly enlarged with
  `side: THREE.BackSide` and a solid outline color, which reads as a hand-
  drawn outline without a postprocessing pipeline.
- Motion: gentle bobbing/rotation via `@react-three/drei`'s `Float`, or a
  gsap-driven target read in `useFrame` if Phase 3 is already in place (see
  below) — built so Phase 2 works standalone if Phase 3 hasn't landed yet
  (falls back to its own idle animation).
- Mobile fallback: a `matchMedia` check (e.g. `(min-width: 768px)`) gates
  whether the `<Canvas>` mounts at all; below that width a static SVG
  illustration (hand-drawn, matching the toon-shape look) renders instead.
  Same gate applies for `prefers-reduced-motion: reduce` — reduced motion
  users get the static illustration regardless of screen size.

**Testing:** typecheck/lint, Playwright screenshot on desktop viewport
(scene renders, correct colors per theme) and mobile viewport (static
illustration renders, no WebGL canvas in the DOM), plus a check that the
canvas mounts only after intro content is already visible (no LCP
regression — verify via a quick Lighthouse or `next build` bundle-size
sanity check).

## Phase 3 — Motion layer + ambient/scattered doodles

**Scope:** touches most existing components (adds motion, doesn't change
their structure), plus two new small pieces.

- **Scroll-triggered reveals** — replace the current `animate-fade-in-up`
  CSS class (mount-only) with `useGSAP` + `ScrollTrigger` timelines on
  `ProjectRow`, FAQ items, and the timeline entries in `current-work.tsx`,
  so they animate in as the user scrolls to them, staggered by index.
- **Hover micro-animations** — GSAP timelines on card hover (slight
  tilt/scale tied to the sketch border) and button press (squash/stretch),
  replacing the current plain CSS `transition-colors`/`hover:-translate-y`
  where it makes sense; kept subtle enough not to fight the existing
  `group-hover` Tailwind patterns already in place.
- **Page/section transitions** — a small client wrapper around route content
  (reads `usePathname()` from `next/navigation`) that plays a GSAP
  fade/slide timeline on path change, mounted once in `layout.tsx` or
  `page.tsx`.
- **Drives the 3D scene** — a plain JS object (not a React ref into Three.js
  directly) animated by a GSAP `ScrollTrigger` timeline; `hero-scene.tsx`'s
  `useFrame` loop reads that object's current values each frame. This keeps
  GSAP and R3F's render loops decoupled — GSAP never mutates Three.js
  objects directly across React's render cycle.
- `components/particle-field.tsx` — the persistent background layer: a
  fixed-position `<canvas>` 2D particle system (dots + faint connecting
  lines when close, no library needed — `requestAnimationFrame` loop),
  very low opacity, `pointer-events: none`, `z-index: 0` (same layer as the
  existing `body::before` grain texture, stacked above it — both are subtle
  enough to coexist, verified visually during implementation) and below
  `main`'s `z-index: 1`.
- `components/sketch/ScatterDoodle.tsx` — small hand-drawn SVG accents
  (arrow, squiggle, star — same authoring style as `WeatherDoodle`) placed
  near specific section headings (Projects, the timeline's "Currently"
  badge), fading/rotating in via `ScrollTrigger` when scrolled into view.

**Testing:** typecheck/lint, Playwright scroll-and-screenshot at multiple
scroll positions to confirm reveal timing, a `prefers-reduced-motion`
emulation check (Playwright supports emulating this media feature) to
confirm all motion is disabled/instant, and a console-error check (GSAP +
ScrollTrigger cleanup bugs typically surface as React warnings on unmount/
navigation).

## Performance & accessibility (applies to all phases)

- `prefers-reduced-motion: reduce`: GSAP timelines skip to their end state
  instantly (GSAP has a documented pattern for this via `matchMedia`), the
  3D canvas doesn't mount (static illustration instead), the particle
  background doesn't animate (static frame or not rendered).
- Mobile breakpoint gate on the 3D canvas as described in Phase 2.
- All new color usage reads from existing CSS custom properties — no new
  hardcoded hex values that would break theme switching.
- Bundle weight: Three.js + R3F + drei and GSAP are both dynamically
  imported / scoped to the components that need them, not pulled into the
  root layout bundle.

## Rollout

Three phases, each a separate implementation plan/PR:

1. Doodle visual language (Phase 1)
2. 3D hero scene (Phase 2)
3. Motion layer + ambient/scattered doodles (Phase 3)

Each phase is independently shippable — the site is correct and complete
with only Phase 1, or Phase 1+2, applied.
