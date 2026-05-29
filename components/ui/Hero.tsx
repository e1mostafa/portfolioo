"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollTo } from "@/hooks/useLenis";
import { person } from "@/data/portfolio";

const TYPING_PHRASES = [
  "Red Team Operator",
  "Penetration Tester",
  "Full-Stack Developer",
  "AWS Cloud Architect",
  "Open Source Contributor",
];

/**
 * Hero Section
 * Full-viewport cinematic intro with:
 * - Mouse-reactive particle canvas
 * - GSAP staggered text reveal
 * - Typing effect (Anime.js-style manual implementation)
 * - Animated grid + aurora gradient background
 * - 3D floating geometry
 * - Magnetic CTA buttons
 * - Scroll indicator
 */
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  // ——— Typing Effect ———
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentPhrase = TYPING_PHRASES[phraseIndex];
      if (!isDeleting) {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
        if (typedText.length + 1 === currentPhrase.length) {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
        timeout = setTimeout(tick, 80);
      } else {
        setTypedText(currentPhrase.slice(0, typedText.length - 1));
        if (typedText.length - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length);
        }
        timeout = setTimeout(tick, 40);
      }
    };

    timeout = setTimeout(tick, 120);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  // ——— GSAP entrance timeline ———
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Badge slides in
      tl.from(badgeRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Heading lines reveal
      const lines = headingRef.current?.querySelectorAll(".hero-line");
      if (lines) {
        tl.from(
          Array.from(lines),
          {
            y: 100,
            opacity: 0,
            skewY: 5,
            duration: 1.2,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.4"
        );
      }

      // Subtitle + typing area
      tl.from(subRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6");

      // CTA buttons
      tl.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ——— Parallax on scroll ———
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(headingRef.current, { y: p * 120, opacity: 1 - p * 1.5 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ——— Particle Canvas ———
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    let animId: number;
    const particles: Particle[] = [];
    const NUM = Math.min(120, Math.floor(window.innerWidth / 12));

    class Particle {
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; color: string;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.3;
        this.opacity = Math.random() * 0.6 + 0.1;
        const colors = ["#00ff88", "#00d4ff", "#ff2d78", "#a855f7"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        // Mouse repulsion
        const dx = this.x - mouse.current.x;
        const dy = this.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.vx += (dx / dist) * force * 0.8;
          this.vy += (dy / dist) * force * 0.8;
        }
        // Dampen
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.x += this.vx;
        this.y += this.vy;
        // Wrap
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx2d!.beginPath();
        ctx2d!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx2d!.fillStyle = this.color;
        ctx2d!.globalAlpha = this.opacity;
        ctx2d!.fill();
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    for (let i = 0; i < NUM; i++) particles.push(new Particle());

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx2d.beginPath();
            ctx2d.moveTo(particles[i].x, particles[i].y);
            ctx2d.lineTo(particles[j].x, particles[j].y);
            ctx2d.globalAlpha = (1 - dist / 100) * 0.12;
            ctx2d.strokeStyle = "#00ff88";
            ctx2d.lineWidth = 0.5;
            ctx2d.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawConnections();
      animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ——— Backgrounds ——— */}
      {/* Aurora gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(0,255,136,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 30%, rgba(0,212,255,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 50% 100%, rgba(168,85,247,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* ——— Content ——— */}
      <div className="relative z-10 section-container pt-32 pb-20 flex flex-col items-start">
        {/* Status badge */}
        <div
          ref={badgeRef}
          className="mb-10 flex items-center gap-3 px-4 py-2 glass rounded-full border border-neon-green/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
          </span>
          <span className="font-mono text-xs text-neon-green/80 tracking-widest uppercase">
            Available for Internships & Opportunities
          </span>
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-display font-bold leading-[0.95] tracking-tight mb-8"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
          }}
        >
          <span className="block overflow-hidden">
            <span className="hero-line block text-white">ELMOSTAFA</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block gradient-text">MOHAMED</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-white/20">ABDELAAL</span>
          </span>
        </h1>

        {/* Role + typing */}
        <div ref={subRef} className="mb-12 space-y-3">
          <div className="flex items-center gap-3 font-mono text-sm md:text-base">
            <span className="text-neon-green/50">//</span>
            <span className="text-gray-400">
              Computer Engineering Student ·{" "}
            </span>
            <span className="text-neon-cyan">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <p className="font-body text-gray-500 max-w-xl text-sm md:text-base leading-relaxed">
            {person.objective.slice(0, 120)}...
          </p>
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <MagneticButton
            onClick={() => scrollTo("#projects", -80)}
            variant="primary"
          >
            <span>View My Work</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>

          <MagneticButton
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            as="a"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </MagneticButton>

          <MagneticButton
            href="https://github.com/e1mostafa"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            as="a"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </MagneticButton>
        </div>

        {/* Stats row */}
        <div className="mt-20 flex flex-wrap gap-x-12 gap-y-4">
          {[
            { label: "Projects", value: "10+" },
            { label: "Red Team Months", value: "6+" },
            { label: "Certifications", value: "3" },
            { label: "CVEs Researched", value: "20+" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="font-display text-2xl md:text-3xl font-bold text-neon-green">
                {value}
              </span>
              <span className="font-mono text-xs text-gray-600 uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ——— Scroll indicator ——— */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => scrollTo("#about", -80)}
      >
        <span className="font-mono text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-neon-green/50 to-transparent" />
      </motion.div>

      {/* ——— Decorative corner elements ——— */}
      <div className="absolute top-8 right-8 font-mono text-xs text-gray-800 text-right space-y-1 hidden lg:block">
        <div>King Salman International University</div>
        <div className="text-neon-green/30">Egypt · Computer Engineering · 2027</div>
      </div>
    </div>
  );
}

const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
