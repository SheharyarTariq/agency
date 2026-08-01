"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react";

const testimonials = [
  {
    service: "Web Design",
    quote:
      "Our new site looks incredible and, more importantly, it converts. Devlyncs redesigned our landing pages around a clear conversion path, and our sign-up rate jumped noticeably within the first month.",
    author: "Elena Cortez",
    role: "Marketing Lead, Northbridge Retail",
    avatar: "seed/elena/80/80",
    rating: 5,
  },
  {
    service: "Web Development",
    quote:
      "We needed a custom SaaS platform built fast without cutting corners on architecture. Devlyncs delivered clean, scalable code with solid API integrations — the kind of foundation we can actually grow on.",
    author: "Marcus Doyle",
    role: "CTO, Fieldstone Analytics",
    avatar: "seed/marcus/80/80",
    rating: 5,
  },
  {
    service: "UX/UI Design",
    quote:
      "The wireframes and prototypes Devlyncs delivered made our product feel effortless for the first time. User testing confirmed it — task completion went up and support tickets about confusing flows dropped.",
    author: "Priya Krishnamurthy",
    role: "Head of Product, Pulse Technologies",
    avatar: "seed/priya/80/80",
    rating: 5,
  },
  {
    service: "Mobile Development",
    quote:
      "Devlyncs built our iOS and Android apps from one React Native codebase, on time and without the usual cross-platform headaches. App store reviews have been consistently strong since launch.",
    author: "Daniel Osei",
    role: "Founder, Ridewell",
    avatar: "seed/daniel/80/80",
    rating: 5,
  },
  {
    service: "Digital Product Design",
    quote:
      "We came in with just an idea and a deadline to raise our seed round. Devlyncs turned it into a clickable MVP prototype in weeks — it's the exact deck that got us in front of investors.",
    author: "Sofia Marchetti",
    role: "Founder, Lumen Health",
    avatar: "seed/sofia/80/80",
    rating: 5,
  },
  {
    service: "Testing & QA",
    quote:
      "Devlyncs' QA team caught issues in our release pipeline that our own team had missed for months. Their regression and automated test coverage gave us the confidence to ship weekly instead of quarterly.",
    author: "James Rutherford",
    role: "Director of Engineering, Crest Finance",
    avatar: "seed/james/80/80",
    rating: 5,
  },
  {
    service: "Graphic Design",
    quote:
      "Our brand identity finally looks like the company we actually are. Devlyncs delivered a full visual system — logo, guidelines, pitch deck — that we still get compliments on months later.",
    author: "Celia Okafor-Briggs",
    role: "CMO, Luma Studio",
    avatar: "seed/celia/80/80",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  const prev = () =>
    setActiveIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i + 1) % testimonials.length);

  const t = testimonials[activeIdx];

  return (
    <section id="testimonials" className="py-28 md:py-36 bg-cream-100/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={titleRef} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink-950/12 bg-ink-950/4 mb-5"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-ink-800/60">
              Client reviews
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-tight tracking-tight text-ink-950"
          >
            Trusted by founders
            <br />
            <em className="not-italic text-ink-800/45">and teams alike.</em>
          </motion.h2>
        </div>

        {/* Main testimonial card */}
        <div className="max-w-3xl mx-auto">
          <div className="p-1.5 rounded-[2.5rem] border border-ink-950/6 bg-ink-950/[0.02]">
            <div className="rounded-[calc(2.5rem-6px)] bg-white shadow-soft-lg p-10 md:p-14">
              {/* Quotes icon + service tag */}
              <div className="flex items-center justify-between mb-6">
                <Quotes size={32} weight="fill" className="text-teal-600/25" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`service-${activeIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-[10px] uppercase tracking-[0.16em] font-semibold text-teal-600 bg-teal-600/8 px-3 py-1 rounded-full"
                  >
                    {t.service}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Quote text */}
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(1.1rem,2.5vw,1.4rem)] font-light leading-relaxed text-ink-950 mb-8 italic"
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>

              {/* Author row */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${activeIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-between gap-4 flex-wrap"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://picsum.photos/${t.avatar}`}
                      alt={t.author}
                      className="w-10 h-10 rounded-full object-cover border border-ink-950/8"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink-950">
                        {t.author}
                      </p>
                      <p className="text-[11px] text-ink-800/45">{t.role}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="#0D9488"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="group w-10 h-10 rounded-full border border-ink-950/12 bg-white flex items-center justify-center hover:border-teal-600/30 hover:bg-teal-600/5 transition-all duration-300 active:scale-95"
              aria-label="Previous review"
            >
              <ArrowLeft
                size={14}
                weight="bold"
                className="text-ink-800/50 group-hover:text-teal-600 transition-colors"
              />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    i === activeIdx
                      ? "w-6 h-2 bg-teal-600"
                      : "w-2 h-2 bg-ink-950/15 hover:bg-ink-950/25"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="group w-10 h-10 rounded-full border border-ink-950/12 bg-white flex items-center justify-center hover:border-teal-600/30 hover:bg-teal-600/5 transition-all duration-300 active:scale-95"
              aria-label="Next review"
            >
              <ArrowRight
                size={14}
                weight="bold"
                className="text-ink-800/50 group-hover:text-teal-600 transition-colors"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
