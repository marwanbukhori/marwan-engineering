"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollProgress } from "@/components/scroll-progress";
import { WeatherDoodle } from "@/components/weather-doodle";
import { useTilt3D } from "@/lib/use-tilt-3d";
import { siteConfig } from "@/lib/site-config";

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
    <div className="sticky top-4 z-20 mb-14 sm:mb-20">
      <div
        ref={(el) => {
          cardRef.current = el;
          tiltRef.current = el;
        }}
        className="wood-box wood-grain relative overflow-hidden px-5 py-5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] sm:px-6"
        style={{ background: "var(--block-dark)" }}
      >
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
        <a
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="wood-box wood-box-interactive mt-3 ml-[18px] inline-flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold tracking-[0.08em] uppercase transition-transform active:translate-y-0.5"
          style={{ background: "var(--doodle-sun)", color: "var(--block-dark)" }}
        >
          Download resume ↓
        </a>
      </div>
    </div>
  );
}
