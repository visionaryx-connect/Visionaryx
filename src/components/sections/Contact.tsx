"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";
import { SITE, mailtoLink, whatsappLink } from "@/lib/site";

const inputCls =
  "w-full rounded-lg border border-ivory/15 bg-ivory/[0.04] px-4 py-3.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-ivory/60";

type Channel = "whatsapp" | "email";
type Draft = { subject: string; body: string };

const CHANNEL_LABEL: Record<Channel, string> = {
  whatsapp: "WhatsApp",
  email: "your mail app",
};

/** Flattens the form into one plain-text block both channels can carry. */
const buildDraft = (data: FormData): Draft => {
  const field = (key: string) => String(data.get(key) ?? "").trim();
  const name = field("name");

  return {
    subject: `Growth call request — ${name}`,
    body: [
      `Name: ${name}`,
      `Email: ${field("email")}`,
      `Phone: ${field("phone") || "not provided"}`,
      `Company: ${field("company")}`,
      "",
      "Project / goal:",
      field("message"),
    ].join("\n"),
  };
};

/** Hands the draft off to WhatsApp or the default mail client. */
const handOff = (channel: Channel, { subject, body }: Draft) => {
  if (channel === "whatsapp") {
    window.open(
      whatsappLink(`${subject}\n\n${body}`),
      "_blank",
      "noopener,noreferrer"
    );
  } else {
    window.location.href = mailtoLink(subject, body);
  }
};

/**
 * The landing pad: giant headline chars rise letter by letter on scroll,
 * then the lead-capture form docks in from the right. Submitting opens a
 * prefilled WhatsApp chat or mail draft — no backend in the loop.
 */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sentVia, setSentVia] = useState<Channel | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

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

  /** Runs native HTML5 validation, then routes the draft to the channel. */
  const send = (channel: Channel) => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;

    const next = buildDraft(new FormData(form));
    handOff(channel, next);
    setDraft(next);
    setSentVia(channel);
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
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <a
                href={`mailto:${SITE.email}`}
                data-cursor="Email"
                className="inline-block border-b border-ivory/30 pb-0.5 text-ivory transition-colors hover:border-ivory"
              >
                {SITE.email}
              </a>
              <a
                href={whatsappLink(
                  `Hi ${SITE.name} — I'd like to book a growth call.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Chat"
                className="inline-block border-b border-ivory/30 pb-0.5 text-ivory transition-colors hover:border-ivory"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Lead form */}
        <div className="vx-cta-form rounded-2xl border border-ivory/12 bg-[#111111] p-7 md:p-9">
          <AnimatePresence mode="wait">
            {sentVia ? (
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
                  Almost there
                </h3>
                <p className="mt-3 max-w-xs text-sm text-grey">
                  We opened {CHANNEL_LABEL[sentVia]} with your request already
                  written out — hit send there and it&rsquo;s with our team.
                  We&rsquo;ll reply within 24 hours.
                </p>
                {draft && (
                  <button
                    type="button"
                    onClick={() =>
                      handOff(sentVia === "whatsapp" ? "email" : "whatsapp", draft)
                    }
                    data-cursor="Send"
                    className="mt-6 text-xs uppercase tracking-[0.18em] text-ivory/50 underline underline-offset-4 transition-colors hover:text-ivory"
                  >
                    Nothing opened? Send via{" "}
                    {sentVia === "whatsapp" ? "email" : "WhatsApp"} instead
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  send("whatsapp");
                }}
                className="flex flex-col gap-4"
              >
                <h3 className="font-display text-xl font-bold uppercase text-ivory">
                  Book your free growth call
                </h3>
                <p className="-mt-2 text-xs leading-relaxed text-grey">
                  Fill this in — takes under a minute. Send it however you
                  prefer; we reply within 24 hours.
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
                  placeholder="Phone / WhatsApp (optional)"
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
                <MagneticButton
                  type="button"
                  onClick={() => send("whatsapp")}
                  data-cursor="Chat"
                  className="mt-2 rounded-full bg-ivory py-4 text-sm font-bold uppercase tracking-[0.16em] text-carbon"
                >
                  Send on WhatsApp →
                </MagneticButton>
                <MagneticButton
                  type="button"
                  onClick={() => send("email")}
                  data-cursor="Email"
                  className="rounded-full border border-ivory/25 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ivory transition-colors hover:border-ivory/70"
                >
                  Send by email →
                </MagneticButton>
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
