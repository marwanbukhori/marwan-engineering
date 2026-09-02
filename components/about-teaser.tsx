import { PhotoCarousel } from "@/components/photo-carousel";
import { SeeMoreLink } from "@/components/see-more-link";
import { TimelineList } from "@/components/timeline-list";
import { siteConfig } from "@/lib/site-config";

export function AboutTeaser() {
  return (
    <div className="animate-fade-in-up mb-10 border-t border-hairline pt-8" style={{ animationDelay: "80ms" }}>
      <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
        Background
      </h2>
      <PhotoCarousel />
      <div className="mt-5 text-[11px] font-medium tracking-[0.06em] text-accent uppercase">Currently</div>
      <p className="mt-0.5 text-[14px] leading-relaxed text-muted">{siteConfig.currentlyBlurb}</p>

      <div className="mt-6 border-t border-hairline pt-6">
        <TimelineList />
      </div>

      <SeeMoreLink href="/about" />
    </div>
  );
}
