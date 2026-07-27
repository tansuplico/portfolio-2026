"use client";

import { useRef, type ReactNode } from "react";

type CursorRevealProps = {
  children: ReactNode;
  size?: number;
  color?: string;
  className?: string;
};

export default function CursorReveal({
  children,
  size = 300,
  color = "#8A2BE2",
  className = "",
}: CursorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPos.current = { x, y };

    if (glowRef.current) {
      glowRef.current.style.transition = "none";
      glowRef.current.style.left = `${x - size / 2}px`;
      glowRef.current.style.top = `${y - size / 2}px`;
      glowRef.current.style.transform = "scale(1)";
    }
    if (overlayRef.current) {
      overlayRef.current.style.transition = "none";
      overlayRef.current.style.clipPath = `circle(${size / 2}px at ${x}px ${y}px)`;
    }
  }

  // Shrink toward the exact spot the cursor left, instead of fading —
  // clip-path radius and glow scale both animate down to 0 at lastPos.
  function handleMouseLeave() {
    const { x, y } = lastPos.current;

    if (glowRef.current) {
      glowRef.current.style.transition = "transform 300ms ease-out";
      glowRef.current.style.transform = "scale(0)";
    }
    if (overlayRef.current) {
      overlayRef.current.style.transition = "clip-path 300ms ease-out";
      overlayRef.current.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {/* Soft visible glow that follows the cursor */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute origin-center rounded-full motion-reduce:hidden"
        style={{
          width: size,
          height: size,
          transform: "scale(0)",
          background: `radial-gradient(circle, ${color}40 0%, ${color}14 55%, transparent 72%)`,
        }}
      />

      {/* Base content, unaffected */}
      {children}

      {/* Colored duplicate, revealed only inside the circle around the cursor */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 motion-reduce:hidden"
        style={{
          color,
          clipPath: "circle(0px at 0px 0px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
