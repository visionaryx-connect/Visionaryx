"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

/**
 * Client marks live in /public/clients.
 *
 * `w`/`h` are the *rendered* size, tuned per mark rather than derived from the
 * file: a 5:1 wordmark and a square badge only carry the same optical weight
 * on the wall if the wide one sits shorter. Every value keeps the source
 * aspect ratio, and nothing is wider than the tile's 144px of usable width.
 */
const CLIENTS = [
  { name: "CIBI", file: "cibi.png", w: 54, h: 58 },
  { name: "Sakthi Masala", file: "sakthi-masala.png", w: 54, h: 54 },
  { name: "IPG", file: "ipg.png", w: 73, h: 56 },
  { name: "Poomex", file: "poomex.png", w: 134, h: 38 },
  { name: "HD Florals", file: "hd-florals.png", w: 76, h: 54 },
  { name: "Next 24 Live", file: "next-24-live.jpeg", w: 115, h: 30 },
  { name: "Vaisnav Infrastructure", file: "vaisnav-infrastructure.jpeg", w: 53, h: 58 },
  { name: "Erode Om Mills", file: "erode-om-mills.png", w: 141, h: 28 },
  { name: "Farm Life", file: "farm-life.png", w: 68, h: 56 },
  { name: "Coffee Daddy", file: "coffee-daddy.png", w: 133, h: 46 },
  { name: "AIADMK", file: "aiadmk.png", w: 58, h: 50 },
];

/**
 * Client wall: a static grid of logo tiles — the cards sit still on the page.
 *
 * The marks arrive as a mixed bag — transparent PNGs drawn for white paper,
 * plus a couple of JPEGs that carry their own white background — so every one
 * sits on a white tile and blends with `mix-blend-multiply`. That kills the
 * JPEGs' visible white box without touching any brand colour, and it keeps
 * dark-ink marks like IPG and Erode Om Mills legible instead of disappearing
 * into the carbon page.
 *
 * Tiles are a fixed width and wrap, centred — so the odd count out on the last
 * row reads as deliberate instead of leaving a hole in a rigid grid. The
 * widths are picked so the rows break 2 / 3 / 4 / 6 rather than landing on a
 * five that would strand a single logo on its own line.
 */
export default function Clients() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vx-clients-heading .vx-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );

      // One-shot reveal as the wall arrives — the tiles then stay put.
      gsap.fromTo(
        ".vx-client-tile",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: ".vx-clients-wall", start: "top 88%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="clients" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="vx-clients-heading">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-grey">
            Crew manifest — brands already on board
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] md:text-6xl">
            <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block">Names</span></span>{" "}
            <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block">on</span></span>
            <br />
            <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block text-outline">the</span></span>{" "}
            <span className="inline-block overflow-hidden pb-1"><span className="vx-word inline-block text-outline">manifest.</span></span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-grey md:text-base">
            Retail, real estate, media, manufacturing, FMCG and public life —
            different rooms, same brief: make people stop scrolling.
          </p>
        </div>

        <ul
          className="vx-clients-wall mt-14 flex flex-wrap justify-center gap-4 md:mt-16 md:gap-5"
          aria-label="Selected clients"
        >
          {CLIENTS.map((c) => (
            <li
              key={c.file}
              className="vx-client-tile flex h-[92px] w-[150px] items-center justify-center rounded-xl bg-white px-3 isolate md:h-[104px] md:w-[184px] md:px-5"
              data-cursor="VX"
            >
              <Image
                src={`/clients/${c.file}`}
                alt={c.name}
                width={c.w}
                height={c.h}
                // Pin the width to the tuned size — left on `auto` the browser
                // sizes the mark from whichever srcset file it picked, not from
                // these values. `max-width` lets the widest wordmarks shrink
                // into a narrow tile, and `height: auto` keeps the ratio.
                style={{ width: c.w }}
                className="h-auto max-w-full select-none mix-blend-multiply"
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
