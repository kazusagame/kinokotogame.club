import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pop: "rgb(var(--color-pop))",
        sweet: "rgb(var(--color-sweet))",
        cool: "rgb(var(--color-cool))",
        popT: "rgb(var(--color-pop) / 0.4)",
        sweetT: "rgb(var(--color-sweet)/ 0.4)",
        coolT: "rgb(var(--color-cool) / 0.4)",
        invalid: "rgb(var(--color-invalid))",
        temp: "rgb(var(--color-temp))",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        digit: ["var(--font-noto-sans-symbol)"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
        flipOpen: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        flipClose: {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        fadeOut: "fadeOut 0.3s ease-out forwards",
        flipOpen: "flipOpen 0.8s ease-in-out forwards",
        flipClose: "flipClose 0.8s ease-in-out forwards",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake", "dark"],
  },
};
export default config;
