/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html, js}"],
  theme: {
    fontFamily: {
      'sans': ['Raleway', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        "background-home": "url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

