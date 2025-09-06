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
        width:"100%",
        borderRadius: 12,
        padding: 12,
        background: C.cardBg,
        boxShadow: C.cardShadow,
        border: "1px solid rgba(255,255,255,0.08)",
        color: C.pageText,
      }}
      className="md:sticky md:top-4"
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ opacity: 0.85 }}>Status: <strong>{done.length}</strong> / {total} fanget</div>
        <div style={{ opacity: 0.85 }}>Tilbage: <strong>{remaining}</strong></div>
      </div>

      <div
        style={{
          height: 10, borderRadius: 999, background: "rgba(255,255,255,0.08)",
          overflow: "hidden", marginBottom: 10, border: "1px solid rgba(255,255,255,0.12)",
        }}
        aria-label={`Fremdrift ${pct}%`}
      >
        <div
          style={{
            width: `${pct}%`, height: "100%",
            background: "linear-gradient(90deg, #5e6cff, #6d35ff, #ff3cac)",
          }}
        />
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
        {order.map((o) => {
          const got = !!collected[o.label];
          return (
            <li
              key={o.label}
              style={{
                display: "grid",
                gridTemplateColumns: "22px 110px 1fr auto",
                gap: 8,
                alignItems: "center",
                padding: "6px 8px",
                borderRadius: 8,
                background: got ? "rgba(46,204,113,0.10)" : "rgba(255,255,255,0.04)",
                border: got ? "1px solid rgba(46,204,113,0.35)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span>{o.icon}</span>
              <strong style={{ opacity: 0.9 }}>{o.label}</strong>
              <span style={{ opacity: got ? 0.9 : 0.6, wordBreak: "break-word" }}>
                {got ? collected[o.label] : "—"}
              </span>
              <span aria-label={got ? "Fanget" : "Mangler"}>{got ? "✅" : "🟡"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
