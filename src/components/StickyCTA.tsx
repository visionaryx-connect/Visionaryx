"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { scrollToSection } from "@/lib/scroll";

/** Floating lead-gen pill: appears after the hero, hides near the contact form. */
export default function StickyCTA() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setVisible(p > 0.12 && p < 0.85);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={() => scrollToSection("#contact")}
          data-cursor="Launch"
          className="fixed bottom-6 right-5 z-[90] flex items-center gap-2.5 rounded-full bg-ivory py-3 pl-4 pr-5 text-xs font-bold uppercase tracking-[0.14em] text-carbon shadow-[0_10px_40px_rgba(251,250,247,0.18)] md:right-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-carbon/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-carbon" />
          </span>
          Book a growth call
        </motion.button>
      )}
    </AnimatePresence>
  );
}
