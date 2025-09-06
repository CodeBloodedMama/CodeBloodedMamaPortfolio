"use client";
import React from "react";
import { PROFILE } from "./constants";

export default function BusinessCard({
  onClose,
  copy,
}: {
  onClose: () => void;
  copy: (t: string) => void;
}) {
  const [flipped, setFlipped] = React.useState(false);

  // Lukker med ESC
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const allText = `${PROFILE.name} — ${PROFILE.title}
Email: ${PROFILE.email}
Tlf: ${PROFILE.phone}
LinkedIn: ${PROFILE.linkedin}
GitHub: ${PROFILE.github}
Website: ${PROFILE.website}
Lokation: ${PROFILE.location}`;

  function downloadVCard() {
    const vcf = [
      "BEGIN:VCARD","VERSION:3.0",
      `FN:${PROFILE.name}`,`TITLE:${PROFILE.title}`,
      `EMAIL;TYPE=INTERNET,WORK:${PROFILE.email}`,
      `TEL;TYPE=CELL,VOICE:${PROFILE.phone.replace(/\s+/g, "")}`,
      `URL:${PROFILE.website}`,
      `item1.URL:${PROFILE.linkedin}`,"item1.X-ABLabel:LinkedIn",
      `ADR;TYPE=WORK:;;${PROFILE.location};;;;`,"END:VCARD",
    ].join("\n");
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${PROFILE.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} // lukker når man klikker udenfor
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
        display: "grid", placeItems: "center", padding: 16, zIndex: 50,
      }}
    >
      <div style={{ width: "min(820px, 94vw)", display: "grid", gap: 14, color: "#e9edf6" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => copy(allText)} style={ghostBtn} title="Kopiér alle">
              📋 Copy all
            </button>
            <button onClick={downloadVCard} style={ghostBtn} title=".vcf">
              💾 Download vCard
            </button>
            <button onClick={() => setFlipped((f) => !f)} style={ghostBtn} title="Flip">
              🔁 Flip
            </button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={ghostBtn} title="Tilbage til spil">
              ← Tilbage
            </button>
            <button onClick={onClose} style={primaryBtn}>
              Luk kortet ✅
            </button>
          </div>
        </div>

        <div style={stage}>
          <div style={{ ...card3D, transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
            <div style={cardFront}>
              <div style={foilEdge} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={logoBubble}>
                  <span style={{ fontWeight: 800, fontSize: 18 }}>
                    {PROFILE.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div style={microText}>e-lennert.dev • crafted in JS</div>
              </div>
              <h2 style={frontName}>{PROFILE.name}</h2>
              <p style={frontTitle}>{PROFILE.title}</p>
              <div style={tagRow}>
                <span style={chip}>React</span><span style={chip}>Next.js</span>
                <span style={chip}>TypeScript</span><span style={chip}>UX</span>
              </div>
            </div>

            <div style={cardBack}>
              <div style={stripe} />
              <div style={backInner}>
                <div style={contactCol}>
                  <Row icon="✉️" label="Email" value={PROFILE.email} />
                  <Row icon="📞" label="Telefon" value={PROFILE.phone} />
                  <Row icon="🔗" label="LinkedIn" value={PROFILE.linkedin} />
                  <Row icon="💻" label="GitHub" value={PROFILE.github} />
                  <Row icon="🌐" label="Website" value={PROFILE.website} />
                  <Row icon="📍" label="Lokation" value={PROFILE.location} />
                </div>
                <div style={qrWrap}>
                  <div style={qrFake} />
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>Scan me</div>
                </div>
              </div>
              <div style={microTextBack}>
                © {new Date().getFullYear()} Elisabeth Lennert — All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "24px 86px 1fr", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <span style={{ wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

const stage: React.CSSProperties = { perspective: 1200 };
const card3D: React.CSSProperties = {
  position: "relative",
  width: "min(820px, 94vw)",
  height: 260,
  transformStyle: "preserve-3d",
  transition: "transform .8s cubic-bezier(.2,.8,.2,1)",
};
const baseCard: React.CSSProperties = {
  position: "absolute", inset: 0, borderRadius: 16,
  background: "linear-gradient(145deg, #121826, #0d1320 50%, #121826 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
  padding: 20, display: "grid",
};
const cardFront: React.CSSProperties = { ...baseCard, backfaceVisibility: "hidden", gridTemplateRows: "auto 1fr auto" };
const cardBack: React.CSSProperties = { ...baseCard, transform: "rotateY(180deg)", backfaceVisibility: "hidden", gridTemplateRows: "auto 1fr auto" };
const foilEdge: React.CSSProperties = {
  position: "absolute", inset: -1, borderRadius: 16,
  background: "conic-gradient(from 10deg at 10% 10%, rgba(255,255,255,.2), rgba(255,255,255,0) 12%), linear-gradient(135deg,#7b66ff, #ff3cac, #33d2ff)",
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1, opacity: 0.65, pointerEvents: "none",
};
const logoBubble: React.CSSProperties = {
  width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center",
  background: "radial-gradient(120% 120% at 0% 0%, #5e6cff 0%, #6d35ff 40%, #ff3cac 100%)",
  boxShadow: "0 8px 20px rgba(109,53,255,0.38)",
};
const microText: React.CSSProperties = { fontSize: 10, letterSpacing: 1.2, opacity: 0.55, alignSelf: "center" };
const frontName: React.CSSProperties = { margin: "8px 0 4px", fontSize: 32, letterSpacing: 0.2 };
const frontTitle: React.CSSProperties = { margin: 0, opacity: 0.8 };
const tagRow: React.CSSProperties = { display: "flex", gap: 8, alignSelf: "end" };
const chip: React.CSSProperties = { padding: "6px 10px", borderRadius: 999, fontSize: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)" };
const stripe: React.CSSProperties = { height: 32, borderRadius: 10, background: "repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 10px, rgba(255,255,255,.02) 10px 20px)", marginBottom: 10 };
const backInner: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 160px", gap: 16, alignItems: "start" };
const contactCol: React.CSSProperties = { display: "grid", gap: 8 };
const qrWrap: React.CSSProperties = { display: "grid", placeItems: "center", alignContent: "start" };
const qrFake: React.CSSProperties = {
  width: 120, height: 120, borderRadius: 8,
  background: "repeating-linear-gradient(0deg,#fff 0 8px,#000 8px 16px), repeating-linear-gradient(90deg,#fff 0 8px,#000 8px 16px)",
  mixBlendMode: "screen", filter: "contrast(140%) brightness(65%)", border: "1px solid rgba(255,255,255,0.15)",
};
const microTextBack: React.CSSProperties = { fontSize: 10, letterSpacing: 1.1, opacity: 0.6, textAlign: "right" };
const ghostBtn: React.CSSProperties = { padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.06)", color: "#e9edf6", cursor: "pointer" };
const primaryBtn: React.CSSProperties = { padding: "8px 12px", borderRadius: 10, border: "none", background: "radial-gradient(120% 120% at 0% 0%, #5e6cff 0%, #6d35ff 40%, #ff3cac 100%)", color: "white", cursor: "pointer" };

