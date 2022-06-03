module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        access: {
          primary: '#F2CC0F',
          secondary: '#C0920B',
          green: '#2EA561',
          blue: {
            100: '#1C79F2',
            200: '#1D8FF2',
          },
          white: '#F2F2F2',
          red: '#F30505',
          dark: '#212121',
        },
      },
      borderRadius: {
        '4xl': '8rem',
      },
    },
  },
  plugins: [],
};
