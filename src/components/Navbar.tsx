"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "@/components/Logo";
import MagneticButton from "@/components/MagneticButton";
import { NAV_LINKS } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setSolid(latest > 40);
  });

const go = (href: string, external?: boolean) => {
  setOpen(false);

  if (external) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }

  scrollToSection(href);
};

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
        solid ? "bg-carbon border-b border-ivory/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <button
          onClick={() => go("#hero")}
          data-cursor="Home"
          aria-label="Visionary X — home"
        >
          <Logo />
        </button>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => go(link.href, link.external)}
                data-cursor="Go"
                className="group relative text-[13px] font-medium uppercase tracking-[0.18em] text-grey transition-colors hover:text-ivory"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ivory transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <MagneticButton
            onClick={() => go("#contact")}
            data-cursor="Launch"
            className="hidden rounded-full bg-ivory px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-carbon transition-transform sm:block"
          >
            Book a growth call
          </MagneticButton>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-ivory"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-ivory"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className="overflow-hidden bg-carbon lg:hidden"
      >
        <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -12 }}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ delay: open ? 0.06 * i : 0 }}
            >
              <button
                onClick={() => go(link.href, link.external)}
                className="py-2 font-display text-2xl font-bold text-ivory"
              >
                {link.label}
              </button>
            </motion.li>
          ))}
          <li className="pt-3">
            <button
              onClick={() => go("#contact")}
              className="rounded-full bg-ivory px-6 py-3 text-sm font-bold uppercase tracking-widest text-carbon"
            >
              Book a growth call
            </button>
          </li>
        </ul>
      </motion.div>
    </header>
  );
}
