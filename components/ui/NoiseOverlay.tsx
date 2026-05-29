"use client";

/**
 * NoiseOverlay
 * Renders a subtle animated film grain on top of everything.
 * Pure CSS — no JS overhead.
 */
export default function NoiseOverlay() {
  return (
    <div
      className="noise-overlay"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
        opacity: 0.04,
      }}
    />
  );
}
