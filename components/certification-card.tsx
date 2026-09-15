import type { Certification } from "@/lib/content-types";

/**
 * One certification card: badge image (or a framed issuer box when there is no
 * image), then title, date and issuer. Shared by the /certifications grid and the
 * home page teaser so both stay identical.
 */
export function CertificationCard({ cert }: { cert: Certification }) {
  const card = (
    <>
      {cert.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cert.image}
          alt={cert.title}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-chip px-4 text-center text-[13px] font-medium text-subtle">
          {cert.issuer}
        </div>
      )}
      <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 px-1">
        <div className="text-[15px] font-semibold text-foreground">{cert.title}</div>
        <div
          className="shrink-0 text-[13px] font-semibold"
          style={{ color: "var(--doodle-sun)" }}
        >
          {cert.date}
        </div>
      </div>
      <p className="mt-1 px-1 pb-1 text-[13px] leading-relaxed text-muted">{cert.issuer}</p>
    </>
  );

  const box = "wood-box bg-surface p-2";

  return cert.url ? (
    <a
      href={cert.url}
      target="_blank"
      rel="noreferrer"
      className={`${box} wood-box-interactive group block transition-colors`}
    >
      {card}
    </a>
  ) : (
    <div className={box}>{card}</div>
  );
}
