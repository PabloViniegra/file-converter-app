/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Hanken Grotesk Variable", "sans-serif"],
        secondary: ["Roboto Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
