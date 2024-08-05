/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./src/assets/heroimage.jpg')",
      },
      fontFamily: {
        DM: ["Bungee Shade", "sans-serif"],
        DM1: ["Spicy Rice", "serif"] 
      }
    },
  },
  plugins: [require("daisyui")],
};
