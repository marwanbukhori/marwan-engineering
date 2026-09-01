"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const COUNT = 10;

export function AmbientParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const dots = containerRef.current?.querySelectorAll<HTMLSpanElement>(".dust-mote");
      dots?.forEach((dot, i) => {
        gsap.set(dot, {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0,
        });
        gsap.to(dot, {
          y: () => gsap.utils.random(-50, 50),
          x: () => gsap.utils.random(-35, 35),
          duration: () => gsap.utils.random(7, 13),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
        gsap.to(dot, {
          opacity: () => gsap.utils.random(0.08, 0.4),
          duration: () => gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: COUNT }).map((_, i) => (
        <span
          key={i}
          className="dust-mote absolute h-[3px] w-[3px] rounded-full"
          style={{ background: "var(--doodle-sun)" }}
        />
      ))}
    </div>
  );
}
