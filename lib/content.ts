import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  CATEGORIES,
  type AppEntry,
  type AppStatus,
  type Category,
  type Certification,
  type TimelineEntry,
  type WritingNote,
} from "@/lib/content-types";

/**
 * Loads site content from the markdown files in /content.
 *
 * One file per entry, frontmatter for the short fields, markdown body for the
 * prose. See content/README.md for the editing guide.
 *
 * Nothing here is cached on purpose: the files are read on every render, so a
 * saved edit shows up on the next page refresh in `next dev` without a restart.
 * There are a handful of small files, and in production they are read once at
 * build time.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

const STATUSES: AppStatus[] = ["live", "done", "in progress", "planned", "idea"];

type Frontmatter = Record<string, unknown>;

/** Reads every .md file in a content folder as [slug, frontmatter, body]. */
function readCollection(folder: string): { slug: string; data: Frontmatter; body: string }[] {
  const dir = path.join(CONTENT_DIR, folder);

  if (!fs.existsSync(dir)) {
    throw new Error(`Content folder not found: content/${folder}`);
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") && !file.startsWith("README"))
    .map((file) => {
      const parsed = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        data: parsed.data as Frontmatter,
        body: unwrap(parsed.content),
      };
    });
}

/**
 * Normalizes a markdown body without flattening it.
 *
 * Blocks stay separated by a single blank line and line breaks inside a block are
 * preserved, because a "- " at the start of a line is what makes it a bullet.
 * Joining hard-wrapped lines back together is the block parser's job — see
 * `blocks()` in lib/content-types.ts.
 */
function unwrap(body: string): string {
  return body
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n{2,}/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n"),
    )
    .filter(Boolean)
    .join("\n\n");
}

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}

/**
 * YAML turns a bare `2026` into a number and a bare `2026-03-01` into a Date, so a
 * year written the obvious way would otherwise fail validation. Both are accepted
 * and rendered as text.
 */
function asText(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return undefined;
}

function str(data: Frontmatter, key: string, file: string): string {
  const value = asText(data[key]);
  if (value === undefined || value === "") {
    fail(file, `missing required field "${key}" (expected text)`);
  }
  return value;
}

function optionalStr(data: Frontmatter, key: string, file: string): string | undefined {
  const raw = data[key];
  if (raw === undefined || raw === null) return undefined;
  const value = asText(raw);
  if (value === undefined || value === "") {
    fail(file, `field "${key}" is present but empty (remove the line, or give it a value)`);
  }
  return value;
}

function num(data: Frontmatter, key: string, file: string): number {
  const value = data[key];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    fail(file, `missing required field "${key}" (expected a number, e.g. ${key}: 1)`);
  }
  return value;
}

function strList(data: Frontmatter, key: string, file: string, required: boolean): string[] {
  const value = data[key];
  if (value === undefined || value === null) {
    if (required) fail(file, `missing required field "${key}" (expected a list)`);
    return [];
  }
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    fail(file, `field "${key}" must be a list of text values`);
  }
  // Deduplicated: a repeated tag or image is a typo, and would collide as a React key.
  const list = [...new Set((value as string[]).map((item) => item.trim()).filter(Boolean))];
  if (required && list.length === 0) fail(file, `field "${key}" must have at least one entry`);
  return list;
}

function body(text: string, file: string): string {
  if (text === "") {
    fail(file, "the body is empty (write the detail prose below the --- frontmatter block)");
  }
  return text;
}

/** Every project, ordered by the `order` field, ascending. */
export function getProjects(): AppEntry[] {
  const projects = readCollection("projects").map(({ slug, data, body: content }) => {
    const file = `content/projects/${slug}.md`;
    const status = str(data, "status", file);
    const category = str(data, "category", file);

    if (!STATUSES.includes(status as AppStatus)) {
      fail(file, `status "${status}" is not valid (use one of: ${STATUSES.join(", ")})`);
    }

    if (!CATEGORIES.includes(category as Category)) {
      fail(file, `category "${category}" is not valid (use one of: ${CATEGORIES.join(", ")})`);
    }

    return {
      slug,
      name: str(data, "name", file),
      status: status as AppStatus,
      category: category as Category,
      order: num(data, "order", file),
      description: str(data, "description", file),
      tags: strList(data, "tags", file, true),
      demoPath: optionalStr(data, "demoPath", file),
      liveUrl: optionalStr(data, "liveUrl", file),
      repoUrl: optionalStr(data, "repoUrl", file),
      videoUrl: optionalStr(data, "videoUrl", file),
      images: strList(data, "images", file, false),
      detail: body(content, file),
      techStack: strList(data, "techStack", file, false),
    } satisfies AppEntry;
  });

  return sort(projects).map((project) => ({
    ...project,
    techStack: project.techStack?.length ? project.techStack : undefined,
    images: project.images?.length ? project.images : undefined,
  }));
}

/** One project by slug, or undefined if there is no such file. */
export function getProject(slug: string): AppEntry | undefined {
  return getProjects().find((project) => project.slug === slug);
}

/** Every career entry, ordered by the `order` field, ascending (newest first). */
export function getCareer(): TimelineEntry[] {
  const roles = readCollection("career").map(({ slug, data, body: content }) => {
    const file = `content/career/${slug}.md`;

    return {
      slug,
      period: str(data, "period", file),
      name: str(data, "company", file),
      role: str(data, "role", file),
      order: num(data, "order", file),
      detail: body(content, file),
      logo: optionalStr(data, "logo", file),
    } satisfies TimelineEntry;
  });

  return sort(roles);
}

/** Every education entry, ordered by the `order` field, ascending (newest first). */
export function getEducation(): TimelineEntry[] {
  const study = readCollection("education").map(({ slug, data, body: content }) => {
    const file = `content/education/${slug}.md`;

    return {
      slug,
      period: str(data, "period", file),
      name: str(data, "institution", file),
      role: str(data, "qualification", file),
      order: num(data, "order", file),
      detail: body(content, file),
      logo: optionalStr(data, "logo", file),
    } satisfies TimelineEntry;
  });

  return sort(study);
}

/** Every writing note, ordered by the `order` field, ascending. */
export function getNotes(): WritingNote[] {
  const notes = readCollection("writing").map(({ slug, data, body: content }) => {
    const file = `content/writing/${slug}.md`;
    const url = optionalStr(data, "url", file);

    // A note either lives on this site (and needs a body) or links out.
    if (!url && content === "") {
      fail(file, "needs either a body to publish, or a `url` to link out to");
    }

    return {
      slug,
      title: str(data, "title", file),
      date: str(data, "date", file),
      order: num(data, "order", file),
      excerpt: str(data, "excerpt", file),
      url,
      body: content,
    } satisfies WritingNote;
  });

  return sort(notes);
}

/** One note by slug, or undefined if there is no such file. */
export function getNote(slug: string): WritingNote | undefined {
  return getNotes().find((note) => note.slug === slug);
}

/** Every certification, ordered by the `order` field, ascending. */
export function getCertifications(): Certification[] {
  const certs = readCollection("certifications").map(({ slug, data }) => {
    const file = `content/certifications/${slug}.md`;

    return {
      slug,
      title: str(data, "title", file),
      issuer: str(data, "issuer", file),
      date: str(data, "date", file),
      order: num(data, "order", file),
      image: optionalStr(data, "image", file),
      url: optionalStr(data, "url", file),
    } satisfies Certification;
  });

  return sort(certs);
}

/** Orders by the `order` field, falling back to slug so ties stay stable. */
function sort<T extends { order: number; slug: string }>(entries: T[]): T[] {
  return entries.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}
