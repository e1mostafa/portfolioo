import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind class merge utility */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Map a value from one range to another */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/** Clamp a value between min and max */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Random number between min and max */
export const random = (min: number, max: number) =>
  Math.random() * (max - min) + min;

/** Random integer between min and max (inclusive) */
export const randomInt = (min: number, max: number) =>
  Math.floor(random(min, max + 1));

/** Easing functions */
export const ease = {
  in: (t: number) => t * t,
  out: (t: number) => t * (2 - t),
  inOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  spring: (t: number) =>
    1 - Math.cos(t * Math.PI * 4) * Math.exp(-t * 6),
};

/** Detect if user prefers reduced motion */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/** Detect mobile device */
export const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

/** Detect touch device */
export const isTouch = () => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

/** Debounce a function */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/** Format number with leading zero */
export const pad = (n: number) => String(n).padStart(2, "0");

/** Generate unique ID */
export const uid = () => Math.random().toString(36).slice(2, 9);
