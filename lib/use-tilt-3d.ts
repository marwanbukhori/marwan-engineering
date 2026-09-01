"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useTilt3D<T extends HTMLElement>(maxTilt = 6) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { transformPerspective: 800, transformStyle: "preserve3d", x: 0, y: 0, z: 0 });
    const quickX = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3.out" });
    const quickZ = gsap.quickTo(el, "z", { duration: 0.4, ease: "power3.out" });
    const quickScaleX = gsap.quickTo(el, "scaleX", { duration: 0.4, ease: "power3.out" });
    const quickScaleY = gsap.quickTo(el, "scaleY", { duration: 0.4, ease: "power3.out" });

    function handleMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      quickY(px * maxTilt * 2);
      quickX(-py * maxTilt * 2);
    }

    function handleEnter() {
      quickZ(24);
      quickScaleX(1.015);
      quickScaleY(1.015);
    }

    function handleLeave() {
      quickX(0);
      quickY(0);
      quickZ(0);
      quickScaleX(1);
      quickScaleY(1);
    }

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [maxTilt]);

  return ref;
}
