import { blogPosts } from "@/lib/blog";

export function EngineeringBlog() {
  return (
    <div className="mb-10">
      {blogPosts.length === 0 ? (
        <p className="text-[14px] text-dim">Nothing published yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col border-t border-hairline">
          {blogPosts.map((post) => (
            <a
              key={post.slug}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-1 border-b border-hairline py-5 transition-colors hover:text-accent"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="font-[family-name:var(--font-title)] text-[16px] font-semibold text-foreground group-hover:text-accent">
                  {post.title}
                </div>
                <div className="shrink-0 text-[13px] text-subtle">{post.date}</div>
              </div>
              <p className="max-w-[520px] text-[14px] leading-relaxed text-muted">{post.excerpt}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
