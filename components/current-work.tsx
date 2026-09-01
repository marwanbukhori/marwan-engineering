"use client";

import { useState } from "react";
import { PhotoCarousel } from "@/components/photo-carousel";

type TimelineItem = {
  period: string;
  company: string;
  role: string;
  detail: string;
  /** Optional path to a real, provided company logo PNG in /public, e.g. "/logos/verus-virtus.png". */
  logo?: string;
};

const timeline: TimelineItem[] = [
  {
    period: "2022 – 2024",
    company: "Terato Tech",
    role: "Junior Software Engineer, Terato Tech",
    detail: "Reporting features on CloudBOS deployed nationwide across 1,000+ fuel stations.",
  },
  {
    period: "2024 – 2026",
    company: "Silentmode",
    role: "Software Engineer (Full-Stack), Silentmode",
    detail:
      "Built the E-Invoice System from scratch: event-driven microservice on AWS, CQRS and DDD, LHDN integration. Shipped subsidy transaction processing, 800K+ txns/day.",
  },
  {
    period: "2026 (short contract)",
    company: "Geomotion",
    role: "Software Engineer (Security), Geomotion",
    detail: "Security hardening across 6 microservice repos: WAF rules, CSP headers, automated CI/CD scanning.",
  },
  {
    period: "2026 – present",
    company: "Verus Virtus",
    role: "Software Engineer, Verus Virtus",
    detail: "Building Nexus, an AI platform that turns natural language into audited network commands.",
  },
];

function CompanyMark({ item }: { item: TimelineItem }) {
  if (item.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.logo} alt="" className="h-5 w-5 shrink-0 object-contain" />;
  }
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center bg-chip text-[10px] font-semibold text-subtle"
      aria-hidden
    >
      {item.company.charAt(0)}
    </span>
  );
}

export function CurrentWork() {
  const [open, setOpen] = useState(false);

  return (
    <div className="animate-fade-in-up mb-10 border-t border-hairline pt-8" style={{ animationDelay: "80ms" }}>
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
        Background
      </h2>
        <PhotoCarousel />

        <button onClick={() => setOpen((v) => !v)} className="w-full cursor-pointer text-left" aria-expanded={open}>
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div>
              <div className="text-[11px] font-medium tracking-[0.06em] text-subtle uppercase">
                Currently
              </div>
              <div className="mt-0.5 font-[family-name:var(--font-title)] text-[16px] text-foreground">
                Building Nexus, an AI platform that turns natural language into audited network
                commands, at Verus Virtus.
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-subtle">
              {open ? "Show less" : "Read more"}
              <span
                className="transition-transform duration-300"
                style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                aria-hidden
              >
                ↓
              </span>
            </span>
          </div>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="relative mt-5 flex flex-col gap-6 border-t border-hairline pt-5">
                <div className="absolute top-5 bottom-1 left-[3px] w-px bg-hairline" />
                {timeline.map((item, i) => {
                  const isLast = i === timeline.length - 1;
                  return (
                    <div key={item.period} className="relative pl-6">
                      <span
                        className={`absolute top-1.5 left-0 h-[7px] w-[7px] rounded-full ${isLast ? "status-dot-active" : ""}`}
                        style={{ background: isLast ? "var(--status-live)" : "var(--dim)" }}
                      />
                      <div className="text-[13px] text-subtle">{item.period}</div>
                      <div className="mt-0.5 flex items-center gap-2">
                        <CompanyMark item={item} />
                        <div className="text-[14px] font-medium text-foreground">{item.role}</div>
                      </div>
                      <div className="mt-0.5 text-[13px] leading-relaxed text-muted">{item.detail}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </button>
    </div>
  );
}
