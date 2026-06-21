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
        content: "1180px",
        faq: "880px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(22,48,41,0.04), 0 12px 32px -12px rgba(22,48,41,0.18)",
        // design tokens
        float: "0 30px 60px -28px rgba(22,48,41,0.42)",
        card: "0 26px 54px -30px rgba(22,48,41,0.4)",
        form: "0 24px 50px -32px rgba(22,48,41,0.34)",
        cta: "0 8px 22px -8px rgba(197,83,46,0.6)",
        "cta-lg": "0 10px 24px -10px rgba(197,83,46,0.7)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
