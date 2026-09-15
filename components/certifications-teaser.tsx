import { getCertifications } from "@/lib/content";
import { CertificationCard } from "@/components/certification-card";
import { SeeMoreLink } from "@/components/see-more-link";

const PREVIEW_COUNT = 3;

export function CertificationsTeaser() {
  const certifications = getCertifications();
  const preview = certifications.slice(0, PREVIEW_COUNT);

  return (
    <div className="mb-10">
      <h2 className="mb-3 font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
        Certifications
      </h2>

      {preview.length === 0 ? (
        <p className="text-[14px] text-dim">No certifications yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((cert) => (
            <CertificationCard key={cert.slug} cert={cert} />
          ))}
        </div>
      )}

      {/* Always linked: this teaser is the only route to /certifications. */}
      <SeeMoreLink
        href="/certifications"
        label={`See all ${certifications.length} certifications`}
      />
    </div>
  );
}
