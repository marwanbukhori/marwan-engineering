"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollProgress } from "@/components/scroll-progress";
import { WeatherDoodle } from "@/components/weather-doodle";
import { useTilt3D } from "@/lib/use-tilt-3d";

const FIREFLY_COUNT = 5;

function Fireflies() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const dots = containerRef.current?.querySelectorAll<HTMLSpanElement>(".firefly");
      dots?.forEach((dot, i) => {
        gsap.set(dot, {
          left: `${10 + i * 20 + Math.random() * 8}%`,
          top: `${20 + Math.random() * 60}%`,
        });
        gsap.to(dot, {
          x: () => gsap.utils.random(-18, 18),
          y: () => gsap.utils.random(-14, 14),
          duration: () => gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
        gsap.to(dot, {
          opacity: () => gsap.utils.random(0.2, 0.9),
          duration: () => gsap.utils.random(1.2, 2.2),
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
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: FIREFLY_COUNT }).map((_, i) => (
        <span
          key={i}
          className="firefly absolute h-1 w-1 rounded-full"
          style={{ background: "var(--doodle-sun)", boxShadow: "0 0 6px 2px var(--doodle-sun)" }}
        />
      ))}
    </div>
  );
}

export function IntroCard({ name, tagline }: { name: string; tagline: string }) {
  const tiltRef = useTilt3D<HTMLDivElement>(4);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(cardRef.current, {
      scale: 0.92,
      opacity: 0,
      duration: 0.7,
      ease: "back.out(1.6)",
    });
  }, []);

  return (
    <div className="sticky top-4 z-20 mb-8 sm:mb-10">
      <div
        ref={(el) => {
          cardRef.current = el;
          tiltRef.current = el;
        }}
        className="wood-box wood-grain relative overflow-hidden px-5 py-5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] sm:px-6"
        style={{ background: "var(--block-dark)" }}
      >
        <Fireflies />
        <ScrollProgress />
        <WeatherDoodle />
        <h1 className="flex flex-wrap items-center gap-2.5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
          <span
            className="status-dot-active inline-block h-2 w-2 rounded-full"
            style={{ background: "var(--status-live)" }}
          />
          {name}
          <span aria-hidden>🇲🇾</span>
        </h1>
        <p className="mt-1.5 ml-[18px] text-sm text-white/55">{tagline}</p>
        <p className="mt-2 ml-[18px] text-[11px] tracking-[0.08em] text-white/35 uppercase">
          Welcome to the farm 🌾
        </p>
      </div>
    </div>
  );
}
