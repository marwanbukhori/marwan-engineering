"use client";

import { tagColor } from "@/lib/tag-colors";

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
        className={`cursor-pointer border px-3 py-1 text-[13px] font-medium transition-colors ${
          active === null
            ? "border-[var(--block-dark)] bg-[var(--block-dark)] text-white"
            : "border-hairline text-subtle hover:border-[var(--block-dark)] hover:text-foreground"
        }`}
      >
        All
      </button>
      {tags.map((tag) => {
        const color = tagColor(tag);
        const isActive = active === tag;
        return (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className="cursor-pointer border px-3 py-1 text-[13px] font-medium transition-colors"
            style={
              isActive
                ? { borderColor: color, background: color, color: "#ffffff" }
                : { borderColor: color, color }
            }
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
