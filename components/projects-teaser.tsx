"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, type AppEntry } from "@/lib/content-types";
import { ProjectFilterBar } from "@/components/project-filter-bar";
import { ProjectRow } from "@/components/project-row";
import { SeeMoreLink } from "@/components/see-more-link";

const PREVIEW_COUNT = 3;

export function ProjectsTeaser({ projects }: { projects: AppEntry[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  // Only offer categories that actually have projects in them.
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((app) => set.add(app.category));
    return CATEGORIES.filter((category) => set.has(category));
  }, [projects]);

  const filtered = filter ? projects.filter((app) => app.category === filter) : projects;
  const preview = filtered.slice(0, PREVIEW_COUNT);

  return (
    <div>
      <ProjectFilterBar categories={categories} active={filter} onSelect={setFilter} />

      {preview.length === 0 ? (
        <p className="text-[14px] text-dim">No projects in this category yet.</p>
      ) : (
        <div className="flex flex-col">
          {preview.map((app, index) => (
            <ProjectRow key={app.slug} app={app} index={index} />
          ))}
        </div>
      )}

      <SeeMoreLink href="/projects" label={`See all ${projects.length} projects`} />
    </div>
  );
}
