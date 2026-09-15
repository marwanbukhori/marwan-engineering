"use client";

import { useState } from "react";
import { blocks, type ContentBlock } from "@/lib/content-types";
import { BlockList } from "@/components/detail-prose";

/**
 * Splits a body into the first line and everything after it, so a timeline entry
 * can show one bullet and keep the rest behind a toggle.
 */
function splitFirst(items: ContentBlock[]): { head: ContentBlock[]; rest: ContentBlock[] } {
  const [first, ...following] = items;
  if (!first) return { head: [], rest: [] };

  if (first.type === "list" && first.items.length > 1) {
    return {
      head: [{ type: "list", items: first.items.slice(0, 1) }],
      rest: [{ type: "list", items: first.items.slice(1) }, ...following],
    };
  }

  return { head: [first], rest: following };
}

export function CareerDetail({ detail, className = "" }: { detail: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const { head, rest } = splitFirst(blocks(detail));

  // Short entries have nothing to hide, so they get no toggle.
  if (rest.length === 0) return <BlockList items={head} className={className} />;

  return (
    <div className={className}>
      <BlockList items={head} />

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <BlockList items={rest} className="pt-1.5" />
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-1.5 inline-flex cursor-pointer items-center gap-1 text-[12px] font-medium text-accent hover:text-accent-hover"
      >
        {open ? "See less" : "See more"}
        <span
          className="transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          ▾
        </span>
      </button>
    </div>
  );
}
