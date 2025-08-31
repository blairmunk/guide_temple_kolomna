/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e6f2',
          500: '#1E3A5F',
          600: '#1a3154',
          700: '#162849',
        },
        gold: {
          400: '#C89B3C',
          500: '#b8862f',
        },
        cream: '#F7F3E8',
        sage: {
          500: '#2F7D64',
          600: '#2a6b56',
        }
      },
      fontFamily: {
        serif: ['PT Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
