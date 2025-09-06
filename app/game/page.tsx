"use client";

import { useEffect, useRef, useState } from "react";

/* ========= DARK PALETTE ========= */
const C = {
  pageText: "#e9edf6",
  pageSubtle: "rgba(233,237,246,0.75)",
  cardBg: "linear-gradient(180deg, rgba(32,36,56,.55), rgba(22,24,38,.45))",
  cardShadow: "0 12px 40px rgba(0,0,0,0.45)",

  sky: "#0f1625",
  ground: "#3d8d40",
  groundEdge: "#6f63d8",
  platform: "#7d92a3",

  player: "#3aa0ff",
  playerHat: "#0d1320",

  goalPole: "#bfc6d0",
  goalFlag: "#ff5b5b",

  cloudBg: "rgba(20,22,35,0.92)",
  cloudStroke: "rgba(255,255,255,0.06)",
  cloudText: "#e9edf6",
  chipBg: "rgba(255,255,255,0.06)",
  chipBorder: "rgba(255,255,255,0.16)",
  chipText: "#edf2ff",

  toastBg: "rgba(0,0,0,0.7)",
  toastText: "#ffffff",
};

const PROFILE = {
  name: "Elisabeth Lennert",
  title: "Software Engineer • Full-stack ",
  email: "ElisabethBinzerLennert@gmail.com",
  phone: "+45 52  52 46 03",
  linkedin: "https://www.linkedin.com/in/e-lennert",
  github: "https://github.com/CodeBloodedMama",
  website: "https://e-lennert.vercel.app",
  location: "Aarhus, DK",
};

/* ========= PAGE (/game) ========= */
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

/* ========= GAME ========= */
type Rect = { x: number; y: number; w: number; h: number };
type Coin = Rect & { id: string; label: string; value: string; got?: boolean };
type Player = { x: number; y: number; w: number; h: number; vx: number; vy: number; onGround: boolean };

const CANVAS_W = 640;
const CANVAS_H = 360;

function GameBox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [collected, setCollected] = useState<Record<string, string>>({});
  const [pressed, setPressed] = useState(false);
  const keys = useRef({ left: false, right: false, jump: false });

  const levelWidth = 1800;
  const gravity = 0.9;
  const moveSpeed = 3.0;
  const jumpStrength = 15.5;
  const groundY = 260;

  const playerRef = useRef<Player>({ x: 60, y: 0, w: 16, h: 22, vx: 0, vy: 0, onGround: false });
  const cameraX = useRef(0);

  const platforms: Rect[] = [
    { x: 120, y: groundY - 52, w: 120, h: 10 },
    { x: 430, y: groundY - 92, w: 150, h: 10 },
    { x: 820, y: groundY - 72, w: 160, h: 10 },
    { x: 1180, y: groundY - 112, w: 130, h: 10 },
    { x: 1480, y: groundY - 58, w: 160, h: 10 },
  ];

  const coinsRef = useRef<Coin[]>([
    { id: "email",    x: 170,  y: groundY - 90,  w: 20, h: 20, label: "Email",    value: PROFILE.email },
    { id: "phone",    x: 500,  y: groundY - 130, w: 20, h: 20, label: "Telefon",  value: PROFILE.phone },
    { id: "linkedin", x: 870,  y: groundY - 110, w: 20, h: 20, label: "LinkedIn", value: PROFILE.linkedin },
    { id: "github",   x: 1210, y: groundY - 150, w: 20, h: 20, label: "GitHub",   value: PROFILE.github },
    { id: "website",  x: 1520, y: groundY - 95,  w: 20, h: 20, label: "Website",  value: PROFILE.website },
    { id: "location", x: 1655, y: groundY - 125, w: 20, h: 20, label: "Lokation", value: PROFILE.location },
  ]);

  const goal: Rect = { x: levelWidth - 60, y: groundY - 110, w: 10, h: 110 };

  useEffect(() => {
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;
    cvs.width = CANVAS_W;
    cvs.height = CANVAS_H;

    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.current.left = true;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.current.right = true;
      if ([" ", "ArrowUp", "w", "W"].includes(e.key)) { keys.current.jump = true; e.preventDefault(); }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.current.left = false;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.current.right = false;
      if ([" ", "ArrowUp", "w", "W"].includes(e.key)) keys.current.jump = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    let raf = 0;
    const loop = () => { update(); render(ctx); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function rectsOverlap(a: Rect, b: Rect) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function update() {
    if (showCard) return;
    const p = playerRef.current;

    p.vx = (keys.current.left ? -moveSpeed : 0) + (keys.current.right ? moveSpeed : 0);
    p.vy += gravity;
    if (keys.current.jump && p.onGround) { p.vy = -jumpStrength; p.onGround = false; }

    let nextX = Math.max(0, Math.min(levelWidth - p.w, p.x + p.vx));
    let nextY = p.y + p.vy;

    const solids: Rect[] = [{ x: 0, y: groundY, w: levelWidth, h: 200 }, ...platforms];
    const horiz: Rect = { x: nextX, y: p.y, w: p.w, h: p.h };
    for (const s of solids) if (rectsOverlap(horiz, s)) nextX = p.vx > 0 ? s.x - p.w : s.x + s.w;

    const vert: Rect = { x: nextX, y: nextY, w: p.w, h: p.h };
    p.onGround = false;
    for (const s of solids) {
      if (!rectsOverlap(vert, s)) continue;
      if (p.vy > 0) { nextY = s.y - p.h; p.onGround = true; p.vy = 0; }
      else { nextY = s.y + s.h; p.vy = 2; }
    }

    p.x = nextX; p.y = nextY;

    for (const c of coinsRef.current) {
      if (!c.got && rectsOverlap({ x: p.x, y: p.y, w: p.w, h: p.h }, c)) {
        c.got = true;
        setCollected(prev => ({ ...prev, [c.label]: c.value }));
        flashToast(`${c.label}: ${c.value}`);
      }
    }

    const margin = 120;
    const target = Math.min(Math.max(0, p.x - margin), Math.max(0, levelWidth - CANVAS_W));
    cameraX.current += (target - cameraX.current) * 0.18;

    const atGoal = rectsOverlap({ x: p.x, y: p.y, w: p.w, h: p.h }, goal);
    if (atGoal && coinsRef.current.every(c => c.got)) { setShowCard(true); setToast(null); }
  }

  function flashToast(t: string) { setToast(t); setTimeout(() => setToast(s => (s === t ? null : s)), 1200); }
  function copy(text: string) { navigator.clipboard.writeText(text).then(() => flashToast("Kopieret ✅")); }

  function render(ctx: CanvasRenderingContext2D) {
    // baggrund (dark)
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = C.sky; ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // HUD-sky (dark glass)
    drawCloudHUD(ctx, coinsRef.current.length, Object.keys(collected), toast);

    ctx.save(); ctx.translate(-cameraX.current, 0);

    // jord
    ctx.fillStyle = C.ground; ctx.fillRect(0, groundY + 10, levelWidth, CANVAS_H - (groundY + 10));
    ctx.fillStyle = C.groundEdge; ctx.fillRect(0, groundY, levelWidth, 10);

    // platforme
    ctx.fillStyle = C.platform; platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

    // mønter
    for (const c of coinsRef.current) if (!c.got) drawCoin(ctx, c.x + c.w / 2, c.y + c.h / 2, 10);

    // mål-flag
    ctx.fillStyle = C.goalPole; ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    ctx.fillStyle = C.goalFlag; ctx.fillRect(goal.x + 10, goal.y, 20, 14);

    // spiller
    const p = playerRef.current;
    ctx.fillStyle = C.player; ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = C.playerHat; ctx.fillRect(p.x + 3, p.y - 3, p.w - 6, 3);

    ctx.restore();
  }

  return (
    <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
      <div
        style={{
          width: CANVAS_W,
          borderRadius: 12,
          padding: 8,
          background: C.cardBg,
          boxShadow: C.cardShadow,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto", borderRadius: 8, background: C.sky, display: "block" }}
        />
      </div>

      {/* Hop-knap (dark) */}
      <button
        onMouseDown={() => { keys.current.jump = true; setPressed(true); }}
        onMouseUp={() => { keys.current.jump = false; setPressed(false); }}
        onTouchStart={(e) => { e.preventDefault(); keys.current.jump = true; setPressed(true); }}
        onTouchEnd={() => { keys.current.jump = false; setPressed(false); }}
        aria-label="Hop"
        style={{
          marginTop: 10,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.14)",
          background: pressed ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
          color: C.pageText,
          boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        Hop ⤴️
      </button>

      {showCard && <BusinessCard onClose={() => setShowCard(false)} copy={copy} />}
    </div>
  );
}

/* ======== Tegnehelpers (dark aware) ======== */
function drawCoin(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  const grad = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.6, r * 0.2, cx, cy, r);
  grad.addColorStop(0, "#fff39c"); grad.addColorStop(0.5, "#ffd447"); grad.addColorStop(1, "#c98700");
  ctx.fillStyle = grad; ctx.fill(); ctx.closePath();
  ctx.strokeStyle = "rgba(0,0,0,0.35)"; ctx.lineWidth = 1; ctx.beginPath();
  ctx.arc(cx, cy, r - 3, 0, Math.PI * 2); ctx.stroke(); ctx.closePath();
}

function drawCloudHUD(
  ctx: CanvasRenderingContext2D,
  total: number,
  keys: string[],
  toast: string | null
) {
  const x = 10, y = 8, w = CANVAS_W - 20, h = 50, r = 16;
  // mørk “sky”
  ctx.fillStyle = C.cloudBg;
  ctx.strokeStyle = C.cloudStroke; ctx.lineWidth = 1;
  roundRect(ctx, x, y, w, h, r, true, true);

  // tekst + chips
  ctx.fillStyle = C.cloudText; ctx.font = "12px ui-sans-serif, system-ui, -apple-system"; ctx.textAlign = "left";
  ctx.fillText("Indsamlet:", x + 12, y + 20);

  let bx = x + 88, by = y + 10;
  for (const label of keys) {
    const txt = label;
    const tw = Math.ceil(ctx.measureText(txt).width);
    const bw = tw + 18, bh = 26;
    ctx.fillStyle = C.chipBg; roundRect(ctx, bx, by, bw, bh, 8, true, false);
    ctx.strokeStyle = C.chipBorder; ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = C.chipText; ctx.fillText(txt, bx + 9, by + 17);
    bx += bw + 6; if (bx > x + w - 70) break;
  }

  // progress højre
  ctx.textAlign = "right"; ctx.fillStyle = C.cloudText;
  ctx.fillText(`${keys.length}/${total}`, x + w - 12, y + 20);

  // toast under skyen
  if (toast) {
    ctx.fillStyle = C.toastBg;
    const pad = 8;
    const tw = ctx.measureText(toast).width;
    const bw = Math.min(w - 40, tw + pad * 2);
    const bx2 = x + (w - bw) / 2, by2 = y + 26;
    ctx.fillRect(bx2, by2, bw, 24);
    ctx.fillStyle = C.toastText; ctx.textAlign = "center";
    ctx.fillText(toast, x + w / 2, by2 + 16);
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: boolean, stroke: boolean) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function BusinessCard({
  onClose,
  copy,
}: {
  onClose: () => void;
  copy: (t: string) => void;
}) {
  const [flipped, setFlipped] = React.useState(false);

  const allText = `${PROFILE.name} — ${PROFILE.title}
Email: ${PROFILE.email}
Tlf: ${PROFILE.phone}
LinkedIn: ${PROFILE.linkedin}
GitHub: ${PROFILE.github}
Website: ${PROFILE.website}
Lokation: ${PROFILE.location}`;

  function downloadVCard() {
    const vcf = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${PROFILE.name}`,
      `TITLE:${PROFILE.title}`,
      `EMAIL;TYPE=INTERNET,WORK:${PROFILE.email}`,
      `TEL;TYPE=CELL,VOICE:${PROFILE.phone.replace(/\s+/g, "")}`,
      `URL:${PROFILE.website}`,
      `item1.URL:${PROFILE.linkedin}`,
      "item1.X-ABLabel:LinkedIn",
      `ADR;TYPE=WORK:;;${PROFILE.location};;;;`,
      "END:VCARD",
    ].join("\n");
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${PROFILE.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50,
      }}
    >
      {/* Card frame */}
      <div
        style={{
          width: "min(820px, 94vw)",
          display: "grid",
          gap: 14,
          color: "#e9edf6",
        }}
      >
        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={() => copy(allText)}
              style={ghostBtn}
              title="Kopiér alle informationer"
            >
              📋 Copy all
            </button>
            <button onClick={downloadVCard} style={ghostBtn} title=".vcf">
              💾 Download vCard
            </button>
            <button
              onClick={() => setFlipped((f) => !f)}
              style={ghostBtn}
              title="Flip kort"
            >
              🔁 Flip
            </button>
          </div>
          <button onClick={onClose} style={primaryBtn}>
            Luk kortet ✅
          </button>
        </div>

        {/* 3D flip card */}
        <div style={stage}>
          <div
            style={{
              ...card3D,
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT */}
            <div style={cardFront}>
              {/* foil kant */}
              <div style={foilEdge} />
              {/* top row */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={logoBubble}>
                  <span style={{ fontWeight: 800, fontSize: 18 }}>
                    {PROFILE.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <div style={microText}>e-lennert.dev • crafted in JS</div>
              </div>

              <h2 style={frontName}>{PROFILE.name}</h2>
              <p style={frontTitle}>{PROFILE.title}</p>

              {/* bottom line */}
              <div style={tagRow}>
                <span style={chip}>React</span>
                <span style={chip}>Next.js</span>
                <span style={chip}>TypeScript</span>
                <span style={chip}>UX</span>
              </div>
            </div>

            {/* BACK */}
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
                {/* “QR”-felt som æstetisk element (ikke genereret, bare look) */}
                <div style={qrWrap}>
                  <div style={qrFake} />
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
                    Scan me
                  </div>
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

/* ---------- små UI helpers ---------- */
function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "24px 86px 1fr",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <span style={{ wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

/* ---------- styles ---------- */
const stage: React.CSSProperties = {
  perspective: 1200,
};

const card3D: React.CSSProperties = {
  position: "relative",
  width: "min(820px, 94vw)",
  height: 260,
  transformStyle: "preserve-3d",
  transition: "transform .8s cubic-bezier(.2,.8,.2,1)",
};

const baseCard: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: 16,
  background:
    "linear-gradient(145deg, #121826, #0d1320 50%, #121826 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
  padding: 20,
  display: "grid",
};

const cardFront: React.CSSProperties = {
  ...baseCard,
  backfaceVisibility: "hidden",
  gridTemplateRows: "auto 1fr auto",
};

const cardBack: React.CSSProperties = {
  ...baseCard,
  transform: "rotateY(180deg)",
  backfaceVisibility: "hidden",
  gridTemplateRows: "auto 1fr auto",
};

const foilEdge: React.CSSProperties = {
  position: "absolute",
  inset: -1,
  borderRadius: 16,
  background:
    "conic-gradient(from 10deg at 10% 10%, rgba(255,255,255,.2), rgba(255,255,255,0) 12%), linear-gradient(135deg,#7b66ff, #ff3cac, #33d2ff)",
  WebkitMask:
    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
  padding: 1,
  opacity: 0.65,
  pointerEvents: "none",
};

const logoBubble: React.CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  background:
    "radial-gradient(120% 120% at 0% 0%, #5e6cff 0%, #6d35ff 40%, #ff3cac 100%)",
  boxShadow: "0 8px 20px rgba(109,53,255,0.38)",
};

const microText: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: 1.2,
  opacity: 0.55,
  alignSelf: "center",
};

const frontName: React.CSSProperties = {
  margin: "8px 0 4px",
  fontSize: 32,
  letterSpacing: 0.2,
};

const frontTitle: React.CSSProperties = {
  margin: 0,
  opacity: 0.8,
};

const tagRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignSelf: "end",
};

const chip: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.16)",
};

const stripe: React.CSSProperties = {
  height: 32,
  borderRadius: 10,
  background:
    "repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 10px, rgba(255,255,255,.02) 10px 20px)",
  marginBottom: 10,
};

const backInner: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 160px",
  gap: 16,
  alignItems: "start",
};

const contactCol: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const qrWrap: React.CSSProperties = {
  display: "grid",
  placeItems: "center",
  alignContent: "start",
};

const qrFake: React.CSSProperties = {
  width: 120,
  height: 120,
  borderRadius: 8,
  background:
    "repeating-linear-gradient(0deg,#fff 0 8px,#000 8px 16px), repeating-linear-gradient(90deg,#fff 0 8px,#000 8px 16px)",
  mixBlendMode: "screen",
  filter: "contrast(140%) brightness(65%)",
  border: "1px solid rgba(255,255,255,0.15)",
};

const microTextBack: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: 1.1,
  opacity: 0.6,
  textAlign: "right",
};

const ghostBtn: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.06)",
  color: "#e9edf6",
  cursor: "pointer",
};

const primaryBtn: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "none",
  background:
    "radial-gradient(120% 120% at 0% 0%, #5e6cff 0%, #6d35ff 40%, #ff3cac 100%)",
  color: "white",
  cursor: "pointer",
};


function ContactRow({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return (
    <li
      style={{
        display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 10, alignItems: "center",
        padding: "8px 0", borderBottom: "1px dashed rgba(255,255,255,0.12)",
        color: C.pageText,
      }}
    >
      <strong>{label}</strong>
      <span style={{ overflowWrap: "anywhere" }}>{value}</span>
      <span style={{ display: "flex", gap: 6 }}>
        <button
          onClick={() => navigator.clipboard.writeText(value)}
          style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.06)", color: C.pageText, cursor: "pointer" }}
          title="Kopiér"
        >
          📋
        </button>
        {children}
      </span>
    </li>
  );
}
