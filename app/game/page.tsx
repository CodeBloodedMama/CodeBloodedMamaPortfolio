"use client";
import { useState } from "react";
import { C } from "./constants";
import GameBox from "./GameBox";

export default function GameLanding() {
  const [started, setStarted] = useState(false);

  return (
    <main style={{ maxWidth: 980, margin: "40px auto", padding: 16, color: C.pageText }}>
      <header style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", marginBottom: 6 }}>
          🎮 Interaktivt CV – fang mine informationer
        </h1>
        <p style={{ color: C.pageSubtle, marginBottom: 16 }}>
          Brug <kbd>←</kbd>/<kbd>→</kbd> og <kbd>Space</kbd> (eller Hop-knappen på mobil).
        </p>
        {!started && (
          <button
            onClick={() => setStarted(true)}
            style={{
              padding: "12px 20px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background:
                "radial-gradient(120% 120% at 0% 0%, #5e6cff 0%, #6d35ff 40%, #ff3cac 100%)",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
            }}
          >
            Start spillet 🚀
          </button>
        )}
      </header>

      {started && (
        <section style={{ marginTop: 18 }}>
          <GameBox />
        </section>
      )}
    </main>
  );
}
