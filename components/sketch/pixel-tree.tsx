export function PixelTree({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="20"
      viewBox="0 0 14 16"
      aria-hidden="true"
      style={{ shapeRendering: "crispEdges" }}
    >
      <rect x="6" y="12" width="2" height="4" fill="var(--muted)" />
      <rect x="4" y="8" width="6" height="2" fill="var(--accent)" />
      <rect x="3" y="6" width="8" height="2" fill="var(--accent)" />
      <rect x="4" y="4" width="6" height="2" fill="var(--accent)" />
      <rect x="5" y="2" width="4" height="2" fill="var(--accent)" />
    </svg>
  );
}
