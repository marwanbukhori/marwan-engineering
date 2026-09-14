import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { AppEntry, AppStatus, TimelineItem } from "@/lib/content-types";

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
 * Normalizes a markdown body into paragraphs separated by "\n\n".
 *
 * Line breaks inside a paragraph become spaces, so prose can be hard-wrapped in
 * the editor without the wrapping showing up on the page.
 */
function unwrap(body: string): string {
  return body
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");
}

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}

function str(data: Frontmatter, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `missing required field "${key}" (expected text)`);
  }
  return value.trim();
}

function optionalStr(data: Frontmatter, key: string, file: string): string | undefined {
  const value = data[key];
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `field "${key}" is present but empty (remove the line, or give it a value)`);
  }
  return value.trim();
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
  const list = (value as string[]).map((item) => item.trim()).filter(Boolean);
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

    if (!STATUSES.includes(status as AppStatus)) {
      fail(file, `status "${status}" is not valid (use one of: ${STATUSES.join(", ")})`);
    }

    return {
      slug,
      name: str(data, "name", file),
      status: status as AppStatus,
      order: num(data, "order", file),
      description: str(data, "description", file),
      tags: strList(data, "tags", file, true),
      demoPath: optionalStr(data, "demoPath", file),
      liveUrl: optionalStr(data, "liveUrl", file),
      repoUrl: optionalStr(data, "repoUrl", file),
      videoUrl: optionalStr(data, "videoUrl", file),
      detail: body(content, file),
      techStack: strList(data, "techStack", file, false),
    } satisfies AppEntry;
  });

  return sort(projects).map((project) => ({
    ...project,
    techStack: project.techStack?.length ? project.techStack : undefined,
  }));
}

/** One project by slug, or undefined if there is no such file. */
export function getProject(slug: string): AppEntry | undefined {
  return getProjects().find((project) => project.slug === slug);
}

/** Every career entry, ordered by the `order` field, ascending (oldest first). */
export function getCareer(): TimelineItem[] {
  const roles = readCollection("career").map(({ slug, data, body: content }) => {
    const file = `content/career/${slug}.md`;

    return {
      slug,
      period: str(data, "period", file),
      company: str(data, "company", file),
      role: str(data, "role", file),
      order: num(data, "order", file),
      detail: body(content, file),
      logo: optionalStr(data, "logo", file),
    } satisfies TimelineItem;
  });

  return sort(roles);
}

/** Orders by the `order` field, falling back to slug so ties stay stable. */
function sort<T extends { order: number; slug: string }>(entries: T[]): T[] {
  return entries.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}
