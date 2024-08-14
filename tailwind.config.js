/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'customBlue':'#578AD6',
        'primary-light': '#D9E6F4',
        'primary-dark': '#0E4D90',
        'gray-light': '#F5F4F7',
        'gray-dark': '#333333',
      }
    },
  },
  plugins: [],
}