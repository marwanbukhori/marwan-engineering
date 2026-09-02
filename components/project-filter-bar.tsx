"use client";

export function ProjectFilterBar({
  tags,
  active,
  onSelect,
}: {
  tags: string[];
  active: string | null;
  onSelect: (tag: string | null) => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`cursor-pointer border px-3 py-1 text-[13px] transition-colors ${
          active === null
            ? "border-[var(--block-dark)] bg-[var(--block-dark)] text-white"
            : "border-hairline text-subtle hover:border-[var(--block-dark)] hover:text-foreground"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`cursor-pointer border px-3 py-1 text-[13px] transition-colors ${
            active === tag
              ? "border-[var(--block-dark)] bg-[var(--block-dark)] text-white"
              : "border-hairline text-subtle hover:border-[var(--block-dark)] hover:text-foreground"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
