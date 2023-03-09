/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      cloud: {
        DEFAULT: '#6D7C95',
        dark: '#3C5073',
      },
      rose: {
        DEFAULT: '#8A6464',
        dark: '#331A1A',
      },
    },
    fontFamily: {
      cool: ['Geneva'],
    },
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
};
