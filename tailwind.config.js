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

      confirm: '#4caf50',
      info: '#2196f3',
      warning: '#ffd56b',
      error: '#d9372b',

      'accent-blossom': '#f26c90',
      'accent-salmon': '#ff9174',
      'accent-sunset': '#ffc361',
      'accent-lemon': '#f9f871',
      'accent-lavender': '#b75ca5',
      'accent-sea': '#009ca5',

      // text & border color
      'text-primary': '#323232',
      'text-primary-light': '#595959',
      'text-primary-lighter': '#adacac',
      'text-primary-inverse': '#f7f5f5',

      // background color
      'bg-primary': '#faf9fa',
      'bg-primary-dark': '#f2f2f2',
      'bg-primary-darker': '#e8e6e8',
      // faf9fa f6f9fc fdf7f8 fffbf0 fef9fa faf6f8 fffbf0 fffafb
    },
    fontFamily: {
      sans: ['Noto Sans KR', 'sans-serif'],
      serif: ['Noto Sans KR', 'sans-serif'],
    },
    extend: {
      borderWidth: {
        '1': '0.063rem', // 1px
      },
      fontSize: {
        basic: '0.813rem', // 13px
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  darkMode: false,
  variants: {},
};
