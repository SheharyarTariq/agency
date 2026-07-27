"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LinkedinLogo } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Hoisted static transition base — avoids recreating object on every render
const BASE_TRANSITION = { duration: 0.7, ease: EASE } as const;

// TODO: Replace placeholder with real photo, name, role, bio
const ALEX = {
  initials: "AM",
  avatarFrom: "from-teal-100",
  avatarTo: "to-emerald-50",
  name: "Alex Morgan",
  role: "Creative Director",
  specialty: "Brand strategy, visual identity, art direction",
};

// TODO: Replace placeholder with real photo, name, role, bio
const SAM = {
  initials: "SC",
  avatarFrom: "from-blue-100",
  avatarTo: "to-sky-50",
  name: "Sam Chen",
  role: "Lead Developer",
  specialty: "Next.js, React, full-stack architecture",
};

// TODO: Replace placeholder with real photo, name, role, bio
const JORDAN = {
  initials: "JL",
  avatarFrom: "from-purple-100",
  avatarTo: "to-violet-50",
  name: "Jordan Lee",
  role: "UX Designer",
  specialty: "Product design, user research, design systems",
};

// TODO: Replace placeholder with real photo, name, role, bio
const RILEY = {
  initials: "RP",
  avatarFrom: "from-amber-100",
  avatarTo: "to-orange-50",
  name: "Riley Park",
  role: "QA & Mobile Lead",
  specialty: "Mobile development, test automation, release quality",
};

const MEMBERS = [ALEX, SAM, JORDAN, RILEY];

type Member = (typeof MEMBERS)[number];

// Hidden initial state — hoisted so the object reference is stable
const HIDDEN = { opacity: 0, y: 24 } as const;
const VISIBLE = { opacity: 1, y: 0 } as const;

function MemberCard({
  member,
  index,
  isInView,
}: {
  member: Member;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={HIDDEN}
      animate={isInView ? VISIBLE : HIDDEN}
      transition={{ ...BASE_TRANSITION, delay: 0.2 + index * 0.1 }}
      className="group rounded-2xl bg-white border border-ink-950/[0.06] shadow-soft
                 p-6 flex flex-col gap-4
                 hover:-translate-y-1 hover:shadow-md
                 transition-all duration-300"
    >
      {/* Avatar */}
      <div
        className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.avatarFrom} ${member.avatarTo}
                    flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-teal-700 font-bold text-xl leading-none select-none">
          {member.initials}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-ink-950 leading-snug">{member.name}</p>
        <p className="text-sm text-teal-600 font-medium">{member.role}</p>
        <p className="text-xs text-ink-800/50 leading-relaxed mt-0.5">
          {member.specialty}
        </p>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-2 pt-1 mt-auto">
        <a
          href="#"
          aria-label={`${member.name} on LinkedIn`}
          className="text-ink-950/30 hover:text-teal-600 transition-colors duration-200"
        >
          <LinkedinLogo weight="fill" size={14} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="team" className="bg-cream-50 py-24 md:py-32">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Eyebrow */}
        <motion.div
          initial={HIDDEN}
          animate={isInView ? VISIBLE : HIDDEN}
          transition={BASE_TRANSITION}
          className="flex items-center gap-2 mb-6"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full
                       bg-teal-600/10 border border-teal-600/20
                       px-3 py-1 text-xs font-medium text-teal-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
            </span>
            Meet the team
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={HIDDEN}
          animate={isInView ? VISIBLE : HIDDEN}
          transition={{ ...BASE_TRANSITION, delay: 0.08 }}
          className="font-display text-ink-950 leading-[1.05] tracking-tight mb-4"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          Senior talent, <span className="block">hands-on always.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={HIDDEN}
          animate={isInView ? VISIBLE : HIDDEN}
          transition={{ ...BASE_TRANSITION, delay: 0.15 }}
          className="text-ink-800/60 text-lg max-w-xl mb-14"
        >
          Every project is led by a senior creative — no hand-offs to juniors.
        </motion.p>

        {/* Cards grid — always in the DOM; animation driven by isInView */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERS.map((member, index) => (
            <MemberCard
              key={member.name}
              member={member}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
