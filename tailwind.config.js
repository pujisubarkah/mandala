/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}
