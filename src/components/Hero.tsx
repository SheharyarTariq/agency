"use client";

import { useRef, useEffect, Suspense, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Star, Users, Trophy } from "@phosphor-icons/react";
import * as THREE from "three";

// Bubble particle system using Three.js
function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    // Create bubble particles
    const count = 80;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
      sizes[i] = Math.random() * 18 + 4;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = Math.random() * 0.4 + 0.1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Circle texture for bubbles
    const createBubbleTexture = () => {
      const size = 64;
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      grad.addColorStop(0, "rgba(13, 148, 136, 0.18)");
      grad.addColorStop(0.6, "rgba(13, 148, 136, 0.06)");
      grad.addColorStop(1, "rgba(13, 148, 136, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();

      // rim highlight
      ctx.strokeStyle = "rgba(13, 148, 136, 0.22)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
      ctx.stroke();

      return new THREE.CanvasTexture(c);
    };

    const material = new THREE.PointsMaterial({
      map: createBubbleTexture(),
      size: 0.3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animFrameId: number;
    let t = 0;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      t += 0.008;

      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += speeds[i] * 0.005;
        pos[i * 3] += Math.sin(t * speeds[i] + phases[i]) * 0.003;
        if (pos[i * 3 + 1] > 4.5) {
          pos[i * 3 + 1] = -4.5;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Gentle rotation following mouse
      particles.rotation.x += (mouseY * 0.03 - particles.rotation.x) * 0.04;
      particles.rotation.y += (mouseX * 0.05 - particles.rotation.y) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!canvas) return;
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

// Magnetic CTA button
function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex items-center gap-2 pl-5 pr-1.5 py-1.5 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors duration-300 shadow-teal will-change-transform"
    >
      {children}
    </motion.a>
  );
}

const trustBadges = [
  { icon: Star, text: "4.9 / 5 client rating" },
  { icon: Users, text: "60+ brands served" },
  { icon: Trophy, text: "8 years of craft" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-cream-50">
      {/* Three.js canvas */}
      {mounted && <BubbleCanvas />}

      {/* Radial glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 50%, rgba(13,148,136,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div className="max-w-2xl">
            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-600/25 bg-teal-600/8 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse-soft" />
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-teal-700">
                Creative Studio · Est. 2016
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.45,
              }}
              className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink-950 mb-6"
            >
              We craft digital
              <br />
              <em className="not-italic text-teal-600">experiences.</em>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.6,
              }}
              className="text-[1.125rem] leading-relaxed text-ink-800/65 max-w-[55ch] mb-10"
            >
              AlgoThink Solutions is a full-service creative studio building
              brands, products, and campaigns for ambitious founders and
              forward-thinking companies.
            </motion.p>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.7,
              }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold text-emerald-700">
                Accepting 2 new projects for May 2026
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.85,
              }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <MagneticButton href="#contact">
                Start a Project
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight size={13} weight="bold" />
                </span>
              </MagneticButton>

              <motion.a
                href="#portfolio"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-800/70 hover:text-ink-950 transition-colors"
              >
                See our work
                <ArrowRight size={13} className="opacity-50" />
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.05 }}
              className="flex flex-wrap gap-4"
            >
              {trustBadges.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.1 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-600/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={11} weight="fill" className="text-teal-600" />
                  </div>
                  <span className="text-[12px] font-medium text-ink-800/60">
                    {text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating card stack */}
          <div className="hidden lg:block relative h-[520px]">
            {/* Background ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-teal-600/10 animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-teal-600/15" />

            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-12 left-8 right-8 animate-float-slow"
            >
              <div className="p-1.5 rounded-[2.5rem] bg-ink-950/5 border border-ink-950/6">
                <div className="rounded-[calc(2.5rem-6px)] bg-white shadow-soft-lg overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/agency-hero/480/300`}
                    alt="Recent project showcase"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] uppercase tracking-widest font-semibold text-teal-600">
                        Latest project
                      </span>
                      <span className="text-[11px] text-ink-800/40">
                        Delivered on time
                      </span>
                    </div>
                    <p className="text-ink-950 font-semibold text-sm">
                      Meridian Co. — Brand Identity
                    </p>
                    <p className="text-ink-800/50 text-xs mt-0.5">
                      Logo · Type · Color · Guidelines
                    </p>
                    <div className="mt-4 h-1.5 rounded-full bg-ink-950/6 overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 1.5,
                          delay: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="h-full rounded-full bg-teal-600"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-ink-800/40">
                        Discovery
                      </span>
                      <span className="text-[10px] text-teal-600 font-medium">
                        Delivered
                      </span>
                      <span className="text-[10px] text-ink-800/30">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-16 right-0 animate-float-medium"
            >
              <div className="p-1 rounded-2xl bg-teal-600/8 border border-teal-600/15">
                <div className="rounded-[calc(1rem-3px)] bg-white/95 px-4 py-3 shadow-soft">
                  <p className="text-[11px] text-ink-800/50 mb-0.5">
                    Brands served
                  </p>
                  <p className="font-display text-2xl font-bold text-ink-950">
                    60+
                  </p>
                  <div className="flex -space-x-1.5 mt-2">
                    {[
                      "seed/client-a/32/32",
                      "seed/client-b/32/32",
                      "seed/client-c/32/32",
                      "seed/client-d/32/32",
                    ].map((s, i) => (
                      <img
                        key={i}
                        src={`https://picsum.photos/${s}`}
                        alt=""
                        className="w-5 h-5 rounded-full border border-white object-cover"
                      />
                    ))}
                    <div className="w-5 h-5 rounded-full border border-white bg-teal-100 flex items-center justify-center">
                      <span className="text-[7px] font-bold text-teal-700">
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-32 left-2"
            >
              <div className="p-1 rounded-2xl bg-white border border-ink-950/8 shadow-soft">
                <div className="px-3 py-2">
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="#0D9488"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[11px] font-semibold text-ink-950">
                    4.9 / 5.0
                  </p>
                  <p className="text-[9px] text-ink-800/40">
                    98% client retention
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(253,251,247,0.8))",
        }}
      />
    </section>
  );
}
