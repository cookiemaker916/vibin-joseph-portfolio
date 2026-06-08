import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: {
          DEFAULT: "#090A0C",
          800: "#12141C",
          900: "#090A0C",
        },
        crimson: {
          DEFAULT: "#E11D48",
          dark: "#BE123C",
        },
        metallic: {
          DEFAULT: "#94A3B8",
          light: "#F8FAFC",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
