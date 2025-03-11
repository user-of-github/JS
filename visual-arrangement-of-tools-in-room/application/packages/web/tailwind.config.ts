import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './stories/*.{js,ts,jsx,tsx}', '.storybook/**/*.{js,ts,tsx,jsx,mdx}'],
  plugins: [require('@tailwindcss/container-queries')],
  theme: {
    extend: {
      maxWidth: {
        '1/2': '50%'
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.rose,
        'border-main': colors.neutral['200'],
        'border-main-hover': colors.neutral['300'],
        'border-main-active': colors.neutral['400']
      }
    },
    plugins: []
  }
} satisfies Config;
