import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { "candy-red": "#FF8E8C" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
        // var is a function of CSS that is meant to read a CSS variable or property
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // list theme you want to use in your project.
      "light",
      "dark",
      "winter",
    ],
  },
};
export default config;
