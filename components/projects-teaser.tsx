"use client";

import { useMemo, useState } from "react";
import { apps } from "@/lib/apps";
import { ProjectFilterBar } from "@/components/project-filter-bar";
import { ProjectRow } from "@/components/project-row";
import { SeeMoreLink } from "@/components/see-more-link";

const PREVIEW_COUNT = 3;

export function ProjectsTeaser() {
  const [filter, setFilter] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    apps.forEach((app) => app.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }, []);

  const filtered = filter ? apps.filter((app) => app.tags.includes(filter)) : apps;
  const preview = filtered.slice(0, PREVIEW_COUNT);

  return (
    <div>
      <ProjectFilterBar tags={tags} active={filter} onSelect={setFilter} />

      {preview.length === 0 ? (
        <p className="text-[14px] text-dim">No projects with this tag yet.</p>
      ) : (
        <div className="flex flex-col">
          {preview.map((app, index) => (
            <ProjectRow key={app.slug} app={app} index={index} />
          ))}
        </div>
      )}

      <SeeMoreLink href="/projects" label={`See all ${apps.length} projects`} />
    </div>
  );
}
