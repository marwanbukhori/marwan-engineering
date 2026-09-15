import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";
import { type AppStatus } from "@/lib/content-types";
import { DetailProse } from "@/components/detail-prose";
import { GithubButton } from "@/components/github-button";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { tagColor } from "@/lib/tag-colors";

const STATUS_STYLE: Record<AppStatus, { bg: string; text: string }> = {
  live: { bg: "var(--status-live)", text: "#ffffff" },
  done: { bg: "var(--status-done)", text: "#ffffff" },
  "in progress": { bg: "var(--status-progress)", text: "var(--status-progress-text)" },
  planned: { bg: "var(--status-planned)", text: "#ffffff" },
  idea: { bg: "var(--status-idea)", text: "#ffffff" },
};

export function generateStaticParams() {
  return getProjects().map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getProject(slug);
  if (!app) return {};
  return {
    title: `${app.name}: Marwan Bukhori`,
    description: app.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getProject(slug);
  if (!app) notFound();

  const statusStyle = STATUS_STYLE[app.status];

  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16 lg:max-w-[860px]">
        <Link href="/" className="mb-8 block w-fit text-sm text-subtle hover:text-accent">
          ← Home
        </Link>

        <div className="mb-3 flex flex-wrap items-baseline gap-3">
          <h1 className="wood-box-title font-[family-name:var(--font-title)] text-[22px] font-semibold text-foreground sm:text-[26px]">
            {app.name}
          </h1>
          <span
            className="pixel-ui shrink-0 px-2 py-0.5 text-[11px] font-semibold tracking-[0.02em] uppercase"
            style={{ background: statusStyle.bg, color: statusStyle.text }}
          >
            {app.status}
          </span>
        </div>

        <p className="mb-8 max-w-[680px] text-[15px] leading-relaxed text-muted sm:text-[17px]">
          {app.description}
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="pixel-ui border bg-chip px-2.5 py-1 text-[13px] font-medium"
              style={{ borderColor: tagColor(tag), color: tagColor(tag) }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          {app.demoPath && (
            <Link
              href={app.demoPath}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold text-white transition-[filter] hover:brightness-95"
              style={{ background: "var(--status-live)" }}
            >
              <span className="status-dot-active h-1.5 w-1.5 rounded-full bg-[#ff3b30]" />
              Live
            </Link>
          )}
          {app.liveUrl && (
            <Link
              href={app.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold text-white transition-[filter] hover:brightness-95"
              style={{ background: "var(--status-live)" }}
            >
              <span className="status-dot-active h-1.5 w-1.5 rounded-full bg-[#ff3b30]" />
              Live demo
            </Link>
          )}
          {app.repoUrl && <GithubButton href={app.repoUrl} label="View source on GitHub" />}
          {!app.demoPath && !app.liveUrl && !app.repoUrl && (
            <span className="text-sm text-dim">Not live yet</span>
          )}
        </div>

        <div className="mb-8 border-t border-hairline pt-6">
          <h2 className="pixel-ui mb-2 text-[11px] font-medium tracking-[0.06em] text-accent uppercase">
            How it works
          </h2>
          <DetailProse
            detail={app.detail}
            className="max-w-[680px] gap-4 text-[13.5px] leading-relaxed text-muted sm:text-[15px]"
          />
        </div>

        {app.techStack && app.techStack.length > 0 && (
          <div className="mb-8 border-t border-hairline pt-6">
            <h2 className="pixel-ui mb-3 text-[11px] font-medium tracking-[0.06em] text-accent uppercase">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {app.techStack.map((tech) => (
                <span
                  key={tech}
                  className="pixel-ui border border-hairline px-2.5 py-1 text-[13px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {app.images && app.images.length > 0 && (
          <div className="mb-8 border-t border-hairline pt-6">
            <h2 className="pixel-ui mb-3 text-[11px] font-medium tracking-[0.06em] text-accent uppercase">
              Screenshots
            </h2>
            <ScreenshotGallery images={app.images} name={app.name} />
          </div>
        )}

        {app.videoUrl && (
          <div className="mb-8 border-t border-hairline pt-6">
            <h2 className="pixel-ui mb-3 text-[11px] font-medium tracking-[0.06em] text-accent uppercase">
              Demo
            </h2>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={app.videoUrl}
              controls
              playsInline
              className="w-full max-w-[680px] border border-hairline"
            />
          </div>
        )}
      </div>
    </main>
  );
}
