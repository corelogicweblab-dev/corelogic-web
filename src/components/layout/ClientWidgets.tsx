"use client";

import dynamic from "next/dynamic";

const LiveChat = dynamic(
  () => import("@/components/ui/LiveChat").then((m) => m.LiveChat),
  { ssr: false }
);

const CursorGlow = dynamic(
  () => import("@/components/effects/CursorGlow").then((m) => m.CursorGlow),
  { ssr: false }
);

export function ClientWidgets() {
  return (
    <>
      <LiveChat />
      <CursorGlow />
    </>
  );
}
