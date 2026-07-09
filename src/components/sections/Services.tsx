"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01",
    title: "Gen-AI Studio Advertising",
    blurb:
      "Scroll-stopping AI ad creatives — dozens of variants in days, no film crew, no model day-rates. No film crew was harmed in the making of these ads.",
    tags: ["40+ variants / 5 days", "AR + EN bilingual", "48h winner turnaround"],
  },
  {
    num: "02",
    title: "Performance Ads",
    blurb:
      "Meta, Google and YouTube tuned to one KPI: qualified leads and sales. Ads that land — every time.",
    tags: ["Meta", "Google", "YouTube", "Click-to-close tracking"],
  },
  {
    num: "03",
    title: "AI Films & Shows",
    blurb:
      "Full Gen-AI filmmaking — crime shows, music videos and branded series. Cinema-grade storytelling without the cinema-grade burn rate.",
    tags: ["Crime shows", "Music videos", "Branded series"],
  },
  {
    num: "04",
    title: "3D & Immersive Web",
    blurb:
      "Cinematic sites that feel like a product and convert like a machine. You're scrolling one right now.",
    tags: ["WebGL", "3D interfaces", "Conversion-first"],
  },
  {
    num: "05",
    title: "Social Media Management",
    blurb:
      "Always-on trend content systems that compound, fully managed. We take up space in feeds — professionally.",
    tags: ["Trend systems", "Fully managed", "Compounding reach"],
  },
  {
    num: "06",
    title: "LinkedIn & Authority",
    blurb:
      "Make founders the obvious choice — influence that opens doors before your sales team knocks.",
    tags: ["Founder brand", "Thought leadership"],
  },
  {
    num: "07",
    title: "AI Avatars & UGC",
    blurb:
      "On-brand AI creators that post daily — for people far too busy to film themselves.",
    tags: ["Daily output", "On-brand avatars"],
  },
  {
    num: "08",
    title: "Brand & Creative",
    blurb:
      "Strategy-led identity that scales the thinking behind everything else. We don't decorate brands — we launch them.",
    tags: ["Strategy", "Identity", "Design systems"],
  },
];

/**
 * Deck-of-cards scroll effect: each card is sticky and scales/dims
 * as the next one slides over it.
 */
export default function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".vx-service-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top+=120",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".vx-services-heading .vx-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="vx-services-heading mb-16">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-grey">
          The payload — eight services, one accountable team
        </p>
        <h2 className="font-display text-4xl font-extrabold uppercase leading-[1.05] md:text-6xl">
          <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block">Everything</span></span>{" "}
          <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block">growth</span></span>{" "}
          <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block">needs.</span></span>
          <br />
          <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block text-outline">One</span></span>{" "}
          <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block text-outline">roof.</span></span>{" "}
          <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block text-outline">Zero</span></span>{" "}
          <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block text-outline">drama.</span></span>
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-grey md:text-base">
          Pick a piece or hand us the whole engine. Growth isn&rsquo;t a
          service — it&rsquo;s a system.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {SERVICES.map((s, i) => (
          <article
            key={s.num}
            className="vx-service-card sticky rounded-2xl border border-ivory/12 bg-[#111111] p-7 shadow-[0_-20px_60px_rgba(0,0,0,0.6)] md:p-10"
            style={{ top: `${96 + i * 8}px` }}
            data-cursor="VX"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-10">
              <span className="font-display text-5xl font-black text-ivory/15 md:text-7xl">
                {s.num}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ivory md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-grey md:text-base">
                  {s.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ivory/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-grey"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
