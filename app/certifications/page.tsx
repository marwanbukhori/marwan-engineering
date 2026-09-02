import type { Metadata } from "next";
import Link from "next/link";
import { CertificationsSection } from "@/components/certifications-section";

export const metadata: Metadata = {
  title: "Certifications: Marwan Bukhori",
  description: "Certifications and credentials.",
};

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16 lg:max-w-[860px]">
        <Link href="/" className="mb-8 inline-block text-sm text-subtle hover:text-accent">
          ← Home
        </Link>

        <h1 className="wood-box-title mb-6 inline-block font-[family-name:var(--font-title)] text-[22px] font-semibold text-foreground sm:text-[26px]">
          Certifications
        </h1>

        <CertificationsSection />
      </div>
    </div>
  );
}
