import { siteConfig } from "@/lib/site-config";
import { GithubIcon } from "@/components/github-button";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function EmailIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const links = [
  { label: "email", href: siteConfig.socials.email, Icon: EmailIcon },
  { label: "github", href: siteConfig.socials.github, Icon: GithubIcon },
  { label: "linkedin", href: siteConfig.socials.linkedin, Icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="wood-grain mt-12 px-5 py-7 sm:px-6 sm:py-8" style={{ background: "var(--block-dark)" }}>
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
      <div className="mt-6 border-t border-white/10 pt-4 text-[12px] text-white/35">
        © 2026 {siteConfig.name}
      </div>
    </footer>
  );
}
