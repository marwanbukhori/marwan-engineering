import { apps } from "@/lib/apps";
import { ProjectRow } from "@/components/project-row";
import { SeeMoreLink } from "@/components/see-more-link";

const PREVIEW_COUNT = 3;

export function ProjectsTeaser() {
  const preview = apps.slice(0, PREVIEW_COUNT);

  return (
    <div>
      <div className="flex flex-col">
        {preview.map((app, index) => (
          <ProjectRow key={app.slug} app={app} index={index} />
        ))}
      </div>
      {apps.length > PREVIEW_COUNT && (
        <SeeMoreLink href="/projects" label={`See all ${apps.length} projects`} />
      )}
    </div>
  );
}
