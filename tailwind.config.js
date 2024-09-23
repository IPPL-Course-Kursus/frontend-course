/** @type {import('tailwindcss').Config} */
export default {
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
        primary: '#0A61AA',
        secondary: '#FFFFFF',
        neutral: '#7F7F7F',
        failed: '#FF0000',
        warning: '#F9CC00',
      },
      boxShadow: {
        "shadow-high": "var(--shadow-high)",
      },
      fontFamily:  ["Poppins"],
    },
  },
  plugins: [],
};
