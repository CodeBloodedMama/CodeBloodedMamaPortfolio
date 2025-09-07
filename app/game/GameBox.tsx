"use client";
import { useEffect, useRef, useState } from "react";
import {
  C,
  PROFILE,
  CANVAS_W,
  CANVAS_H,
  LEVEL_W,
  GROUND_Y,
  GRAVITY,
  MOVE_SPEED,
  JUMP_STRENGTH,
} from "./constants";
import { Rect, Coin, Player } from "./types";
import { drawCoin, drawCloudHUD } from "./draw";
import { roundRect } from "./draw";
import StatusPanel from "./StatusPanel";
import BusinessCard from "./BusinessCard";

export default function GameBox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [collected, setCollected] = useState<Record<string, string>>({});
  const [pressed, setPressed] = useState(false);
  const keys = useRef({ left: false, right: false, jump: false });

  // states til ipad og iphone;
  const [pressedLeft, setPressedLeft] = useState(false);
  const [pressedRight, setPressedRight] = useState(false);
  const [pressedJump, setPressedJump] = useState(false);

  function holdLeft(down: boolean) {
    keys.current.left = down;
    setPressedLeft(down);
  }
  function holdRight(down: boolean) {
    keys.current.right = down;
    setPressedRight(down);
  }
  function holdJump(down: boolean) {
    keys.current.jump = down;
    setPressedJump(down);
  }

  const playerRef = useRef<Player>({
    x: 60,
    y: 0,
    w: 16,
    h: 22,
    vx: 0,
    vy: 0,
    onGround: false,
  });
  const cameraX = useRef(0);

  const platforms: Rect[] = [
    { x: 120, y: GROUND_Y - 52, w: 120, h: 10 },
    { x: 430, y: GROUND_Y - 92, w: 150, h: 10 },
    { x: 820, y: GROUND_Y - 72, w: 160, h: 10 },
    { x: 1180, y: GROUND_Y - 112, w: 130, h: 10 },
    { x: 1480, y: GROUND_Y - 58, w: 160, h: 10 },
  ];

  const ORDER: Array<{ id: string; label: string; icon: string }> = [
    { id: "email", label: "Email", icon: "✉️" },
    { id: "phone", label: "Telefon", icon: "📞" },
    { id: "linkedin", label: "LinkedIn", icon: "🔗" },
    { id: "github", label: "GitHub", icon: "💻" },
    { id: "website", label: "Website", icon: "🌐" },
    { id: "location", label: "Lokation", icon: "📍" },
  ];

  const coinsRef = useRef<Coin[]>([
    {
      id: "email",
      x: 170,
      y: GROUND_Y - 90,
      w: 20,
      h: 20,
      label: "Email",
      value: PROFILE.email,
    },
    {
      id: "phone",
      x: 500,
      y: GROUND_Y - 130,
      w: 20,
      h: 20,
      label: "Telefon",
      value: PROFILE.phone,
    },
    {
      id: "linkedin",
      x: 870,
      y: GROUND_Y - 110,
      w: 20,
      h: 20,
      label: "LinkedIn",
      value: PROFILE.linkedin,
    },
    {
      id: "github",
      x: 1210,
      y: GROUND_Y - 150,
      w: 20,
      h: 20,
      label: "GitHub",
      value: PROFILE.github,
    },
    {
      id: "website",
      x: 1520,
      y: GROUND_Y - 95,
      w: 20,
      h: 20,
      label: "Website",
      value: PROFILE.website,
    },
    {
      id: "location",
      x: 1655,
      y: GROUND_Y - 125,
      w: 20,
      h: 20,
      label: "Lokation",
      value: PROFILE.location,
    },
  ]);

  const goal: Rect = { x: LEVEL_W - 60, y: GROUND_Y - 110, w: 10, h: 110 };
  const totalCoins = coinsRef.current.length;

  useEffect(() => {
    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;
    cvs.width = CANVAS_W;
    cvs.height = CANVAS_H;

    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a")
        keys.current.left = true;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
        keys.current.right = true;
      if ([" ", "ArrowUp", "w", "W"].includes(e.key)) {
        keys.current.jump = true;
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a")
        keys.current.left = false;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
        keys.current.right = false;
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
  }, []);

  function rectsOverlap(a: Rect, b: Rect) {
    return (
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
    );
  }

  function update() {
    if (showCard) return;
    const p = playerRef.current;

    p.vx =
      (keys.current.left ? -MOVE_SPEED : 0) +
      (keys.current.right ? MOVE_SPEED : 0);
    p.vy += GRAVITY;
    if (keys.current.jump && p.onGround) {
      p.vy = -JUMP_STRENGTH;
      p.onGround = false;
    }

    let nextX = Math.max(0, Math.min(LEVEL_W - p.w, p.x + p.vx));
    let nextY = p.y + p.vy;

    const solids: Rect[] = [
      { x: 0, y: GROUND_Y, w: LEVEL_W, h: 200 },
      ...platforms,
    ];
    const horiz: Rect = { x: nextX, y: p.y, w: p.w, h: p.h };
    for (const s of solids)
      if (rectsOverlap(horiz, s)) nextX = p.vx > 0 ? s.x - p.w : s.x + s.w;

    const vert: Rect = { x: nextX, y: nextY, w: p.w, h: p.h };
    p.onGround = false;
    for (const s of solids) {
      if (!rectsOverlap(vert, s)) continue;
      if (p.vy > 0) {
        nextY = s.y - p.h;
        p.onGround = true;
        p.vy = 0;
      } else {
        nextY = s.y + s.h;
        p.vy = 2;
      }
    }

    p.x = nextX;
    p.y = nextY;

    for (const c of coinsRef.current) {
      if (!c.got && rectsOverlap({ x: p.x, y: p.y, w: p.w, h: p.h }, c)) {
        c.got = true;
        setCollected((prev) => ({ ...prev, [c.label]: c.value }));
        flashToast(`${c.label}: ${c.value}`);
      }
    }

    const margin = 120;
    const target = Math.min(
      Math.max(0, p.x - margin),
      Math.max(0, LEVEL_W - CANVAS_W)
    );
    cameraX.current += (target - cameraX.current) * 0.18;

    const atGoal = rectsOverlap({ x: p.x, y: p.y, w: p.w, h: p.h }, goal);
    if (atGoal && coinsRef.current.every((c) => c.got)) {
      setShowCard(true);
      setToast(null);
    }
  }

  function flashToast(t: string) {
    setToast(t);
    setTimeout(() => setToast((s) => (s === t ? null : s)), 1200);
  }
  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => flashToast("Kopieret ✅"));
  }

  function render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = C.sky;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    drawCloudHUD(ctx, coinsRef.current.length, Object.keys(collected), toast);

    ctx.save();
    ctx.translate(-cameraX.current, 0);

    ctx.fillStyle = C.ground;
    ctx.fillRect(0, GROUND_Y + 10, LEVEL_W, CANVAS_H - (GROUND_Y + 10));
    ctx.fillStyle = C.groundEdge;
    ctx.fillRect(0, GROUND_Y, LEVEL_W, 10);

    ctx.fillStyle = C.platform;
    platforms.forEach((p) => ctx.fillRect(p.x, p.y, p.w, p.h));

    for (const c of coinsRef.current)
      if (!c.got) drawCoin(ctx, c.x + c.w / 2, c.y + c.h / 2, 10);

    ctx.fillStyle = C.goalPole;
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    ctx.fillStyle = C.goalFlag;
    ctx.fillRect(goal.x + 10, goal.y, 20, 14);

    const p = playerRef.current;
    ctx.fillStyle = C.player;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = C.playerHat;
    ctx.fillRect(p.x + 3, p.y - 3, p.w - 6, 3);

    ctx.restore();
  }

  const collectedCount = Object.keys(collected).length;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,auto)_1fr] items-start">
      <div
        style={{
          width: CANVAS_W,
          borderRadius: 12,
          padding: 8,
          background: C.cardBg,
          boxShadow: C.cardShadow,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        className="justify-self-center md:justify-self-start"
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 8,
            background: C.sky,
            display: "block",
          }}
        />

        {/* Mobil controller overlay */}
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            touchAction: "none",
          }}
        >
          {/* D-pad venstre */}
          <div
            style={{
              position: "absolute",
              left: 12,
              bottom: 12,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 10,
              padding: 10,
              borderRadius: 16,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.16)",
              boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
              pointerEvents: "auto",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* ← */}
            <button
              aria-label="Left"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                holdLeft(true);
              }}
              onPointerUp={() => holdLeft(false)}
              onPointerCancel={() => holdLeft(false)}
              onPointerLeave={() => holdLeft(false)}
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: pressedLeft
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(255,255,255,0.08)",
                color: "#e9edf6",
                fontSize: 20,
              }}
            >
              ←
            </button>

            {/* → */}
            <button
              aria-label="Right"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                holdRight(true);
              }}
              onPointerUp={() => holdRight(false)}
              onPointerCancel={() => holdRight(false)}
              onPointerLeave={() => holdRight(false)}
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: pressedRight
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(255,255,255,0.08)",
                color: "#e9edf6",
                fontSize: 20,
              }}
            >
              →
            </button>
          </div>

          {/* Hop */}
          <button
            aria-label="Hop"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              holdJump(true);
            }}
            onPointerUp={() => holdJump(false)}
            onPointerCancel={() => holdJump(false)}
            onPointerLeave={() => holdJump(false)}
            style={{
              position: "absolute",
              right: 12,
              bottom: 18,
              width: 68,
              height: 68,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: pressedJump ? "#6d35ff" : "rgba(109,53,255,0.6)",
              color: "white",
              fontWeight: 700,
              fontSize: 14,
              pointerEvents: "auto",
            }}
          >
            JUMP
          </button>
        </div>
      </div>

      <div className="w-full">
        <StatusPanel order={ORDER} collected={collected} total={totalCoins} />
      </div>
      {showCard && (
        <BusinessCard onClose={() => setShowCard(false)} copy={copy} />
      )}
    </div>
  );
}
