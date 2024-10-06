/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        attention: "var(--attention)",
        "b-300": "var(--b-300)",
        "b-500": "var(--b-500)",
        background: "var(--background)",
        "base-white": "var(--base-white)",
        black: "var(--black)",
        "deep-grey": "var(--deep-grey)",
        success: "var(--success)",
        primary: "#0A61AA",
        secondary: "#FFFFFF",
        neutral: "#7F7F7F",
        failed: "#FF0000",
        warning: "#F9CC00",
      },
      boxShadow: {
        "shadow-high": "var(--shadow-high)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
