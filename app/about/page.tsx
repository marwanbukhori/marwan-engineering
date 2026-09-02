import type { Metadata } from "next";
import Link from "next/link";
import { PhotoCarousel } from "@/components/photo-carousel";
import { siteConfig } from "@/lib/site-config";
import { timeline } from "@/lib/timeline";

export const metadata: Metadata = {
  title: "About: Marwan Bukhori",
  description: siteConfig.currentlyBlurb,
};

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/" className="mb-8 inline-block text-sm text-subtle hover:text-accent">
          ← Home
        </Link>

        <h1 className="wood-box-title mb-6 inline-block font-[family-name:var(--font-title)] text-[22px] font-semibold text-foreground sm:text-[26px]">
          About
        </h1>

        <PhotoCarousel />

        <div className="mt-8">
          <div className="text-[11px] font-medium tracking-[0.06em] text-subtle uppercase">Currently</div>
          <p className="mt-0.5 max-w-[560px] font-[family-name:var(--font-title)] text-[16px] leading-relaxed text-foreground">
            {siteConfig.currentlyBlurb}
          </p>
        </div>

        <div className="relative mt-8 flex flex-col gap-6 border-t border-hairline pt-6">
          <div className="absolute top-6 bottom-1 left-[3px] w-px bg-hairline" />
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
                  <CompanyMark label={item.company} />
                  <div className="text-[14px] font-medium text-foreground">{item.role}</div>
                </div>
                <div className="mt-0.5 text-[13px] leading-relaxed text-muted">{item.detail}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
