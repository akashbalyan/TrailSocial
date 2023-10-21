/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'signin': '#eee5e5',
        'signinhover':'#cac4c4'
      },
    },
  },
  plugins: [],
}

