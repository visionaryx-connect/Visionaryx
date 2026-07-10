"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { LogoMark } from "@/components/Logo";
import { NAV_LINKS, SITE } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant wordmark rises from below the fold line as the footer reveals
      gsap.fromTo(
        ".vx-footer-mark",
        { yPercent: 55 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-ivory/10">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <span className="flex items-center gap-3">
              <LogoMark size={40} />
              <span className="font-display text-xl font-bold text-ivory">Visionary X</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-grey">
              Strategy-led growth agency by IPG. Many brands. Many X&rsquo;s.
              One disciplined way of thinking.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-ivory/40">
                Coordinates
              </p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => scrollToSection(l.href)}
                      className="text-sm text-grey transition-colors hover:text-ivory"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-ivory/40">
                Transmission
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-grey transition-colors hover:text-ivory"
              >
                {SITE.email}
              </a>
              <p className="mt-2.5 text-sm text-grey">India · GCC</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ivory/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-ivory/30 md:flex-row">
          <span>© {new Date().getFullYear()} Visionary X · by IPG. All rights reserved.</span>
          <span>The world scrolls. We make it stop.</span>
        </div>
      </div>

      {/* Giant horizon wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <div className="vx-footer-mark whitespace-nowrap text-center font-display text-[16vw] font-black uppercase leading-[0.8] tracking-tight text-ivory/[0.06]">
          Visionary  X&nbsp;
        </div>
      </div>
    </footer>
  );
}
