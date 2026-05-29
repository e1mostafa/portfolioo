"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { projects, type Project } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";

const CATEGORIES = ["all", "security", "web", "ml", "systems", "open-source"] as const;
type Category = typeof CATEGORIES[number];

/**
 * Projects Section
 * - Category filter tabs
 * - GSAP horizontal scroll for featured projects
 * - 3D tilt project cards with glow
 * - Detail modal with glass overlay
 */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // ——— GSAP horizontal scroll ———
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.from(titleRef.current?.querySelectorAll(".reveal") ?? [], {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.06,
            ease: "power4.out",
          });
        },
      });

      // Horizontal scroll for the card track
      const track = trackRef.current;
      if (!track || window.innerWidth < 1024) return;

      const cards = track.querySelectorAll(".proj-card");
      const totalWidth = Array.from(cards).reduce(
        (acc, el) => acc + (el as HTMLElement).offsetWidth + 24,
        0
      );

      gsap.to(track, {
        x: -(totalWidth - window.innerWidth + 128),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: `+=${totalWidth * 0.9}`,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[400px] rounded-full opacity-[0.03] blur-[150px]"
          style={{ background: "radial-gradient(circle, #ff2d78, transparent)" }} />
      </div>

      <div className="section-container">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <p className="reveal font-mono text-xs text-neon-green/60 tracking-[0.4em] uppercase mb-4">
            03 / Projects
          </p>
          <h2 className="reveal font-display text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white">Selected</span>
            <br />
            <span className="text-white/10">Work</span>
          </h2>
          <p className="reveal text-gray-500 mt-6 max-w-xl">
            A curated collection of projects spanning cybersecurity tooling,
            full-stack applications, machine learning pipelines, and open-source contributions.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-xs px-4 py-2 rounded-sm uppercase tracking-widest transition-all duration-200 ${
                filter === cat
                  ? "bg-neon-green/10 text-neon-green border border-neon-green/40"
                  : "text-gray-600 border border-white/5 hover:text-gray-400 hover:border-white/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ——— Horizontal scrolling track ——— */}
      <div ref={trackRef} className="flex gap-6 px-16 lg:px-[max(4rem,calc((100vw-1400px)/2+4rem))] will-change-transform">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isHovered={hoveredId === project.id}
            onHover={setHoveredId}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* ——— Project detail modal ——— */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ——— Project Card ——— */
interface CardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
}

function ProjectCard({ project, index, isHovered, onHover, onClick }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * -8;
    const ry = ((e.clientX - cx) / rect.width) * 8;
    gsap.to(el, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 600,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
    onHover(null);
  };

  return (
    <motion.div
      ref={cardRef}
      className="proj-card relative flex-shrink-0 w-80 lg:w-96 glass-card p-6 cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow accent */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 60px ${project.color}08`,
          border: `1px solid ${project.color}30`,
        }}
      />

      {/* Category badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
        style={{
          background: `${project.color}10`,
          border: `1px solid ${project.color}30`,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: project.color }}
        />
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: project.color }}
        >
          {project.category}
        </span>
      </div>

      {/* Project number */}
      <div className="font-mono text-5xl font-bold text-white/[0.03] absolute top-4 right-6">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-neon-green transition-colors duration-300">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="px-2 py-1 font-mono text-[10px] text-gray-600 border border-white/5 rounded">
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-1 font-mono text-[10px] text-gray-700 border border-white/5 rounded">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {project.metrics && (
          <span className="font-mono text-xs text-neon-green/50">{project.metrics}</span>
        )}
        <div className="ml-auto flex items-center gap-2 text-gray-600 group-hover:text-white transition-colors">
          <span className="font-mono text-xs">Details</span>
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

/* ——— Project Modal ——— */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-void/90 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 glass-card max-w-2xl w-full p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-white transition-colors"
        >
          ✕
        </button>

        {/* Category */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
          style={{ background: `${project.color}10`, border: `1px solid ${project.color}30` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: project.color }}>
            {project.category}
          </span>
        </div>

        <h2 className="font-display text-3xl font-bold text-white mb-4">{project.title}</h2>
        <p className="text-gray-400 leading-relaxed mb-8">{project.longDescription}</p>

        {/* Tech stack */}
        <div className="mb-8">
          <p className="font-mono text-xs text-gray-700 uppercase tracking-widest mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 font-mono text-xs rounded"
                style={{ background: `${project.color}08`, border: `1px solid ${project.color}20`, color: project.color }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <MagneticButton href={project.github} target="_blank" rel="noopener noreferrer" as="a" variant="primary">
              View on GitHub →
            </MagneticButton>
          )}
          {!project.github && (
            <span className="font-mono text-xs text-gray-700 italic">Private / Internal project</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
