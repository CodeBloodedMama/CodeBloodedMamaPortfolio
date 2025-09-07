'use client';

import TetrisGame from "./game";

export default function TetrisPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-y-auto">
      <div className="mx-auto w-full max-w-5xl px-4 pt-16 md:pt-20">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr),320px] items-start">

            <div className="w-full max-w-lg mx-auto">
                <TetrisGame />
            </div>
        </div>
      </div>
    </div>
  );
}
