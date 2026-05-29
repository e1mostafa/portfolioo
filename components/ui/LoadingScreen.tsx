"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "@/lib/gsap";

/**
 * LoadingScreen
 * Cinematic intro animation shown before the portfolio loads.
 * Features: progress bar, glitch text, grid reveal.
 */
export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate progress bar from 0 → 100%
      tl.to(progressRef.current, {
        width: "100%",
        duration: 2.2,
        ease: "power2.inOut",
      });

      // Animate percentage counter
      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: 100,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (percentRef.current) {
              percentRef.current.textContent = `${Math.round(counter.val)}`;
            }
          },
        },
        "<"
      );

      // Text glitch effect
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.3,
        delay: 0.3,
        ease: "none",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(8px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Scan line */}
      <div className="absolute inset-x-0 h-px bg-neon-green/20 animate-scan-line" />

      {/* Corner decorations */}
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-8">
        {/* Logo / Name */}
        <div
          ref={textRef}
          className="text-center opacity-0"
        >
          <div className="font-mono text-xs text-neon-green/60 tracking-[0.4em] mb-3 uppercase">
            Initializing
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            ELMOSTAFA
          </h1>
          <div className="font-mono text-xs text-gray-600 tracking-widest mt-1 uppercase">
            Mohamed Abdelaal
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between mb-2 font-mono text-xs text-gray-600">
            <span>Loading assets</span>
            <span>
              <span ref={percentRef} className="text-neon-green">0</span>
              <span>%</span>
            </span>
          </div>
          <div className="h-px w-full bg-white/5 relative overflow-hidden rounded-full">
            <div
              ref={progressRef}
              className="h-full bg-neon-green w-0 rounded-full"
              style={{
                boxShadow: "0 0 8px rgba(0,255,136,0.8), 0 0 16px rgba(0,255,136,0.4)",
              }}
            />
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex gap-6 font-mono text-[10px] text-gray-700 uppercase tracking-widest">
          {["GSAP", "WebGL", "Three.js"].map((lib) => (
            <StatusDot key={lib} label={lib} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ——— Sub-components ——— */

function Corner({ position }: { position: string }) {
  const classes: Record<string, string> = {
    "top-left": "top-6 left-6 border-t border-l",
    "top-right": "top-6 right-6 border-t border-r",
    "bottom-left": "bottom-6 left-6 border-b border-l",
    "bottom-right": "bottom-6 right-6 border-b border-r",
  };
  return (
    <div
      className={`absolute w-8 h-8 ${classes[position]} border-neon-green/30`}
    />
  );
}

function StatusDot({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
      {label}
    </span>
  );
}
