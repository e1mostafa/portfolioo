"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { experience, type ExperienceItem } from "@/data/portfolio";

/**
 * Experience Section
 * - GSAP-pinned sticky left panel (active role card)
 * - Scroll-linked right panel reveals each role
 * - Neon timeline spine with animated progress
 * - Bullet points stagger in on enter
 * - Role type badges
 */
export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // ——— Scroll-driven active role tracking ———
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".exp-card") ?? [];

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      // Animate timeline progress line
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleY: self.progress,
              transformOrigin: "top center",
            });
          }
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const active = experience[activeIndex];

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/3 w-[600px] h-[400px] opacity-[0.03] blur-[140px]"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 opacity-[0.03] blur-[120px]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
        />
      </div>

      <div className="section-container">
        {/* Section header */}
        <div ref={titleRef} className="mb-24">
          <p className="reveal font-mono text-xs text-neon-green/60 tracking-[0.4em] uppercase mb-4">
            05 / Experience
          </p>
          <h2 className="reveal font-display text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white">Professional</span>
            <br />
            <span className="text-white/10">Journey</span>
          </h2>
          <p className="reveal text-gray-500 mt-6 max-w-xl text-sm md:text-base">
            Hands-on internships and intensive training programs across
            cybersecurity, cloud, and full-stack development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 items-start">
          {/* ——— Left sticky panel ——— */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-6 space-y-5"
                style={{
                  borderColor: `${active.color}20`,
                  boxShadow: `0 0 60px ${active.color}06, inset 0 0 30px ${active.color}03`,
                }}
              >
                {/* Role type badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest"
                  style={{
                    background: `${active.color}10`,
                    border: `1px solid ${active.color}30`,
                    color: active.color,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: active.color }} />
                  {active.type === "intern" ? "Internship" : "Training"}
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-display text-xl font-bold text-white leading-tight">
                    {active.title}
                  </h3>
                  <p
                    className="font-mono text-xs mt-2"
                    style={{ color: active.color }}
                  >
                    {active.companyShort}
                  </p>
                </div>

                {/* Meta info */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <MetaRow icon="📍" value={active.location} />
                  <MetaRow icon="📅" value={active.period} />
                  <MetaRow
                    icon="🔖"
                    value={active.type === "intern" ? "Internship" : "Training Program"}
                  />
                </div>

                {/* Index indicator */}
                <div className="flex gap-1.5 pt-2">
                  {experience.map((_, i) => (
                    <div
                      key={i}
                      className="h-px flex-1 rounded transition-all duration-400"
                      style={{
                        background: i === activeIndex ? active.color : "rgba(255,255,255,0.08)",
                        boxShadow: i === activeIndex ? `0 0 6px ${active.color}` : "none",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Desktop role list */}
            <div className="hidden lg:block mt-6 space-y-1">
              {experience.map((exp, i) => (
                <button
                  key={exp.id}
                  onClick={() => {
                    const card = sectionRef.current?.querySelectorAll(".exp-card")[i];
                    card?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded font-mono text-xs transition-all duration-200 ${
                    activeIndex === i
                      ? "text-white"
                      : "text-gray-700 hover:text-gray-500"
                  }`}
                  style={{
                    background: activeIndex === i ? `${exp.color}08` : "transparent",
                    borderLeft: `2px solid ${activeIndex === i ? exp.color : "transparent"}`,
                  }}
                >
                  {exp.companyShort}
                </button>
              ))}
            </div>
          </div>

          {/* ——— Right — Timeline + cards ——— */}
          <div ref={timelineRef} className="relative">
            {/* Spine */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/5 hidden lg:block">
              <div
                ref={progressRef}
                className="absolute inset-0 origin-top"
                style={{
                  background: "linear-gradient(to bottom, #00ff88, #00d4ff, #a855f7)",
                  boxShadow: "0 0 6px rgba(0,255,136,0.6)",
                  scaleY: 0,
                }}
              />
            </div>

            {/* Experience cards */}
            <div className="space-y-12 lg:pl-16">
              {experience.map((exp, i) => (
                <ExperienceCard key={exp.id} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Experience Card ——— */
function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.from(cardRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Bullet points stagger in
      const bullets = bulletsRef.current?.querySelectorAll("li") ?? [];
      gsap.from(Array.from(bullets), {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bulletsRef.current,
          start: "top 85%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="exp-card relative group">
      {/* Timeline dot (desktop) */}
      <div
        className="absolute -left-[4.25rem] top-6 w-2.5 h-2.5 rounded-full hidden lg:block border-2 transition-all duration-300"
        style={{
          borderColor: exp.color,
          background: "var(--color-void)",
          boxShadow: `0 0 0 4px ${exp.color}12`,
        }}
      />

      {/* Card */}
      <div
        className="glass-card p-7 transition-all duration-400 group-hover:scale-[1.01]"
        style={{ borderColor: `${exp.color}10` }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <span
              className="font-mono text-[10px] tracking-widest uppercase"
              style={{ color: exp.color }}
            >
              {exp.period}
            </span>
            <h3 className="font-display text-xl font-bold text-white mt-1">
              {exp.title}
            </h3>
            <p className="font-mono text-xs text-gray-500 mt-1">
              {exp.company} · {exp.location}
            </p>
          </div>

          <div
            className="px-3 py-1.5 rounded font-mono text-[10px] uppercase tracking-widest self-start"
            style={{
              background: `${exp.color}08`,
              border: `1px solid ${exp.color}25`,
              color: exp.color,
            }}
          >
            {exp.type === "intern" ? "🔴 Intern" : "🔵 Training"}
          </div>
        </div>

        {/* Bullets */}
        <ul ref={bulletsRef} className="space-y-3">
          {exp.bullets.map((bullet, bi) => (
            <li key={bi} className="flex items-start gap-3">
              <span
                className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: exp.color }}
              />
              <span className="text-gray-400 text-sm leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Bottom glow bar */}
        <div
          className="mt-6 h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${exp.color}60, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

/* ——— Meta row ——— */
function MetaRow({ icon, value }: { icon: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm w-5">{icon}</span>
      <span className="font-mono text-xs text-gray-500">{value}</span>
    </div>
  );
}
