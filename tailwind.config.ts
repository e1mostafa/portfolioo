import type { Config } from "tailwindcss";

const config: Config = {
  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./lib/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    extend: {
      colors: {
        // Core palette
        void: "#020510",
        "void-2": "#060d1e",
        "void-3": "#0a1128",
        // Neon primaries
        neon: {
          green: "#00ff88",
          cyan: "#00d4ff",
          pink: "#ff2d78",
          purple: "#a855f7",
          yellow: "#ffd700",
        },
        // Glassmorphism
        glass: {
          DEFAULT: "rgba(255,255,255,0.03)",
          border: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.06)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        body: ["var(--font-outfit)", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "1" }],
        "11xl": ["12rem", { lineHeight: "1" }],
        "12xl": ["14rem", { lineHeight: "0.9" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern": `linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)`,
        "noise": "url('/noise.svg')",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "scan-line": "scan-line 3s linear infinite",
        "aurora": "aurora 8s ease-in-out infinite alternate",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "text-flicker": "text-flicker 0.15s infinite",
        "orbit": "orbit 20s linear infinite",
        "orbit-reverse": "orbit 15s linear infinite reverse",
        "cursor-pulse": "cursor-pulse 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(2deg)" },
          "66%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        "pulse-neon": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.2), 0 0 80px rgba(0,255,136,0.1)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(0,255,136,0.6), 0 0 60px rgba(0,255,136,0.4), 0 0 100px rgba(0,255,136,0.2)",
          },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "aurora": {
          "0%": {
            backgroundPosition: "0% 50%",
            filter: "hue-rotate(0deg)",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
            filter: "hue-rotate(30deg)",
          },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "text-flicker": {
          "0%, 19.9%, 22%, 62.9%, 64%, 64.9%, 70%, 100%": { opacity: "1" },
          "20%, 21.9%, 63%, 63.9%, 65%, 69.9%": { opacity: "0.3" },
        },
        "orbit": {
          from: { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        "cursor-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.7" },
        },
      },
      boxShadow: {
        "neon-green": "0 0 20px rgba(0,255,136,0.5), 0 0 60px rgba(0,255,136,0.2)",
        "neon-cyan": "0 0 20px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)",
        "neon-pink": "0 0 20px rgba(255,45,120,0.5), 0 0 60px rgba(255,45,120,0.2)",
        "glass-sm": "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.04)",
        "glass-lg": "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
      gridTemplateColumns: {
        "sidebar": "280px 1fr",
      },
    },
  },
  plugins: [],
};

export default config;
