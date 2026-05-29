"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { person, education, certifications, stats } from "@/data/portfolio";

/**
 * About Section
 * - Animated section title reveal
 * - Holographic profile card with tilt effect
 * - Animated stat counters (GSAP)
 * - Certification badges
 * - Education timeline
 * - Scroll-linked parallax layers
 */
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // ——— Section entrance ———
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title split animation
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.from(titleRef.current?.querySelectorAll(".reveal-line") ?? [], {
            y: 80,
            opacity: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          });
        },
      });

      // Stat counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          stats.forEach((stat, i) => {
            const el = statsRef.current?.querySelectorAll(".stat-value")[i];
            if (!el) return;
            const num = parseInt(stat.value.replace(/\D/g, ""), 10);
            gsap.from({ val: 0 }, {
              val: num,
              duration: 2,
              delay: i * 0.15,
              ease: "power2.out",
              onUpdate: function (this: gsap.core.Tween) {
                el.textContent = `${Math.round((this.targets()[0] as { val: number }).val)}${stat.suffix}`;
              },
            });
          });
        },
      });

      // Card 3D tilt
      const card = cardRef.current;
      if (card) {
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const rx = ((e.clientY - cy) / rect.height) * -12;
          const ry = ((e.clientX - cx) / rect.width) * 12;
          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 800,
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.4)",
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        return () => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(circle, #00ff88, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.03] blur-[100px]"
          style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }}
        />
      </div>

      <div className="section-container">
        {/* Section header */}
        <div ref={titleRef} className="mb-24">
          <div className="overflow-hidden">
            <p className="reveal-line font-mono text-xs text-neon-green/60 tracking-[0.4em] uppercase mb-4">
              01 / About
            </p>
          </div>
          <div className="overflow-hidden">
            <h2 className="reveal-line font-display text-5xl md:text-7xl font-bold text-white leading-tight">
              Who I Am
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="reveal-line font-display text-5xl md:text-7xl font-bold text-white/10 leading-tight">
              & What I Do
            </h2>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Text content */}
          <div className="space-y-10">
            {/* Bio */}
            <FadeInBlock delay={0}>
              <p className="text-gray-400 leading-relaxed text-lg">
                {person.objective}
              </p>
            </FadeInBlock>

            {/* Objective highlights */}
            <FadeInBlock delay={0.1}>
              <div className="space-y-3">
                {[
                  { icon: "🛡️", text: "Cybersecurity research & red team operations" },
                  { icon: "💻", text: "Full-stack web & desktop application development" },
                  { icon: "☁️", text: "AWS cloud architecture & deployment" },
                  { icon: "🔬", text: "Machine learning & data pipeline engineering" },
                  { icon: "🌐", text: "Open-source contributor to security tools" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{icon}</span>
                    <span className="text-gray-500 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </FadeInBlock>

            {/* Education */}
            <FadeInBlock delay={0.2}>
              <div className="glass-card p-6 space-y-3">
                <p className="font-mono text-xs text-neon-cyan/60 tracking-widest uppercase">Education</p>
                {education.map((edu) => (
                  <div key={edu.degree} className="space-y-1">
                    <h3 className="font-display font-semibold text-white text-sm">
                      {edu.degree}
                    </h3>
                    <p className="font-mono text-xs text-neon-cyan">{edu.institution}</p>
                    <p className="font-mono text-xs text-gray-600">{edu.location} · {edu.period}</p>
                  </div>
                ))}
              </div>
            </FadeInBlock>

            {/* Certifications */}
            <FadeInBlock delay={0.3}>
              <div>
                <p className="font-mono text-xs text-gray-600 tracking-widest uppercase mb-4">
                  Certifications
                </p>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="flex items-center gap-2 px-3 py-2 glass rounded border border-white/5 hover:border-neon-green/20 transition-colors"
                    >
                      <span>{cert.icon}</span>
                      <span className="font-mono text-xs text-gray-400">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInBlock>
          </div>

          {/* Right — Holographic card + stats */}
          <div className="space-y-8">
            {/* Profile card with 3D tilt */}
            <div
              ref={cardRef}
              className="relative gradient-border cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="glass-card p-8 space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  {/* Avatar placeholder */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <div
                      className="w-full h-full"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,212,255,0.1))",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-2xl text-neon-green">
                      E
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-white text-lg">{person.name}</h3>
                    <p className="font-mono text-xs text-neon-green/70 mt-1">{person.surname}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                      <span className="font-mono text-xs text-gray-600">Available · Egypt</span>
                    </div>
                  </div>
                </div>

                {/* Info rows */}
                <div className="space-y-3 border-t border-white/5 pt-5">
                  {[
                    { label: "Email", value: person.email, color: "#00ff88" },
                    { label: "Location", value: person.location, color: "#00d4ff" },
                    { label: "Degree", value: "B.Sc. Computer Engineering", color: "#a855f7" },
                    { label: "Focus", value: "Cybersecurity & Full-Stack", color: "#ff2d78" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-gray-700 w-20">{label}</span>
                      <span
                        className="font-mono text-xs"
                        style={{ color }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Languages */}
                <div className="border-t border-white/5 pt-5">
                  <p className="font-mono text-xs text-gray-700 mb-3">Languages</p>
                  <div className="flex gap-3">
                    <LangBadge lang="English" level="Proficient" color="#00ff88" />
                    <LangBadge lang="Arabic" level="Native" color="#00d4ff" />
                    <LangBadge lang="Japanese" level="Beginner" color="#a855f7" />
                  </div>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(0,255,136,0.04), transparent 70%)",
                }}
              />
            </div>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-5 text-center">
                  <div className="font-display text-3xl font-bold text-neon-green stat-value">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="font-mono text-xs text-gray-600 uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Sub-components ——— */

function FadeInBlock({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LangBadge({ lang, level, color }: { lang: string; level: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-mono text-xs" style={{ color }}>{lang}</span>
      <span className="font-mono text-[10px] text-gray-700">{level}</span>
    </div>
  );
}
