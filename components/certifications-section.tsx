import { certifications } from "@/lib/certifications";

export function CertificationsSection() {
  return (
    <div className="mb-10">
      {certifications.length === 0 ? (
        <p className="text-[14px] text-dim">No certifications yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => {
            const card = (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <div className="text-[15px] font-semibold text-foreground">{cert.title}</div>
                  <div className="shrink-0 text-[13px] font-semibold" style={{ color: "var(--doodle-sun)" }}>
                    {cert.date}
                  </div>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{cert.issuer}</p>
              </>
            );
            return cert.url ? (
              <a key={cert.slug} href={cert.url} target="_blank" rel="noreferrer" className="group block">
                {card}
              </a>
            ) : (
              <div key={cert.slug}>{card}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
