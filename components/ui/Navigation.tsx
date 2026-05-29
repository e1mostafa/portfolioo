"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "@/lib/gsap";
import { scrollTo } from "@/hooks/useLenis";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/**
 * Navigation
 * Sticky glassmorphism nav with:
 * - Scroll progress indicator
 * - Active section highlight
 * - Mobile hamburger menu
 * - Magnetic nav links
 */
export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ——— Scroll tracking ———
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      setScrolled(scrollY > 60);
      setProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);

      // Detect active section
      const sections = ["home", "about", "projects", "skills", "experience", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ——— Entrance animation ———
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) scrollTo(`#${id}`, -80);
  };

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[999] will-change-transform"
      aria-label="Main navigation"
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-px bg-neon-green transition-all duration-150"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 8px rgba(0,255,136,0.8), 0 0 20px rgba(0,255,136,0.4)",
        }}
      />

      {/* Nav container */}
      <div
        className={`transition-all duration-500 border-b ${
          scrolled
            ? "bg-void/80 backdrop-blur-xl border-white/5 shadow-[0_4px_60px_rgba(0,0,0,0.6)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="section-container h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo(0)}
            className="flex items-center gap-3 group"
            aria-label="Back to top"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border border-neon-green/40 rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
              <div className="absolute inset-1.5 bg-neon-green/10 rotate-45 group-hover:bg-neon-green/20 transition-colors duration-300" />
            </div>
            <span className="font-display font-bold text-sm tracking-widest text-white hidden sm:block">
              ELMOSTAFA
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className={`relative px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                      isActive ? "text-neon-green" : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-neon-green/5 rounded-sm border border-neon-green/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Availability badge */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              <span>Open to work</span>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              <span className={`h-px bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`h-px bg-neon-green transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`h-px bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-void/95 backdrop-blur-2xl border-b border-white/5"
          >
            <div className="section-container py-6 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-left py-3 px-4 font-mono text-sm tracking-widest uppercase text-gray-400 hover:text-neon-green transition-colors border-b border-white/5 last:border-0"
                >
                  <span className="text-neon-green/40 mr-3">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
