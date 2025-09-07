"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export default function Tetris() {
  // --- Config
  const ROWS = 20;
  const COLS = 10;
  const LINES_PER_LEVEL = 10;
  const LEVEL_SPEED_MS = (level: number) =>
    Math.max(80, 800 - (level - 1) * 70);

  // SHAPES
  const SHAPES: number[][][] = useMemo(
    () => [
      [],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ], // I
      [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
      ], // J
      [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
      ], // L
      [
        [4, 4],
        [4, 4],
      ], // O
      [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
      ], // S
      [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
      ], // T
      [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ], // Z
    ],
    []
  );

  // Farver
  const BLOCK_STYLE: Record<number, string> = {
    1: "from-cyan-200 to-cyan-500",
    2: "from-blue-200 to-blue-500",
    3: "from-amber-200 to-amber-500",
    4: "from-yellow-200 to-yellow-400",
    5: "from-emerald-200 to-emerald-500",
    6: "from-violet-200 to-violet-500",
    7: "from-rose-200 to-rose-500",
  };

  // --- State
  type Piece = { id: number; m: number[][]; r: number; c: number };
  const [board, setBoard] = useState<number[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(0))
  );
  const [cur, setCur] = useState<Piece | null>(null);
  const [nextId, setNextId] = useState<number>(() => randId());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [started, setStarted] = useState(false);

  // Responsive (no scroll)
  const [cell, setCell] = useState(16);
  const [boardPx, setBoardPx] = useState({ w: 160, h: 320 });

  const CONTROLS_H = 110; // øg her hvis du vil have endnu m
  const HEADER_H = 72;
  const PAGE_MARGIN = 24;
  const WRAPPER_PAD = 8;

  function randId() {
    return 1 + Math.floor(Math.random() * 7);
  }

  const collides = useCallback((b: number[][], p: Piece) => {
    for (let r = 0; r < p.m.length; r++) {
      for (let c = 0; c < p.m[0].length; c++) {
        if (!p.m[r][c]) continue;
        const rr = p.r + r,
          cc = p.c + c;
        if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) return true;
        if (b[rr][cc] !== 0) return true;
      }
    }
    return false;
  }, []);

  const spawn = useCallback(
    (id?: number) => {
      const pieceId = id ?? nextId;
      const shape = SHAPES[pieceId];
      const startCol = Math.floor((COLS - shape[0].length) / 2);
      const p: Piece = { id: pieceId, m: shape, r: 0, c: startCol };
      setCur(p);
      setNextId(randId());
      if (collides(board, p)) {
        setOver(true);
        setPaused(true);
      }
    },
    [COLS, SHAPES, board, nextId, collides]
  );

  const rotate = useCallback(
    (m: number[][]) => m[0].map((_, i) => m.map((row) => row[i]).reverse()),
    []
  );

  const merge = useCallback((b: number[][], p: Piece) => {
    const nb = b.map((row) => row.slice());
    for (let r = 0; r < p.m.length; r++)
      for (let c = 0; c < p.m[0].length; c++)
        if (p.m[r][c]) nb[p.r + r][p.c + c] = p.id;
    return nb;
  }, []);

  const clearLines = useCallback((b: number[][]) => {
    const full: number[] = [];
    for (let r = 0; r < ROWS; r++) if (b[r].every((v) => v !== 0)) full.push(r);
    if (!full.length) return { b, cleared: 0 };
    const nb = b.filter((_, r) => !full.includes(r));
    while (nb.length < ROWS) nb.unshift(Array(COLS).fill(0));
    return { b: nb, cleared: full.length };
  }, []);

  const addScore = useCallback(
    (cleared: number, softDrop = 0, hard = false) => {
      const base = [0, 100, 300, 500, 800][cleared] ?? 0;
      const dropPts = softDrop + (hard ? 10 : 0);
      setScore((s) => s + base * level + dropPts);
      if (cleared) {
        setLines((n) => {
          const total = n + cleared;
          const newLevel = 1 + Math.floor(total / LINES_PER_LEVEL);
          setLevel((l) => Math.max(l, newLevel));
          return total;
        });
      }
    },
    [level]
  );

  const hardDrop = useCallback(() => {
    if (!cur || over || paused || !started) return;
    let p = { ...cur };
    while (!collides(board, { ...p, r: p.r + 1 })) p.r++;
    const merged = merge(board, p);
    const { b, cleared } = clearLines(merged);
    setBoard(b);
    addScore(cleared, 0, true);
    spawn();
  }, [
    cur,
    over,
    paused,
    started,
    board,
    merge,
    collides,
    clearLines,
    addScore,
    spawn,
  ]);

  const step = useCallback(() => {
    if (!cur || paused || over || !started) return;
    const next = { ...cur, r: cur.r + 1 };
    if (!collides(board, next)) setCur(next);
    else {
      const merged = merge(board, cur);
      const { b, cleared } = clearLines(merged);
      setBoard(b);
      addScore(cleared);
      spawn();
    }
  }, [
    cur,
    paused,
    over,
    started,
    board,
    collides,
    merge,
    clearLines,
    addScore,
    spawn,
  ]);

  const softDrop = useCallback(() => {
    if (!cur || paused || over || !started) return;
    const next = { ...cur, r: cur.r + 1 };
    if (!collides(board, next)) {
      setCur(next);
      addScore(0, 1, false);
    } else {
      const merged = merge(board, cur);
      const { b, cleared } = clearLines(merged);
      setBoard(b);
      addScore(cleared);
      spawn();
    }
  }, [
    cur,
    paused,
    over,
    started,
    board,
    collides,
    merge,
    clearLines,
    addScore,
    spawn,
  ]);

  const move = useCallback(
    (dc: number) => {
      if (!cur || paused || over || !started) return;
      const next = { ...cur, c: cur.c + dc };
      if (!collides(board, next)) setCur(next);
    },
    [cur, paused, over, started, board, collides]
  );

  const rotateCur = useCallback(() => {
    if (!cur || paused || over || !started) return;
    const rm = rotate(cur.m);
    const kicks = [0, -1, 1, -2, 2];
    for (const k of kicks) {
      const next = { ...cur, m: rm, c: cur.c + k };
      if (!collides(board, next)) {
        setCur(next);
        return;
      }
    }
  }, [cur, paused, over, started, board, rotate, collides]);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P") {
        setPaused((p) => !p);
        return;
      }
      if (e.key === "r" || e.key === "R") {
        restart();
        return;
      }
      if (!started || paused || over) return;
      if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowDown") softDrop();
      else if (e.key === "ArrowUp") rotateCur();
      else if (e.code === "Space") {
        e.preventDefault();
        hardDrop();
      }
    },
    [move, softDrop, rotateCur, hardDrop, paused, over, started]
  );

  // Lifecycle
  useEffect(() => {
    if (started && !cur && !over) spawn();
  }, [started, cur, over, spawn]);
  useEffect(() => {
    const id = setInterval(() => step(), LEVEL_SPEED_MS(level));
    return () => clearInterval(id);
  }, [step, level]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKey(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey]);

  function restart() {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    setCur(null);
    setNextId(randId());
    setScore(0);
    setLines(0);
    setLevel(1);
    setPaused(false);
    setOver(false);
  }
  function startGame() {
    restart();
    setStarted(true);
  }

  // Dynamisk cellestørrelse – nu med ekstra reserveret plads nederst
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth,
        vh = window.innerHeight;
      const availableH = Math.max(
        240,
        vh - HEADER_H - CONTROLS_H - PAGE_MARGIN - WRAPPER_PAD
      );
      const availableW = Math.max(240, vw - PAGE_MARGIN * 2 - WRAPPER_PAD);
      const cellSize = Math.floor(
        Math.min(availableH / ROWS, availableW / COLS)
      );
      const clamped = Math.max(12, Math.min(cellSize, 28));
      setCell(clamped);
      setBoardPx({ w: clamped * COLS, h: clamped * ROWS });
      document.body.style.overflow = "hidden";
    };
    calc();
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("resize", calc);
      document.body.style.overflow = "";
    };
  }, []);

  // Ghost + paint
  const ghost = useMemo(() => {
    if (!cur) return null;
    let g = { ...cur };
    while (!collides(board, { ...g, r: g.r + 1 })) g.r++;
    return g;
  }, [cur, board, collides]);

  const painted = useMemo(() => {
    const b = board.map((row) => row.slice());
    if (ghost) paint(b, ghost, 8);
    if (cur) paint(b, cur, cur.id);
    return b;
  }, [board, cur, ghost]);

  function paint(b: number[][], p: Piece, val: number) {
    for (let r = 0; r < p.m.length; r++)
      for (let c = 0; c < p.m[0].length; c++)
        if (p.m[r][c]) {
          const rr = p.r + r,
            cc = p.c + c;
          if (rr >= 0 && rr < ROWS && cc >= 0 && cc < COLS) b[rr][cc] = val;
        }
  }

  // --- UI LAYOUT ---
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black text-white overflow-hidden">
      {/* Side-by-side wrapper på større skærme */}
      <div className="flex w-full max-w-5xl flex-col-reverse items-center gap-6 md:flex-row md:items-start">
        {/* Venstre: bræt + HUD */}
        <div className="flex flex-col items-center md:items-start md:flex-1 w-full">
          {/* lille topbar med pause/reset */}
          <div className="mb-2 flex w-full max-w-md items-center justify-between">
            <div className="text-xs text-white/60">&nbsp;</div>
            <div className="flex items-center gap-1">
              <SmallBtn onClick={() => setPaused((p) => !p)}>
                {paused ? "▶" : "II"}
              </SmallBtn>
              <SmallBtn
                onClick={() => {
                  setStarted(false);
                  startGame();
                }}
              >
                ↺
              </SmallBtn>
            </div>
          </div>

          {/* Board */}
          <div
            className="relative border-[3px] border-white/40 bg-black/75 box-border overflow-hidden"
            style={{ width: boardPx.w, height: boardPx.h }}
          >
            <div
              className="relative grid gap-[1px] rounded-xl"
              style={{
                gridTemplateColumns: `repeat(${COLS}, ${cell}px)`,
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              aria-label="Tetris board"
            >
              {painted.flatMap((row, r) =>
                row.map((val, c) => (
                  <Cell
                    key={`${r}-${c}`}
                    val={val}
                    size={cell}
                    blockStyle={BLOCK_STYLE}
                  />
                ))
              )}
            </div>

            {/* HUD venstre kolonne */}
            <div className="absolute left-2 top-2 flex flex-col gap-1 rounded-md border border-white/10 bg-black/40 px-2 py-2 text-[11px] backdrop-blur">
              <Row label="Score" value={score} />
              <Row label="Level" value={level} />
              <Row label="Lines" value={lines} />
            </div>

            {/* Next panel højre */}
            <div
              className="absolute right-2 top-2 rounded-lg border border-white/10 bg-black/40 p-2 backdrop-blur"
              style={{
                width: Math.max(4 * cell + 8, 64),
                height: Math.max(4 * cell + 8, 64),
              }}
            >
              <MiniPreview
                shape={SHAPES[nextId]}
                cell={Math.max(6, Math.floor(cell * 0.65))}
                blockStyle={BLOCK_STYLE}
              />
            </div>

            {!started && !over && (
              <Overlay>
                <div className="mb-3 text-lg font-semibold">Tetris</div>
                <PrimaryBtn onClick={startGame}>Start Game</PrimaryBtn>
              </Overlay>
            )}
            {over && (
              <Overlay tone="danger">
                <div className="mb-3 font-semibold text-rose-300">
                  Game Over
                </div>
                <PrimaryBtn onClick={startGame}>Try again</PrimaryBtn>
              </Overlay>
            )}
          </div>

          {/* Kontroller */}
          <div className="mt-1 grid w-full max-w-md grid-cols-5 gap-1">
            <Ctrl label="⟵" onClick={() => move(-1)} />
            <Ctrl label="⟰" onClick={rotateCur} />
            <Ctrl label="⟶" onClick={() => move(1)} />
            <Ctrl label="⬇" onClick={softDrop} />
            <Ctrl label="⟂" onClick={hardDrop} />
          </div>
        </div>

        {/* Højre: Tekstfelt (viser “Tetris” m.m.) */}
        <aside className="md:w-72 md:pt-2 text-center w-full">
          <h1 className="text-3xl font-bold tracking-tight">Tetris</h1>
          <p className="mt-2 text-sm text-white/70">
            Arrow keys to move/rotate,{" "}
            <kbd className="px-1 rounded bg-white/10">Space</kbd> for hard drop,
            <kbd className="ml-1 px-1 rounded bg-white/10">P</kbd> pause,{" "}
            <kbd className="px-1 rounded bg-white/10">R</kbd> restart.
          </p>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/75">
            <div className="font-semibold mb-1">Mål:</div>
            Ryd linjer, stig i level og jagt højeste score. God fornøjelse! 💥
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- UI bits ---------- */

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/85 w-10">{label}</span>
      <span className="rounded bg-white/10 px-1.5 min-w-[28px] text-center">
        {value}
      </span>
    </div>
  );
}

function Cell({
  val,
  size,
  blockStyle,
}: {
  val: number;
  size: number;
  blockStyle: Record<number, string>;
}) {
  if (val === 0) {
    return (
      <div style={{ width: size, height: size, background: "transparent" }} />
    );
  }
  if (val === 8) {
    return (
      <div
        className="rounded-[4px]"
        style={{
          width: size,
          height: size,
          background: "rgba(255,255,255,0.25)",
        }}
      />
    );
  }
  return (
    <div
      className={`rounded-[6px] bg-gradient-to-br ${
        blockStyle[val] ?? "from-white to-slate-300"
      }`}
      style={{
        width: size,
        height: size,
        boxShadow:
          "inset 0 -2px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.35), 0 0 0 1px rgba(0,0,0,0.05)",
      }}
    />
  );
}

function MiniPreview({
  shape,
  cell = 8,
  blockStyle,
}: {
  shape: number[][];
  cell?: number;
  blockStyle: Record<number, string>;
}) {
  const rows = 4,
    cols = 4;
  const m = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[0].length; c++)
      if (shape[r][c]) m[r][c] = shape[r][c];
  return (
    <div
      className="grid gap-[2px]"
      style={{ gridTemplateColumns: `repeat(${cols}, ${cell}px)` }}
    >
      {m.flatMap((row, r) =>
        row.map((v, c) =>
          v ? (
            <div
              key={`${r}-${c}`}
              className={`rounded-[5px] bg-gradient-to-br ${blockStyle[v]}`}
              style={{
                width: cell,
                height: cell,
                boxShadow:
                  "inset 0 -2px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.35), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            />
          ) : (
            <div
              key={`${r}-${c}`}
              style={{ width: cell, height: cell, background: "transparent" }}
            />
          )
        )
      )}
    </div>
  );
}

function Overlay({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "danger";
}) {
  const border = tone === "danger" ? "border-rose-400/30" : "border-white/10";
  const bg = tone === "danger" ? "bg-rose-500/10" : "bg-white/10";
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
      <div
        className={`rounded-xl ${bg} ${border} border px-5 py-4 text-center backdrop-blur`}
      >
        {children}
      </div>
    </div>
  );
}

function SmallBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] hover:bg-white/20"
    >
      {children}
    </button>
  );
}

function PrimaryBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
    >
      {children}
    </button>
  );
}

function Ctrl({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border border-white/10 bg-white/10 py-2 text-center text-base hover:bg-white/20 active:translate-y-[1px]"
    >
      {label}
    </button>
  );
}
