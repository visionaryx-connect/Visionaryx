"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STEPS = [
  { num: "01", title: "Discover", copy: "Pressure-test the goal, market and maths before making a thing." },
  { num: "02", title: "Strategy", copy: "One thesis: audience, offer, channels, and the KPI we own." },
  { num: "03", title: "AI Creative", copy: "Weeks of output in days — built to be tested, not admired." },
  { num: "04", title: "Launch", copy: "Live with tracking wired click-to-close." },
  { num: "05", title: "Optimise", copy: "Kill losers fast, scale winners hard, report in revenue." },
  { num: "06", title: "Repeat until rich", copy: "Then we do it again, bigger." },
];

/**
 * Mission sequence: a progress line draws down the page while each step
 * ignites (dims → full brightness) as the line reaches it.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vx-process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".vx-process-steps",
            start: "top 70%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".vx-step").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.22, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 62%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="process" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-grey">
            Mission control — the operating system
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] md:text-6xl">
            Same rig.
            <br />
            Every brand.
            <br />
            <span className="text-outline">Zero luck.</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-grey md:text-base">
            Growth here is repeatable, not lucky. Six steps, run in order,
            every single time. We planet. You profit.
          </p>
        </div>

        <div className="vx-process-steps relative pl-10 md:pl-14">
          {/* Track + animated progress line */}
          <div className="absolute left-2.5 top-0 h-full w-px bg-ivory/10 md:left-4" />
          <div className="vx-process-line absolute left-2.5 top-0 h-full w-px bg-ivory md:left-4" />

          <div className="flex flex-col gap-14">
            {STEPS.map((s) => (
              <div key={s.num} className="vx-step relative">
                <span className="absolute -left-10 top-1.5 h-2.5 w-2.5 rounded-full border border-ivory bg-carbon md:-left-[46px]" />
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm font-bold text-grey">{s.num}</span>
                  <h3 className="font-display text-2xl font-bold uppercase text-ivory md:text-3xl">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-grey md:text-base">
                  {s.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
