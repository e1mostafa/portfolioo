"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { skillCategories } from "@/data/portfolio";

/**
 * Skills Section
 * - Animated skill category tabs
 * - Floating skill chips with hover glow
 * - Orbital animation ring using CSS
 * - Animated skill bars (GSAP ScrollTrigger)
 * - Energy pulse effects
 */
export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  // ——— Title reveal ———
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.from(titleRef.current?.querySelectorAll(".reveal") ?? [], {
            y: 60,
            opacity: 0,
            stagger: 0.06,
            duration: 1,
            ease: "power4.out",
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const current = skillCategories[activeCategory];

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] opacity-[0.04] blur-[130px]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 opacity-[0.03] blur-[80px]"
          style={{ background: "radial-gradient(circle, #00ff88, transparent)" }} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="section-container">
        {/* Header */}
        <div ref={titleRef} className="mb-24">
          <p className="reveal font-mono text-xs text-neon-green/60 tracking-[0.4em] uppercase mb-4">
            04 / Skills
          </p>
          <h2 className="reveal font-display text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white">Tech</span>
            <br />
            <span className="text-white/10">Arsenal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — Category selector + skill chips */}
          <div>
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(i)}
                  className={`relative px-4 py-2 font-mono text-xs tracking-widest uppercase rounded transition-all duration-300 ${
                    activeCategory === i
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-400"
                  }`}
                  style={{
                    border: activeCategory === i ? `1px solid ${cat.color}40` : "1px solid rgba(255,255,255,0.05)",
                    background: activeCategory === i ? `${cat.color}08` : "transparent",
                  }}
                >
                  {activeCategory === i && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded"
                      style={{ background: `${cat.color}05` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Skill chips */}
            <AnimatePresence mode="wait">
              <AnimatedSkillChips key={activeCategory} category={current} />
            </AnimatePresence>
          </div>

          {/* Right — Orbit + All skills list */}
          <div className="space-y-12">
            {/* Orbital visualization */}
            <SkillOrbit />

            {/* All categories overview */}
            <div className="space-y-6">
              {skillCategories.map((cat) => (
                <SkillCategoryBar key={cat.label} category={cat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Animated skill chips ——— */
function AnimatedSkillChips({ category }: { category: typeof skillCategories[number] }) {
  return (
    <motion.div
      key={category.label}
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {category.items.map((skill, i) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          <div
            className="px-4 py-2.5 rounded font-mono text-xs cursor-default transition-all duration-300 group-hover:scale-105"
            style={{
              border: `1px solid ${category.color}25`,
              background: `${category.color}06`,
              color: `${category.color}`,
            }}
          >
            {/* Pulse glow on hover */}
            <div
              className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: `0 0 20px ${category.color}20, inset 0 0 20px ${category.color}05`,
              }}
            />
            {skill}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ——— Skill orbit visualization ——— */
function SkillOrbit() {
  const coreSkills = [
    { label: "Python", color: "#00ff88", angle: 0 },
    { label: "C++", color: "#00d4ff", angle: 60 },
    { label: "Burp Suite", color: "#ff2d78", angle: 120 },
    { label: "AWS", color: "#ffd700", angle: 180 },
    { label: ".NET", color: "#a855f7", angle: 240 },
    { label: "Kali Linux", color: "#00ff88", angle: 300 },
  ];

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer orbit ring */}
      <div
        className="absolute inset-0 rounded-full border border-neon-green/10"
        style={{ animation: "rotate-slow 30s linear infinite" }}
      />
      {/* Inner ring */}
      <div
        className="absolute inset-8 rounded-full border border-neon-cyan/8"
        style={{ animation: "rotate-slow 20s linear infinite reverse" }}
      />

      {/* Center core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full bg-neon-green/20 animate-pulse-ring" />
          <div className="w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green/40 flex items-center justify-center">
            <span className="font-mono text-xs text-neon-green font-bold">SEC</span>
          </div>
        </div>
      </div>

      {/* Orbiting dots */}
      {coreSkills.map(({ label, color, angle }) => {
        const rad = (angle * Math.PI) / 180;
        const r = 100;
        const x = 50 + (r * Math.cos(rad)) / 1.28;
        const y = 50 + (r * Math.sin(rad)) / 1.28;

        return (
          <div
            key={label}
            className="absolute group"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[8px] font-mono text-center leading-tight cursor-default transition-transform duration-200 group-hover:scale-125"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}40`,
                color,
                boxShadow: `0 0 10px ${color}20`,
              }}
            >
              {label.slice(0, 3)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ——— Skill bar ——— */
function SkillCategoryBar({ category }: { category: typeof skillCategories[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const levelMap: Record<string, number> = {
    Languages: 85,
    Security: 88,
    "Cloud & Infra": 75,
    "Web & Frameworks": 80,
    Concepts: 90,
  };

  const level = levelMap[category.label] ?? 80;

  useEffect(() => {
    if (inView && barRef.current) {
      gsap.to(barRef.current, {
        width: `${level}%`,
        duration: 1.5,
        delay: 0.2,
        ease: "power3.out",
      });
    }
  }, [inView, level]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-gray-400">{category.label}</span>
        <span className="font-mono text-xs" style={{ color: category.color }}>{level}%</span>
      </div>
      <div className="h-px bg-white/5 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full w-0"
          style={{
            background: `linear-gradient(90deg, ${category.color}, ${category.color}60)`,
            boxShadow: `0 0 8px ${category.color}60`,
          }}
        />
      </div>
    </div>
  );
}
