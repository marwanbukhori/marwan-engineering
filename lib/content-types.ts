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

/**
 * The project filter bar is built from these, so the list stays short however many
 * projects there are. Adding a category here is all it takes to offer a new filter.
 */
export const CATEGORIES = ["AI", "Backend & Infra", "Frontend", "Tools"] as const;

export type Category = (typeof CATEGORIES)[number];

export type AppEntry = {
  /** Comes from the markdown filename, e.g. content/projects/chefbot.md -> "chefbot". */
  slug: string;
  name: string;
  status: AppStatus;
  /** Which filter button this project sits under. */
  category: Category;
  /** Sort position on the projects page, ascending. Number in tens to leave gaps. */
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
  /** Screenshots under /public, shown on the project page. */
  images?: string[];
  /** The markdown body of the file. Paragraphs are separated by "\n\n". */
  detail: string;
  /** Real technologies used, shown only on the project detail page (not used for filtering). */
  techStack?: string[];
};

/**
 * One row in a timeline. Career and education keep their own field names in their
 * markdown (company/role, institution/qualification); each loader maps them onto
 * these two so a single component renders both.
 */
export type TimelineEntry = {
  /** Comes from the markdown filename, e.g. content/career/silentmode.md -> "silentmode". */
  slug: string;
  period: string;
  /** Company or institution. */
  name: string;
  /** Job title or qualification. */
  role: string;
  /** Sort position in the timeline, ascending (newest first). */
  order: number;
  /** The markdown body of the file. */
  detail: string;
  /** Optional logo in /public, e.g. "/logos/verus-virtus.png". */
  logo?: string;
};

export type WritingNote = {
  /** Comes from the markdown filename, e.g. content/writing/foo.md -> "foo". */
  slug: string;
  title: string;
  /** Free text, e.g. "Sep 2026". */
  date: string;
  /** Sort position, ascending. Newest note first. */
  order: number;
  /** One or two sentences, shown in the list and the home teaser. */
  excerpt: string;
  /** If set, the entry links out here instead of to a page on this site. */
  url?: string;
  /** The note itself. Empty when the entry only links out. */
  body: string;
};

export type Certification = {
  /** Comes from the markdown filename, e.g. content/certifications/aws-saa.md -> "aws-saa". */
  slug: string;
  title: string;
  issuer: string;
  /** Free text, e.g. "2025" or "Mar 2025". */
  date: string;
  /** Sort position, ascending. */
  order: number;
  /** Optional badge image under public/, e.g. "/certifications/aws-saa.png". */
  image?: string;
  /** Optional link to the credential. */
  url?: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level: 2 | 3 }
  | { type: "list"; items: string[] };

const BULLET = /^[-*]\s+/;
const HEADING = /^(#{2,3})\s+(.+)$/;

/**
 * Splits a detail body into renderable blocks.
 *
 * Blocks are separated by a blank line. A line starting with "## " (or "### ")
 * is a heading. A block whose first line starts with "- " (or "* ") becomes a
 * bullet list, and every following line starting the same way is another item;
 * any other line continues the item above it. Anything else is a paragraph.
 * Either way, hard-wrapped lines are joined back with spaces, so prose can be
 * wrapped freely in the editor.
 */
export function blocks(detail: string): ContentBlock[] {
  return detail
    .split("\n\n")
    .filter(Boolean)
    .map((block) => {
      const lines = block.split("\n");

      const heading = HEADING.exec(lines[0]);
      if (heading) {
        return {
          type: "heading",
          level: heading[1].length === 2 ? 2 : 3,
          text: [heading[2], ...lines.slice(1)].join(" ").trim(),
        } satisfies ContentBlock;
      }

      if (!BULLET.test(lines[0])) {
        return { type: "paragraph", text: lines.join(" ").trim() } satisfies ContentBlock;
      }

      const items: string[] = [];
      for (const line of lines) {
        if (BULLET.test(line)) items.push(line.replace(BULLET, "").trim());
        else if (items.length > 0) items[items.length - 1] += ` ${line.trim()}`;
      }

      return { type: "list", items: items.filter(Boolean) } satisfies ContentBlock;
    });
}
