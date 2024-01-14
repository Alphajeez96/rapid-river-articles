/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#47B3A2',
          // blue: '#4776B3',
          // red: '#F5425F',
          black: '#001A16',
          white: '#FCFCFC',
          background: '#E0EBE9',
          backdrop: '#F3F7F6',
          grey: '#707070',
          // stroke: '#E9E9E9',
        },

        dark: {
          // green: '#0C7D69',
          // grey: '#3D3D3D',
          // blue: '#082954',
          // red: '#90041B',
        },

        // light: {
        //   green: '#D5F1ED',
        //   grey: '#707070',
        //   blue: '#D5E1F1',
        //   red: '#FFEBEE',
        // },
      },

      fontSize: {
        xxs: '0.625rem',
        heading1: '2rem',
        display: '2.5rem',
      },
    },
  },
  plugins: [],
};
