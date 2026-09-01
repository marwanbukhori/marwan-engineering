"use client";

import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

type SketchDividerProps = {
  color?: string;
  className?: string;
};

export function SketchDivider({ color = "var(--hairline)", className = "" }: SketchDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || width < 4) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const line = rc.line(0, 4, width, 4, { stroke: color, strokeWidth: 1.5, roughness: 2 });
    svg.appendChild(line);
  }, [width, color]);

  return (
    <div ref={containerRef} className={`h-2 w-full ${className}`}>
      <svg ref={svgRef} width={width || undefined} height="8" aria-hidden="true" />
    </div>
  );
}
