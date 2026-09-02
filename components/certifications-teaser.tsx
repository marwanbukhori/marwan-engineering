import { certifications } from "@/lib/certifications";
import { SeeMoreLink } from "@/components/see-more-link";

export function CertificationsTeaser() {
  return (
    <div className="mb-10">
      <h2 className="mb-2 font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
        Certifications
      </h2>
      {certifications.length === 0 ? (
        <p className="text-[14px] text-dim">No certifications yet. Check back soon.</p>
      ) : (
        <div className="text-[14px] leading-relaxed text-muted">
          <span className="font-semibold text-foreground">{certifications[0].title}</span> —{" "}
          {certifications[0].issuer}
        </div>
      )}
      <SeeMoreLink href="/certifications" />
    </div>
  );
}
