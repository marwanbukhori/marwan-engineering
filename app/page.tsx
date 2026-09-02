import { siteConfig } from "@/lib/site-config";
import { AboutTeaser } from "@/components/about-teaser";
import { ProjectsTeaser } from "@/components/projects-teaser";
import { WritingTeaser } from "@/components/writing-teaser";
import { CertificationsTeaser } from "@/components/certifications-teaser";
import { FaqTeaser } from "@/components/faq-teaser";
import { Footer } from "@/components/footer";
import { IntroCard } from "@/components/intro-card";

export default function Home() {
  return (
    <main className="mx-auto max-w-[880px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
      <IntroCard name={siteConfig.name} tagline={siteConfig.tagline} />

      <AboutTeaser />

      <div className="mb-4 border-t border-hairline pt-8">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
          Projects
        </h2>
      </div>

      <ProjectsTeaser />

      <div className="mt-12 border-t border-hairline pt-8">
        <WritingTeaser />
        <CertificationsTeaser />
      </div>

      <div className="mt-2 border-t border-hairline pt-8">
        <FaqTeaser />
      </div>

      <div className="animate-fade-in-up mt-12" style={{ animationDelay: "480ms" }}>
        <Footer />
      </div>
    </main>
  );
}
