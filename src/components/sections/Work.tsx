"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const CASES = [
  {
    client: "IPG Estates · Real Estate",
    title: "We sell the dream before the cement dries.",
    copy: "Raw construction sites turned into cinematic CGI walk-throughs that pull qualified buyers. One interior reel alone crossed 94.7K organic views.",
    stats: [
      { v: "94.7K", l: "interior reel views" },
      { v: "83", l: "posts shipped" },
      { v: "CGI 3D", l: "walk-throughs & films" },
    ],
  },
  {
    client: "Short-form Campaign · Media",
    title: "6M views. 3,075 followers. Do the math.",
    copy: "A standing-start short-form machine built on scripting, design and cadence — not ad spend or bought followers. The algorithm didn't make this happen. Our content did.",
    stats: [
      { v: "6M+", l: "views in 60 days" },
      { v: "280K", l: "single reel views" },
      { v: "0", l: "rupees of ad spend" },
    ],
  },
  {
    client: "Manufacturing · Recruitment",
    title: "We don't just fill feeds. We filled a factory.",
    copy: "An entire workforce hired before the factory opened — GM to weavers to cooks — through short-form video and hyper-targeted ads. No agencies, no headhunter fees.",
    stats: [
      { v: "30+", l: "roles filled" },
      { v: "0", l: "recruiters used" },
      { v: "170K+", l: "campaign views" },
    ],
  },
];

/**
 * Flight log: rows slide in from alternating sides while the giant
 * index numbers parallax at a slower speed than the content.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".vx-case").forEach((row, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          row.querySelector(".vx-case-body"),
          { x: fromLeft ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 78%" },
          }
        );
        // Big number drifts slower than the scroll (parallax)
        gsap.fromTo(
          row.querySelector(".vx-case-num"),
          { yPercent: 40 },
          {
            yPercent: -40,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="relative mx-auto max-w-7xl overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-grey">
        Flight log — missions that landed
      </p>
      <h2 className="font-display text-4xl font-extrabold uppercase leading-tight md:text-6xl">
        Proof, not
        <br />
        <span className="text-outline">promises.</span>
      </h2>

      <div className="mt-20 flex flex-col gap-28">
        {CASES.map((c, i) => (
          <div key={c.client} className="vx-case relative">
            <span
              aria-hidden
              className="vx-case-num pointer-events-none absolute -top-14 right-0 select-none font-display text-[9rem] font-black leading-none text-ivory/[0.05] md:text-[15rem]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="vx-case-body relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-grey">
                {c.client}
              </p>
              <h3 className="font-display mt-3 max-w-3xl text-3xl font-extrabold uppercase leading-[1.05] text-ivory md:text-5xl">
                {c.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-grey md:text-base">
                {c.copy}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
                {c.stats.map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-3xl font-black text-ivory md:text-4xl">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-grey">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
