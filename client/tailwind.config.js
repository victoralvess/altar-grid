/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'altar-grid': '#9e9e9e',
        'altar-button': '#8a9da4',
        'altar-input': '#a4abb1'
      }
    },
  },
  plugins: [],
}

