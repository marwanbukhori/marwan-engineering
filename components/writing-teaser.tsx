import { getNotes } from "@/lib/content";
import { NoteRow } from "@/components/note-row";
import { SeeMoreLink } from "@/components/see-more-link";

const PREVIEW_COUNT = 3;

export function WritingTeaser() {
  const notes = getNotes();
  const preview = notes.slice(0, PREVIEW_COUNT);

  return (
    <div className="mb-10">
      <h2 className="mb-2 font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
        Writing
      </h2>

      {preview.length === 0 ? (
        <p className="text-[14px] text-dim">Nothing published yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col border-t border-hairline">
          {preview.map((note) => (
            <NoteRow key={note.slug} note={note} />
          ))}
        </div>
      )}

      {/* Always linked: this teaser is the only route to /writing. */}
      <SeeMoreLink href="/writing" label={`See all ${notes.length} notes`} />
    </div>
  );
}
