"use client";

import { ReactNode } from "react";
import type { RefObject } from "react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  strength?: number;
  as?: "button" | "a";
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
}

/**
 * MagneticButton
 * A button with a magnetic hover pull effect.
 * Desktop only (touch devices get a regular button).
 */
export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  strength = 0.35,
  as: Tag = "button",
  target,
  rel,
  type = "button",
}: MagneticButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const magnetRef = useMagneticEffect(strength) as RefObject<any>;

  const base =
    "relative inline-flex items-center justify-center gap-2 px-8 py-4 font-mono text-sm tracking-widest uppercase overflow-hidden rounded-sm transition-all duration-300 group";

  const variants = {
    primary:
      "bg-neon-green/10 text-neon-green border border-neon-green/40 hover:bg-neon-green/20 hover:border-neon-green/80 hover:shadow-neon-green",
    ghost:
      "text-gray-400 border border-white/10 hover:text-white hover:border-white/30 bg-transparent",
    outline:
      "border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-neon-cyan",
  };

  const sharedProps = {
    ref: magnetRef,
    className: cn(base, variants[variant], className),
    onClick,
  };

  // Glitch shimmer pseudo-element via inline style trick
  const shimmerEl = (
    <span
      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(0,255,136,0.08), transparent)",
        pointerEvents: "none",
      }}
    />
  );

  if (href) {
    return (
      <a
        ref={magnetRef}
        href={href}
        className={cn(base, variants[variant], className)}
        target={target}
        rel={rel}
      >
        {shimmerEl}
        {children}
      </a>
    );
  }

  return (
    <button {...sharedProps} type={type}>
      {shimmerEl}
      {children}
    </button>
  );
}
