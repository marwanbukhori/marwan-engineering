export function PixelFence({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-3 w-full text-[var(--hairline)] ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 64 12"
      aria-hidden="true"
    >
      <defs>
        <pattern id="fence-tile" width="16" height="12" patternUnits="userSpaceOnUse">
          <rect x="0" y="3" width="16" height="2" fill="currentColor" />
          <rect x="0" y="8" width="16" height="2" fill="currentColor" />
          <rect x="1" y="0" width="3" height="12" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="64" height="12" fill="url(#fence-tile)" />
    </svg>
  );
}
