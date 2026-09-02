import { apps } from "@/lib/apps";
import { siteConfig } from "@/lib/site-config";
import { ProjectsList } from "@/components/projects-list";
import { CurrentWork } from "@/components/current-work";
import { EngineeringBlog } from "@/components/engineering-blog";
import { CertificationsSection } from "@/components/certifications-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { IntroCard } from "@/components/intro-card";

export default function Home() {
  return (
    <main className="mx-auto max-w-[880px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
      <IntroCard name={siteConfig.name} tagline={siteConfig.tagline} />

      <CurrentWork />

      <div className="mb-4 border-t border-hairline pt-8">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
          Projects
        </h2>
      </div>

      <ProjectsList />

      <div className="mt-12 border-t border-hairline pt-8">
        <EngineeringBlog />
        <CertificationsSection />
      </div>

      <div className="mt-2 border-t border-hairline pt-8">
        <FaqSection />
      </div>

      <div
        className="animate-fade-in-up mt-12"
        style={{ animationDelay: `${(apps.length + 2) * 80}ms` }}
      >
        <Footer />
      </div>
    </main>
  );
}
