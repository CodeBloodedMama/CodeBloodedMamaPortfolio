'use client';
import React from "react";
import GameFrame from "@/app/game/GameFrame";
import GameBox from "@/app/game/GameBox";

export default function CVgame() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex ">
       
          <div className="w-full h-[180vh] flex flex-col items-center justify-center mt-40">
            <GameFrame  className="w-full h-full max-w-none rounded-xl ">
              
              <GameBox />

            </GameFrame>
            <p className="mt-2 text-xs text-white/60 text-center w-full">
              Tip: Roter evt. din telefon for større spilleflade
            </p>
          </div>
        </div>
  );
}
