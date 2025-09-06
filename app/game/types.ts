export type Rect = { x: number; y: number; w: number; h: number };
export type Coin = Rect & { id: string; label: string; value: string; got?: boolean };
export type Player = { x: number; y: number; w: number; h: number; vx: number; vy: number; onGround: boolean };
