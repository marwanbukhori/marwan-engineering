import { photos } from "@/lib/photos";

export function PhotoCarousel() {
  // Duplicated so the scroll loop is seamless (translateX(-50%) lands exactly
  // back on the first copy).
  const loop = [...photos, ...photos];

  return (
    <div className="mx-auto mb-5 w-full overflow-hidden">
      <div className="animate-marquee flex gap-3" style={{ width: "max-content" }}>
        {loop.map((photo, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={photo.src}
            alt={photo.alt}
            className="h-40 w-56 shrink-0 object-cover object-[center_78%] sm:h-48 sm:w-64"
          />
        ))}
      </div>
    </div>
  );
}
