"use client";

import { useMemo, useState } from "react";
import { apps } from "@/lib/apps";
import { ProjectRow } from "@/components/project-row";
import { ProjectFilterBar } from "@/components/project-filter-bar";

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
      <ProjectFilterBar tags={tags} active={filter} onSelect={setFilter} />

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
