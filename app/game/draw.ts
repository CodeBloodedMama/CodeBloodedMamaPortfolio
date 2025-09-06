import { CANVAS_W } from "./constants";
import { C } from "./constants";

export function roundRect(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number,
  fill = true, stroke = false
) {
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

export function drawCoin(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  const grad = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.6, r * 0.2, cx, cy, r);
  grad.addColorStop(0, "#fff39c"); grad.addColorStop(0.5, "#ffd447"); grad.addColorStop(1, "#c98700");
  ctx.fillStyle = grad; ctx.fill(); ctx.closePath();
  ctx.strokeStyle = "rgba(0,0,0,0.35)"; ctx.lineWidth = 1; ctx.beginPath();
  ctx.arc(cx, cy, r - 3, 0, Math.PI * 2); ctx.stroke(); ctx.closePath();
}

/** HUD med chips + progressbar + X/Y */
export function drawCloudHUD(
  ctx: CanvasRenderingContext2D,
  total: number,
  labels: string[],
  toast: string | null
) {
  const x = 10, y = 8, w = CANVAS_W - 20, h = 58, r = 16;
  ctx.fillStyle = C.cloudBg;
  ctx.strokeStyle = C.cloudStroke; ctx.lineWidth = 1;
  roundRect(ctx, x, y, w, h, r, true, true);

  ctx.fillStyle = C.cloudText;
  ctx.font = "12px ui-sans-serif, system-ui, -apple-system";
  ctx.textAlign = "left";
  ctx.fillText("Indsamlet:", x + 12, y + 19);

  // chips
  let bx = x + 88, by = y + 9;
  for (const label of labels) {
    const tw = Math.ceil(ctx.measureText(label).width);
    const bw = tw + 18, bh = 20;
    ctx.fillStyle = C.chipBg; roundRect(ctx, bx, by, bw, bh, 8, true, false);
    ctx.strokeStyle = C.chipBorder; ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = C.chipText; ctx.fillText(label, bx + 9, by + 14);
    bx += bw + 6; if (bx > x + w - 110) break;
  }

  // progress
  const done = labels.length;
  const pct = Math.round((done / total) * 100);
  ctx.textAlign = "right";
  ctx.fillStyle = C.cloudText;
  ctx.fillText(`${done}/${total} • ${pct}%`, x + w - 12, y + 19);

  const pbx = x + 12, pby = y + 32, pbw = w - 24, pbh = 10;
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundRect(ctx, pbx, pby, pbw, pbh, 6, true, false);
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  roundRect(ctx, pbx, pby, Math.max(2, (pbw * done) / total), pbh, 6, true, false);

  // toast
  if (toast) {
    ctx.fillStyle = C.toastBg;
    const pad = 8;
    const tw = ctx.measureText(toast).width;
    const bw = Math.min(w - 40, tw + pad * 2);
    const bx2 = x + (w - bw) / 2, by2 = y + 44;
    ctx.fillRect(bx2, by2, bw, 22);
    ctx.fillStyle = C.toastText; ctx.textAlign = "center";
    ctx.fillText(toast, x + w / 2, by2 + 15);
  }
}
