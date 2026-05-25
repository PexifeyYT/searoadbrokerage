/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#0A6EBD',
          dark: '#42A5F5',
          DEFAULT: '#0A6EBD',
        },
        secondary: {
          light: '#1E88E5',
          dark: '#1E88E5',
          DEFAULT: '#1E88E5',
        },
        accent: {
          light: '#42A5F5',
          dark: '#42A5F5',
          DEFAULT: '#42A5F5',
        },
        brand: {
          blue: '#0A6EBD',
          'blue-mid': '#1E88E5',
          'blue-light': '#42A5F5',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'dark-border': '#334155',
        'dark-text': '#F1F5F9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '200': '200ms',
      },
    },
  },
  plugins: [],
};
