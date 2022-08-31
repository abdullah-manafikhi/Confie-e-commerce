/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': 'rgb(50,91,15)',
        'dark-green': 'rgb(49,62,34)',
        'beige': 'rgb(219,192,163)',
        'dark-beige': 'rgb(132,66,24)',
      },
    },
  },
plugins: [require("daisyui")],}