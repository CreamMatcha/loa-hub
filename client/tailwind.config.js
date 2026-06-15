/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        loa: {
          bg:       "rgb(var(--loa-bg) / <alpha-value>)",
          surface:  "rgb(var(--loa-surface) / <alpha-value>)",
          surface2: "rgb(var(--loa-surface2) / <alpha-value>)",
          border:   "rgb(var(--loa-border) / <alpha-value>)",
          gold:     "rgb(var(--loa-gold) / <alpha-value>)",
          goldDim:  "rgb(var(--loa-goldDim) / <alpha-value>)",
          gem:      "rgb(var(--loa-gem) / <alpha-value>)",
          text:     "rgb(var(--loa-text) / <alpha-value>)",
          muted:    "rgb(var(--loa-muted) / <alpha-value>)",
          error:    "rgb(var(--loa-error) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ['"Pretendard"', '"Segoe UI"', "system-ui", "sans-serif"],
        body:    ['"Pretendard"', '"Segoe UI"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: { themes: false },
};
