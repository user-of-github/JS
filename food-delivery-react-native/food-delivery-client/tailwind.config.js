/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./App.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "#6658B6",
      "white": "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
}

