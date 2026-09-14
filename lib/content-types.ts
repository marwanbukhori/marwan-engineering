/**
 * Shared content types.
 *
 * This file is deliberately free of any Node or filesystem code so that
 * Client Components ("use client") can import these types. Types are erased at
 * compile time, so importing from here costs nothing in the browser bundle.
 *
 * The actual loading lives in lib/content.ts, which is server-only.
 */

export type AppStatus = "live" | "done" | "in progress" | "planned" | "idea";

export type AppEntry = {
  /** Comes from the markdown filename, e.g. content/projects/chefbot.md -> "chefbot". */
  slug: string;
  name: string;
  status: AppStatus;
  /** Sort position on the projects page, ascending. */
  order: number;
  description: string;
  tags: string[];
  /** If set, this app has a real in-hub demo page at this path. */
  demoPath?: string;
  /** If set, links out to a live, externally-hosted deployment. */
  liveUrl?: string;
  /** If set, links out to the project's source repo. */
  repoUrl?: string;
  /** If set, a self-hosted demo video (path under /public) shown on the project page. */
  videoUrl?: string;
  /** The markdown body of the file. Paragraphs are separated by "\n\n". */
  detail: string;
  /** Real technologies used, shown only on the project detail page (not used for filtering). */
  techStack?: string[];
};

export type TimelineItem = {
  /** Comes from the markdown filename, e.g. content/career/silentmode.md -> "silentmode". */
  slug: string;
  period: string;
  company: string;
  role: string;
  /** Sort position in the timeline, ascending (oldest role first). */
  order: number;
  /** The markdown body of the file. */
  detail: string;
  /** Optional path to a real, provided company logo in /public, e.g. "/logos/verus-virtus.png". */
  logo?: string;
};

/** Splits a detail body into paragraphs for rendering one <p> per paragraph. */
export function paragraphs(detail: string): string[] {
  return detail.split("\n\n").filter(Boolean);
}
