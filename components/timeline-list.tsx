import { getCareer } from "@/lib/content";
import { CareerDetail } from "@/components/career-detail";

/** The company's logo when one is provided, otherwise its first letter in a chip. */
function CompanyMark({ label, logo }: { label: string; logo?: string }) {
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt=""
        className="h-5 w-5 shrink-0 object-contain"
        aria-hidden
      />
    );
  }

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
  const timeline = getCareer();

  return (
    <div className="relative flex flex-col gap-6">
      <div className="absolute top-1.5 bottom-1 left-[3px] w-px bg-hairline" />
      {timeline.map((item, i) => {
        const isCurrent = i === 0;
        return (
          <div key={item.slug} className="relative pl-6">
            <span
              className={`absolute top-1.5 left-0 h-[7px] w-[7px] rounded-full ${isCurrent ? "status-dot-active" : ""}`}
              style={{ background: isCurrent ? "var(--status-live)" : "var(--dim)" }}
            />
            <div className="text-[13px] font-semibold" style={{ color: "var(--doodle-sun)" }}>
              {item.period}
            </div>
            <div className="mt-0.5 flex items-center gap-2">
              <CompanyMark label={item.company} logo={item.logo} />
              <div className="text-[14px] font-medium text-foreground">
                {item.role},{" "}
                <span className="text-accent">{item.company}</span>
              </div>
            </div>
            <CareerDetail
              detail={item.detail}
              className="mt-0.5 text-[13px] leading-relaxed text-muted"
            />
          </div>
        );
      })}
    </div>
  );
}
