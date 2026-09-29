"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";

const inputCls =
  "w-full rounded-lg border border-ivory/15 bg-ivory/[0.04] px-4 py-3.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-ivory/60";

type Status = "idle" | "sending" | "done" | "error";

/**
 * The landing pad: giant headline chars rise letter by letter on scroll,
 * then the lead-capture form docks in from the right. Submitting posts to
 * /api/lead, which appends the lead to the Google Sheet.
 */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vx-cta-char",
        { yPercent: 120, rotate: 6 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.7,
          stagger: 0.028,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".vx-cta-form",
        { opacity: 0, x: 70, rotate: 1.5 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 55%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const send = async (form: HTMLFormElement) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  const headline = "LET'S MAKE YOUR COMPETITORS NERVOUS.";

  return (
    <section ref={root} id="contact" className="relative overflow-hidden py-24 md:py-36">
      {/* Rising moon glow on the horizon */}
      <div
        className="pointer-events-none absolute -bottom-[38rem] left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(251,250,247,0.07) 0%, rgba(251,250,247,0.02) 55%, transparent 75%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 md:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-grey">
            Now we begin properly
          </p>
          <h2
            className="font-display max-w-2xl text-4xl font-bold uppercase leading-[1.02] md:text-7xl"
            aria-label={headline}
          >
            {headline.split(" ").map((word, wi) => (
              <span key={wi} className="mr-[0.28em] inline-block whitespace-nowrap">
                {word.split("").map((ch, ci) => (
                  <span key={ci} className="inline-block overflow-hidden align-bottom">
                    <span className="vx-cta-char inline-block will-change-transform">{ch}</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-grey md:text-base">
            Book a 30-minute growth call. We&rsquo;ll map the fastest path from
            where you are to booked revenue — no slides, just the plan.
            Coffee&rsquo;s on us. Gravity&rsquo;s optional.
          </p>
          <div className="mt-10 space-y-3 text-sm text-grey">
            <p>
              <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-ivory align-middle" />
              Response inside 24 Earth hours
            </p>
            <p>
              <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-ivory align-middle" />
              India + GCC · outcome-based engagements
            </p>
          </div>
        </div>

        {/* Lead form */}
        <div className="vx-cta-form rounded-2xl border border-ivory/12 bg-[#111111] p-7 md:p-9">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: [20, -6, 0] }}
                  transition={{ duration: 0.7 }}
                  className="text-5xl"
                >
                  🚀
                </motion.div>
                <h3 className="font-display mt-6 text-2xl font-bold uppercase text-ivory">
                  Request received
                </h3>
                <p className="mt-3 max-w-xs text-sm text-grey">
                  Thanks — your details are with our team. We&rsquo;ll reply
                  within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -10 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  send(e.currentTarget);
                }}
                className="flex flex-col gap-4"
              >
                <h3 className="font-display text-xl font-bold uppercase text-ivory">
                  Book your free growth call
                </h3>
                <p className="-mt-2 text-xs leading-relaxed text-grey">
                  Fill this in — takes under a minute. We reply within 24
                  hours.
                </p>
                <input name="name" required placeholder="Your name" className={inputCls} />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className={inputCls}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone number (optional)"
                  className={inputCls}
                />
                <input name="company" required placeholder="Company / brand name" className={inputCls} />
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your project or goal"
                  className={`${inputCls} resize-none`}
                />
                {/* Honeypot — hidden from people, filled by bots. */}
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                />
                <MagneticButton
                  type="submit"
                  disabled={status === "sending"}
                  data-cursor="Send"
                  className="mt-2 rounded-full bg-ivory py-4 text-sm font-bold uppercase tracking-[0.16em] text-carbon disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send →"}
                </MagneticButton>
                {status === "error" && (
                  <p role="alert" className="text-center text-xs text-red-400">
                    Something went wrong — please try again.
                  </p>
                )}
                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-ivory/30">
                  No spam — we reply within 24 hours.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
