"use client";

import { useState } from "react";
import { faqs } from "@/lib/faq";
import { useTilt3D } from "@/lib/use-tilt-3d";

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
          <p className="mt-2.5 max-w-[640px] text-[14px] leading-relaxed text-muted">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const tiltRef = useTilt3D<HTMLDivElement>(4);

  return (
    <div ref={tiltRef} className="wood-box animate-fade-in-up mb-10 bg-surface px-5 py-5 sm:px-6">
      <p className="mb-4 text-[14px] text-subtle">
        Quick, honest answers for anyone reviewing my resume.
      </p>
      <div>
        {faqs.map((item) => (
          <FaqRow key={item.question} item={item} />
        ))}
      </div>
    </div>
  );
}
