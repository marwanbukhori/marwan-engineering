import { getNotes } from "@/lib/content";
import { NoteRow } from "@/components/note-row";

export function EngineeringBlog() {
  const notes = getNotes();

  return (
    <div className="mb-10">
      {notes.length === 0 ? (
        <p className="text-[14px] text-dim">Nothing published yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col border-t border-hairline">
          {notes.map((note) => (
            <NoteRow key={note.slug} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
