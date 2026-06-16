import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#F6F4EF", // warm off-white page background
        cream: "#FBFAF7",
        ink: "#16191B", // near-black primary text
        graphite: "#2A2F2D",
        muted: "#5C615E", // secondary text (>=4.5:1 on porcelain)
        emerald: {
          DEFAULT: "#0F5D49", // signature jade accent
          deep: "#0A4334",
          soft: "#2C7A63",
        },
        sage: "#E5ECE7", // tint section background
        line: "#E2DFD8", // hairline borders
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.22em",
        wide2: "0.32em",
      },
      maxWidth: {
        site: "82rem",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "scroll-cue": "scroll-cue 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
