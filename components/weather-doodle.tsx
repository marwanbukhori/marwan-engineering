export function WeatherDoodle({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`absolute origin-top-right opacity-90 transition-[transform] duration-300 ${
        compact ? "top-1.5 right-2 scale-[0.45]" : "top-3 right-3 scale-75 sm:top-4 sm:right-4 sm:scale-90"
      }`}
      style={{ animation: "doodle-bob 4s ease-in-out infinite" }}
      aria-hidden="true"
    >
      <SunDoodle />
    </div>
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
