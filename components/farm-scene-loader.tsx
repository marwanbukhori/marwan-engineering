"use client";

import dynamic from "next/dynamic";

export const FarmScene = dynamic(() => import("@/components/farm-scene").then((m) => m.FarmScene), {
  ssr: false,
  loading: () => <div className="h-[180px] w-full" aria-hidden="true" />,
});
