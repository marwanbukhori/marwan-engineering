"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Project screenshots as a framed grid. Clicking one opens it full size; arrow keys
 * and the on-screen arrows move between shots, Escape or the backdrop closes.
 */
export function ScreenshotGallery({ images, name }: { images: string[]; name: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const isOpen = openAt !== null;

  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback(
    (by: number) => setOpenAt((at) => (at === null ? at : (at + by + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    // Stop the page scrolling behind the overlay.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            onClick={() => setOpenAt(i)}
            aria-label={`Open screenshot ${i + 1} of ${images.length} full size`}
            className="wood-box wood-box-interactive block cursor-zoom-in bg-surface p-2 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${name} screenshot ${i + 1}`} className="w-full" />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} screenshot ${openAt + 1} of ${images.length}`}
          onClick={close}
          className="fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center gap-3 bg-black/85 p-4 sm:p-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[openAt]}
            alt={`${name} screenshot ${openAt + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full cursor-default object-contain"
          />

          <div
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-4 text-[13px] font-semibold text-white"
          >
            {images.length > 1 && (
              <button
                onClick={() => step(-1)}
                aria-label="Previous screenshot"
                className="cursor-pointer px-2 hover:text-accent"
              >
                ←
              </button>
            )}
            <span>
              {openAt + 1} / {images.length}
            </span>
            {images.length > 1 && (
              <button
                onClick={() => step(1)}
                aria-label="Next screenshot"
                className="cursor-pointer px-2 hover:text-accent"
              >
                →
              </button>
            )}
            <button onClick={close} aria-label="Close" className="cursor-pointer px-2 hover:text-accent">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
