/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./App.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "#5b25e4",
      secondary: "#194DC8",
      "text-secondary": "#999999",
      accent: "#F6F4FB",
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
}

