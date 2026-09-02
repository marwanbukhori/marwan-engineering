import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "FAQ: Marwan Bukhori",
  description: "Quick, honest answers for anyone reviewing my resume.",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen text-foreground">
      <div className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16 lg:max-w-[860px]">
        <Link href="/" className="mb-8 inline-block text-sm text-subtle hover:text-accent">
          ← Home
        </Link>

        <h1 className="wood-box-title mb-6 inline-block font-[family-name:var(--font-title)] text-[22px] font-semibold text-foreground sm:text-[26px]">
          Questions I get asked
        </h1>

        <FaqSection />
      </div>
    </main>
  );
}
