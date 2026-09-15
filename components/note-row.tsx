import Link from "next/link";
import type { WritingNote } from "@/lib/content-types";

/**
 * One row in the writing list: title, date, excerpt. Links to the note's page, or
 * straight out when the entry has a url. Shared by /writing and the home teaser so
 * both stay identical.
 */
export function NoteRow({ note }: { note: WritingNote }) {
  const className =
    "group flex flex-col gap-1 border-b border-hairline py-5 transition-colors hover:text-accent";

  const inner = (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="font-[family-name:var(--font-title)] text-[16px] font-semibold text-foreground group-hover:text-accent">
          {note.title}
        </div>
        <div className="shrink-0 text-[13px] font-semibold" style={{ color: "var(--doodle-sun)" }}>
          {note.date}
        </div>
      </div>
      <p className="max-w-[640px] text-[14px] leading-relaxed text-muted">{note.excerpt}</p>
    </>
  );

  return note.url ? (
    <a href={note.url} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={`/writing/${note.slug}`} className={className}>
      {inner}
    </Link>
  );
}
