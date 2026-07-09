"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Space-themed custom cursor: an ivory "star" core with a slow-orbiting
 * ring (like a tiny planet system), leaving a trail of four-point stars.
 * Expands into a labelled orbit on [data-cursor] targets.
 */
export default function SpaceCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("vx-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };
    let lastStar = 0;

    const xDot = gsap.quickSetter(dot, "x", "px");
    const yDot = gsap.quickSetter(dot, "y", "px");
    const xRing = gsap.quickSetter(ring, "x", "px");
    const yRing = gsap.quickSetter(ring, "y", "px");

    const spawnStar = (x: number, y: number) => {
      const star = document.createElement("div");
      star.className = "vx-trail-star";
      const size = 4 + Math.random() * 8;
      star.style.left = `${x + (Math.random() - 0.5) * 18}px`;
      star.style.top = `${y + (Math.random() - 0.5) * 18}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      // Four-point star
      star.innerHTML = `<svg viewBox="0 0 10 10" width="100%" height="100%"><path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#fbfaf7"/></svg>`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 700);
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const now = performance.now();
      if (now - lastStar > 90) {
        lastStar = now;
        spawnStar(e.clientX, e.clientY);
      }
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      xDot(pos.x);
      yDot(pos.y);
      xRing(ringPos.x);
      yRing(ringPos.y);
    };
    gsap.ticker.add(tick);

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]"
      );
      if (target) {
        label.textContent = target.dataset.cursor || "";
        gsap.to(ring, { scale: 2.4, duration: 0.35, ease: "power3.out" });
        gsap.to(label, { opacity: 1, duration: 0.25 });
      } else {
        gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
        gsap.to(label, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("vx-cursor");
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div aria-hidden className="hidden md:block">
      {/* Star core */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[210] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-ivory shadow-[0_0_10px_2px_rgba(251,250,247,0.7)] mix-blend-difference"
      />
      {/* Orbit ring with a tiny moon */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[205] -ml-[18px] -mt-[18px] flex h-[36px] w-[36px] items-center justify-center mix-blend-difference"
      >
        <div className="absolute inset-0 animate-[spin_5s_linear_infinite] rounded-full border border-ivory/40">
          <div className="absolute -top-[2.5px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-grey" />
        </div>
        <span
          ref={labelRef}
          className="select-none text-[8px] font-semibold uppercase tracking-[0.2em] text-ivory opacity-0"
        />
      </div>
    </div>
  );
}
