"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { isTouch } from "@/lib/utils";

/**
 * CustomCursor
 * Two-layer cursor: a sharp dot that tracks exactly, and a
 * larger follower that lags behind with spring inertia.
 * Changes shape/color based on hovered element type.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isTouch()) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Show cursor on first move
    const onFirstMove = () => {
      setIsVisible(true);
      document.removeEventListener("mousemove", onFirstMove);
    };
    document.addEventListener("mousemove", onFirstMove);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows exactly
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Smooth follower animation loop
    const tick = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      gsap.set(follower, { x: followerX, y: followerY });
    };

    gsap.ticker.add(tick);
    document.addEventListener("mousemove", onMouseMove);

    // ——— Cursor states on hover ———
    const onLinkEnter = () => {
      gsap.to(follower, {
        scale: 2.4,
        opacity: 0.6,
        duration: 0.3,
        ease: "power2.out",
        borderColor: "rgba(0,255,136,0.8)",
        backgroundColor: "rgba(0,255,136,0.05)",
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLinkLeave = () => {
      gsap.to(follower, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
        borderColor: "rgba(0,255,136,0.5)",
        backgroundColor: "transparent",
      });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    };

    const onTextEnter = () => {
      gsap.to(follower, {
        scaleX: 0.15,
        scaleY: 1.4,
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseDown = () => {
      gsap.to(follower, { scale: 0.8, duration: 0.15 });
      gsap.to(dot, { scale: 0.5, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(follower, { scale: 1, duration: 0.3, ease: "back.out(2)" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    };

    // Attach to interactive elements
    const addListeners = () => {
      document.querySelectorAll("a, button, [data-cursor='pointer']").forEach((el) => {
        el.addEventListener("mouseenter", onLinkEnter);
        el.addEventListener("mouseleave", onLinkLeave);
      });

      document.querySelectorAll("input, textarea, [data-cursor='text']").forEach((el) => {
        el.addEventListener("mouseenter", onTextEnter);
        el.addEventListener("mouseleave", onLinkLeave);
      });
    };

    addListeners();
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Re-add listeners when DOM changes (e.g. navigation)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, []);

  if (isTouch()) return null;

  return (
    <>
      {/* Dot — precise, instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#00ff88",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 6px rgba(0,255,136,0.8)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      />

      {/* Follower — lagged ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1px solid rgba(0,255,136,0.5)",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
          willChange: "transform",
          transformOrigin: "center center",
        }}
      />
    </>
  );
}
