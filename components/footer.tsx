import { siteConfig } from "@/lib/site-config";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 18 18",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function EmailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="4" width="14" height="10" rx="1.5" />
      <path d="M2.5 5L9 10L15.5 5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 5.5L2 9l4 3.5" />
      <path d="M12 5.5L16 9l-4 3.5" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="9" cy="6.5" r="3" />
      <path d="M3 15c0-3 3-5 6-5s6 2 6 5" />
    </svg>
  );
}

const links = [
  { label: "email", href: siteConfig.socials.email, Icon: EmailIcon },
  { label: "github", href: siteConfig.socials.github, Icon: CodeIcon },
  { label: "linkedin", href: siteConfig.socials.linkedin, Icon: ProfileIcon },
];

export function Footer() {
  return (
    <footer className="mt-12 rounded-xl px-5 py-7 sm:px-6 sm:py-8" style={{ background: "var(--block-dark)" }}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={label !== "email" ? "_blank" : undefined}
              rel={label !== "email" ? "noreferrer" : undefined}
              className="flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-white"
            >
              <Icon />
              {label}
            </a>
          ))}
        </div>

        <a
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold transition-colors hover:bg-white/90"
          style={{ color: "var(--block-dark)" }}
        >
          Download resume
        </a>
      </div>
      <div className="mt-6 border-t border-white/10 pt-4 text-[12px] text-white/35">
        © 2026 {siteConfig.name}
      </div>
    </footer>
  );
}
