"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

const services = [
  {
    title: "Web Design",
    tagline: "Web Design",
    description:
      "Mobile-first, conversion-focused design for landing pages, corporate sites, and e-commerce storefronts — built to engage visitors and turn them into customers.",
    price: "from $2,500",
    image: "https://picsum.photos/seed/web-design-svc/640/480",
    accent: "teal",
    span: "lg:col-span-7",
    height: "h-56",
  },
  {
    title: "Web Development",
    tagline: "Web Development",
    description:
      "Custom web apps, SaaS platforms, and internal tools with clean API integrations and architecture built to scale as your product grows.",
    price: "from $4,500",
    image: "https://picsum.photos/seed/web-development-svc/640/400",
    accent: "slate",
    span: "lg:col-span-5",
    height: "h-48",
  },
  {
    title: "UX/UI Design",
    tagline: "UX/UI Design",
    description:
      "User research, wireframes, prototypes, and design systems for mobile-first interfaces that feel effortless from the first tap.",
    price: "from $3,000",
    image: "https://picsum.photos/seed/uxui-svc/640/400",
    accent: "slate",
    span: "lg:col-span-5",
    height: "h-48",
  },
  {
    title: "Mobile Development",
    tagline: "Mobile Development",
    description:
      "Native iOS and Android apps, plus cross-platform builds with React Native and Flutter — one codebase, every device.",
    price: "from $6,000",
    image: "https://picsum.photos/seed/mobile-dev-svc/640/480",
    accent: "teal",
    span: "lg:col-span-7",
    height: "h-56",
  },
  {
    title: "Digital Product Design",
    tagline: "Digital Product Design",
    description:
      "MVP design and product strategy for founders — rapid prototyping that gets your idea in front of users and investors fast.",
    price: "from $3,500",
    image: "https://picsum.photos/seed/product-design-svc/640/400",
    accent: "slate",
    span: "lg:col-span-4",
    height: "h-48",
  },
  {
    title: "Testing & QA",
    tagline: "Testing & QA",
    description:
      "Manual and automated testing — including regression, performance, and security checks — so what you ship actually holds up.",
    price: "from $1,500",
    image: "https://picsum.photos/seed/qa-testing-svc/640/400",
    accent: "slate",
    span: "lg:col-span-4",
    height: "h-48",
  },
  {
    title: "Graphic Design",
    tagline: "Graphic Design",
    description:
      "Brand identity, marketing assets, social content, and pitch decks — visual storytelling that makes your product stick in people's minds.",
    price: "from $1,200",
    image: "https://picsum.photos/seed/graphic-design-svc/640/400",
    accent: "slate",
    span: "lg:col-span-4",
    height: "h-48",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
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
        duration: 0.9,
        delay: (index % 2) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group ${service.span}`}
    >
      {/* Double-bezel card */}
      <div className="p-1 rounded-[2.5rem] border border-ink-950/6 bg-ink-950/[0.02] h-full transition-shadow duration-500 group-hover:shadow-soft-lg">
        <div className="rounded-[calc(2.5rem-4px)] bg-white overflow-hidden h-full flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
          {/* Image */}
          <div className={`relative overflow-hidden ${service.height}`}>
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            <div className="absolute top-4 left-5">
              <span className="px-3 py-1 rounded-full bg-white/90 text-[10px] uppercase tracking-widest font-semibold text-ink-950">
                {service.tagline}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-display text-xl font-semibold text-ink-950 leading-snug">
                {service.title}
              </h3>
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-600/8 px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5">
                {service.price}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-ink-800/55 flex-1 mb-5">
              {service.description}
            </p>

            <a
              href="#contact"
              className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            >
              Learn more
              <span className="w-6 h-6 rounded-full bg-teal-600/10 flex items-center justify-center group-hover/btn:bg-teal-600 group-hover/btn:text-white transition-all duration-300">
                <ArrowRight size={11} weight="bold" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-28 md:py-36 bg-cream-100/40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div
          ref={titleRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink-950/12 bg-ink-950/4 mb-5"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-ink-800/60">
                What we do
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-tight tracking-tight text-ink-950"
            >
              End-to-end product
              <br />
              <em className="not-italic text-ink-800/45">for every stage.</em>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm leading-relaxed text-ink-800/55 max-w-[38ch] lg:text-right"
          >
            Whether you need an MVP validated or a full product shipped
            across web and mobile — we have the expertise and the team to
            deliver.
          </motion.p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
