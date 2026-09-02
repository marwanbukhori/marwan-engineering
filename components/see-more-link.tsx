import Link from "next/link";

export function SeeMoreLink({ href, label = "See more" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
    >
      {label}
      <span aria-hidden>→</span>
    </Link>
  );
}
