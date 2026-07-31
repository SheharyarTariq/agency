"use client";

/**
 * ScrollStory — narrative section with GSAP ScrollTrigger ambient enhancements
 *
 * Chapters reveal once as they enter the viewport (whileInView) and then stay
 * fully visible — no pinning, no scroll-scrubbed fade in/out. Background
 * particles, the word ticker, and floating words remain scroll-reactive.
 */

import { memo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-120px" } as const;

// ── GSAP Particle Canvas ─────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

function ParticleCanvas({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLORS = [
      "rgba(13,148,136,",
      "rgba(20,184,166,",
      "rgba(94,234,212,",
      "rgba(255,255,255,",
    ];

    let particles: Particle[] = [];
    let animId: number;
    let scrollProgress = 0;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      spawnParticles();
    };

    const spawnParticles = () => {
      particles = [];
      // Cap the count so very tall sections don't spawn hundreds of particles.
      const count = Math.min(
        Math.floor((canvas.width * canvas.height) / 14000),
        220,
      );
      for (let i = 0; i < count; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.2 + 0.4,
          baseOpacity: Math.random() * 0.35 + 0.05,
          opacity: 0,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.18,
          color,
        });
      }
    };

    // ScrollTrigger scrubs scrollProgress 0→1 across entire section
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    let running = false;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Opacity driven by scroll — ramp up then stay
        const target = Math.min(1, scrollProgress * 3.5) * p.baseOpacity;
        p.opacity += (target - p.opacity) * 0.04;

        // Move — slightly faster the more you scroll
        const speed = 1 + scrollProgress * 1.8;
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity.toFixed(3)})`;
        ctx.fill();
      });

      if (running) animId = requestAnimationFrame(draw);
    };

    // Only animate while the section is actually on screen — this canvas
    // spans the entire (very tall) scroll story, so it would otherwise run
    // in the background for the whole time it's scrolled past.
    let inViewport = true;
    const shouldRun = () => inViewport && document.visibilityState === "visible";
    const syncLoop = () => {
      if (shouldRun() && !running) {
        running = true;
        draw();
      } else if (!shouldRun() && running) {
        running = false;
        cancelAnimationFrame(animId);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", syncLoop);

    resize();
    syncLoop();
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      io.disconnect();
      document.removeEventListener("visibilitychange", syncLoop);
      st.kill();
      window.removeEventListener("resize", resize);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

// ── GSAP Horizontal Word Ticker ───────────────────────────────────────────────
const TICKER_WORDS = [
  "Web Design",
  "·",
  "Web Development",
  "·",
  "UX/UI Design",
  "·",
  "Mobile Development",
  "·",
  "Product Design",
  "·",
  "Testing & QA",
  "·",
  "Graphic Design",
  "·",
  "Devlyncs",
  "·",
];

function WordTicker({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    // GSAP infinite marquee — scroll speed modulates it
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 22,
      repeat: -1,
    });

    // ScrollTrigger modulates the playback rate
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // Fast when actively scrolling, slows at rest
        const velocity = Math.abs(self.getVelocity());
        const rate = 1 + Math.min(velocity / 600, 3.5);
        tween.timeScale(rate);
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, [sectionRef]);

  const doubled = [...TICKER_WORDS, ...TICKER_WORDS];

  return (
    <div
      className="absolute bottom-0 left-0 w-full z-20 overflow-hidden pointer-events-none"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background:
          "linear-gradient(to right, rgba(10,10,15,0.9), rgba(10,10,15,0.6), rgba(10,10,15,0.9))",
        padding: "10px 0",
      }}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex gap-8 whitespace-nowrap will-change-transform"
        style={{ width: "200%" }}
      >
        {doubled.map((word, i) => (
          <span
            key={i}
            className={`text-[11px] uppercase tracking-[0.22em] font-semibold flex-shrink-0 ${
              word === "·" ? "text-teal-500/50" : "text-cream-50/20"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── GSAP Floating Words ───────────────────────────────────────────────────────
const FLOAT_WORDS = [
  { text: "bold", x: "12%", y: "18%" },
  { text: "strategy", x: "72%", y: "12%" },
  { text: "vision", x: "88%", y: "55%" },
  { text: "craft", x: "5%", y: "60%" },
  { text: "impact", x: "45%", y: "88%" },
  { text: "digital", x: "25%", y: "78%" },
  { text: "future", x: "65%", y: "72%" },
];

function FloatingWords({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const items = gsap.utils.toArray<HTMLElement>(
      container.querySelectorAll(".float-word"),
    );

    // Each word gets its own looping float animation staggered
    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: i % 2 === 0 ? -18 : 18,
          duration: 3.5 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        },
      );
    });

    // Fade words in/out based on section scroll progress
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onUpdate: (self) => {
        const p = self.progress;
        // Fade in 0→0.1, stay, fade out 0.9→1
        const opacity = p < 0.1 ? p / 0.1 : p > 0.9 ? (1 - p) / 0.1 : 1;
        gsap.set(container, { opacity: opacity * 0.18 });
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(items);
    };
  }, [sectionRef]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {FLOAT_WORDS.map((w) => (
        <span
          key={w.text}
          className="float-word absolute font-display text-[clamp(1.5rem,3vw,3rem)] tracking-tight text-teal-400 select-none"
          style={{ left: w.x, top: w.y }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

// ── Chapter 1 — "The Studio" ─────────────────────────────────────────────────
const ChapterStudio = memo(function ChapterStudio() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center justify-center"
    >
      <motion.div
        className="absolute w-[45vw] h-[45vw] max-w-3xl rounded-full"
        aria-hidden="true"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.7 } : {}}
        transition={{ duration: 1.4, ease: EASE }}
        style={{
          background:
            "radial-gradient(circle, rgba(13,148,136,0.22) 0%, rgba(13,148,136,0.04) 60%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.p
          className="text-[11px] uppercase tracking-[0.28em] font-semibold text-teal-400 mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Devlyncs
        </motion.p>

        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight text-cream-50 mb-8">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: 60 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              Where ideas
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-teal-400"
              initial={{ y: 60 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            >
              become products.
            </motion.span>
          </span>
        </h2>

        <div className="flex items-center justify-center gap-4 mt-12">
          <motion.div
            className="h-px w-16 bg-white/20 origin-right"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          />
          <span className="text-white/30 text-xs tracking-widest whitespace-nowrap">
            EST. 2016
          </span>
          <motion.div
            className="h-px w-16 bg-white/20 origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          />
        </div>
      </motion.div>
    </div>
  );
});

// ── Chapter 2 — "The Numbers" ────────────────────────────────────────────────
const STATS = [
  { value: "120+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "8 yrs", label: "In business" },
  { value: "60+", label: "Founders trusted" },
] as const;

function StatItem({
  inView,
  index,
  value,
  label,
}: {
  inView: boolean;
  index: number;
  value: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: EASE }}
      className="text-center"
    >
      <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-tight text-cream-50 mb-3">
        {value}
      </p>
      <p className="text-[13px] text-cream-50/40 tracking-wide">{label}</p>
    </motion.div>
  );
}

const ChapterNumbers = memo(function ChapterNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <div ref={ref} className="relative w-full">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6"
      >
        <p className="text-center text-[11px] uppercase tracking-[0.28em] font-semibold text-teal-400 mb-16">
          By the numbers
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.value}
              inView={inView}
              index={i}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
});

// ── Chapter 3 — "The Services" ───────────────────────────────────────────────
const SERVICES = [
  {
    n: "01",
    name: "Web & App Design",
    desc: "UX/UI · Prototypes · Design Systems",
  },
  {
    n: "02",
    name: "Web & Mobile Dev",
    desc: "Next.js · React Native · Full-stack",
  },
  {
    n: "03",
    name: "Product Design",
    desc: "MVP Strategy · Rapid Prototyping",
  },
  { n: "04", name: "Testing & QA", desc: "Manual · Automated · Security" },
] as const;

function ServiceRow({
  inView,
  index,
  n,
  name,
  desc,
}: {
  inView: boolean;
  index: number;
  n: string;
  name: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.09, ease: EASE }}
      className="flex items-center justify-between py-6 group"
    >
      <div className="flex items-center gap-8">
        <span className="text-[11px] text-cream-50/25 font-mono w-6">{n}</span>
        <span className="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] tracking-tight text-cream-50">
          {name}
        </span>
      </div>
      <span className="text-[13px] text-cream-50/35 hidden md:block">
        {desc}
      </span>
    </motion.div>
  );
}

const ChapterServices = memo(function ChapterServices() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <div ref={ref} className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6"
      >
        <p className="text-[11px] uppercase tracking-[0.28em] font-semibold text-teal-400 mb-16 text-center">
          What we do
        </p>

        <div className="space-y-0 divide-y divide-white/8">
          {SERVICES.map((svc, i) => (
            <ServiceRow
              key={svc.n}
              inView={inView}
              index={i}
              n={svc.n}
              name={svc.name}
              desc={svc.desc}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
});

// ── Chapter 4 — "The CTA" ────────────────────────────────────────────────────
const ChapterCTA = memo(function ChapterCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center justify-center"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(13,148,136,0.15) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight text-cream-50 mb-8">
          <span className="block">Let&apos;s build</span>
          <span className="block text-teal-400">something great.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-500 transition-colors duration-300 shadow-teal mt-4"
          >
            Book a call
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2.5 6.5h8M6.5 2.5l4 4-4 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
});

// ── Main ScrollStory ─────────────────────────────────────────────────────────
const CHAPTERS = [
  { id: "studio", label: "Studio", component: ChapterStudio },
  { id: "numbers", label: "Numbers", component: ChapterNumbers },
  { id: "services", label: "Services", component: ChapterServices },
  { id: "cta", label: "Start", component: ChapterCTA },
];

function Chapter({ chapter }: { chapter: (typeof CHAPTERS)[number] }) {
  const Component = chapter.component;

  return (
    <div
      className="relative w-full min-h-[70vh] md:min-h-screen flex items-center overflow-hidden py-24 md:py-32"
      id={`chapter-${chapter.id}`}
    >
      <Component />
    </div>
  );
}

export default function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="bg-ink-950 relative"
      aria-label="Devlyncs story"
    >
      {/* GSAP canvas — floats across the entire section */}
      <ParticleCanvas sectionRef={sectionRef} />

      {/* GSAP floating brand words — very subtle, always alive */}
      <FloatingWords sectionRef={sectionRef} />

      {CHAPTERS.map((chapter) => (
        <Chapter key={chapter.id} chapter={chapter} />
      ))}

      {/* GSAP word ticker — pinned to section bottom */}
      <WordTicker sectionRef={sectionRef} />
    </section>
  );
}
