# Editing site content

Projects and career history live here as markdown files, one file per entry. You
edit these; you don't need to touch any code.

```
content/
  projects/         one file per project  -> /projects and the home page
  career/           one file per job      -> the timeline on /about and the home page
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
order: 1
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
| `order` | yes | Position in the list, lowest first. See [Ordering](#ordering). |
| `description` | yes | One or two sentences, shown on the cards in the list. |
| `tags` | yes | At least one. Drives the filter bar — see [Tags](#tags). |
| `techStack` | no | Real technologies used. Shown only on the project page, not used for filtering. |
| `repoUrl` | no | Link to the source repo. |
| `liveUrl` | no | Link to a live, externally-hosted deployment. |
| `demoPath` | no | Path to an in-site demo page, e.g. `/demos/resume-chat`. |
| `videoUrl` | no | A demo video under `public/`, e.g. `/videos/chef-bot-demo.mp4`. |
| body | yes | The detail prose. One `<p>` per paragraph. |

Leave optional fields out entirely rather than setting them empty — an empty value
is treated as a mistake and will stop the build.

## Add a job

Create `content/career/<slug>.md`. The filename is just an identifier here; it
doesn't appear in any URL.

```markdown
---
company: Verus Virtus
role: Software Engineer, Verus Virtus
period: 2026 – present
order: 5
---

Building Nexus, an AI platform that turns natural language into audited network
commands.
```

### Career fields

| Field | Required | What it is |
|---|---|---|
| `company` | yes | Company name. Its first letter becomes the small square marker. |
| `role` | yes | Job title as displayed. The existing entries repeat the company here. |
| `period` | yes | Free text, e.g. `2024 – 2026` or `2026 (short contract)`. |
| `order` | yes | Position in the timeline, **oldest role first**. The highest `order` gets the green "current" dot. |
| `logo` | no | A logo image under `public/`, e.g. `/logos/verus-virtus.png`. |
| body | yes | One or two sentences about the work. |

## Ordering

`order` sorts the list ascending — `1` appears first. The numbers only have to be in
the right sequence relative to each other; gaps are fine.

To put a new project at the top, give it `order: 1` and bump the others down by one.
If two entries share a number they fall back to alphabetical order, so it won't
break, it just won't be the order you wanted.

For career entries, order runs **oldest to newest**. The last entry in that order is
rendered as the current role, with the green pulsing dot.

## Tags

Tags are shared across projects and drive the filter buttons on the home page and
`/projects`. Reusing an existing tag is better than inventing a near-duplicate —
`Agents` and `AI agents` would show up as two separate filters.

Current tags: `RAG`, `LangGraph`, `MCP`, `Embeddings`, `Agents`, `Tool use`,
`Multimodal`, `Distributed systems`, `Kubernetes`, `Load testing`.

A brand new tag works immediately but renders grey. To give it a color, add a line
to `lib/tag-colors.ts`:

```ts
"Load testing": "#a9744f",
```

Wrap the tag name in quotes there if it contains a space.

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
