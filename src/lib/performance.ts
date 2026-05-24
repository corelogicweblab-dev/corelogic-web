export type PerformanceTier = "full" | "lite";

/** Lighter effects on slow networks, save-data, or reduced-motion. */
export function getPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") return "lite";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "lite";
  }

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };

  if (nav.connection?.saveData) return "lite";

  const effectiveType = nav.connection?.effectiveType;
  if (effectiveType && ["slow-2g", "2g", "3g"].includes(effectiveType)) {
    return "lite";
  }

  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) {
    return "lite";
  }

  return "full";
}

export function deferNonCritical(callback: () => void, timeoutMs = 2500) {
  if (typeof window === "undefined") return;

  const win = window as Window &
    typeof globalThis & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

  if (win.requestIdleCallback) {
    const id = win.requestIdleCallback(callback, { timeout: timeoutMs });
    return () => win.cancelIdleCallback?.(id);
  }

  const id = win.setTimeout(callback, 400);
  return () => win.clearTimeout(id);
}

/** Cap canvas/RAF loops for smoother main thread (default ~30fps). */
export function shouldSkipFrame(timestamp: number, lastFrame: number, targetFps = 30): boolean {
  const interval = 1000 / targetFps;
  return timestamp - lastFrame < interval;
}
