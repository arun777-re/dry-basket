/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        rice:['var(--font-spicy-rice)','cursive'],
        roboto:['var(--font-roboto)'],
      }
    },
  },
  plugins: [],
}
