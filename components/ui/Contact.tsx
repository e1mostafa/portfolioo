"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { person } from "@/data/portfolio";

type FormState = "idle" | "submitting" | "success" | "error";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    handle: "elmustafamohamad",
    href: "https://linkedin.com/in/elmustafamohamad",
    color: "#00d4ff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    handle: "e1mostafa",
    href: "https://github.com/e1mostafa",
    color: "#00ff88",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "elmostafaabdelaal@gmail.com",
    href: `mailto:${person.email}`,
    color: "#ff2d78",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

/**
 * Contact Section
 * - Cinematic section header with GSAP reveal
 * - Futuristic glass contact form
 * - Animated input focus states with neon glow
 * - Animated success / error state
 * - Social links with magnetic hover + icon glow
 * - Ambient animated grid dots
 */
export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // ——— Title reveal ———
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.from(titleRef.current?.querySelectorAll(".reveal") ?? [], {
            y: 70,
            opacity: 0,
            stagger: 0.07,
            duration: 1.1,
            ease: "power4.out",
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ——— Form entrance ———
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: formRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.from(formRef.current?.querySelectorAll(".form-field") ?? [], {
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setFormState("submitting");

    // Simulate API call — replace with real endpoint (Resend, EmailJS, Formspree, etc.)
    await new Promise((res) => setTimeout(res, 1800));

    // Animate success
    gsap.to(formRef.current, {
      scale: 0.98,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setFormState("success");
        setName(""); setEmail(""); setSubject(""); setMessage("");
        gsap.from(".success-block", { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(2)" });
      },
    });
  };

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden">
      {/* Background aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[700px] h-[500px] opacity-[0.04] blur-[160px]"
          style={{ background: "radial-gradient(circle, #00ff88, transparent)" }}
        />
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px] opacity-[0.03] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }}
        />
      </div>

      {/* Animated dot grid */}
      <DotGrid />

      <div className="section-container">
        {/* Header */}
        <div ref={titleRef} className="mb-24">
          <p className="reveal font-mono text-xs text-neon-green/60 tracking-[0.4em] uppercase mb-4">
            06 / Contact
          </p>
          <h2 className="reveal font-display text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white">Let&apos;s</span>
            <br />
            <span className="text-white/10">Connect</span>
          </h2>
          <p className="reveal text-gray-500 mt-6 max-w-lg text-sm md:text-base">
            Open to internships, collaborations, and entry-level opportunities.
            Reach out and let&apos;s build something exceptional together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">
          {/* ——— Form ——— */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <SuccessState key="success" onReset={() => setFormState("idle")} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    {/* Row: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FuturisticInput
                        label="Name"
                        name="name"
                        value={name}
                        onChange={setName}
                        placeholder="Your full name"
                        focused={focusedField}
                        onFocus={setFocusedField}
                      />
                      <FuturisticInput
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="your@email.com"
                        focused={focusedField}
                        onFocus={setFocusedField}
                      />
                    </div>

                    {/* Subject */}
                    <FuturisticInput
                      label="Subject"
                      name="subject"
                      value={subject}
                      onChange={setSubject}
                      placeholder="Internship Opportunity / Collaboration / Other"
                      focused={focusedField}
                      onFocus={setFocusedField}
                    />

                    {/* Message */}
                    <FuturisticTextarea
                      label="Message"
                      name="message"
                      value={message}
                      onChange={setMessage}
                      placeholder="Describe the opportunity or project..."
                      focused={focusedField}
                      onFocus={setFocusedField}
                    />

                    {/* Submit */}
                    <div className="pt-2">
                      <MagneticButton
                        type="submit"
                        variant="primary"
                        className="w-full sm:w-auto"
                        strength={0.2}
                      >
                        {formState === "submitting" ? (
                          <span className="flex items-center gap-3">
                            <LoadingSpinner />
                            Transmitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-3">
                            Send Message
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                          </span>
                        )}
                      </MagneticButton>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ——— Right side info ——— */}
          <div className="space-y-8">
            {/* Social links */}
            <div>
              <p className="font-mono text-xs text-gray-700 uppercase tracking-widest mb-5">
                Find me on
              </p>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <SocialLink key={link.label} {...link} />
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="glass-card p-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-60" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green" />
                </span>
                <span className="font-mono text-xs text-neon-green">
                  Currently Available
                </span>
              </div>
              <div className="space-y-2 font-mono text-xs text-gray-600">
                <p>📍 Based in Egypt</p>
                <p>🌍 Open to remote worldwide</p>
                <p>⚡ Response within 24 hours</p>
                <p>🎓 Expected graduation June 2027</p>
              </div>
            </div>

            {/* Direct email button */}
            <MagneticButton
              href={`mailto:${person.email}`}
              as="a"
              variant="outline"
              className="w-full"
              strength={0.25}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Direct Email
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Form Input ——— */
interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  focused: string | null;
  onFocus: (n: string | null) => void;
}

function FuturisticInput({ label, name, type = "text", value, onChange, placeholder, focused, onFocus }: InputProps) {
  const isFocused = focused === name;
  return (
    <div className="form-field space-y-2">
      <label
        className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
        style={{ color: isFocused ? "#00ff88" : "#374151" }}
      >
        {label}
      </label>
      <div
        className="relative rounded transition-all duration-300"
        style={{
          border: `1px solid ${isFocused ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.06)"}`,
          boxShadow: isFocused ? "0 0 20px rgba(0,255,136,0.08), inset 0 0 20px rgba(0,255,136,0.02)" : "none",
        }}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus(name)}
          onBlur={() => onFocus(null)}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-3.5 font-mono text-sm text-gray-300 placeholder-gray-700 outline-none rounded"
          style={{ cursor: "text" }}
          data-cursor="text"
          autoComplete="off"
          spellCheck={false}
        />
        {/* Animated corner tick */}
        {isFocused && (
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-green/60 rounded-tl" />
        )}
        {isFocused && (
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-green/60 rounded-br" />
        )}
      </div>
    </div>
  );
}

function FuturisticTextarea({ label, name, value, onChange, placeholder, focused, onFocus }: Omit<InputProps, "type">) {
  const isFocused = focused === name;
  return (
    <div className="form-field space-y-2">
      <label
        className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
        style={{ color: isFocused ? "#00ff88" : "#374151" }}
      >
        {label}
      </label>
      <div
        className="relative rounded transition-all duration-300"
        style={{
          border: `1px solid ${isFocused ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.06)"}`,
          boxShadow: isFocused ? "0 0 20px rgba(0,255,136,0.08), inset 0 0 20px rgba(0,255,136,0.02)" : "none",
        }}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus(name)}
          onBlur={() => onFocus(null)}
          placeholder={placeholder}
          rows={5}
          className="w-full bg-transparent px-4 py-3.5 font-mono text-sm text-gray-300 placeholder-gray-700 outline-none resize-none rounded"
          style={{ cursor: "text" }}
          data-cursor="text"
          spellCheck={false}
        />
        {isFocused && (
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-green/60 rounded-tl" />
        )}
        {isFocused && (
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-green/60 rounded-br" />
        )}
      </div>
    </div>
  );
}

/* ——— Social link ——— */
function SocialLink({ label, handle, href, color, icon }: (typeof SOCIAL_LINKS)[number]) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 glass-card group"
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{ borderColor: `${color}10` }}
    >
      <div
        className="flex-shrink-0 w-9 h-9 rounded flex items-center justify-center transition-all duration-300"
        style={{
          background: `${color}10`,
          border: `1px solid ${color}25`,
          color,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-mono text-xs text-gray-600 uppercase tracking-widest">{label}</p>
        <p className="font-mono text-xs mt-0.5 truncate" style={{ color }}>{handle}</p>
      </div>
      <svg
        className="w-4 h-4 text-gray-700 ml-auto group-hover:text-white transition-colors"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </motion.a>
  );
}

/* ——— Success state ——— */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      className="success-block flex flex-col items-center justify-center py-20 text-center space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Check icon */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-neon-green/20 animate-pulse-ring" />
        <div className="w-16 h-16 rounded-full bg-neon-green/10 border border-neon-green/40 flex items-center justify-center">
          <svg className="w-7 h-7 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl font-bold text-white">Message Sent!</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-xs">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <button
        onClick={onReset}
        className="font-mono text-xs text-neon-green/60 hover:text-neon-green transition-colors tracking-widest uppercase"
      >
        Send another →
      </button>
    </motion.div>
  );
}

/* ——— Loading spinner ——— */
function LoadingSpinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/* ——— Animated dot grid background ——— */
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, row) =>
        Array.from({ length: 20 }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className="absolute w-px h-px rounded-full bg-white"
            style={{
              left: `${(col / 19) * 100}%`,
              top: `${(row / 11) * 100}%`,
              opacity: Math.random() * 0.06 + 0.01,
              animation: `glow-pulse ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))
      )}
    </div>
  );
}
