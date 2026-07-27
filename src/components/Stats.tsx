"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 120, suffix: "+", label: "Projects delivered", prefix: "" },
  {
    value: 98,
    suffix: "%",
    label: "Client satisfaction",
    prefix: "",
    decimals: 0,
  },
  { value: 8, suffix: " yrs", label: "Years in business", prefix: "" },
  { value: 60, suffix: "+", label: "Founders trusted", prefix: "" },
];

function CountUp({
  target,
  suffix,
  prefix,
  decimals = 0,
  active,
}: {
  target: number;
  suffix: string;
  prefix: string;
  decimals?: number;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const inc = target / steps;

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, active]);

  const display =
    decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-ink-950" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="px-8 py-10 first:pl-0 last:pr-0"
            >
              <div className="font-display text-[clamp(2rem,4vw,3.25rem)] font-light text-cream-50 tabular-nums leading-none mb-2">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                  active={inView}
                />
              </div>
              <p className="text-[12px] uppercase tracking-widest font-medium text-cream-50/35">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
