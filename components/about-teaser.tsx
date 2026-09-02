import { SeeMoreLink } from "@/components/see-more-link";
import { siteConfig } from "@/lib/site-config";

export function AboutTeaser() {
  return (
    <div className="animate-fade-in-up mb-10 border-t border-hairline pt-8" style={{ animationDelay: "80ms" }}>
      <h2 className="mb-2 font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
        Background
      </h2>
      <p className="max-w-[560px] text-[14px] leading-relaxed text-muted">{siteConfig.currentlyBlurb}</p>
      <SeeMoreLink href="/about" />
    </div>
  );
}
