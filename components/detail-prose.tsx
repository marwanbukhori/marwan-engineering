import { blocks, type ContentBlock } from "@/lib/content-types";
import { InlineText } from "@/components/inline-text";

/** Section heading inside a body. Extra space above separates it from the prose before it. */
function Heading({ level, text }: { level: 2 | 3; text: string }) {
  const className = `mt-4 font-[family-name:var(--font-title)] font-semibold text-foreground first:mt-0 ${
    level === 2 ? "text-[17px]" : "text-[15px]"
  }`;

  return level === 2 ? <h2 className={className}>{text}</h2> : <h3 className={className}>{text}</h3>;
}

/** Renders already-parsed blocks: paragraphs as <p>, bullet blocks as <ul>. */
export function BlockList({ items, className = "" }: { items: ContentBlock[]; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((block, i) =>
        block.type === "heading" ? (
          <Heading key={i} level={block.level} text={block.text} />
        ) : block.type === "list" ? (
          <ul key={i} className="flex list-disc flex-col gap-1.5 pl-[1.1em] marker:text-dim">
            {block.items.map((item, n) => (
              <li key={n}>
                <InlineText text={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>
            <InlineText text={block.text} />
          </p>
        ),
      )}
    </div>
  );
}

/**
 * Renders a content body: paragraphs as <p>, "- " lines as a bullet list.
 * Used by the project pages so markdown written in content/ looks the same
 * wherever it appears.
 */
export function DetailProse({ detail, className = "" }: { detail: string; className?: string }) {
  return <BlockList items={blocks(detail)} className={className} />;
}
