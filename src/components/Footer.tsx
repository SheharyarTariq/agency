"use client";

import { motion } from "framer-motion";
import {
  XLogo,
  LinkedinLogo,
  DribbbleLogo,
  GithubLogo,
} from "@phosphor-icons/react";

const links = {
  Services: [
    { label: "Web Design", href: "#services" },
    { label: "Web Development", href: "#services" },
    { label: "UX/UI Design", href: "#services" },
    { label: "Mobile Development", href: "#services" },
    { label: "Digital Product Design", href: "#services" },
    { label: "Testing & QA", href: "#services" },
    { label: "Graphic Design", href: "#services" },
  ],
  Company: [
    { label: "Our work", href: "#portfolio" },
    { label: "Our process", href: "#process" },
    { label: "Our team", href: "#team" },
    { label: "Client reviews", href: "#testimonials" },
  ],
  Connect: [
    { label: "Contact us", href: "#contact" },
    { label: "Book a call", href: "#contact" },
    { label: "support@devlyncs.com", href: "mailto:support@devlyncs.com" },
  ],
  Legal: [
    { label: "Privacy policy", href: "#" },
    { label: "Terms of service", href: "#" },
    { label: "Cookie settings", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
};

const socials = [
  { icon: XLogo, label: "X / Twitter" },
  { icon: LinkedinLogo, label: "LinkedIn" },
  { icon: DribbbleLogo, label: "Dribbble" },
  { icon: GithubLogo, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 mb-14 pb-14 border-b border-white/8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon.svg"
                alt="Devlyncs"
                className="w-12 h-12"
              />
            </div>
            <p className="text-sm leading-relaxed text-cream-50/35 max-w-[28ch] mb-6">
              A full-service digital agency designing, building, and testing
              web and mobile products for ambitious companies.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/25 hover:bg-white/8 transition-all duration-300"
                >
                  <Icon size={13} weight="fill" className="text-cream-50/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(links).map(([section, items]) => (
              <div key={section}>
                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-cream-50/30 mb-4">
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-[13px] text-cream-50/45 hover:text-cream-50/80 transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-cream-50/25">
            &copy; {new Date().getFullYear()} Devlyncs Ltd. All
            rights reserved.
          </p>
          <p className="text-[12px] text-cream-50/20">Crafted with care</p>
        </div>
      </div>
    </footer>
  );
}
