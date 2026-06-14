"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";

const plans = [
  {
    name: "Starter",
    tagline: "For focused projects",
    price: "$3,500",
    priceNote: "one-time",
    features: [
      "Landing page design & build",
      "Core brand kit (logo, colour, type)",
      "2 rounds of revisions",
      "Mobile-responsive layout",
      "14-day post-launch support",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Growth",
    tagline: "Most popular",
    price: "$8,500",
    priceNote: "one-time",
    features: [
      "Full website design & development",
      "Custom UI/UX — up to 8 pages",
      "Complete brand identity system",
      "3 months post-launch support",
      "SEO foundation & analytics setup",
      "Dedicated project manager",
    ],
    cta: "Start project",
    highlighted: true,
  },
  {
    name: "Scale",
    tagline: "For ambitious teams",
    price: "Custom",
    priceNote: "tailored quote",
    features: [
      "Enterprise design & development",
      "Ongoing retainer available",
      "Dedicated senior team",
      "Product strategy & UX research",
      "Priority SLA & fast turnarounds",
      "Quarterly brand reviews",
      "Integrated marketing support",
    ],
    cta: "Get a quote",
    highlighted: false,
  },
];

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex flex-col ${plan.highlighted ? "lg:-mt-4 lg:-mb-4" : ""}`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center z-10">
          <span className="px-4 py-1.5 rounded-full bg-teal-600 text-white text-[10px] uppercase tracking-widest font-bold shadow-teal">
            Most popular
          </span>
        </div>
      )}

      {/* Double-bezel */}
      <div
        className={`p-1 rounded-[2.5rem] h-full flex flex-col transition-shadow duration-500 hover:shadow-soft-lg
          ${
            plan.highlighted
              ? "bg-ink-950 border border-teal-600/30"
              : "bg-ink-950/[0.02] border border-ink-950/6"
          }
        `}
      >
        <div
          className={`rounded-[calc(2.5rem-4px)] p-7 flex flex-col flex-1
            ${
              plan.highlighted
                ? "bg-ink-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]"
                : "bg-white shadow-soft"
            }
          `}
        >
          {/* Plan header */}
          <div className="mb-6">
            <span
              className={`inline-block text-[10px] uppercase tracking-widest font-semibold mb-2
                ${plan.highlighted ? "text-teal-400" : "text-teal-600"}`}
            >
              {plan.tagline}
            </span>
            <h3
              className={`font-display text-xl font-semibold mb-4 ${
                plan.highlighted ? "text-cream-50" : "text-ink-950"
              }`}
            >
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-2">
              <span
                className={`font-display text-[2.5rem] font-light leading-none ${
                  plan.highlighted ? "text-cream-50" : "text-ink-950"
                }`}
              >
                {plan.price}
              </span>
            </div>
            <span
              className={`text-sm ${
                plan.highlighted ? "text-cream-50/40" : "text-ink-800/40"
              }`}
            >
              {plan.priceNote}
            </span>
          </div>

          {/* Divider */}
          <div
            className={`h-px mb-6 ${
              plan.highlighted ? "bg-white/8" : "bg-ink-950/8"
            }`}
          />

          {/* Features */}
          <ul className="space-y-3 flex-1 mb-8">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle
                  size={16}
                  weight="fill"
                  className={`flex-shrink-0 mt-0.5 ${
                    plan.highlighted ? "text-teal-400" : "text-teal-600"
                  }`}
                />
                <span
                  className={`text-sm leading-snug ${
                    plan.highlighted ? "text-cream-50/70" : "text-ink-800/65"
                  }`}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#"
            className={`group w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-[0.98]
              ${
                plan.highlighted
                  ? "bg-teal-600 text-white hover:bg-teal-500 shadow-teal"
                  : "bg-ink-950 text-cream-50 hover:bg-ink-800"
              }
            `}
          >
            {plan.cta}
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110 transition-transform duration-300">
              <ArrowRight size={11} weight="bold" />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="pricing" className="py-28 md:py-36 bg-cream-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink-950/12 bg-ink-950/4 mb-5"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-ink-800/60">
              Pricing
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-tight tracking-tight text-ink-950 mb-4"
          >
            Clear, honest packages.
            <br />
            <em className="not-italic text-ink-800/45">No hidden costs.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-ink-800/55 max-w-[42ch] mx-auto"
          >
            Whether you need a focused one-off project or an ongoing creative
            partner — we have a package that fits.
          </motion.p>
        </div>

        {/* Pricing cards — horizontal scroll on mobile, 3-col on desktop (but offset, not equal) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-start">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center text-[12px] text-ink-800/35 mt-10"
        >
          All projects start with a free 30-min discovery call. No obligation.
          Taxes may apply.
        </motion.p>
      </div>
    </section>
  );
}
