import { getCertifications } from "@/lib/content";
import { CertificationCard } from "@/components/certification-card";

export function CertificationsSection() {
  const certifications = getCertifications();

  return (
    <div className="mb-10">
      {certifications.length === 0 ? (
        <p className="text-[14px] text-dim">No certifications yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <CertificationCard key={cert.slug} cert={cert} />
          ))}
        </div>
      )}
    </div>
  );
}
