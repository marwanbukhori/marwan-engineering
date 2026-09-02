import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsList } from "@/components/projects-list";

export const metadata: Metadata = {
  title: "Projects: Marwan Bukhori",
  description: "AI and engineering projects, documented as I build them.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/" className="mb-8 inline-block text-sm text-subtle hover:text-accent">
          ← Home
        </Link>

        <h1 className="wood-box-title mb-6 inline-block font-[family-name:var(--font-title)] text-[22px] font-semibold text-foreground sm:text-[26px]">
          Projects
        </h1>

        <ProjectsList />
      </div>
    </div>
  );
}
