"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * useLenis — Global smooth scroll setup
 * Integrates Lenis with GSAP ScrollTrigger for perfect sync
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;

    // ——— Sync Lenis with GSAP ScrollTrigger ———
    lenis.on("scroll", () => ScrollTrigger.update());

    // Use GSAP ticker for the update loop (better performance than RAF)
    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Import gsap lazily to avoid circular deps
    import("gsap").then(({ gsap }) => {
      gsap.ticker.add(gsapTicker);
      gsap.ticker.lagSmoothing(0);
    });

    // Expose lenis globally for other components to use
    (window as typeof window & { lenis: Lenis }).lenis = lenis;

    return () => {
      import("gsap").then(({ gsap }) => {
        gsap.ticker.remove(gsapTicker);
      });
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}

/**
 * scrollTo — Programmatic scroll helper
 * Call after useLenis is mounted
 */
export function scrollTo(target: string | number, offset = 0) {
  const lenis = (window as typeof window & { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  }
}
