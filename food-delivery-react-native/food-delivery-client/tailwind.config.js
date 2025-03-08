/** @type {import('tailwindcss').Config} */
const { platformColor, platformSelect } = require('nativewind/theme');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './App.tsx'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      primary: '#5b25e4',
      secondary: '#194DC8',
      'text-secondary': '#999999',
      accent: '#F6F4FB',
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      colors: {
        error: platformSelect({
          // Now you can provide platform specific values
          ios: platformColor('systemRed'),
          android: platformColor('?android:colorError'),
          default: 'red'
        })
      }
    }
  },
  plugins: []
};
