"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MagnifyingGlass,
  PaintBrush,
  Code,
  RocketLaunch,
} from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    icon: MagnifyingGlass,
    title: "Discovery",
    description:
      "We map out your product goals, users, and technical requirements — defining scope, platform choices, and a realistic timeline before any design or code begins.",
    color: "bg-teal-600/8 text-teal-600 border-teal-600/20",
  },
  {
    number: "02",
    icon: PaintBrush,
    title: "Design",
    description:
      "Wireframes, prototypes, and design systems for web and mobile — validated with you at every step, so what gets built is exactly what your users need.",
    color: "bg-blue-600/8 text-blue-600 border-blue-600/20",
  },
  {
    number: "03",
    icon: Code,
    title: "Build & Test",
    description:
      "Our developers build your web app, mobile app, or platform on clean, scalable architecture — with manual and automated QA running throughout, not just at the end.",
    color: "bg-violet-600/8 text-violet-600 border-violet-600/20",
  },
  {
    number: "04",
    icon: RocketLaunch,
    title: "Launch & Support",
    description:
      "We deploy, monitor performance, and stay on to fix, iterate, and support your product post-launch — because shipping is the start, not the finish line.",
    color: "bg-emerald-600/8 text-emerald-600 border-emerald-600/20",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
    >
      {/* Connecting line (not last) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-10 left-[calc(100%+1rem)] w-8 h-px bg-ink-950/12 -translate-x-1/2" />
      )}

      {/* Double-bezel card */}
      <div className="p-1 rounded-[2rem] border border-ink-950/6 bg-ink-950/[0.02] h-full">
        <div className="rounded-[calc(2rem-4px)] bg-white shadow-soft p-7 h-full flex flex-col">
          {/* Step number + icon row */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`w-12 h-12 rounded-2xl border ${step.color} flex items-center justify-center flex-shrink-0`}
            >
              <Icon size={22} weight="regular" />
            </div>
            <span className="font-display text-[2.5rem] font-light leading-none text-ink-950/8 tabular-nums">
              {step.number}
            </span>
          </div>

          <h3 className="font-display text-xl font-semibold text-ink-950 mb-3 leading-snug">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-800/60 flex-1">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="process" className="py-28 md:py-36 bg-cream-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div ref={titleRef} className="mb-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink-950/12 bg-ink-950/4 mb-5"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-ink-800/60">
              Our process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-tight tracking-tight text-ink-950"
          >
            How we turn ideas
            <br />
            <em className="not-italic text-ink-800/45">into reality.</em>
          </motion.h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
