const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enables dark mode using a class
  theme: {
    extend: {
      screens: {
        smd: "500px", // Custom breakpoint at 500px
        mdl: "600px", // Custom breakpoint at 600px
        xxxl: "2000px", // Custom breakpoint at 2000px
      },
      colors: {
        background: "var(--background)", // Variable-based colors
        foreground: "var(--foreground)",
      },
      animation: {
        "spin-slow": "spin 50s linear infinite",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
      },
    },
  },
  plugins: [nextui()],
};
