"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import ProjectModal, { type Project } from "./ProjectModal";

// ─── Project data ────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "eduvents",
    title: "Eduvents",
    domain: "eduvents.co.uk",
    url: "https://eduvents.co.uk",
    category: "Education Platform",
    accentColor: "#16a34a",
    tagline:
      "UK education events marketplace connecting organisers with teachers and school staff.",
    description: `Eduvents is a UK-based education events platform built with Next.js 16 (App Router, Turbopack), MongoDB (Mongoose), AWS S3, Stripe, and Mailchimp.

The platform connects education event organisers with teachers and school staff, serving three distinct user types — Admins, Organisers, and Site Users — each with their own dedicated authentication, dashboard, and feature set.

Key features include a unified JWT-based cookie auth system across three account types, event listings with full filtering (category, format, subject, educational phase, price range, date), map-mode browsing with automatic geocoding, Stripe checkout at £99 per listing, event performance analytics (views + clicks) rolling up to organiser dashboards, and a Mailchimp integration that syncs subject interests to actual checkbox interest groups enabling targeted email campaigns per subject area.`,
    tech: [
      "Next.js 16",
      "MongoDB",
      "AWS S3",
      "Stripe",
      "Mailchimp",
      "JWT",
      "TypeScript",
    ],
    coverImage: "/projects/eduvents/Screenshot-2026-04-25-at-2.58.37-PM.png",
    screenshots: [
      "/projects/eduvents/Screenshot-2026-04-25-at-2.58.37-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-2.58.49-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-2.59.01-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-2.59.13-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-2.59.26-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-2.59.37-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-2.59.45-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.00.42-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.01.09-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.01.18-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.01.33-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.01.51-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.01.59-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.02.09-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.02.50-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.03.03-PM.png",
      "/projects/eduvents/Screenshot-2026-04-25-at-3.03.12-PM.png",
    ],
  },
  {
    id: "nyf",
    title: "NYF Tours",
    domain: "nyf-client-fec2b1621ebb.herokuapp.com",
    url: "https://nyf-client-fec2b1621ebb.herokuapp.com",
    category: "Travel Platform",
    accentColor: "#3b4e9e",
    tagline:
      "End-to-end holiday and activities booking platform for the UAE/Dubai market.",
    description: `NYF is a full-stack holiday and activities booking platform built for the travel and tourism industry, targeting the UAE/Dubai market with AED-based pricing and activity categories like desert safaris, dhow cruises, and helicopter tours.

Architected as three separate applications: a Node.js/Express TypeScript backend with MongoDB, a Next.js 15 frontend with React 19 and Jotai for state management, and a React/Vite admin panel with Material-UI and ApexCharts.

The backend manages 18 MongoDB data models covering Activities, HolidayPackages, Deals, Hotels, Vehicles, Suppliers, Customers, Bookings, Cart (with 24-hour auto-expiry), Enquiries, and a hierarchical geo-location system. Features include multi-currency support, Cloudinary CDN, Nodemailer, global full-text search, Stripe payments, and comprehensive input validation with Mongoose, Zod, and React Hook Form.`,
    tech: [
      "Next.js 15",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe",
      "Cloudinary",
      "ApexCharts",
      "Jotai",
    ],
    coverImage: "/projects/nyf/Screenshot-2026-04-25-at-3.07.08-PM.png",
    screenshots: [
      "/projects/nyf/Screenshot-2026-04-25-at-3.07.08-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.07.14-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.07.32-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.07.56-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.08.06-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.08.16-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.08.26-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.08.35-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.08.51-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.09.08-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.09.20-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.09.44-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.09.58-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.10.06-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.10.15-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.10.23-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.10.31-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.10.40-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.10.49-PM.png",
      "/projects/nyf/Screenshot-2026-04-25-at-3.11.10-PM.png",
    ],
  },
  {
    id: "athadak",
    title: "Athadak",
    domain: "athatok.vercel.app",
    url: "https://athatok.vercel.app/home",
    category: "Sports Platform",
    accentColor: "#ef4444",
    tagline:
      "Social-commerce hybrid blending a social feed with a fully functional e-commerce marketplace.",
    description: `Looprin (Athadak) is a comprehensive mobile application built with React Native and a Node.js/TypeScript/Express 5/MongoDB backend, designed to power a hybrid social-commerce platform.

Authentication via phone OTP (SMS + WhatsApp through Twilio), Google OAuth, and Apple Sign-In. The social feed supports rich posts with text, images, videos, hashtags, mentions, and location tagging with AI content moderation via Google Gemini and OpenAI.

Real-time messaging powered by Socket.IO with group chats, voice notes, read receipts, and typing indicators. The e-commerce layer supports stores with full variant products, cart, wishlist, and Stripe Connect payments flowing directly to sellers. Notification delivery via Firebase Cloud Messaging to up to 5 devices per user.`,
    tech: [
      "React Native",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Socket.IO",
      "Stripe Connect",
      "Twilio",
      "Firebase FCM",
      "AWS S3",
    ],
    coverImage: "/projects/athadak/Screenshot-2026-04-25-at-3.13.18-PM.png",
    screenshots: [
      "/projects/athadak/Screenshot-2026-04-25-at-3.13.18-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.13.29-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.13.37-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.13.49-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.14.22-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.14.45-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.14.52-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.15.01-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.15.10-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.15.19-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.15.44-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.15.55-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.16.05-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.16.12-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.16.21-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.16.31-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.16.52-PM.png",
      "/projects/athadak/Screenshot-2026-04-25-at-3.16.59-PM.png",
    ],
  },
  {
    id: "sofia",
    title: "Sofia",
    domain: "Sofia Content Calendar",
    url: "#",
    category: "AI Platform",
    accentColor: "#7c3aed",
    tagline:
      "AI-powered social media management platform generating 12-month content calendars with Claude AI.",
    description: `Sofia Content Calendar is a full-stack, AI-powered social media management platform built with Next.js 15, React 19, TypeScript, Tailwind CSS, and MongoDB, designed for "The Academy by Sophia" — a coaching brand targeting women entrepreneurs.

The platform uses the Anthropic Claude API (claude-sonnet-4-6) to automatically generate complete 12-month social media content calendars. It ingests a client's Offer Framework document (PDF/DOCX uploaded to AWS S3), parses it server-side, and structures it into a rich JSON schema capturing the ideal client profile, offer phases, and features-benefits-outcomes breakdown.

Generates 4 fully publish-ready captions per platform per month (LinkedIn, Instagram, TikTok) with hooks, body copy, CTAs, and hashtag sets. Month regeneration uses adjacent-month context to ensure narrative continuity. Export to branded PDF or structured DOCX in one click.`,
    tech: [
      "Next.js 15",
      "Claude AI (Anthropic)",
      "MongoDB",
      "AWS S3",
      "PDF/DOCX Export",
      "JWT Auth",
      "Zod",
      "shadcn/ui",
    ],
    coverImage: "/projects/sophia/Screenshot-2026-04-25-at-3.25.50-PM.png",
    screenshots: [
      "/projects/sophia/Screenshot-2026-04-25-at-3.25.50-PM.png",
      "/projects/sophia/Screenshot-2026-04-25-at-3.26.11-PM.png",
      "/projects/sophia/Screenshot-2026-04-25-at-3.26.29-PM.png",
      "/projects/sophia/Screenshot-2026-04-25-at-3.26.38-PM.png",
      "/projects/sophia/Screenshot-2026-04-25-at-3.26.54-PM.png",
    ],
  },
  {
    id: "clipboard",
    title: "Advanced Clipboard",
    domain: "Chrome Extension",
    url: "#",
    category: "Browser Extension",
    accentColor: "#0891b2",
    tagline:
      "Feature-rich Chrome Manifest V3 extension that monitors, organises and syncs clipboard history.",
    description: `Advanced Clipboard Organiser is a Chrome browser extension (Manifest V3) built with TypeScript and Tailwind CSS, backed by a Node.js/Express REST API with MongoDB. Automatically captures text, HTML, and images — storing up to 500 items free or 5,000 on Pro.

Complete auth system: email/password + OTP verification, JWT sessions, full password-reset flow. Stripe subscription at $57.95/year unlocks image capture with AWS S3 cloud storage, keyboard shortcuts (fully customisable with conflict detection), floating detached window mode, passcode-based extension lock with auto-lock timer, 30-day auto-cleanup, and cross-device sync.

Security: bcrypt passwords, sensitive data auto-detection (credit cards via Luhn algorithm), soft-deletes, chrome.storage.local. An offscreen document handles clipboard access within Manifest V3 constraints. Duplicate prevention uses exact matching, plain-text comparison, image hashing, and time-based debouncing.`,
    tech: [
      "Chrome Extension (MV3)",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "AWS S3",
      "Stripe",
      "Tailwind CSS",
    ],
    coverImage: "/projects/clipboard/Screenshot-2026-04-25-at-3.19.34-PM.png",
    screenshots: [
      "/projects/clipboard/Screenshot-2026-04-25-at-3.19.34-PM.png",
      "/projects/clipboard/Screenshot-2026-04-25-at-3.19.43-PM.png",
      "/projects/clipboard/Screenshot-2026-04-25-at-3.21.24-PM.png",
      "/projects/clipboard/Screenshot-2026-04-25-at-3.21.41-PM.png",
      "/projects/clipboard/Screenshot-2026-04-25-at-3.21.54-PM.png",
    ],
  },
];

// ─── Card helpers ────────────────────────────────────────────────────────────

function CategoryTag({ label }: { label: string }) {
  return (
    <div className="absolute top-4 left-4 z-30">
      <span className="px-3 py-1 rounded-full bg-white/90 text-[10px] uppercase tracking-widest font-semibold text-ink-950">
        {label}
      </span>
    </div>
  );
}

function LiveBadge() {
  return (
    <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-sm">
      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      <span className="text-[9px] font-semibold text-white uppercase tracking-wide">
        Live
      </span>
    </div>
  );
}

function HoverOverlay() {
  return (
    <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/55 transition-colors duration-500 z-20" />
  );
}

function HoverReveal({
  domain,
  title,
  accentColor = "#0d9488",
  screenshotCount,
}: {
  domain: string;
  title: string;
  accentColor?: string;
  screenshotCount: number;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] text-cream-50/60 mb-0.5">{domain}</p>
          <h3 className="font-display text-lg font-semibold text-cream-50 leading-snug">
            {title}
          </h3>
          <p className="text-[10px] text-cream-50/50 mt-0.5">
            {screenshotCount} screenshots · click to explore
          </p>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: accentColor }}
        >
          <ArrowUpRight size={14} weight="bold" className="text-white" />
        </div>
      </div>
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  className,
  height = "h-72",
  delay = 0,
  onOpen,
}: {
  project: Project;
  className?: string;
  height?: string;
  delay?: number;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <button
        onClick={() => onOpen(project)}
        className={`group block relative overflow-hidden rounded-[2rem] border border-ink-950/8 shadow-soft hover:shadow-soft-lg transition-shadow duration-500 ${height} w-full text-left`}
        aria-label={`View ${project.title} case study`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={`${project.title} — ${project.category}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <HoverOverlay />
        <CategoryTag label={project.category} />
        {project.url !== "#" && <LiveBadge />}
        <HoverReveal
          domain={project.domain}
          title={project.title}
          accentColor={project.accentColor}
          screenshotCount={project.screenshots.length}
        />
      </button>
    </motion.div>
  );
}

// ─── Legacy cards (existing projects kept) ───────────────────────────────────

function LegacyCard({
  href,
  src,
  alt,
  category,
  domain,
  title,
  accentColor,
  className,
  height = "h-72",
  delay = 0,
}: {
  href: string;
  src: string;
  alt: string;
  category: string;
  domain: string;
  title: string;
  accentColor: string;
  className?: string;
  height?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block relative overflow-hidden rounded-[2rem] border border-ink-950/8 shadow-soft hover:shadow-soft-lg transition-shadow duration-500 ${height}`}
        aria-label={`View ${title} project`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <HoverOverlay />
        <CategoryTag label={category} />
        <LiveBadge />
        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] text-cream-50/60 mb-0.5">{domain}</p>
              <h3 className="font-display text-lg font-semibold text-cream-50 leading-snug">
                {title}
              </h3>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: accentColor }}
            >
              <ArrowUpRight size={14} weight="bold" className="text-white" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const eduvents = PROJECTS.find((p) => p.id === "eduvents")!;
  const nyf = PROJECTS.find((p) => p.id === "nyf")!;
  const athadak = PROJECTS.find((p) => p.id === "athadak")!;
  const sofia = PROJECTS.find((p) => p.id === "sofia")!;
  const clipboard = PROJECTS.find((p) => p.id === "clipboard")!;

  return (
    <>
      <section id="portfolio" className="py-28 md:py-36 bg-cream-100/40">
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
                  Selected work
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
                Projects we&apos;re
                <br />
                <em className="not-italic text-ink-800/45">proud of.</em>
              </motion.h2>
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors self-start lg:self-auto"
            >
              Book a call
              <span className="w-7 h-7 rounded-full bg-teal-600/10 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                <ArrowUpRight size={12} weight="bold" />
              </span>
            </motion.a>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Row 1: Mi Taller (7) + Strategy Shortcut (5) */}
            <LegacyCard
              href="https://mitaller.co"
              src="/projects/mitaller.png"
              alt="Mi Taller — Vehicle workshop directory"
              category="Web Platform"
              domain="mitaller.co"
              title="Mi Taller"
              accentColor="#3B82F6"
              className="lg:col-span-7"
              height="h-80"
              delay={0}
            />
            <LegacyCard
              href="https://strategy-shortcut-omega.vercel.app"
              src="/projects/strategyshortcut.png"
              alt="Strategy Shortcut — AI strategy chatbot"
              category="AI Chatbot"
              domain="strategy-shortcut-omega.vercel.app"
              title="Strategy Shortcut"
              accentColor="#E8542A"
              className="lg:col-span-5"
              height="h-80"
              delay={0.1}
            />

            {/* Row 2: Eduvents (5) + NYF (7) */}
            <ProjectCard
              project={eduvents}
              className="lg:col-span-5"
              height="h-72"
              delay={0.05}
              onOpen={setActiveProject}
            />
            <ProjectCard
              project={nyf}
              className="lg:col-span-7"
              height="h-72"
              delay={0.15}
              onOpen={setActiveProject}
            />

            {/* Row 3: Athadak (12 full-width featured) */}
            <ProjectCard
              project={athadak}
              className="lg:col-span-12"
              height="h-80"
              delay={0.05}
              onOpen={setActiveProject}
            />

            {/* Row 4: Sofia (6) + Clipboard (6) */}
            <ProjectCard
              project={sofia}
              className="lg:col-span-6"
              height="h-72"
              delay={0.1}
              onOpen={setActiveProject}
            />
            <ProjectCard
              project={clipboard}
              className="lg:col-span-6"
              height="h-72"
              delay={0.2}
              onOpen={setActiveProject}
            />

            {/* Row 5: TopNotepad (6) + RED Farms (6) */}
            <LegacyCard
              href="https://topnotepad.com"
              src="/projects/topnotepad.png"
              alt="TopNotepad — SaaS invoicing dashboard"
              category="SaaS Dashboard"
              domain="topnotepad.com"
              title="TopNotepad"
              accentColor="#1b3a6b"
              className="lg:col-span-6"
              height="h-72"
              delay={0.1}
            />
            <LegacyCard
              href="https://red-farms.com"
              src="/projects/red-farms.png"
              alt="RED Farms — Poultry farm e-commerce site"
              category="E-commerce"
              domain="red-farms.com"
              title="RED Farms"
              accentColor="#c0392b"
              className="lg:col-span-6"
              height="h-72"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Case study modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
