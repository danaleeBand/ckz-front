/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
      current: 'currentColor',

      // theme main color
      primary: '#6457a6',
      'primary-light': '#7b71b1',
      'primary-lighter': '#988dc4',
      'primary-dark': '#534b7d',
      'primary-darker': '#453e75',
      secondary: '#0080c9',
      'secondary-light': '#4da8e0',
      'secondary-lighter': '#6bb8ea',
      'secondary-dark': '#006dbf',
      'secondary-darker': '#00528a',
      'accent-a': '#f26c90',
      'accent-b': '#ff9174',
      'accent-c': '#ffc361',
      'accent-d': '#f9f871',
      'accent-e': '#b75ca5',
      'accent-f': '#009ca5',

      // text & border color
      'text-primary': '#323232',
      'text-primary-light': '#595959',
      'text-primary-lighter': '#adacac',
      'text-primary-inverse': '#f0eded',

      // background color
      'bg-primary': '#fffbf0',
      // faf9fa f6f9fc fdf7f8 fffbf0 fef9fa faf6f8 fffbf0 fffafb
    },
    fontFamily: {
      sans: ['Noto Sans KR', 'sans-serif'],
      serif: ['Noto Sans KR', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
  darkMode: false,
  variants: {},
};
