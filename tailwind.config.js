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
        smd: "500px",
        mdl: "600px",
        xxxl: "2000px",
      },
      colors: {
        Primary: "var(--Primary)",
        Secondary: "var(--Secondary)",
        Third: "var(--Third)",
        gradColor1: "var(--gradColor1)",
        gradColor2: "var(--gradColor2)",
        gradColor3: "var(--gradColor3)",
        textColor1: "var(--textColor1)",
        textColor2: "var(--textColor2)",
        theme: "var(--theme)",
      },
      fontFamily: {
        sans: "var(--fontSans), sans-serif",
        serif: "var(--fontSerif), serif",
        mono: "var(--fontMono), monospace",
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
