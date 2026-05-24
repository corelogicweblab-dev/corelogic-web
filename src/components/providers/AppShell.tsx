"use client";

import type { ReactNode } from "react";
import { SmoothProvider } from "@/components/providers/SmoothProvider";

export function AppShell({ children }: { children: ReactNode }) {
  return <SmoothProvider>{children}</SmoothProvider>;
}
