"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function CVGameFrame({
  baseWidth = 1000,
  baseHeight = 640,
  maxHeight = 720,
  children,
  className = "",
}: {
  baseWidth?: number;
  baseHeight?: number;
  maxHeight?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const resize = () => {
      const W = el.clientWidth;
      const H = Math.min(el.clientHeight, maxHeight);
      const k = Math.min(W / baseWidth, H / baseHeight);
      setScale(k > 0 ? k : 1);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth, baseHeight, maxHeight]);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const evt = new Event("resize");
    window.dispatchEvent(evt);
  }, []);

  return (
    <div
      ref={outerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ contain: "layout paint size" }}
    >
      <div
        ref={innerRef}
        className="origin-top-left"
        style={{
          width: baseWidth,
          height: baseHeight,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
