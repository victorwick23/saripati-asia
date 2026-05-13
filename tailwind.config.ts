import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--color-brand-primary)",
          "primary-hover": "var(--color-brand-primary-hover)",
          accent: "var(--color-brand-accent)",
          "accent-muted": "var(--color-brand-accent-muted)",
          surface: "var(--color-surface)",
          muted: "var(--color-muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px rgb(15 81 50 / 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
