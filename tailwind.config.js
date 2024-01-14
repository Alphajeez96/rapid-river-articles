/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#47B3A2',
          red: '#F5425F',
          black: '#001A16',
          white: '#FCFCFC',
          background: '#E0EBE9',
          backdrop: '#F3F7F6',
          grey: '#707070',
        },

        light: {
          red: '#FFEBEE',
        },
      },

      fontSize: {
        heading1: '2rem',
      },
    },
  },
  plugins: [],
};
