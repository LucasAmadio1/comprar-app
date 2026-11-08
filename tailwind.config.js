const { colors } = require("./src/theme/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.ts", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      // No Android cada peso da Manrope é uma família própria,
      // por isso usamos font-sans-bold etc. em vez de font-bold.
      fontFamily: {
        sans: ["Manrope_400Regular"],
        "sans-medium": ["Manrope_500Medium"],
        "sans-semibold": ["Manrope_600SemiBold"],
        "sans-bold": ["Manrope_700Bold"],
        "sans-extrabold": ["Manrope_800ExtraBold"],
      },
    },
  },
  plugins: [],
};
