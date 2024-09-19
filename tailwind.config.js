/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
          colors: {
            primary: '#0A61AA',
            secondary: '#FFFFFF',
            background:'#F3F7FB',
            neutral: '#7F7F7F',
            success: '#73CA5C',
            failed: '#FF0000',
            warning: '#F9CC00',
          },
            fontFamily: ["Poppins"],
        },
    },
    plugins: [],
};
