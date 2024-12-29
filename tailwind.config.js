const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "spin-slow": "spin 50s linear infinite",
      },
      keyframes: {
        "spin-slow": {
          "0%": {
            transform: "rotateX(90deg)",
          },
          "100%": {
            transform: "rotateX(0deg)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [nextui()],
};
