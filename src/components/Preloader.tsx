"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { LogoMark } from "@/components/Logo";

/**
 * Launch-sequence preloader: the orb logo scales in over carbon black,
 * a progress line charges, then the whole shade lifts off. Dispatches
 * "vx:loaded" so the hero can time its entrance to the reveal.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      document.documentElement.classList.add("vx-loaded");
      window.dispatchEvent(new Event("vx:loaded"));
    };

    const tl = gsap.timeline({ onComplete: () => setDone(true) });
    tl.fromTo(
      ".vx-pre-logo",
      { scale: 0.55, opacity: 0, rotate: -8 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.7, ease: "power3.out", delay: 0.15 }
    )
      .fromTo(
        ".vx-pre-word",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ".vx-pre-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "power2.inOut", transformOrigin: "left center" },
        "-=0.2"
      )
      .add(finish, "+=0.1")
      .to(root.current, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-6 bg-carbon"
    >
      <div className="vx-pre-logo">
        <LogoMark size={96} />
      </div>
      <div className="vx-pre-word font-display text-2xl font-bold tracking-tight text-ivory">
        Visionary&nbsp;X
      </div>
      <div className="w-40 overflow-hidden">
        <div className="vx-pre-line h-px w-full bg-ivory/60" />
      </div>
    </div>
  );
}
