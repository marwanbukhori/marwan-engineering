import Link from "next/link";
import type { MouseEvent } from "react";

/** The GitHub mark. Shared by the footer and the repo buttons so there is one copy of the path. */
export function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

/**
 * Black button linking to a repo. Bordered so it stays legible on the project cards,
 * which themselves go black on hover.
 */
export function GithubButton({
  href,
  label = "View on GitHub",
  onClick,
}: {
  href: string;
  label?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="pixel-ui inline-flex items-center gap-2 border border-hairline bg-[var(--block-dark)] px-4 py-1.5 text-[13px] font-semibold text-white transition-colors hover:border-accent hover:text-accent"
    >
      <GithubIcon size={15} />
      {label}
    </Link>
  );
}
