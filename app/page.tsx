import { apps } from "@/lib/apps";
import { siteConfig } from "@/lib/site-config";
import { ProjectsList } from "@/components/projects-list";
import { CurrentWork } from "@/components/current-work";
import { EngineeringBlog } from "@/components/engineering-blog";
import { EventsSection } from "@/components/events-section";
import { FaqSection } from "@/components/faq-section";
import { WeatherDoodle } from "@/components/weather-doodle";
import { ScrollProgress } from "@/components/scroll-progress";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="mx-auto max-w-[880px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
      <div
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
          {siteConfig.name}
          <span aria-hidden>🇲🇾</span>
        </h1>
        <p className="mt-1.5 ml-[18px] text-sm text-white/55">{siteConfig.tagline}</p>
      </div>

      <CurrentWork />

      <div className="mb-4 border-t border-hairline pt-8">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
          Projects
        </h2>
      </div>

      <ProjectsList />

      <div className="mt-12 border-t border-hairline pt-8">
        <EngineeringBlog />
        <EventsSection />
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
