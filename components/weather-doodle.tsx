"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.dataset.theme = "dark";
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // localStorage unavailable, theme just won't persist
  }
}

export function WeatherDoodle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      onClick={toggle}
      className="absolute top-3 right-3 origin-top-right scale-75 cursor-pointer opacity-90 transition-transform hover:scale-90 active:scale-[0.7] sm:top-4 sm:right-4 sm:scale-90 sm:hover:scale-100 sm:active:scale-[0.8]"
      style={{ animation: "doodle-bob 4s ease-in-out infinite" }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <MoonDoodle /> : <SunDoodle />}
    </button>
  );
}

function SunDoodle() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <g style={{ transformOrigin: "26px 26px", animation: "doodle-spin-slow 24s linear infinite" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="26"
            y1="2"
            x2="26"
            y2="9"
            stroke="var(--doodle-sun)"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${i * 45} 26 26)`}
          />
        ))}
      </g>
      <circle cx="26" cy="26" r="13" fill="var(--doodle-sun)" stroke="var(--doodle-sun-deep)" strokeWidth="1.5" />
      <g style={{ transformOrigin: "26px 25px", animation: "doodle-blink 4.5s ease-in-out infinite" }}>
        <circle cx="21.5" cy="25" r="1.4" fill="var(--doodle-sun-deep)" />
        <circle cx="30.5" cy="25" r="1.4" fill="var(--doodle-sun-deep)" />
      </g>
      <path
        d="M21 30c1.8 2 3.2 3 5 3s3.2-1 5-3"
        stroke="var(--doodle-sun-deep)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function MoonDoodle() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <path
        d="M32 12a15 15 0 1 0 8 22 12 12 0 0 1-8-22Z"
        fill="var(--surface)"
        stroke="var(--foreground)"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="14" r="1.3" fill="var(--accent)" style={{ animation: "doodle-twinkle 2.4s ease-in-out infinite" }} />
      <circle
        cx="10"
        cy="24"
        r="1"
        fill="var(--accent)"
        style={{ animation: "doodle-twinkle 2.4s ease-in-out 0.6s infinite" }}
      />
      <circle
        cx="20"
        cy="8"
        r="0.9"
        fill="var(--accent)"
        style={{ animation: "doodle-twinkle 2.4s ease-in-out 1.2s infinite" }}
      />
    </svg>
  );
}
