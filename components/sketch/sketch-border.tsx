"use client";

import { useEffect, useRef, useState } from "react";
import rough from "roughjs";

type SketchBorderProps = {
  color: string;
  strokeWidth?: number;
  roughness?: number;
};

export function SketchBorder({ color, strokeWidth = 1.5, roughness = 1.8 }: SketchBorderProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || size.width < 4 || size.height < 4) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const inset = strokeWidth + 1;
    const rect = rc.rectangle(
      inset,
      inset,
      size.width - inset * 2,
      size.height - inset * 2,
      { stroke: color, strokeWidth, roughness }
    );
    svg.appendChild(rect);
  }, [size, color, strokeWidth, roughness]);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
