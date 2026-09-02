import { faqs } from "@/lib/faq";
import { SeeMoreLink } from "@/components/see-more-link";

const PREVIEW_COUNT = 2;

export function FaqTeaser() {
  const preview = faqs.slice(0, PREVIEW_COUNT);

  return (
    <div className="wood-box animate-fade-in-up mb-10 bg-surface px-5 py-5 sm:px-6">
      <h2 className="wood-box-title mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
        Questions I get asked
      </h2>
      <p className="mb-4 text-[14px] text-subtle">
        Quick, honest answers for anyone reviewing my resume.
      </p>
      <ul>
        {preview.map((item) => (
          <li key={item.question} className="border-b border-hairline py-3 text-[15px] font-medium text-foreground">
            {item.question}
          </li>
        ))}
      </ul>
      <SeeMoreLink href="/faq" label={`See all ${faqs.length} questions`} />
    </div>
  );
}
