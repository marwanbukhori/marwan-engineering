import Link from "next/link";
import type { AppEntry, AppStatus } from "@/lib/apps";

const STATUS_STYLE: Record<AppStatus, { bg: string; text: string }> = {
  live: { bg: "var(--status-live)", text: "#ffffff" },
  "in progress": { bg: "var(--status-progress)", text: "var(--status-progress-text)" },
  planned: { bg: "var(--status-planned)", text: "#ffffff" },
  idea: { bg: "var(--status-idea)", text: "#ffffff" },
};

export function ProjectRow({ app, index = 0 }: { app: AppEntry; index?: number }) {
  const statusStyle = STATUS_STYLE[app.status];

  return (
    <div
      className="animate-fade-in-up group -mx-4 rounded-lg border-t border-hairline px-4 py-5 transition-all duration-200 first:border-t-0 hover:-translate-y-0.5 hover:bg-[var(--block-dark)] hover:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.35)] sm:py-6"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
        <div className="flex items-baseline gap-3">
          <span className="text-sm text-dim tabular-nums transition-colors group-hover:text-white/35">
            {String(index).padStart(2, "0")}
          </span>
          <div className="font-[family-name:var(--font-title)] text-[16px] font-semibold text-foreground transition-colors group-hover:text-white sm:text-[17px]">
            {app.name}
          </div>
        </div>
        <span
          className="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-[0.02em] uppercase"
          style={{ background: statusStyle.bg, color: statusStyle.text }}
        >
          {app.status}
        </span>
      </div>

      <p className="mt-1.5 max-w-[480px] text-[15px] leading-relaxed text-muted transition-colors group-hover:text-white/65 sm:ml-[30px]">
        {app.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 sm:ml-[30px]">
        <Link
          href={`/projects/${app.slug}`}
          className="flex items-center gap-1 text-sm font-medium text-subtle transition-colors group-hover:text-white"
        >
          Read more
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>

        {app.demoPath || app.liveUrl ? (
          <Link
            href={app.demoPath ?? app.liveUrl!}
            target={app.liveUrl ? "_blank" : undefined}
            rel={app.liveUrl ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold text-white transition-[filter] hover:brightness-95"
            style={{ background: "var(--status-live)" }}
          >
            <span className="status-dot-active h-1.5 w-1.5 rounded-full bg-[#ff3b30]" />
            Live
          </Link>
        ) : app.repoUrl ? (
          <Link
            href={app.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-subtle transition-colors group-hover:text-white"
          >
            View on GitHub
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        ) : (
          <span className="text-sm text-dim transition-colors group-hover:text-white/40">
            Not live yet
          </span>
        )}
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5 sm:ml-[30px]">
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-chip px-2 py-0.5 text-[11px] text-subtle transition-colors group-hover:bg-white/10 group-hover:text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
