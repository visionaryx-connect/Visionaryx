"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { value: 6, suffix: "M+", label: "views in 60 days — one campaign", decimals: 0 },
  { value: 300, suffix: "+", label: "people hired before a factory opened", decimals: 0 },
  { value: 94.7, suffix: "K", label: "organic views on a single property reel", decimals: 1 },
  { value: 70, suffix: "%", label: "lower creative cost with Gen-AI ads", decimals: 0, prefix: "~" },
];

/** Numbers count up from zero as the section enters — proof does the talking. */
export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".vx-stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const decimals = parseInt(el.dataset.decimals || "0");
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = counter.v.toFixed(decimals);
          },
        });
      });

      // Divider lines wipe in
      gsap.fromTo(
        ".vx-stat-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".vx-stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-grey">
        Mission telemetry
      </p>
      <h2 className="font-display text-3xl font-extrabold uppercase leading-tight md:text-5xl">
        Numbers that don&rsquo;t need <br className="hidden md:block" />
        a pitch deck.
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="vx-stat-item">
            <div className="vx-stat-line mb-5 h-px w-full bg-ivory/20" />
            <div className="font-display text-5xl font-black text-ivory md:text-6xl">
              {s.prefix}
              <span
                className="vx-stat-num"
                data-value={s.value}
                data-decimals={s.decimals}
              >
                0
              </span>
              {s.suffix}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-grey">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
