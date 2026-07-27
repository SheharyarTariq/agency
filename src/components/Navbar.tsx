"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

const navLinks = [
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 80], [0.85, 0.98]);
  const navBlur = useTransform(scrollY, [0, 80], [8, 20]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Floating pill nav */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <motion.nav
          style={{ opacity: navOpacity }}
          className={`
            flex items-center justify-between gap-6 px-4 py-2.5 rounded-full
            border transition-all duration-500
            ${
              scrolled
                ? "bg-cream-50/95 border-ink-950/8 shadow-soft"
                : "bg-cream-50/70 border-ink-950/6"
            }
          `}
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center pl-1 group"
            aria-label="Devlyncs home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.svg"
              alt="Devlyncs"
              className="w-9 h-9 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative px-3.5 py-1.5 text-[13px] font-medium text-ink-800/70 hover:text-ink-950 transition-colors duration-300 rounded-full hover:bg-ink-950/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="group hidden md:flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-ink-950 text-cream-50 text-[13px] font-semibold hover:bg-ink-800 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-[0.97]"
          >
            Book a Call
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform duration-300">
              <ArrowRight size={11} weight="bold" />
            </span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 p-1"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="block w-5 h-[1.5px] bg-ink-950 origin-center"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="block w-5 h-[1.5px] bg-ink-950 origin-center"
            />
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile fullscreen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden backdrop-blur-2xl bg-cream-50/90"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="flex flex-col justify-center items-center h-full gap-2 px-8"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07 + 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full text-center py-4 text-3xl font-display font-light text-ink-950 border-b border-ink-950/8 hover:text-teal-600 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  duration: 0.5,
                  delay: 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-6 w-full text-center py-4 rounded-full bg-ink-950 text-cream-50 text-lg font-semibold"
              >
                Book a Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
