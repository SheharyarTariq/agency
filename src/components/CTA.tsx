"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";

// TODO: Connect form to a real backend (e.g. Formspree, Resend, or a Next.js API route)
// For now the form shows a success state on submit.

const projectTypes = [
  "Brand Identity",
  "Web Design",
  "Web Development",
  "Digital Marketing",
  "Full-Service (Brand + Web)",
  "Other / Not sure yet",
];

const budgets = [
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "6 months +",
];

const hearAbout = [
  "Google / Search",
  "Social media",
  "Referral from a friend",
  "Referral from a client",
  "Portfolio / Behance / Dribbble",
  "LinkedIn",
  "Other",
];

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  hearAbout: string;
  message: string;
}

const emptyForm: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  hearAbout: "",
  message: "",
};

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-[0.14em] font-semibold text-cream-50/40">
        {label}
        {required && <span className="text-teal-400 ml-0.5">*</span>}
      </label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-white/12 rounded-xl px-4 py-3 text-sm text-ink-950 placeholder-ink-950/40 [color-scheme:light] focus:outline-none focus:border-teal-500/60 transition-all duration-200 appearance-none cursor-pointer"
        style={{ backgroundImage: "none" }}
      >
        <option value="" disabled className="bg-white text-ink-950">
          Select one…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-white text-ink-950">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-[0.14em] font-semibold text-cream-50/40">
        {label}
        {required && <span className="text-teal-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-white/12 rounded-xl px-4 py-3 text-sm text-ink-950 placeholder-ink-950/40 [color-scheme:light] focus:outline-none focus:border-teal-500/60 transition-all duration-200"
      />
    </div>
  );
}

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormData) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-cream-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[3rem] bg-ink-950"
        >
          {/* Background glow blobs */}
          <div
            className="absolute top-0 left-1/4 w-[40rem] h-[30rem] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[30rem] h-[20rem] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            {/* Left: header */}
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-600/30 bg-teal-600/15 mb-6"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-soft" />
                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-teal-400">
                  Let&apos;s work together
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-tight tracking-tight text-cream-50 mb-5"
              >
                Ready to build
                <br />
                <em className="not-italic text-teal-400">something great?</em>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-sm leading-relaxed text-cream-50/50 max-w-[38ch] mb-8"
              >
                Tell us about your project. We read every submission personally
                and reply within 24 hours.
              </motion.p>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-2.5"
              >
                {[
                  "Free 30-min discovery call included",
                  "No pushy sales — honest fit assessment",
                  "Response within 24 hours, always",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle
                      size={14}
                      weight="fill"
                      className="text-teal-400 flex-shrink-0"
                    />
                    <span className="text-[13px] text-cream-50/45">{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-8 pt-8 border-t border-white/8"
              >
                <p className="text-[11px] text-cream-50/25 mb-1">
                  Prefer to reach out directly?
                </p>
                <a
                  href="mailto:hello@algothinksolutions.com"
                  className="text-[13px] text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  hello@algothinksolutions.com
                </a>
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center py-20 px-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-500/15 flex items-center justify-center mb-6">
                      <CheckCircle
                        size={32}
                        weight="fill"
                        className="text-teal-400"
                      />
                    </div>
                    <h3 className="font-display text-2xl text-cream-50 mb-3">
                      Message sent!
                    </h3>
                    <p className="text-sm text-cream-50/50 max-w-[32ch] mb-8">
                      Thanks for reaching out. We&apos;ll review your project
                      details and get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm(emptyForm);
                        setError(null);
                      }}
                      className="text-[13px] text-teal-400 hover:text-teal-300 transition-colors underline underline-offset-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Row 1: Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField
                        label="Your name"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Jane Smith"
                        required
                      />
                      <InputField
                        label="Work email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="jane@company.com"
                        required
                      />
                    </div>

                    {/* Row 2: Company */}
                    <InputField
                      label="Company / Project name"
                      value={form.company}
                      onChange={set("company")}
                      placeholder="Optional"
                    />

                    {/* Row 3: Project type */}
                    <SelectField
                      label="What do you need?"
                      value={form.projectType}
                      onChange={set("projectType")}
                      options={projectTypes}
                      required
                    />

                    {/* Row 4: Budget + Timeline */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <SelectField
                        label="Budget range"
                        value={form.budget}
                        onChange={set("budget")}
                        options={budgets}
                        required
                      />
                      <SelectField
                        label="Timeline"
                        value={form.timeline}
                        onChange={set("timeline")}
                        options={timelines}
                        required
                      />
                    </div>

                    {/* Row 5: How they heard */}
                    <SelectField
                      label="How did you find us?"
                      value={form.hearAbout}
                      onChange={set("hearAbout")}
                      options={hearAbout}
                    />

                    {/* Row 6: Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] uppercase tracking-[0.14em] font-semibold text-cream-50/40">
                        Tell us about your project
                        <span className="text-teal-400 ml-0.5">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => set("message")(e.target.value)}
                        placeholder="What are you building? What problem are you solving? Any details help…"
                        className="w-full bg-white border border-white/12 rounded-xl px-4 py-3 text-sm text-ink-950 placeholder-ink-950/40 [color-scheme:light] focus:outline-none focus:border-teal-500/60 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full inline-flex items-center justify-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-teal active:scale-[0.98]"
                    >
                      {loading ? (
                        <>
                          <span>Sending…</span>
                          <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          </span>
                        </>
                      ) : (
                        <>
                          <span>Send project brief</span>
                          <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110 transition-transform duration-300">
                            <PaperPlaneTilt size={13} weight="bold" />
                          </span>
                        </>
                      )}
                    </button>

                    {error && (
                      <p className="text-center text-[12px] text-red-400/90">
                        {error}
                      </p>
                    )}

                    <p className="text-center text-[11px] text-cream-50/20">
                      No commitment. No spam. Just a conversation.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
