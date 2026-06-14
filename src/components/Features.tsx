"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UsersFour,
  CalendarCheck,
  Certificate,
  ChatsCircle,
  TrendUp,
  Globe,
} from "@phosphor-icons/react";

const features = [
  {
    icon: UsersFour,
    title: "Senior-only team",
    description:
      "No juniors on your project. Every engagement is handled by experienced practitioners who have shipped real work.",
    span: "lg:col-span-4",
    dark: true,
  },
  {
    icon: CalendarCheck,
    title: "On-time delivery",
    description:
      "We set realistic timelines and stick to them. If something changes, you hear about it from us first.",
    span: "lg:col-span-4",
    dark: false,
  },
  {
    icon: Certificate,
    title: "Full IP ownership",
    description:
      "Everything we create for you is yours — source files, code repositories, brand assets. No strings attached.",
    span: "lg:col-span-4",
    dark: false,
  },
  {
    icon: ChatsCircle,
    title: "Transparent check-ins",
    description:
      "Weekly updates, shared project boards, and open Slack channels. You always know where your project stands.",
    span: "lg:col-span-8",
    dark: false,
  },
  {
    icon: TrendUp,
    title: "Built to scale",
    description:
      "From a lean MVP to an enterprise platform — we design and build systems that grow with your ambitions.",
    span: "lg:col-span-4",
    dark: true,
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group ${feature.span}`}
    >
      <div
        className={`
          p-1 rounded-[2.5rem] h-full
          ${
            feature.dark
              ? "bg-ink-950/5 border border-ink-950/8"
              : "bg-ink-950/[0.02] border border-ink-950/6"
          }
          transition-shadow duration-500 group-hover:shadow-soft-lg
        `}
      >
        <div
          className={`
            rounded-[calc(2.5rem-4px)] p-8 h-full flex flex-col
            ${feature.dark ? "bg-ink-950 text-cream-50" : "bg-white text-ink-950"}
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]
          `}
        >
          {/* Icon */}
          <div
            className={`
              w-11 h-11 rounded-2xl flex items-center justify-center mb-6
              ${feature.dark ? "bg-teal-600/20" : "bg-teal-600/8"}
            `}
          >
            <Icon
              size={20}
              weight="regular"
              className={feature.dark ? "text-teal-400" : "text-teal-600"}
            />
          </div>

          <h3
            className={`font-display text-[1.1rem] font-semibold mb-3 leading-snug ${
              feature.dark ? "text-cream-50" : "text-ink-950"
            }`}
          >
            {feature.title}
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              feature.dark ? "text-cream-50/50" : "text-ink-800/55"
            }`}
          >
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Global reach card
function ReachCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const regions = [
    { name: "UK & Europe", x: "48%", y: "28%" },
    { name: "North America", x: "22%", y: "38%" },
    { name: "Middle East", x: "58%", y: "46%" },
    { name: "Asia Pacific", x: "76%", y: "44%" },
    { name: "Australia", x: "80%", y: "72%" },
    { name: "Africa", x: "52%", y: "60%" },
    { name: "South America", x: "30%", y: "66%" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-12 group"
    >
      <div className="p-1 rounded-[2.5rem] border border-ink-950/6 bg-ink-950/[0.02] transition-shadow duration-500 group-hover:shadow-soft-lg">
        <div className="rounded-[calc(2.5rem-4px)] bg-white overflow-hidden relative">
          <div className="flex flex-col lg:flex-row">
            {/* Text side */}
            <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
              <div className="w-11 h-11 rounded-2xl bg-teal-600/8 flex items-center justify-center mb-6">
                <Globe size={20} weight="regular" className="text-teal-600" />
              </div>
              <h3 className="font-display text-[1.5rem] font-semibold text-ink-950 mb-3 leading-snug">
                Remote-first,
                <br />
                globally capable
              </h3>
              <p className="text-sm leading-relaxed text-ink-800/55 mb-6 max-w-[40ch]">
                We work with clients across the UK, Europe, the Middle East, and
                beyond. Timezone-friendly processes and async collaboration mean
                location is never a barrier.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors gap-1.5"
              >
                Get in touch
                <span className="text-teal-600/50">→</span>
              </a>
            </div>

            {/* Visual side */}
            <div className="lg:w-1/2 relative h-64 lg:h-auto bg-cream-100/60 border-l border-ink-950/6">
              {/* Simplified world map outline */}
              <svg
                viewBox="0 0 400 200"
                className="absolute inset-0 w-full h-full opacity-[0.05]"
                fill="currentColor"
              >
                <ellipse cx="200" cy="100" rx="190" ry="90" />
              </svg>

              {/* Region dots */}
              {regions.map((region, i) => (
                <motion.div
                  key={region.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.08,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="absolute"
                  style={{ left: region.x, top: region.y }}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-600 border-2 border-white shadow-sm" />
                    <div
                      className="absolute inset-0 rounded-full bg-teal-600/30 animate-ping"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-medium text-ink-800/60 whitespace-nowrap">
                      {region.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section className="py-28 md:py-36 bg-cream-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={titleRef} className="mb-14 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink-950/12 bg-ink-950/4 mb-5"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-ink-800/60">
              Why AlgoThink Solutions
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-tight tracking-tight text-ink-950"
          >
            The way we work
            <br />
            <em className="not-italic text-ink-800/45">
              makes the difference.
            </em>
          </motion.h2>
        </div>

        {/* Feature bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
          <ReachCard />
        </div>
      </div>
    </section>
  );
}
