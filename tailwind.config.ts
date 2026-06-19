import type { Config } from "tailwindcss";
import { siteConfig } from "./config/site.config";

// Brand colors come straight from config/site.config.ts so the palette lives in
// exactly one place. Use them as Tailwind utilities: bg-ink, text-accent, border-line, …
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: siteConfig.theme.colors,
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(19,48,42,0.04), 0 12px 32px -12px rgba(19,48,42,0.18)",
        lift: "0 1px 2px rgba(19,48,42,0.05), 0 24px 48px -16px rgba(19,48,42,0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
