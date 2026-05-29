"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  DependencyList,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Use useLayoutEffect on client, useEffect on server (SSR safe)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type GSAPContextCallback = (
  context: gsap.Context & {
    selector: <T extends Element = Element>(query: string) => T[];
  }
) => void | (() => void);

/**
 * useGSAP
 * React hook that wraps GSAP context for proper cleanup.
 * Automatically reverts all animations and kills ScrollTriggers on unmount.
 *
 * @param callback - function receiving gsap context with selector helper
 * @param deps - dependency array (re-runs animation when deps change)
 * @param scope - optional ref to scope the selector to (defaults to document)
 */
export function useGSAP(
  callback: GSAPContextCallback,
  deps: DependencyList = [],
  scope?: React.RefObject<Element | null>
) {
  const contextRef = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      // Augment context with a scoped typed selector helper
      const augmented = Object.assign(self, {
        selector: <T extends Element = Element>(query: string) =>
          Array.from(
            (scope?.current ?? document).querySelectorAll<T>(query)
          ),
      }) as Parameters<GSAPContextCallback>[0];

      callback(augmented);
    }, scope?.current ?? undefined);

    contextRef.current = ctx;

    return () => {
      ctx.revert();
      // Refresh ScrollTrigger after revert to avoid layout issues
      ScrollTrigger.refresh();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return contextRef;
}

/**
 * useGSAPOnce
 * Same as useGSAP but only runs once (no deps tracking).
 * Good for one-shot entrance animations.
 */
export function useGSAPOnce(
  callback: GSAPContextCallback,
  scope?: React.RefObject<Element | null>
) {
  return useGSAP(callback, [], scope);
}

/**
 * useScrollAnimation
 * Shorthand for scroll-triggered fade-in animations.
 * Applies to all elements matching `selector` inside `scope`.
 */
export function useScrollAnimation(
  scope: React.RefObject<Element | null>,
  selector = ".animate",
  options: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    stagger?: number;
    start?: string;
    once?: boolean;
  } = {}
) {
  const {
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
    stagger = 0.08,
    start = "top 80%",
    once = true,
  } = options;

  useGSAP(
    (ctx) => {
      const elements = ctx.selector(selector);
      if (!elements.length) return;

      gsap.from(elements, {
        ...from,
        ...to,
        stagger,
        scrollTrigger: {
          trigger: elements[0],
          start,
          once,
        },
      });
    },
    [],
    scope
  );
}
