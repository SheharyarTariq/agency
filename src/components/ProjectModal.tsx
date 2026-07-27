"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

export interface Project {
  id: string;
  title: string;
  domain: string;
  url: string;
  category: string;
  accentColor: string;
  tagline: string;
  description: string;
  tech: string[];
  screenshots: string[];
  coverImage: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [slide, setSlide] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlide(0);
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setSlide((s) => Math.min(s + 1, project.screenshots.length - 1));
      if (e.key === "ArrowLeft") setSlide((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl max-h-[92vh] sm:max-h-[88vh] bg-cream-50 rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-ink-950/8 hover:bg-ink-950/14 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X size={16} weight="bold" className="text-ink-950" />
            </button>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">
              {/* Image gallery */}
              <div className="relative bg-ink-900 aspect-[16/9] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide}
                    src={project.screenshots[slide]}
                    alt={`${project.title} screenshot ${slide + 1}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>

                {/* Nav arrows */}
                {project.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() => setSlide((s) => Math.max(s - 1, 0))}
                      disabled={slide === 0}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow disabled:opacity-30 hover:bg-white transition-all"
                    >
                      <CaretLeft
                        size={14}
                        weight="bold"
                        className="text-ink-950"
                      />
                    </button>
                    <button
                      onClick={() =>
                        setSlide((s) =>
                          Math.min(s + 1, project.screenshots.length - 1),
                        )
                      }
                      disabled={slide === project.screenshots.length - 1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow disabled:opacity-30 hover:bg-white transition-all"
                    >
                      <CaretRight
                        size={14}
                        weight="bold"
                        className="text-ink-950"
                      />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {project.screenshots.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlide(i)}
                          className={`rounded-full transition-all duration-300 ${i === slide ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-[10px] uppercase tracking-widest font-semibold text-ink-950">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Thumbnail strip */}
              {project.screenshots.length > 1 && (
                <div className="flex gap-2 px-6 py-3 overflow-x-auto scrollbar-none border-b border-ink-950/8">
                  {project.screenshots.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === slide ? "border-teal-500 opacity-100" : "border-transparent opacity-50 hover:opacity-75"}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="px-6 sm:px-10 py-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[11px] text-ink-800/50 uppercase tracking-widest mb-1">
                      {project.domain}
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-950 leading-tight">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-ink-800/60 text-sm">
                      {project.tagline}
                    </p>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white flex-shrink-0 transition-opacity hover:opacity-90"
                    style={{ backgroundColor: project.accentColor }}
                  >
                    View Live
                    <ArrowUpRight size={14} weight="bold" />
                  </a>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-ink-950/6 text-[11px] font-medium text-ink-800/70 uppercase tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-ink-800/75 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
