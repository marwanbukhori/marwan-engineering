import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Inline markdown inside a paragraph or bullet:
 *
 *   [label](https://example.com)   link with its own text
 *   https://example.com            bare URL, linked as-is
 *   **bold**  *italic*  _italic_   emphasis
 *   `code`                         inline code
 *
 * Deliberately small: block structure is handled by blocks() in lib/content-types.
 */
const INLINE =
  /(\[[^\]\n]+\]\([^\s)]+\))|(\*\*[^*\n]+\*\*)|(\*[^*\n]+\*)|(_[^_\n]+_)|(`[^`\n]+`)|(https?:\/\/[^\s<>()[\]]+)/g;

/** Only linkable schemes; anything else (javascript:, data:) is rendered as plain text. */
function safeHref(href: string): string | undefined {
  if (href.startsWith("/") || href.startsWith("#")) return href;
  if (/^https?:\/\//i.test(href) || /^mailto:/i.test(href)) return href;
  return undefined;
}

function Anchor({ href, children }: { href: string; children: ReactNode }) {
  const className = "text-accent underline underline-offset-2 hover:text-accent-hover";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

export function InlineText({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(INLINE)) {
    const token = match[0];
    const at = match.index ?? 0;

    if (at > last) nodes.push(text.slice(last, at));
    last = at + token.length;

    const link = /^\[([^\]]+)\]\(([^\s)]+)\)$/.exec(token);
    if (link) {
      const href = safeHref(link[2]);
      nodes.push(href ? <Anchor key={key++} href={href}>{link[1]}</Anchor> : token);
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key++} className="font-semibold text-foreground">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") || token.startsWith("_")) {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key++} className="bg-chip px-1 py-0.5 text-[0.92em] text-foreground">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const href = safeHref(token);
      nodes.push(href ? <Anchor key={key++} href={href}>{token}</Anchor> : token);
    }
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
