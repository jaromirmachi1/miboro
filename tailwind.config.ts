import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grafit: "#000000",
        ocel: "#000000",
        oranzova: "#FFD700",
        bila: "#FFFFFF",
        sedy: "#000000",
        svetly: "#FFFFFF",
        border: "rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1680px",
      },
      letterSpacing: {
        label: "0.22em",
      },
      fontSize: {
        hero: ["clamp(3rem, 9vw, 7.25rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        display: ["clamp(2rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
    },
  },
  plugins: [],
};

export default config;
