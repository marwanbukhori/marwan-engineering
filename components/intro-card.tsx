"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollProgress } from "@/components/scroll-progress";
import { WeatherDoodle } from "@/components/weather-doodle";
import { useTilt3D } from "@/lib/use-tilt-3d";
import { siteConfig } from "@/lib/site-config";

export function IntroCard({ name, tagline }: { name: string; tagline: string }) {
  const tiltRef = useTilt3D<HTMLDivElement>(4);
  const cardRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(cardRef.current, {
      scale: 0.92,
      opacity: 0,
      duration: 0.7,
      ease: "back.out(1.6)",
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      setCollapsed(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-4 z-20 mb-14 sm:mb-20">
      <div
        ref={(el) => {
          cardRef.current = el;
          tiltRef.current = el;
        }}
        className={`wood-box wood-grain relative overflow-hidden shadow-[0_12px_28px_-10px_rgba(0,0,0,0.4)] transition-[padding] duration-300 ${
          collapsed ? "px-4 py-2.5 sm:px-5" : "px-5 py-5 sm:px-6"
        }`}
        style={{ background: "var(--block-dark)" }}
      >
        <ScrollProgress />
        <WeatherDoodle compact={collapsed} />
        <h1 className="flex flex-wrap items-center gap-2.5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
          <span
            className="status-dot-active inline-block h-2 w-2 rounded-full"
            style={{ background: "var(--status-live)" }}
          />
          {name}
          <span aria-hidden>🇲🇾</span>
        </h1>
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: collapsed ? "0fr" : "1fr" }}
        >
          <div className="overflow-hidden">
            <p className="mt-1.5 ml-[18px] text-sm text-white/55">{tagline}</p>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="wood-box wood-box-interactive mt-3 ml-[18px] inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-bold tracking-[0.06em] uppercase transition-transform active:translate-y-0.5 sm:gap-1.5 sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.08em]"
              style={{ background: "var(--doodle-sun)", color: "var(--block-dark)" }}
            >
              Download resume ↓
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
