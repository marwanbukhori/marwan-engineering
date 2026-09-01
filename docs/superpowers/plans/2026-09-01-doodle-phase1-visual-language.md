# Doodle Visual Language (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle existing UI chrome (borders, dividers, tags, buttons, headings) with a bold hand-drawn "doodle" look, using `roughjs` for procedurally-drawn wobbly shapes and CSS for lightweight wobble/underline effects — no layout, content, or routing changes.

**Architecture:** Two new reusable client components (`SketchBorder`, `SketchDivider`) draw hand-drawn SVG shapes via `roughjs`, sized to their container via `ResizeObserver` so they work at any responsive width/height. They're absolutely-positioned overlays with `pointer-events: none`, layered via normal DOM/stacking order (no manual z-index needed). Small elements (tag pills, buttons, heading underlines) get pure-CSS wobble/rotation instead of `roughjs`, since a JS-drawn shape isn't worth it at that size.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, `roughjs` (new dependency, SVG output mode, built-in TS types).

**Spec:** `docs/superpowers/specs/2026-09-01-doodle-3d-motion-design.md` (Phase 1 section)

## Global Constraints

- No new test framework — this repo has no unit test runner (`package.json` has no `jest`/`vitest`/`@playwright/test`). Verification is `npx tsc --noEmit`, `npx eslint <files> --quiet`, and a manual Playwright MCP screenshot check in both light and dark mode, matching how every prior change in this project has been verified. Do not add a test framework as part of this plan.
- All new colors must come from the existing CSS custom properties in `app/globals.css` (e.g. `var(--status-done)`, `var(--hairline)`) — no new hardcoded hex values, so dark/light theme switching keeps working.
- No change to existing layout, spacing rhythm, click behavior, or routing. `ProjectRow`'s whole-card-clickable behavior (from the prior change) must still work unmodified.
- Clean up `.superpowers/brainstorm/` mockups are already gitignored — don't commit anything from that directory.

---

## Task 1: `SketchBorder` component + intro card

**Files:**
- Create: `components/sketch/sketch-border.tsx`
- Modify: `app/page.tsx:15-27`
- Modify: `package.json` (via `npm install`)

**Interfaces:**
- Produces: `SketchBorder({ color: string, strokeWidth?: number, roughness?: number }): JSX.Element` — renders an absolutely-positioned `<svg>` that fills its nearest positioned ancestor and draws a hand-drawn rectangle outline inset from the edges. The parent element **must** have `position: relative` (or another positioning context) and should render `<SketchBorder />` as its first child so it paints above the parent's own background but below any other absolutely-positioned interactive children that come after it in DOM order (see stacking note below).

- [ ] **Step 1: Install roughjs**

Run: `npm install roughjs`

Expected: `roughjs` appears in `package.json` `dependencies`. It ships its own TypeScript types, so no `@types/roughjs` is needed.

- [ ] **Step 2: Create the `SketchBorder` component**

Create `components/sketch/sketch-border.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

type SketchBorderProps = {
  color: string;
  strokeWidth?: number;
  roughness?: number;
};

export function SketchBorder({ color, strokeWidth = 1.5, roughness = 1.8 }: SketchBorderProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || size.width < 4 || size.height < 4) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const inset = strokeWidth + 1;
    const rect = rc.rectangle(
      inset,
      inset,
      size.width - inset * 2,
      size.height - inset * 2,
      { stroke: color, strokeWidth, roughness, fill: "none" }
    );
    svg.appendChild(rect);
  }, [size, color, strokeWidth, roughness]);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
```

Why `ResizeObserver` on the `<svg>` itself rather than its parent: with `absolute inset-0 h-full w-full`, the SVG's own content box already equals the parent's box, so observing the SVG directly is enough and avoids an extra `parentElement` lookup.

- [ ] **Step 3: Wire it into the intro card**

In `app/page.tsx`, the intro card currently reads:

```tsx
      <div
        className="animate-fade-in-up sticky top-4 z-20 mb-8 overflow-hidden rounded-xl px-5 py-5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] sm:mb-10 sm:px-6"
        style={{ background: "var(--block-dark)" }}
      >
        <ScrollProgress />
        <WeatherDoodle />
```

Add `relative` to the className and add `<SketchBorder />` as the first child, before `<ScrollProgress />`:

```tsx
      <div
        className="animate-fade-in-up relative sticky top-4 z-20 mb-8 overflow-hidden rounded-xl px-5 py-5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] sm:mb-10 sm:px-6"
        style={{ background: "var(--block-dark)" }}
      >
        <SketchBorder color="#f2f0ea" strokeWidth={2} roughness={1.6} />
        <ScrollProgress />
        <WeatherDoodle />
```

Add the import at the top of `app/page.tsx`, alongside the other component imports:

```tsx
import { SketchBorder } from "@/components/sketch/sketch-border";
```

Placing `SketchBorder` before `ScrollProgress`/`WeatherDoodle` in DOM order matters: within the same stacking context, positioned elements with `z-index: auto` paint in DOM order, so this keeps the border visually *under* the scroll-progress bar and the theme-toggle button wherever they overlap, without needing explicit `z-index`.

The card's own background (`var(--block-dark)`) is a hardcoded near-black in both themes, so the border color is hardcoded to a light cream (`#f2f0ea`, matching `--foreground` in dark mode) to stay visible — this one instance intentionally doesn't use a CSS variable, matching how `text-white` is already hardcoded elsewhere in this same card.

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npx eslint components/sketch/sketch-border.tsx app/page.tsx --quiet`
Expected: no errors.

- [ ] **Step 5: Visual verification**

Start the dev server (`npx next dev`, background), then via Playwright MCP:
- Navigate to the local URL, screenshot the intro card in light mode.
- Set `document.documentElement.dataset.theme = "dark"`, screenshot again.
- Confirm: a visibly hand-drawn (wobbly, not a perfect rectangle) border traces the card, the theme-toggle button and scroll-progress bar still render and are still clickable, no console errors.
- Click the theme-toggle button via Playwright to confirm `pointer-events: none` on the border doesn't block it.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json components/sketch/sketch-border.tsx app/page.tsx
git commit -m "Add hand-drawn SketchBorder component, apply to intro card"
```

---

## Task 2: `SketchDivider` component + section dividers

**Files:**
- Create: `components/sketch/sketch-divider.tsx`
- Modify: `app/page.tsx` (line numbers as of before this plan's edits: 34, 42 — Task 1 shifts them by the time this task runs; match by the code shown below instead of line numbers)
- Modify: `components/current-work.tsx:62`

**Interfaces:**
- Consumes: none beyond `roughjs` (already installed in Task 1).
- Produces: `SketchDivider({ color?: string, className?: string }): JSX.Element` — a full-width hand-drawn horizontal line, replacing a `border-t border-hairline` div edge.

- [ ] **Step 1: Create the `SketchDivider` component**

Create `components/sketch/sketch-divider.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

type SketchDividerProps = {
  color?: string;
  className?: string;
};

export function SketchDivider({ color = "var(--hairline)", className = "" }: SketchDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || width < 4) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const line = rc.line(0, 4, width, 4, { stroke: color, strokeWidth: 1.5, roughness: 2 });
    svg.appendChild(line);
  }, [width, color]);

  return (
    <div ref={containerRef} className={`h-2 w-full ${className}`}>
      <svg ref={svgRef} width={width || undefined} height="8" aria-hidden="true" />
    </div>
  );
}
```

Unlike `SketchBorder`, this one uses a normal-flow wrapper `<div>` (not `position: absolute`) since a divider takes up its own space in the layout rather than overlaying content.

- [ ] **Step 2: Replace the "Projects" heading divider in `app/page.tsx`**

Current (`app/page.tsx:34-38`):

```tsx
      <div className="mb-4 border-t border-hairline pt-8">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
          Projects
        </h2>
      </div>
```

Replace with:

```tsx
      <SketchDivider className="mt-8 mb-4" />
      <div className="mb-4">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
          Projects
        </h2>
      </div>
```

- [ ] **Step 3: Replace the EngineeringBlog/Events divider in `app/page.tsx`**

Current (`app/page.tsx:39-42`):

```tsx
      <div className="mt-12 border-t border-hairline pt-8">
        <EngineeringBlog />
        <EventsSection />
      </div>
```

Replace with:

```tsx
      <SketchDivider className="mt-12 mb-8" />
      <div>
        <EngineeringBlog />
        <EventsSection />
      </div>
```

- [ ] **Step 4: Add the import in `app/page.tsx`**

```tsx
import { SketchDivider } from "@/components/sketch/sketch-divider";
```

- [ ] **Step 5: Replace the top divider in `components/current-work.tsx`**

Current (`components/current-work.tsx:62`):

```tsx
    <div className="animate-fade-in-up mb-10 border-t border-hairline pt-8" style={{ animationDelay: "80ms" }}>
```

Replace with (splitting the divider out of the animated wrapper, since the wrapper no longer needs its own top border):

```tsx
    <>
      <SketchDivider className="mt-8 mb-8" />
      <div className="animate-fade-in-up mb-10" style={{ animationDelay: "80ms" }}>
```

This changes the function's return to a fragment — find the matching closing `</div>` at the end of the `CurrentWork` component's returned JSX and close the fragment after it: change the final `</div>\n  );` to `</div>\n    </>\n  );`.

Add the import at the top of `components/current-work.tsx`:

```tsx
import { SketchDivider } from "@/components/sketch/sketch-divider";
```

- [ ] **Step 6: Typecheck and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npx eslint components/sketch/sketch-divider.tsx app/page.tsx components/current-work.tsx --quiet`
Expected: no errors.

- [ ] **Step 7: Visual verification**

Via Playwright MCP, in both light and dark mode:
- Confirm the three replaced dividers now render as hand-drawn wavy lines instead of straight `border-hairline` lines.
- Confirm vertical spacing looks reasonable (not obviously broken/collapsed) around "Background", "Projects", and the blog/events section.
- No console errors.

- [ ] **Step 8: Commit**

```bash
git add components/sketch/sketch-divider.tsx app/page.tsx components/current-work.tsx
git commit -m "Add hand-drawn SketchDivider, replace section dividers"
```

---

## Task 3: `SketchBorder` around the FAQ section

**Files:**
- Modify: `components/faq-section.tsx`
- Modify: `app/page.tsx` (the `<FaqSection />` wrapper — line number as of before Task 1/2's edits is 47; Tasks 1-2 shift it, match by the code shown below instead of the line number)

**Interfaces:**
- Consumes: `SketchBorder` from Task 1 (`components/sketch/sketch-border.tsx`).

- [ ] **Step 1: Remove the divider wrapping `<FaqSection />` in `app/page.tsx`**

Current:

```tsx
      <div className="mt-2 border-t border-hairline pt-8">
        <FaqSection />
      </div>
```

Replace with:

```tsx
      <div className="mt-8">
        <FaqSection />
      </div>
```

The `SketchBorder` box added around the FAQ content itself (next step) now provides the visual separation this divider used to provide, so the border/padding is dropped here and only a top margin remains.

- [ ] **Step 2: Wrap the FAQ content in a `SketchBorder` box**

In `components/faq-section.tsx`, the current top-level return is:

```tsx
  return (
    <div className="animate-fade-in-up mb-10">
      <h2 className="mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
        Questions I get asked
      </h2>
      <p className="mb-4 text-[14px] text-subtle">
        Quick, honest answers for anyone reviewing my resume.
      </p>
      <div className="border-t border-hairline">
        {visible.map((item) => (
          <FaqRow key={item.question} item={item} />
        ))}
      </div>
```

Replace with:

```tsx
  return (
    <div className="animate-fade-in-up relative mb-10 rounded-xl px-5 py-5 sm:px-6">
      <SketchBorder color="var(--status-done)" strokeWidth={1.5} roughness={1.8} />
      <h2 className="mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
        Questions I get asked
      </h2>
      <p className="mb-4 text-[14px] text-subtle">
        Quick, honest answers for anyone reviewing my resume.
      </p>
      <div>
        {visible.map((item) => (
          <FaqRow key={item.question} item={item} />
        ))}
      </div>
```

The per-row `border-b border-hairline` inside `FaqRow` (the accordion question dividers) stays as plain CSS — converting every individual FAQ row's divider to a separate `roughjs`-drawn line would mean one `ResizeObserver` per row for a list that can grow, for very little visual payoff on a dense list. The box border alone is enough doodle presence here.

- [ ] **Step 3: Add the import in `components/faq-section.tsx`**

```tsx
import { SketchBorder } from "@/components/sketch/sketch-border";
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npx eslint components/faq-section.tsx app/page.tsx --quiet`
Expected: no errors.

- [ ] **Step 5: Visual verification**

Via Playwright MCP, in both light and dark mode:
- Confirm the FAQ section now renders inside a hand-drawn box (`var(--status-done)` plum stroke), sized correctly to its content.
- Expand/collapse a FAQ row (click) to confirm the accordion still works and the box doesn't visually break when content height changes (the `ResizeObserver` should redraw the border at the new height).
- No console errors.

- [ ] **Step 6: Commit**

```bash
git add components/faq-section.tsx app/page.tsx
git commit -m "Wrap FAQ section in a hand-drawn SketchBorder box"
```

---

## Task 4: Wobble tags/buttons/underline on project cards

**Files:**
- Modify: `app/globals.css`
- Modify: `components/project-row.tsx`

**Interfaces:**
- Produces (CSS classes, usable by any future component): `.sketch-tag`, `.sketch-tag:nth-child(even)`, `.sketch-btn`, `.sketch-underline`.

- [ ] **Step 1: Add wobble/underline CSS**

In `app/globals.css`, add near the end of the file (after the existing `.animate-marquee` rule):

```css
.sketch-underline {
  text-decoration: underline wavy;
  text-decoration-color: var(--status-done);
  text-underline-offset: 4px;
}

.sketch-tag {
  border-radius: 3px 9px 4px 8px;
  transform: rotate(-0.6deg);
}

.sketch-tag:nth-child(even) {
  border-radius: 8px 4px 9px 3px;
  transform: rotate(0.6deg);
}

.sketch-btn {
  border-radius: 3px 12px 4px 10px;
  transform: rotate(-1deg);
}
```

- [ ] **Step 2: Apply `.sketch-underline` to the project title**

In `components/project-row.tsx`, the title currently reads:

```tsx
          <div className="font-[family-name:var(--font-title)] text-[16px] font-semibold text-foreground transition-colors group-hover:text-white sm:text-[17px]">
            {app.name}
          </div>
```

Add `sketch-underline` to the className:

```tsx
          <div className="sketch-underline font-[family-name:var(--font-title)] text-[16px] font-semibold text-foreground transition-colors group-hover:text-white sm:text-[17px]">
            {app.name}
          </div>
```

- [ ] **Step 3: Apply `.sketch-tag` to the tag pills**

Current:

```tsx
      <div className="mt-2.5 flex flex-wrap gap-1.5 sm:ml-[30px]">
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-chip px-2 py-0.5 text-[11px] text-subtle transition-colors group-hover:bg-white/10 group-hover:text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>
```

Add `sketch-tag` to the tag's className (it composes with the existing classes — `sketch-tag`'s `border-radius`/`transform` override the plain `rounded-md`):

```tsx
      <div className="mt-2.5 flex flex-wrap gap-1.5 sm:ml-[30px]">
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="sketch-tag bg-chip px-2 py-0.5 text-[11px] text-subtle transition-colors group-hover:bg-white/10 group-hover:text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>
```

(`rounded-md` is dropped from this element since `.sketch-tag` now sets its own per-corner radius.)

- [ ] **Step 4: Apply `.sketch-btn` to the Live/GitHub button**

Current (the `demoPath || liveUrl` branch):

```tsx
          <Link
            href={app.demoPath ?? app.liveUrl!}
            target={app.liveUrl ? "_blank" : undefined}
            rel={app.liveUrl ? "noopener noreferrer" : undefined}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold text-white transition-[filter] hover:brightness-95"
            style={{ background: "var(--status-live)" }}
          >
```

Add `sketch-btn` and drop `rounded-full` (superseded by `.sketch-btn`'s own radius):

```tsx
          <Link
            href={app.demoPath ?? app.liveUrl!}
            target={app.liveUrl ? "_blank" : undefined}
            rel={app.liveUrl ? "noopener noreferrer" : undefined}
            onClick={(e) => e.stopPropagation()}
            className="sketch-btn inline-flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold text-white transition-[filter] hover:brightness-95"
            style={{ background: "var(--status-live)" }}
          >
```

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npx eslint app/globals.css components/project-row.tsx --quiet`
Expected: no errors (eslint won't lint the `.css` file itself — this is just confirming the TSX change is clean).

- [ ] **Step 6: Visual verification**

Via Playwright MCP, in both light and dark mode:
- Confirm project titles have a wavy underline in the plum/purple `--status-done` color.
- Confirm tag pills alternate slight rotation (odd tags tilt one way, even tags the other) with asymmetric rounded corners.
- Confirm the Live/GitHub button has the asymmetric rounded corners and slight rotation.
- Confirm hover states and the whole-card-click-to-navigate behavior still work (click a card body, confirm navigation; click the button, confirm it doesn't also trigger card navigation — this behavior predates this plan and must not regress).
- No console errors.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css components/project-row.tsx
git commit -m "Add wobble/underline doodle styling to project cards"
```

---

## Notes for whoever picks up Phase 2/3

This plan intentionally only covers Phase 1. Per the spec's rollout section, Phase 2 (3D hero scene) and Phase 3 (motion layer + ambient/scattered doodles) get their own plans, written after Phase 1 has shipped and been checked — partly so those plans can reference the real, current state of the styled components instead of guessing ahead.

`app/projects/[slug]/page.tsx` (the project detail page) was deliberately left out of this plan's scope — the spec's Phase 1 component list names `project-row.tsx`, the intro card, `faq-section.tsx`, and `current-work.tsx` only. Extending the same `.sketch-tag`/`.sketch-underline` treatment to the detail page is a reasonable small follow-up but isn't part of this plan.
