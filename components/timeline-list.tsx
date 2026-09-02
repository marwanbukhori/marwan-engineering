import { timeline } from "@/lib/timeline";

function CompanyMark({ label }: { label: string }) {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center bg-chip text-[10px] font-semibold text-subtle"
      aria-hidden
    >
      {label.charAt(0)}
    </span>
  );
}

export function TimelineList() {
  return (
    <div className="relative flex flex-col gap-6">
      <div className="absolute top-1.5 bottom-1 left-[3px] w-px bg-hairline" />
      {timeline.map((item, i) => {
        const isLast = i === timeline.length - 1;
        return (
          <div key={item.period} className="relative pl-6">
            <span
              className={`absolute top-1.5 left-0 h-[7px] w-[7px] rounded-full ${isLast ? "status-dot-active" : ""}`}
              style={{ background: isLast ? "var(--status-live)" : "var(--dim)" }}
            />
            <div className="text-[13px] font-semibold" style={{ color: "var(--doodle-sun)" }}>
              {item.period}
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <CompanyMark label={item.company} />
              <div className="text-[14px] font-medium text-foreground">{item.role}</div>
            </div>
            <div className="mt-0.5 text-[13px] leading-relaxed text-muted">{item.detail}</div>
          </div>
        );
      })}
    </div>
  );
}
