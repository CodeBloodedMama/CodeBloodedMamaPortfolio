"use client";

import { C } from "./constants";

export default function StatusPanel({
  order,
  collected,
  total,
}: {
  order: Array<{ id: string; label: string; icon: string }>;
  collected: Record<string, string>;
  total: number;
}) {
  const done = Object.keys(collected);
  const pct = Math.round((done.length / total) * 100);
  const remaining = total - done.length;

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 12,
        padding: 16,
        background: C.cardBg,
        boxShadow: C.cardShadow,
        border: "1px solid rgba(255,255,255,0.08)",
        color: C.pageText,
      }}
      className="md:sticky md:top-4"
    >
      {/* Header */}
      <div className="flex justify-between text-sm mb-2 opacity-85">
        <div>
          Status: <strong>{done.length}</strong> / {total}
        </div>
        <div>
          Needs: <strong>{remaining}</strong>
        </div>
      </div>

      {/* Progressbar */}
      <div
        className="h-2 w-full rounded-full border border-white/10 bg-white/5 overflow-hidden mb-3"
        aria-label={`Progress ${pct}%`}
      >
        <div
          className="h-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* List */}
      <ul className="space-y-2">
        {order.map((o) => {
          const got = !!collected[o.label];
          return (
            <li
              key={o.label}
              className={`grid grid-cols-[28px,120px,1fr,28px] gap-2 items-center rounded-lg px-2 py-1.5 border text-sm
              ${got
                ? "bg-emerald-500/10 border-emerald-400/40"
                : "bg-white/5 border-white/10"}`} 
            >
              <span>{o.icon}</span>
              <strong className="truncate">{o.label}</strong>
              <span className={`truncate ${got ? "opacity-90" : "opacity-60"}`}>
                {got ? collected[o.label] : "—"}
              </span>
              <span>{got ? "✅" : "🟡"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
