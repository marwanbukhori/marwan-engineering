import { blogPosts } from "@/lib/blog";
import { SeeMoreLink } from "@/components/see-more-link";

export function WritingTeaser() {
  return (
    <div className="mb-10">
      <h2 className="mb-2 font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
        Writing
      </h2>
      {blogPosts.length === 0 ? (
        <p className="text-[14px] text-dim">Nothing published yet. Check back soon.</p>
      ) : (
        <div className="text-[14px] leading-relaxed text-muted">
          <span className="font-semibold text-foreground">{blogPosts[0].title}</span> — {blogPosts[0].excerpt}
        </div>
      )}
      <SeeMoreLink href="/writing" />
    </div>
  );
}
