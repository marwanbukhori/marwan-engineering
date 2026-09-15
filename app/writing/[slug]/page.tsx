import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNote, getNotes } from "@/lib/content";
import { DetailProse } from "@/components/detail-prose";

export function generateStaticParams() {
  // Notes that link out have no page of their own.
  return getNotes()
    .filter((note) => !note.url)
    .map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: `${note.title}: Marwan Bukhori`,
    description: note.excerpt,
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note || note.url) notFound();

  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16 lg:max-w-[860px]">
        <Link href="/writing" className="mb-8 inline-block text-sm text-subtle hover:text-accent">
          ← Writing
        </Link>

        <h1 className="wood-box-title mb-2 inline-block font-[family-name:var(--font-title)] text-[22px] font-semibold text-foreground sm:text-[26px]">
          {note.title}
        </h1>

        <div className="mb-6 text-[13px] font-semibold" style={{ color: "var(--doodle-sun)" }}>
          {note.date}
        </div>

        <DetailProse
          detail={note.body}
          className="max-w-[680px] gap-4 text-[15px] leading-relaxed text-muted"
        />
      </div>
    </main>
  );
}
