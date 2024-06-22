import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import themeColors from "./src/theme-colors.ts";
import buttonStyles from "./src/button-styles.ts";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  darkMode: "class",
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/messaging-ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...themeColors,
      },
      fontFamily: {
        montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.sans], // H1 (bold, extra bold)
        roboto: ['"Roboto"', ...defaultTheme.fontFamily.sans], // H2, H3 (bold, medium)
        "open-sans": ['"Open Sans"', ...defaultTheme.fontFamily.sans], // Body (regular, light)
        lato: ['"Lato"', ...defaultTheme.fontFamily.sans], // Quotes & Callouts (italic, bold)
        nunito: ['"Nunito"', ...defaultTheme.fontFamily.sans], // Buttons & CTAs (bold)
        "source-code-pro": [
          '"Source Code Pro"',
          ...defaultTheme.fontFamily.mono,
        ], // Code & Data (regular)
      },
      boxShadow: {
        soft: "0px 4px 20px 0px rgba(var(--color-shadow-soft))",
        softer: "0px 2px 10px 0px rgba(var(--color-shadow-softer))",
      },
      animation: {
        "sidebar-select": "fill-right 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fill-right": {
          "0%": { right: "100%" },
        },
      },
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
    buttonStyles,
  ],
  safelist: ["dark", "custom-scrollbar", "custom-scrollbar-neutral"],
};
export default config;
