import type { Metadata } from "next";
import Link from "next/link";
import { PhotoCarousel } from "@/components/photo-carousel";
import { TimelineList } from "@/components/timeline-list";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About: Marwan Bukhori",
  description: siteConfig.currentlyBlurb,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16 lg:max-w-[860px]">
        <Link href="/" className="mb-8 inline-block text-sm text-subtle hover:text-accent">
          ← Home
        </Link>

        <h1 className="wood-box-title mb-6 inline-block font-[family-name:var(--font-title)] text-[22px] font-semibold text-foreground sm:text-[26px]">
          About
        </h1>

        <PhotoCarousel />

        <div className="mt-8">
          <div className="text-[11px] font-medium tracking-[0.06em] text-subtle uppercase">Currently</div>
          <p className="mt-0.5 max-w-[640px] font-[family-name:var(--font-title)] text-[16px] leading-relaxed text-foreground">
            {siteConfig.currentlyBlurb}
          </p>
        </div>

        <div className="mt-8 border-t border-hairline pt-6">
          <TimelineList />
        </div>
      </div>
    </div>
  );
}
