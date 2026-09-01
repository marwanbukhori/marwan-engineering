"use client";

import { useMemo, useState } from "react";
import { apps } from "@/lib/apps";
import { ProjectRow } from "@/components/project-row";

export function ProjectsList() {
  const [filter, setFilter] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    apps.forEach((app) => app.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, []);

  const filtered = filter ? apps.filter((app) => app.tags.includes(filter)) : apps;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`sketch-tag cursor-pointer border px-3 py-1 text-[13px] transition-colors ${
            filter === null
              ? "border-[var(--block-dark)] bg-[var(--block-dark)] text-white"
              : "border-hairline text-subtle hover:border-[var(--block-dark)] hover:text-foreground"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`sketch-tag cursor-pointer border px-3 py-1 text-[13px] transition-colors ${
              filter === tag
                ? "border-[var(--block-dark)] bg-[var(--block-dark)] text-white"
                : "border-hairline text-subtle hover:border-[var(--block-dark)] hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-[14px] text-dim">No projects with this tag yet.</p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((app, index) => (
            <ProjectRow key={app.slug} app={app} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
