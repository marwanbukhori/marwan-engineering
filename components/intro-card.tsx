"use client";

import { ScrollProgress } from "@/components/scroll-progress";
import { WeatherDoodle } from "@/components/weather-doodle";
import { useTilt3D } from "@/lib/use-tilt-3d";

export function IntroCard({ name, tagline }: { name: string; tagline: string }) {
  const tiltRef = useTilt3D<HTMLDivElement>(4);

  return (
    <div
      ref={tiltRef}
      className="wood-box animate-fade-in-up wood-grain sticky top-4 z-20 mb-8 overflow-hidden px-5 py-5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] sm:mb-10 sm:px-6"
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
    </div>
  );
}
