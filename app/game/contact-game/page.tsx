"use client";

import { useEffect, useRef, useState } from "react";

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

export default function GameLanding() {
  const [started, setStarted] = useState(false);

  return (
    <main style={{ maxWidth: 980, margin: "40px auto", padding: 16 }}>
      <header style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", marginBottom: 6 }}>
          🎮 Interaktivt CV – fang mine informationer
        </h1>
        <p style={{ opacity: 0.75, marginBottom: 16 }}>
          Brug <kbd>←</kbd>/<kbd>→</kbd> og <kbd>Space</kbd> (eller Hop-knappen på mobil).
        </p>
        {!started && (
          <button
            onClick={() => setStarted(true)}
            style={{
              padding: "12px 20px",
              borderRadius: 10,
              border: "none",
              background:
                "radial-gradient(120% 120% at 0% 0%, #5e6cff 0%, #6d35ff 40%, #ff3cac 100%)",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 28px rgba(109,53,255,0.32)",
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

/* ========= SPILLET  ========= */
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

  // verden
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

  // synlige "mønter" (kontakt-info)
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
      if ([" ", "ArrowUp", "w", "W"].includes(e.key)) {
        keys.current.jump = true;
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") keys.current.left = false;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") keys.current.right = false;
      if ([" ", "ArrowUp", "w", "W"].includes(e.key)) keys.current.jump = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    let raf = 0;
    const loop = () => {
      update();
      render(ctx);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function rectsOverlap(a: Rect, b: Rect) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function update() {
    if (showCard) return;
    const p = playerRef.current;

    // bevægelse
    p.vx = (keys.current.left ? -moveSpeed : 0) + (keys.current.right ? moveSpeed : 0);
    p.vy += gravity;
    if (keys.current.jump && p.onGround) { p.vy = -jumpStrength; p.onGround = false; }

    let nextX = Math.max(0, Math.min(levelWidth - p.w, p.x + p.vx));
    let nextY = p.y + p.vy;

    // collisions (kun jord + platforme)
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

    // saml mønter
    for (const c of coinsRef.current) {
      if (!c.got && rectsOverlap({ x: p.x, y: p.y, w: p.w, h: p.h }, c)) {
        c.got = true;
        setCollected(prev => ({ ...prev, [c.label]: c.value }));
        flashToast(`${c.label}: ${c.value}`);
      }
    }

    // kamera (boxed canvas)
    const margin = 120;
    const target = Math.min(Math.max(0, p.x - margin), Math.max(0, levelWidth - CANVAS_W));
    cameraX.current += (target - cameraX.current) * 0.18;

    // mål
    const atGoal = rectsOverlap({ x: p.x, y: p.y, w: p.w, h: p.h }, goal);
    if (atGoal && coinsRef.current.every(c => c.got)) { setShowCard(true); setToast(null); }
  }

  function flashToast(t: string) { setToast(t); setTimeout(() => setToast(s => (s === t ? null : s)), 1200); }
  function copy(text: string) { navigator.clipboard.writeText(text).then(() => flashToast("Kopieret ✅")); }

  function render(ctx: CanvasRenderingContext2D) {
    // baggrund
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "#e7f0ff"; ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // HUD-sky
    drawCloudHUD(ctx, coinsRef.current.length, Object.keys(collected), toast);

    ctx.save(); ctx.translate(-cameraX.current, 0);

    // jord
    ctx.fillStyle = "#6ab04c"; ctx.fillRect(0, groundY + 10, levelWidth, CANVAS_H - (groundY + 10));
    ctx.fillStyle = "#8c7ae6"; ctx.fillRect(0, groundY, levelWidth, 10);

    // platforme
    ctx.fillStyle = "#95afc0"; platforms.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));

    // mønter (guld-cirkel med highlight)
    for (const c of coinsRef.current) {
      if (c.got) continue;
      drawCoin(ctx, c.x + c.w / 2, c.y + c.h / 2, 10);
    }

    // mål-flag
    ctx.fillStyle = "#2d3436"; ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    ctx.fillStyle = "#e74c3c"; ctx.fillRect(goal.x + 10, goal.y, 20, 14);

    // spiller
    const p = playerRef.current;
    ctx.fillStyle = "#0984e3"; ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = "#2d3436"; ctx.fillRect(p.x + 3, p.y - 3, p.w - 6, 3);

    ctx.restore();
  }

  return (
    <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
      <div
        style={{
          width: CANVAS_W,
          borderRadius: 12,
          padding: 8,
          background: "linear-gradient(180deg, rgba(255,255,255,.6), rgba(255,255,255,.3))",
          boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto", borderRadius: 8, background: "#e7f0ff", display: "block" }}
        />
      </div>

      {/* Hop-knap holdes i samme sektion */}
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
          border: "1px solid #ddd",
          background: pressed ? "#f1f1f1" : "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        }}
      >
        Hop ⤴️
      </button>

      {/* Visitkort-overlay */}
      {showCard && <BusinessCard onClose={() => setShowCard(false)} copy={copy} />}
    </div>
  );
}

/* ======== Tegnehelpers ======== */
function drawCoin(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  // guld
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  const grad = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.6, r * 0.2, cx, cy, r);
  grad.addColorStop(0, "#fff39c"); grad.addColorStop(0.5, "#ffd447"); grad.addColorStop(1, "#f0a400");
  ctx.fillStyle = grad; ctx.fill(); ctx.closePath();
  // highlight-streg
  ctx.strokeStyle = "rgba(0,0,0,0.15)"; ctx.lineWidth = 1; ctx.beginPath();
  ctx.arc(cx, cy, r - 3, 0, Math.PI * 2); ctx.stroke(); ctx.closePath();
}

function drawCloudHUD(
  ctx: CanvasRenderingContext2D,
  total: number,
  keys: string[],
  toast: string | null
) {
  const x = 10, y = 8, w = CANVAS_W - 20, h = 50, r = 16;
  // sky
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.strokeStyle = "rgba(0,0,0,0.06)"; ctx.lineWidth = 1;
  roundRect(ctx, x, y, w, h, r, true, true);

  // tekst + chips
  ctx.fillStyle = "#2d3436"; ctx.font = "12px ui-sans-serif, system-ui, -apple-system"; ctx.textAlign = "left";
  ctx.fillText("Indsamlet:", x + 12, y + 20);

  let bx = x + 88, by = y + 10;
  for (const label of keys) {
    const txt = label;
    const tw = Math.ceil(ctx.measureText(txt).width);
    const bw = tw + 18, bh = 26;
    ctx.fillStyle = "white"; roundRect(ctx, bx, by, bw, bh, 8, true, false);
    ctx.strokeStyle = "rgba(0,0,0,0.08)"; ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = "#333"; ctx.fillText(txt, bx + 9, by + 17);
    bx += bw + 6; if (bx > x + w - 70) break;
  }

  // progress højre
  ctx.textAlign = "right"; ctx.fillStyle = "#2d3436";
  ctx.fillText(`${keys.length}/${total}`, x + w - 12, y + 20);

  // toast under skyen
  if (toast) {
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    const pad = 8;
    const tw = ctx.measureText(toast).width;
    const bw = Math.min(w - 40, tw + pad * 2);
    const bx2 = x + (w - bw) / 2, by2 = y + 26;
    ctx.fillRect(bx2, by2, bw, 24);
    ctx.fillStyle = "white"; ctx.textAlign = "center";
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

/* ======== Visitkort ======== */
function BusinessCard({ onClose, copy }: { onClose: () => void; copy: (t: string) => void }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
        display: "grid", placeItems: "center", padding: 16,
      }}
    >
      <div
        style={{
          width: "min(560px, 92vw)", background: "white", borderRadius: 14,
          padding: 20, boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0 }}>{PROFILE.name}</h2>
            <p style={{ margin: "2px 0 10px", opacity: 0.8 }}>{PROFILE.title}</p>
          </div>
          <button
            onClick={() =>
              copy(
                `${PROFILE.name} — ${PROFILE.title}\nEmail: ${PROFILE.email}\nTlf: ${PROFILE.phone}\nLinkedIn: ${PROFILE.linkedin}\nGitHub: ${PROFILE.github}\nWebsite: ${PROFILE.website}\nLokation: ${PROFILE.location}`
              )
            }
            style={{
              alignSelf: "flex-start", padding: "8px 12px", borderRadius: 8,
              border: "1px solid #ddd", background: "white", cursor: "pointer",
            }}
          >
            Kopiér hele kortet 📋
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: "10px 0" }}>
          <ContactRow label="Email" value={PROFILE.email}><a href={`mailto:${PROFILE.email}`}>Skriv mail</a></ContactRow>
          <ContactRow label="Telefon" value={PROFILE.phone}><a href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}>Ring</a></ContactRow>
          <ContactRow label="LinkedIn" value={PROFILE.linkedin}><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">Åbn</a></ContactRow>
          <ContactRow label="GitHub" value={PROFILE.github}><a href={PROFILE.github} target="_blank" rel="noreferrer">Åbn</a></ContactRow>
          <ContactRow label="Website" value={PROFILE.website}><a href={PROFILE.website} target="_blank" rel="noreferrer">Besøg</a></ContactRow>
          <ContactRow label="Lokation" value={PROFILE.location} />
        </ul>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={() => location.reload()}
            style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd", background: "white", cursor: "pointer" }}
          >
            Spil igen 🔁
          </button>
          <button
            onClick={onClose}
            style={{ padding: "10px 14px", borderRadius: 8, border: "none", background: "#2ecc71", color: "white", cursor: "pointer" }}
          >
            Luk kortet ✅
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return (
    <li
      style={{
        display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 10, alignItems: "center",
        padding: "8px 0", borderBottom: "1px dashed #eee",
      }}
    >
      <strong>{label}</strong>
      <span style={{ overflowWrap: "anywhere" }}>{value}</span>
      <span style={{ display: "flex", gap: 6 }}>
        <button
          onClick={() => navigator.clipboard.writeText(value)}
          style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ddd", background: "white", cursor: "pointer" }}
          title="Kopiér"
        >
          📋
        </button>
        {children}
      </span>
    </li>
  );
}
