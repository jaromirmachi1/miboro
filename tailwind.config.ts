import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark room: warm near-black ground, one lifted surface, paper ink, safety-yellow accent.
        grafit: "#0E0E0C",
        ocel: "#1A1A17",
        oranzova: "#FFD700",
        bila: "#FFFFFF",
        papir: "#EDEDE9",
        mlha: "#A9A79F",
        sedy: "#3D3C38",
        svetly: "#F4F3EF",
        border: "rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1680px",
      },
      fontSize: {
        small: ["var(--step-small)", { lineHeight: "1.45" }],
        body: ["var(--step-body)", { lineHeight: "1.55" }],
        lead: ["var(--step-lead)", { lineHeight: "1.4" }],
        head: ["var(--step-head)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        mega: ["var(--step-mega)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
