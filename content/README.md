# Editing site content

Projects and career history live here as markdown files, one file per entry. You
edit these; you don't need to touch any code.

```
content/
  projects/         one file per project      -> /projects and the home page
  career/           one file per job          -> the timeline on /about and the home page
  certifications/   one file per credential   -> /certifications and the home page
  writing/          one file per note         -> /writing and the home page
  education/        one file per qualification -> the Education timeline
```

Each file has two parts: a **frontmatter** block between `---` lines for the short
fields, and a **body** below it for the prose.

To preview changes, run `npm run dev` and refresh the page — content is re-read from
disk on every refresh, so there's no need to restart the server. To publish, commit
and push.

---

## Add a project

Create `content/projects/<slug>.md`. **The filename becomes the URL**, so
`rembayung-queue.md` is served at `/projects/rembayung-queue`. Use lowercase words
separated by hyphens.

```markdown
---
name: Rembayung Booking Queue
status: live
category: Backend & Infra
order: 10
description: >-
  A restaurant booking system built to survive its own busiest second: it meters
  the crowd before the database sees it.
tags:
  - Distributed systems
  - Kubernetes
liveUrl: https://console.example.com
repoUrl: https://github.com/marwanbukhori/rembayung-queue
techStack:
  - Java 25
  - Spring Boot 4.1
---

The first paragraph of the detail prose, shown on the project page under
"How it works".

A blank line starts a new paragraph. Quotes, apostrophes and commas all work
normally down here — nothing needs escaping.
```

### Project fields

| Field | Required | What it is |
|---|---|---|
| `name` | yes | Display title. |
| `status` | yes | One of `live`, `done`, `in progress`, `planned`, `idea`. Controls the colored badge. |
| `category` | yes | One of `AI`, `Backend & Infra`, `Frontend`, `Tools`. This is what the filter buttons are — see [Categories and tags](#categories-and-tags). |
| `order` | yes | Position in the list, lowest first. See [Ordering](#ordering). |
| `description` | yes | One or two sentences, shown on the cards in the list. |
| `tags` | yes | At least one. Drives the filter bar — see [Tags](#tags). |
| `techStack` | no | Real technologies used. Shown only on the project page, not used for filtering. |
| `repoUrl` | no | Link to the source repo. |
| `liveUrl` | no | Link to a live, externally-hosted deployment. |
| `demoPath` | no | Path to an in-site demo page, e.g. `/demos/resume-chat`. |
| `videoUrl` | no | A demo video under `public/`, e.g. `/videos/chef-bot-demo.mp4`. |
| `images` | no | Screenshots under `public/`, shown as a grid on the project page. |
| body | yes | The detail prose, written with `## ` headings. See [Writing a project body](#writing-a-project-body). |

Leave optional fields out entirely rather than setting them empty — an empty value
is treated as a mistake and will stop the build.

### Writing a project body

The body is free-form, so give it sections with `## ` headings rather than one long
blob. `content/projects/rembayung-queue.md` is the worked example:

```markdown
## The problem
What was broken, and why it mattered.

## How it works
The mechanism. The part an engineer reading this actually wants.

## What the numbers say
Measurements, if you have them.

## What surprised me
What you got wrong and what you learned.
```

Nothing enforces these names — use whatever fits the project. A short project can
stay a single paragraph with no headings at all.

### Screenshots

Drop the files in `public/` and list them:

```yaml
images:
  - /projects/rembayung-console.png
  - /projects/rembayung-load.png
```

They render as a framed two-column grid above the demo video. Leave the field out and
no Screenshots section appears.

## Add a job

Create `content/career/<slug>.md`. The filename is just an identifier here; it
doesn't appear in any URL.

```markdown
---
company: Verus Virtus
role: Software Engineer
period: 2026 – present
order: 1
---

Building Nexus, an AI platform that turns natural language into audited network
commands.
```

### Career fields

| Field | Required | What it is |
|---|---|---|
| `company` | yes | Company name. Shown in the accent color after the job title, and its first letter becomes the small square marker. |
| `role` | yes | Job title **only**, e.g. `Software Engineer (Full-Stack)`. The company is appended automatically and rendered in the accent color, so don't repeat it here. |
| `period` | yes | Free text, e.g. `2024 – 2026` or `2026 (short contract)`. |
| `order` | yes | Position in the timeline, **newest role first**. `order: 1` is your current job and gets the green dot. |
| `logo` | no | A company logo under `public/logos/`, e.g. `/logos/verus-virtus.png`. Replaces the letter square. See [Company logos](#company-logos). |
| body | yes | What you did. Prose or bullets — see [Paragraphs and bullet points](#paragraphs-and-bullet-points). |

## Add a qualification

Create `content/education/<slug>.md`. It works exactly like a career entry, with two
differently-named fields, and appears under the Education timeline on the home page
and `/about`.

```markdown
---
institution: Universiti Kebangsaan Malaysia (UKM)
qualification: Bachelor of Software Engineering
period: Sep 2019 – Nov 2023
order: 1
---

- What you studied, or what you did there.
- Bullets collapse behind "See more" exactly as career entries do.
```

| Field | Required | What it is |
|---|---|---|
| `institution` | yes | School or university. Its first letter becomes the square marker unless you give a `logo`. |
| `qualification` | yes | The degree or certificate, shown in the accent color. |
| `period` | yes | Free text, e.g. `Sep 2019 – Nov 2023`. |
| `order` | yes | Position, newest first, same as career. |
| `logo` | no | An institution logo under `public/logos/`. |
| body | yes | What you did. Prose or bullets. |

Delete every file in the folder and the Education section disappears entirely.

## Add a certification

Create `content/certifications/<slug>.md`. There is no body — certifications are
just the frontmatter.

```markdown
---
title: AWS Certified Solutions Architect – Associate
issuer: Amazon Web Services
date: Mar 2025
order: 1
image: /certifications/aws-saa.png
url: https://www.credly.com/badges/...
---
```

| Field | Required | What it is |
|---|---|---|
| `title` | yes | The credential's name. |
| `issuer` | yes | Who issued it. |
| `date` | yes | Free text, e.g. `2025` or `Mar 2025`. |
| `order` | yes | Position in the grid, lowest first. |
| `image` | no | Badge image under `public/certifications/`. Without one the card shows the issuer name in a framed box instead, so a credential with no badge still looks deliberate. |
| `url` | no | Link to the credential. Makes the whole card clickable. |

The newest certification with `order: 1` is the one quoted in the home page teaser.
With no files in the folder, both surfaces say "No certifications yet".

## Add a writing note

Create `content/writing/<slug>.md`. The filename becomes the URL, so
`my-note.md` is published at `/writing/my-note`.

```markdown
---
title: Moving my portfolio content out of TypeScript
date: Sep 2026
order: 1
excerpt: >-
  One or two sentences, shown in the list and on the home page.
---

The note itself. Blank lines separate paragraphs, and "- " lines make bullets,
exactly as everywhere else in content/.
```

| Field | Required | What it is |
|---|---|---|
| `title` | yes | The note's title. |
| `date` | yes | Free text, e.g. `Sep 2026`. |
| `order` | yes | Position in the list, lowest first — newest note as `order: 1`. |
| `excerpt` | yes | The one-line summary in the list and teaser. |
| `url` | no | Link out instead of publishing here — see below. |
| body | yes* | The note. Not needed if `url` is set. |

**Linking out instead.** If a piece is published elsewhere (dev.to, Medium), add a
`url` and leave the body empty; the entry then links straight there and gets no page
on this site. With no `url`, the note is published at `/writing/<slug>` and needs a
body. Getting neither stops the build with a message saying so.

**Inline formatting** works inside any paragraph or bullet — see
[Links and emphasis](#links-and-emphasis).

## Paragraphs and bullet points

The body below the frontmatter takes both, in any mix. A blank line separates one
block from the next.

```markdown
A normal paragraph. You can hard-wrap it across as many lines as you
like — the line breaks are joined back into a single paragraph.

- Design and build the marketing site
- Set up the internal accounting system on BigCapital
- Lead the Nexus AI network configurator: features, QA, deploys

A closing paragraph, if you want one.
```

For a longer piece, start a line with `## ` to make a section heading — it renders in
the title font with space above it, which is what separates one section from the next:

```markdown
## Internship (Terato Tech) : Sep 2022 - Jan 2023

The paragraph that belongs under that heading.
```

Use `### ` for a smaller sub-heading. The blank line after the heading matters, same
as with lists.

On the career timeline only the **first** bullet is shown, with the rest behind a
"See more" toggle — so lead with the line you most want a recruiter to read. Project
pages show the whole body.

Start a line with `-` (or `*`) and a space and it becomes a bullet. The blank line
before the list is what matters — without it the bullets are read as part of the
paragraph above and run together on one line.

A long bullet can wrap too; an indented or plain continuation line joins the bullet
above it rather than starting a new one.

## Links and emphasis

Inside any paragraph or bullet, in any content file:

```markdown
A bare URL like https://github.com/marwanbukhori is linked automatically.
[Give it your own words](https://github.com/marwanbukhori) when the URL is ugly.
Link to a page on this site with [the projects page](/projects).

**Bold**, *italic* (or _italic_), and `inline code`.
```

Links open in a new tab, except site-relative ones starting with `/`. Only `http`,
`https`, `mailto` and `/` links are turned into links; anything else is left as plain
text on purpose.

A bare URL stops at a bracket or space, so `(read more: https://example.com/x)` keeps
its closing paren as text rather than swallowing it into the link.

## Ordering

`order` sorts the list ascending — `1` appears first. The numbers only have to be in
the right sequence relative to each other; gaps are fine.

Number projects in tens — 10, 20, 30 — so a new one can slot in at 25 without
renumbering anything else. If two entries share a number they fall back to
alphabetical order, so it won't break, it just won't be the order you wanted.

Career entries work the same way: `order: 1` sits at the top and is rendered as the
current role, with the green pulsing dot. When you start a new job, give it `order: 1`
and push the others down by one.

## Categories and tags

These do different jobs and it is worth keeping them straight.

**`category` is the filter.** One per project, from a fixed list: `AI`,
`Backend & Infra`, `Frontend`, `Tools`. The filter bar is built from the categories that
actually have projects, so it stays four buttons whether you have five projects or
fifty. An unrecognised category stops the build. To add a new one, add it to
`CATEGORIES` in `lib/content-types.ts` and give it a color in `lib/tag-colors.ts`.

**Tags describe.** They show on cards and project pages and are not filterable, so
you can be as specific as you like — `Embeddings`, `Load testing`, `Multimodal` —
without growing the filter bar. That freedom is the whole point of splitting them.

### Tag colors

Reusing an existing tag is still better than inventing a near-duplicate, so the cards
stay readable.

Current tags: `RAG`, `LangGraph`, `MCP`, `Embeddings`, `Agents`, `Tool use`,
`Multimodal`, `Distributed systems`, `Kubernetes`, `Load testing`.

A brand new tag works immediately but renders grey. To give it a color, add a line
to `lib/tag-colors.ts`:

```ts
"Load testing": "#a9744f",
```

Wrap the tag name in quotes there if it contains a space.

## Company logos

By default each timeline entry shows a small square with the first letter of the
company. Give it a real logo instead:

1. Drop the image in `public/logos/`, e.g. `public/logos/verus-virtus.png`.
2. Add a `logo` line to that company's file:

   ```yaml
   logo: /logos/verus-virtus.png
   ```

The path starts with `/logos/`, not `public/logos/`. Leave the line out entirely and
the letter square comes back, so you can do them one at a time.

The mark renders at 20×20 CSS pixels. A square, transparent PNG or an SVG works best;
a wide wordmark will shrink until it's unreadable, so crop to the symbol. The image is
scaled with `object-contain`, so nothing gets squashed.

## Images and video

Files go in `public/`, and you reference them with a leading slash and no `public`:
a file at `public/videos/demo.mp4` is written as `/videos/demo.mp4`.

## When you get it wrong

The site refuses to build rather than quietly rendering a blank card, and the error
names the file and the field:

```
content/projects/rembayung-queue.md: missing required field "status" (expected text)
content/projects/rembayung-queue.md: status "shipped" is not valid (use one of: live, done, in progress, planned, idea)
```

Two frontmatter gotchas worth knowing, both from YAML:

- **A colon inside an unquoted value breaks parsing.** `description: A system: rebuilt`
  fails. This is why the long fields use the `>-` block style, where anything goes:

  ```yaml
  description: >-
    A system: rebuilt, with quotes "like this" and colons, all fine.
  ```

  Indent every line of the block by two spaces. Line breaks inside it become spaces,
  so you can wrap however you like.

- **The `---` lines matter.** Frontmatter must open on the very first line of the
  file and close before the body.

## Where this is wired up

`lib/content.ts` reads these folders and validates them. `lib/content-types.ts`
holds the field definitions. Nothing else reads content directly — the pages get it
from those two files.
