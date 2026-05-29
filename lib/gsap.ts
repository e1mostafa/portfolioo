"use client";

/**
 * GSAP Setup Module
 * Registers all GSAP plugins and provides type-safe wrappers
 * Import from here instead of directly from 'gsap'
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Register all plugins (safe to call multiple times)
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    TextPlugin,
    CustomEase,
    DrawSVGPlugin
  );

  // Custom eases for premium feel
  CustomEase.create("powerOut", "M0,0 C0.16,1 0.3,1 1,1");
  CustomEase.create("elasticOut", "M0,0 C0.05,0 0.1,1.05 0.2,1.02 0.3,0.99 0.4,1 1,1");
  CustomEase.create("cinematic", "M0,0 C0.08,0.82 0.165,1 1,1");
}

// ——— Default GSAP global config ———
gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false,
});

// Better defaults for motion feel
gsap.defaults({
  duration: 1,
  ease: "power3.out",
});

// ——— ScrollTrigger defaults ———
ScrollTrigger.config({
  // Improved performance with fewer redraws
  limitCallbacks: true,
  ignoreMobileResize: true,
  syncInterval: 40,
});

export { gsap, ScrollTrigger, ScrollToPlugin, TextPlugin, CustomEase };

// ——— Animation presets ———
export const animPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, duration: 1, ease: "cinematic" },
  },
  fadeInDown: {
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.85 },
    to: { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
  },
  slideInLeft: {
    from: { opacity: 0, x: -80 },
    to: { opacity: 1, x: 0, duration: 1, ease: "cinematic" },
  },
  slideInRight: {
    from: { opacity: 0, x: 80 },
    to: { opacity: 1, x: 0, duration: 1, ease: "cinematic" },
  },
  staggerFadeUp: (stagger = 0.1) => ({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger },
  }),
};

export default gsap;
