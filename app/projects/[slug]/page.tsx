import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apps, getApp, type AppStatus } from "@/lib/apps";

const STATUS_STYLE: Record<AppStatus, { bg: string; text: string }> = {
  live: { bg: "var(--status-live)", text: "#ffffff" },
  "in progress": { bg: "var(--status-progress)", text: "var(--status-progress-text)" },
  planned: { bg: "var(--status-planned)", text: "#ffffff" },
  idea: { bg: "var(--status-idea)", text: "#ffffff" },
};

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  return {
    title: `${app.name}: Marwan Bukhori`,
    description: app.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const statusStyle = STATUS_STYLE[app.status];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/" className="mb-8 inline-block text-sm text-subtle hover:text-accent">
          ← Home
        </Link>

        <div className="mb-3 flex flex-wrap items-baseline gap-3">
          <h1 className="font-[family-name:var(--font-title)] text-[22px] font-semibold text-foreground sm:text-[26px]">
            {app.name}
          </h1>
          <span
            className="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-[0.02em] uppercase"
            style={{ background: statusStyle.bg, color: statusStyle.text }}
          >
            {app.status}
          </span>
        </div>

        <p className="mb-8 max-w-[540px] text-[17px] leading-relaxed text-muted">
          {app.description}
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {app.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-chip px-2.5 py-1 text-[13px] text-subtle">
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t border-hairline pt-6">
          <h2 className="mb-2 text-[11px] font-medium tracking-[0.06em] text-subtle uppercase">
            How it works
          </h2>
          <p className="max-w-[540px] text-[15px] leading-relaxed text-muted">{app.detail}</p>
        </div>

        {app.videoUrl && (
          <div className="mb-8 border-t border-hairline pt-6">
            <h2 className="mb-3 text-[11px] font-medium tracking-[0.06em] text-subtle uppercase">
              Demo
            </h2>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={app.videoUrl}
              controls
              playsInline
              className="w-full max-w-[560px] rounded-lg border border-hairline"
            />
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-hairline pt-6">
          {app.demoPath && (
            <Link
              href={app.demoPath}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold text-white transition-[filter] hover:brightness-95"
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
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold text-white transition-[filter] hover:brightness-95"
              style={{ background: "var(--status-live)" }}
            >
              <span className="status-dot-active h-1.5 w-1.5 rounded-full bg-[#ff3b30]" />
              Live demo
            </Link>
          )}
          {app.repoUrl && (
            <Link
              href={app.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-subtle transition-colors hover:text-accent"
            >
              View source on GitHub →
            </Link>
          )}
          {!app.demoPath && !app.liveUrl && !app.repoUrl && (
            <span className="text-sm text-dim">Not live yet</span>
          )}
        </div>
      </div>
    </div>
  );
}
