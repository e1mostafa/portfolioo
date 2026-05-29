"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";

// Eagerly load non-3D sections
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navigation from "@/components/ui/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

// Hooks
import { useLenis } from "@/hooks/useLenis";

/* ============================================================
   ROOT PAGE
   ============================================================ */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    // Minimum loading time for the cinematic intro
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay before revealing content for smooth transition
      setTimeout(() => setIsReady(true), 100);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Animated custom cursor (desktop only) */}
      <CustomCursor />

      {/* Film grain noise overlay */}
      <NoiseOverlay />

      {/* Loading screen */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Main content — revealed after loading */}
      <AnimatePresence>
        {isReady && (
          <>
            {/* Sticky navigation */}
            <Navigation />

            {/* ——— PAGE SECTIONS ——— */}
            <main className="relative">
              {/* 01 — Hero */}
              <section id="home">
                <Hero />
              </section>

              {/* 02 — About */}
              <section id="about">
                <About />
              </section>

              {/* 03 — Projects */}
              <section id="projects">
                <Projects />
              </section>

              {/* 04 — Skills */}
              <section id="skills">
                <Skills />
              </section>

              {/* 05 — Experience */}
              <section id="experience">
                <Experience />
              </section>

              {/* 06 — Contact */}
              <section id="contact">
                <Contact />
              </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8 mt-0">
              <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 font-mono">
                <span>
                  © {new Date().getFullYear()}{" "}
                  <span className="text-neon-green">Elmostafa Mohamed Abdelaal</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  Available for opportunities
                </span>
                <span>Built with Next.js 15 · TypeScript · GSAP · Three.js</span>
              </div>
            </footer>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
