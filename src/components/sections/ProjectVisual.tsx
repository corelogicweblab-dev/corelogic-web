/** CSS-only preview mockups — GPU-friendly, no JS animation loops */

const panel =
  "rounded border border-cyan-400/30 bg-slate-900/70 shadow-[0_0_12px_rgba(0,212,255,0.12)] smooth-gpu";

export function ProjectVisual({ visual }: { visual: string }) {
  if (visual === "command") {
    return (
      <div className="flex h-full gap-2 p-3">
        {[
          { label: "Alerts", value: "12" },
          { label: "Regions", value: "8" },
          { label: "Assets", value: "156" },
        ].map((col, i) => (
          <div
            key={col.label}
            className={`flex-1 p-2 anim-soft-pulse ${panel}`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <p className="font-[family-name:var(--font-orbitron)] text-[7px] tracking-wider text-cyan-500 uppercase">
              {col.label}
            </p>
            <p className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-cyan-300">{col.value}</p>
            <div className="mt-2 space-y-1">
              {[65, 82, 45].map((w, j) => (
                <div
                  key={j}
                  className="preview-bar h-1 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                  style={{ width: `${w}%`, animationDelay: `${j * 0.15}s` }}
                />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-0.5">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="aspect-square rounded bg-cyan-400/20 ring-1 ring-cyan-400/30" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (visual === "dashboard") {
    return (
      <div className="flex h-full flex-col gap-2 p-3">
        <div className="flex gap-1.5">
          {["KPI", "GIS", "Alerts"].map((t) => (
            <span
              key={t}
              className="rounded border border-cyan-400/50 bg-cyan-950/80 px-2 py-0.5 font-[family-name:var(--font-orbitron)] text-[7px] font-bold tracking-wider text-cyan-400 uppercase"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: "Citizens", val: "48.2K" },
            { label: "Permits", val: "1,204" },
            { label: "Revenue", val: "₱12.4M" },
          ].map((k) => (
            <div key={k.label} className={`p-1.5 ${panel}`}>
              <p className="text-[6px] text-slate-500 uppercase">{k.label}</p>
              <p className="font-[family-name:var(--font-orbitron)] text-[10px] font-bold text-cyan-300">{k.val}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          <div className={`flex-1 p-2 ${panel}`}>
            <p className="mb-1 font-[family-name:var(--font-orbitron)] text-[6px] text-cyan-500 uppercase">GIS Map</p>
            <div className="relative min-h-[60px] rounded bg-gradient-to-br from-cyan-950 to-slate-900">
              <div className="absolute inset-2 grid grid-cols-4 grid-rows-3 gap-px opacity-60">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border border-cyan-500/20" />
                ))}
              </div>
              {[30, 55, 70].map((left, i) => (
                <span
                  key={i}
                  className="preview-dot absolute h-1.5 w-1.5 rounded-full bg-emerald-400"
                  style={{ left: `${left}%`, top: `${35 + i * 12}%`, animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
          <div className="flex w-[38%] flex-col gap-1.5">
            {["88%", "72%", "95%", "60%"].map((w, i) => (
              <div
                key={i}
                className="preview-bar-sm rounded bg-gradient-to-r from-violet-500/40 to-cyan-500/30 ring-1 ring-violet-400/30"
                style={{ width: w, height: `${14 + i * 4}px`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
            <p className="mt-auto font-[family-name:var(--font-orbitron)] text-[6px] text-emerald-400">↑ 12% vs last month</p>
          </div>
        </div>
      </div>
    );
  }

  if (visual === "ai") {
    return (
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden p-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3),transparent)]" />
        <div className="ai-ring relative h-28 w-28 rounded-full border-2 border-violet-400/60 shadow-[0_0_40px_rgba(139,92,246,0.35)]">
          <div className="absolute inset-3 rounded-full border border-cyan-400/50 anim-soft-pulse" />
          <div className="absolute inset-6 rounded-full bg-gradient-to-b from-cyan-400/50 to-violet-500/40" />
          <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-orbitron)] text-[8px] font-bold text-white">
            AI
          </span>
        </div>
        <div className={`absolute bottom-2 left-2 right-2 p-2 ${panel}`}>
          <p className="font-[family-name:var(--font-orbitron)] text-[7px] text-cyan-400">Query</p>
          <p className="text-[8px] text-slate-300">&quot;Show FOI requests for Q3 2025...&quot;</p>
          <div className="preview-progress mt-1 h-0.5 rounded bg-cyan-400/60" />
        </div>
      </div>
    );
  }

  if (visual === "dispatch") {
    return (
      <div className="grid h-full grid-cols-2 gap-2 p-3">
        <div className={panel}>
          <p className="font-[family-name:var(--font-orbitron)] text-[7px] tracking-wider text-emerald-400 uppercase">Active Units</p>
          <p className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-emerald-400">24</p>
          <p className="text-[6px] text-slate-500">12 responding</p>
        </div>
        <div className={panel}>
          <p className="font-[family-name:var(--font-orbitron)] text-[7px] tracking-wider text-cyan-400 uppercase">Incidents</p>
          <p className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-cyan-400">7</p>
          <p className="text-[6px] text-slate-500">3 critical</p>
        </div>
        <div className={`col-span-2 min-h-[70px] ${panel}`}>
          <p className="mb-1 font-[family-name:var(--font-orbitron)] text-[6px] text-cyan-500 uppercase">Live Map</p>
          <div className="relative h-12 rounded bg-slate-950/80">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`preview-dot absolute h-2 w-2 rounded-full ${i === 2 ? "bg-red-400" : "bg-emerald-400"}`}
                style={{ left: `${15 + i * 16}%`, top: `${25 + (i % 3) * 20}%`, animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: "Compliance", pct: 94 },
          { label: "Budget", pct: 78 },
          { label: "Projects", pct: 86 },
          { label: "Citizens", pct: 91 },
        ].map((k) => (
          <div key={k.label} className={`p-1.5 ${panel}`}>
            <p className="text-[5px] text-slate-500 uppercase">{k.label}</p>
            <p className="font-[family-name:var(--font-orbitron)] text-[9px] font-bold text-cyan-300">{k.pct}%</p>
            <div className="mt-0.5 h-0.5 overflow-hidden rounded bg-slate-800">
              <div className="h-full rounded bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${k.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1 rounded border border-violet-400/25 bg-slate-950/60 p-2">
        <p className="font-[family-name:var(--font-orbitron)] text-[6px] text-violet-400 uppercase">Executive Overview</p>
        <div className="flex flex-1 items-end gap-1">
          {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
            <div
              key={i}
              className="preview-chart-bar flex-1 rounded-t bg-gradient-to-t from-violet-600 via-cyan-500 to-cyan-300"
              style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
