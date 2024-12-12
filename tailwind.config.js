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
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        pulse: "pulseEffect 2s infinite",
        "gradient-background": "gradientBackground 5s infinite ease-in-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px) rotate(-5deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0)" },
        },
        pulseEffect: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        gradientBackground: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
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
