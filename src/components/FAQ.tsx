"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Depends on scope. A landing page takes 2–3 weeks. A full brand + website typically runs 6–10 weeks. We'll give you a detailed timeline in our proposal.",
  },
  {
    q: "How much will my project cost?",
    a: "Every project is scoped individually — there's no fixed price list. Book a free call and we'll walk through your goals, then send over a clear, honest quote before any work begins.",
  },
  {
    q: "Do you work with startups or only established companies?",
    a: "Both. We love working with ambitious founders at the pre-seed stage through to Series B teams. What matters is your drive and clarity on your goals.",
  },
  {
    q: "Will we work directly with senior designers or get handed to juniors?",
    a: "Always seniors. Every Devlyncs project is led by a senior creative or developer from day one. No hand-offs, no surprises.",
  },
  {
    q: "What does the process look like once we sign?",
    a: "Discovery call → Proposal → Kick-off → Weekly check-ins → Delivery → post-launch support tailored to your project's scope.",
  },
  {
    q: "Do you offer ongoing retainer support?",
    a: "Yes — we can set up a custom monthly hours arrangement for ongoing feature work, maintenance, or support after your project ships.",
  },
  {
    q: "Who owns the final designs and code?",
    a: "You do, completely. Full IP transfer is included in every project. No licensing, no lock-in.",
  },
  {
    q: "Can you work with our existing brand or do we start from scratch?",
    a: "Both. We can evolve an existing brand or build fresh. We'll advise on what's right based on your current positioning.",
  },
  {
    q: "Do you require a deposit?",
    a: "Yes — typically 50% upfront and 50% on delivery. For larger engagements, we switch to milestone-based payments instead.",
  },
  {
    q: "What time zones do you work in?",
    a: "Our core team is UK-based (GMT/BST). We're remote-first and have worked with clients across the US, Europe, Middle East, and Asia Pacific.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="py-24 md:py-32 bg-cream-50">
      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20"
      >
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left column — header */}
          <div className="lg:w-[38%] lg:flex-shrink-0">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-600/10 border border-teal-600/20 mb-6"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-teal-600">
                Common questions
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-tight tracking-tight text-ink-950 mb-5"
            >
              Everything you need
              <br />
              <em className="not-italic text-ink-800/40">to know.</em>
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-sm text-ink-800/55 leading-relaxed mb-6 max-w-xs"
            >
              Can&apos;t find your answer? Drop us a line at{" "}
              <span className="text-ink-950/70">
                support@devlyncs.com
              </span>
            </motion.p>

            {/* CTA link */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200"
            >
              Ask a question →
            </motion.a>
          </div>

          {/* Right column — accordion */}
          <div className="flex-1">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-ink-950/[0.08]"
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center py-5 text-left cursor-pointer group"
                  aria-expanded={openIndex === i}
                >
                  <span
                    className={`font-medium text-[15px] transition-colors duration-200 pr-4 ${
                      openIndex === i
                        ? "text-teal-600"
                        : "text-ink-950 group-hover:text-teal-600"
                    }`}
                  >
                    {item.q}
                  </span>

                  <span
                    className={`flex-shrink-0 transition-colors duration-200 ${
                      openIndex === i
                        ? "text-teal-600"
                        : "text-ink-800/40 group-hover:text-teal-600"
                    }`}
                  >
                    {openIndex === i ? (
                      <Minus size={18} weight="bold" />
                    ) : (
                      <Plus size={18} weight="bold" />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-ink-800/60 leading-relaxed pt-0 pb-5">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
