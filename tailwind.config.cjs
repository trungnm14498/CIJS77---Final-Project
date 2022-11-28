/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#cfb299",
        secondary: "#090909",
        alter: "rgba(169, 142, 119, 0.7)",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlack: "rgba(0, 0, 0, 0.7)"
      },
      fontFamily: {
        script: ["Dancing Script", "cursive"],
        play: ['Playfair Display', "serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "769px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
    container: {
      center: true,
    }
  },
  plugins: [],
};
