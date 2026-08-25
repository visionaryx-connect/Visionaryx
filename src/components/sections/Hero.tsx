"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";
import { scrollToSection } from "@/lib/scroll";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});
const SplineScene = dynamic(() => import("@/components/three/SplineScene"), {
  ssr: false,
});

// Paste a Spline .splinecode export URL here (or via env) to swap the hero
// to a scene authored in the Spline editor.
const SPLINE_SCENE = process.env.NEXT_PUBLIC_SPLINE_SCENE;

const HERO_STATS = [
  { value: "6M+", label: "views in 60 days" },
  { value: "300+", label: "hired before a factory opened" },
  { value: "94.7K", label: "organic views, one reel" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hold the entrance until the preloader lifts, then rise out of masks
      gsap.set(".vx-hero-line", { yPercent: 110 });
      gsap.set(".vx-hero-fade", { opacity: 0, y: 24 });

      let started = false;
      const startIntro = () => {
        if (started) return;
        started = true;
        gsap.to(".vx-hero-line", {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.15,
        });
        gsap.to(".vx-hero-fade", {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          delay: 0.8,
          ease: "power3.out",
        });
      };

      if (document.documentElement.classList.contains("vx-loaded")) {
        startIntro();
      } else {
        const fallback = setTimeout(startIntro, 3500);
        window.addEventListener(
          "vx:loaded",
          () => {
            clearTimeout(fallback);
            startIntro();
          },
          { once: true }
        );
      }

      // Scroll: content drifts up and fades, scene sinks slightly (parallax)
      gsap.to(".vx-hero-content", {
        yPercent: -28,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "85% top",
          scrub: true,
        },
      });
      gsap.to(".vx-hero-canvas", {
        yPercent: 14,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      {/* 3D scene */}
      <div className="vx-hero-canvas absolute inset-0">
        {SPLINE_SCENE ? <SplineScene scene={SPLINE_SCENE} /> : <HeroScene />}
        {/* Bottom fade into the next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-carbon" />
      </div>

      {/* Copy */}
      <div className="vx-hero-content pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 md:px-8">
        <div className="vx-hero-fade mb-5 flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2 rounded-full border border-ivory/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-ivory">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ivory/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ivory" />
            </span>
            Accepting new missions
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-grey md:text-xs">
            Visionary X · by IPG · Growth, engineered
          </p>
        </div>

        <h1 className="font-display text-[13.5vw] font-bold uppercase leading-[0.92] tracking-tight sm:text-[11vw] lg:text-[8.2rem]">
          <span className="block overflow-hidden">
            <span className="vx-hero-line block">Make the</span>
          </span>
          <span className="block overflow-hidden">
            <span className="vx-hero-line block">
              world <span className="text-outline">stop</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="vx-hero-line block">scrolling.</span>
          </span>
        </h1>

        <p className="vx-hero-fade mt-6 max-w-md text-sm leading-relaxed text-grey md:text-base">
          The ads, content and websites that turn attention into actual
          revenue. Zero gravity. Maximum growth.
        </p>

        <div className="vx-hero-fade pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
          <MagneticButton
            onClick={() => scrollToSection("#contact")}
            data-cursor="Launch"
            className="rounded-full bg-ivory px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-carbon"
          >
            Book a growth call
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollToSection("#work")}
            data-cursor="Orbit"
            className="rounded-full border border-ivory/30 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-ivory transition-colors hover:border-ivory"
          >
            See the work
          </MagneticButton>
        </div>

        {/* Proof strip */}
        <div className="vx-hero-fade mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-ivory/10 pt-6 md:mt-16">
          {HERO_STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-bold text-ivory md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-grey md:text-[11px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="vx-hero-fade absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-ivory/25 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-ivory/70" />
        </div>
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-ivory/40">
          Scroll to ignition
        </span>
      </div>
    </section>
  );
}
