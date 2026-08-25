"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const CHAPTERS = [
  {
    num: "01",
    title: "Gen-AI Ads",
    pun: "Studio-grade ads. Zero studio.",
    copy: "40+ creative variants in five days, bilingual AR+EN sets, winners identified in 48 hours. Around 70% lower creative cost — and nobody had to book a film crew.",
    visual: "grid",
  },
  {
    num: "02",
    title: "AI Crime Shows",
    pun: "Bingeable. Criminally so.",
    copy: "Full Gen-AI filmmaking for episodic crime series — casting, cinematography and edit, all synthesized. Plot twists included at no extra charge.",
    visual: "case",
  },
  {
    num: "03",
    title: "AI Music Videos",
    pun: "Visuals that drop harder than the beat.",
    copy: "Music videos generated frame by frame to match the track's energy — surreal worlds, impossible cameras, zero location permits.",
    visual: "wave",
  },
];

function ChapterVisual({ type }: { type: string }) {
  if (type === "grid") {
    // A wall of ad-variant cards
    return (
      <div className="grid h-full w-full grid-cols-3 gap-2 p-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-md border border-ivory/15 bg-ivory/[0.04]"
          >
            <span className="font-display text-[10px] font-bold uppercase tracking-widest text-ivory/40">
              Var {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "case") {
    // Evidence board: case file card + scanlines
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(251,250,247,0.05)_4px)]" />
        <div className="rotate-[-3deg] rounded-md border border-ivory/25 bg-carbon p-6 shadow-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-grey">
            Case file · EP.04
          </div>
          <div className="font-display mt-2 text-3xl font-bold uppercase text-ivory">
            Cold Static
          </div>
          <div className="mt-3 h-px w-full bg-ivory/20" />
          <div className="mt-3 space-y-1.5">
            {["Suspect: rendered", "Location: synthesized", "Motive: engagement"].map((line) => (
              <div key={line} className="text-[11px] uppercase tracking-[0.18em] text-grey">
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-8 top-8 rotate-12 rounded-sm border-2 border-ivory/50 px-3 py-1 text-xs font-black uppercase tracking-[0.3em] text-ivory/50">
          Classified
        </div>
      </div>
    );
  }
  // Waveform
  return (
    <div className="flex h-full w-full items-center justify-center gap-1.5 p-10">
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="vx-eq-bar w-2 rounded-full bg-ivory/70"
          style={{ height: `${(18 + Math.abs(Math.sin(i * 0.9)) * 60).toFixed(1)}%` }}
        />
      ))}
    </div>
  );
}

/**
 * Pinned chapter player: the section locks and chapters crossfade/scale
 * as you scroll, like scrubbing through a showreel.
 */
export default function GenAI() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".vx-genai-panel");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${panels.length * 90}%`,
            pin: true,
            scrub: 0.6,
          },
        });

        panels.forEach((panel, i) => {
          if (i === 0) {
            gsap.set(panel, { opacity: 1, scale: 1, yPercent: 0 });
            return;
          }
          tl.to(
            panels[i - 1],
            { opacity: 0, scale: 0.9, yPercent: -6, duration: 1, ease: "power2.in" },
            (i - 1) * 1.2 + 0.4
          ).fromTo(
            panel,
            { opacity: 0, scale: 1.06, yPercent: 8 },
            { opacity: 1, scale: 1, yPercent: 0, duration: 1, ease: "power2.out" },
            (i - 1) * 1.2 + 0.9
          );
          // Progress dots
          tl.to(
            ".vx-genai-dot",
            { backgroundColor: "rgba(251,250,247,0.2)", duration: 0.2 },
            (i - 1) * 1.2 + 0.9
          ).to(
            `.vx-genai-dot[data-i="${i}"]`,
            { backgroundColor: "#fbfaf7", duration: 0.2 },
            (i - 1) * 1.2 + 0.9
          );
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".vx-genai-panel").forEach((panel) => {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 85%" },
            }
          );
        });
      });

      // Equalizer bars idle animation
      gsap.to(".vx-eq-bar", {
        scaleY: 0.35,
        duration: 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.06, yoyo: true, repeat: -1 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="genai" className="relative overflow-hidden">
      <div className="relative flex flex-col gap-10 px-5 py-24 md:h-svh md:justify-center md:px-8 md:py-0">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-grey">
            Gen-AI videos &amp; shows
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[1.02] md:text-6xl">
            The render farm
            <br />
            <span className="text-outline">never sleeps.</span>
          </h2>
        </div>

        {/* Chapters */}
        <div className="relative mx-auto w-full max-w-7xl md:h-[52svh]">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.num}
              className={`vx-genai-panel mb-10 grid grid-cols-1 gap-8 md:absolute md:inset-0 md:mb-0 md:grid-cols-2 md:items-center ${
                i > 0 ? "md:opacity-0" : ""
              }`}
            >
              <div>
                <span className="font-display text-6xl font-bold text-ivory/10 md:text-8xl">
                  {c.num}
                </span>
                <h3 className="font-display mt-2 text-3xl font-bold uppercase text-ivory md:text-5xl">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-grey">
                  {c.pun}
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-grey md:text-base">
                  {c.copy}
                </p>
              </div>
              <div className="h-64 rounded-2xl border border-ivory/10 bg-[#101010] md:h-full">
                <ChapterVisual type={c.visual} />
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots (desktop pin only) */}
        <div className="mx-auto hidden gap-3 md:flex">
          {CHAPTERS.map((c, i) => (
            <span
              key={c.num}
              data-i={i}
              className="vx-genai-dot h-2 w-2 rounded-full"
              style={{ backgroundColor: i === 0 ? "#fbfaf7" : "rgba(251,250,247,0.2)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
