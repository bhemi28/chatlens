import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Indigo/Purple
        "primary-dark": "#4F46E5",
        "background-light": "#f3f4f6", // #F1F5F9 in upload
        "background-dark": "#0f172a",
        retro: {
          pink: "#ff7eb6", // #EC4899 in upload
          blue: "#70e2ff",
          yellow: "#ffe66d", // #FBBF24 in upload
          purple: "#a388ee", // #6366F1 in upload
          green: "#a7f3d0", // #10B981 in upload
          lavender: "#C7D2FE", 
        }
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
