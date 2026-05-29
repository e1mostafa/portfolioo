"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { isTouch } from "@/lib/utils";

/**
 * useMagneticEffect
 * Applies a magnetic hover effect to the target element.
 * The element "pulls" toward the mouse cursor.
 */
export function useMagneticEffect(strength = 0.4) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isTouch()) return;
    const el = ref.current;
    if (!el) return;

    let bounds: DOMRect;

    const onMouseEnter = () => {
      bounds = el.getBoundingClientRect();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = el.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  return ref;
}
