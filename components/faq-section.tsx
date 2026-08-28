"use client";

import { useState } from "react";
import { faqs } from "@/lib/faq";

function FaqRow({ item }: { item: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-hairline py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
      >
        <span className="text-[15px] font-medium text-foreground">{item.question}</span>
        <span
          className="shrink-0 text-subtle transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          ▾
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="mt-2.5 max-w-[560px] text-[14px] leading-relaxed text-muted">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

const PREVIEW_COUNT = 2;

export function FaqSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? faqs : faqs.slice(0, PREVIEW_COUNT);
  const remaining = faqs.length - PREVIEW_COUNT;

  return (
    <div className="animate-fade-in-up mb-10">
      <h2 className="mb-1 font-[family-name:var(--font-display)] text-lg font-bold text-foreground sm:text-xl">
        Questions I get asked
      </h2>
      <p className="mb-4 text-[14px] text-subtle">
        Quick, honest answers for anyone reviewing my resume.
      </p>
      <div className="border-t border-hairline">
        {visible.map((item) => (
          <FaqRow key={item.question} item={item} />
        ))}
      </div>
      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-3 flex cursor-pointer items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
        >
          See more ({remaining} more)
          <span aria-hidden>→</span>
        </button>
      )}
    </div>
  );
}
