import {
  GREY_SCALE_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from './src/constants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      sans: ['Noto Sans KR', 'sans-serif', 'monospace'],
      serif: ['Noto Sans KR', 'sans-serif', 'monospace'],
    },
    extend: {
      borderWidth: {
        '1': '0.063rem', // 1px
      },
      fontSize: {
        basic: '0.813rem', // 13px
      },
      colors: {
        white: GREY_SCALE_COLOR[0],
        grey: {
          50: GREY_SCALE_COLOR[50],
          100: GREY_SCALE_COLOR[100],
          150: GREY_SCALE_COLOR[150],
          200: GREY_SCALE_COLOR[200],
          250: GREY_SCALE_COLOR[250],
          300: GREY_SCALE_COLOR[300],
          350: GREY_SCALE_COLOR[350],
          400: GREY_SCALE_COLOR[400],
          450: GREY_SCALE_COLOR[450],
          500: GREY_SCALE_COLOR[500],
          550: GREY_SCALE_COLOR[550],
          600: GREY_SCALE_COLOR[600],
          650: GREY_SCALE_COLOR[650],
          700: GREY_SCALE_COLOR[700],
          750: GREY_SCALE_COLOR[750],
          800: GREY_SCALE_COLOR[800],
          850: GREY_SCALE_COLOR[850],
          900: GREY_SCALE_COLOR[900],
          950: GREY_SCALE_COLOR[950],
        },
        black: GREY_SCALE_COLOR[1000],
        transparent: 'transparent',
        primary: {
          DEFAULT: PRIMARY_COLOR[500],
          dark: PRIMARY_COLOR[600],
          darker: PRIMARY_COLOR[700],
          light: PRIMARY_COLOR[400],
          lighter: PRIMARY_COLOR[300],
          100: PRIMARY_COLOR[100],
          200: PRIMARY_COLOR[200],
          300: PRIMARY_COLOR[300],
          400: PRIMARY_COLOR[400],
          500: PRIMARY_COLOR[500],
          600: PRIMARY_COLOR[600],
          700: PRIMARY_COLOR[700],
          800: PRIMARY_COLOR[800],
          900: PRIMARY_COLOR[900],
        },
        secondary: {
          DEFAULT: SECONDARY_COLOR[400],
          light: SECONDARY_COLOR[300],
          lighter: SECONDARY_COLOR[200],
          dark: SECONDARY_COLOR[500],
          darker: SECONDARY_COLOR[600],
          100: SECONDARY_COLOR[100],
          200: SECONDARY_COLOR[200],
          300: SECONDARY_COLOR[300],
          400: SECONDARY_COLOR[400],
          500: SECONDARY_COLOR[500],
          600: SECONDARY_COLOR[600],
          700: SECONDARY_COLOR[700],
          800: SECONDARY_COLOR[800],
          900: SECONDARY_COLOR[900],
        },
        confirm: '#4caf50',
        info: '#2196f3',
        warning: '#ffd56b',
        error: '#db0000',
        accent: {
          blossom: '#f26c90',
          salmon: '#ff9174',
          sunset: '#ffc361',
          lemon: '#f9f871',
          lavender: '#b75ca5',
          sea: '#009ca5',
        },
        text: {
          basic: GREY_SCALE_COLOR[900],
          light: GREY_SCALE_COLOR[700],
          lighter: GREY_SCALE_COLOR[500],
          lightest: GREY_SCALE_COLOR[300],
          inverse: GREY_SCALE_COLOR[0],
          primary: {
            DEFAULT: PRIMARY_COLOR[500],
            light: PRIMARY_COLOR[300],
            dark: PRIMARY_COLOR[700],
            darker: PRIMARY_COLOR[900],
          },
          secondary: {
            DEFAULT: SECONDARY_COLOR[400],
            light: SECONDARY_COLOR[200],
            dark: SECONDARY_COLOR[700],
            darker: SECONDARY_COLOR[900],
          },
        },
        border: {
          basic: GREY_SCALE_COLOR[300],
          light: GREY_SCALE_COLOR[200],
          lighter: GREY_SCALE_COLOR[100],
          dark: GREY_SCALE_COLOR[400],
          darker: GREY_SCALE_COLOR[600],
          darkest: GREY_SCALE_COLOR[750],
          inverse: GREY_SCALE_COLOR[0],
          primary: {
            DEFAULT: PRIMARY_COLOR[300],
            light: PRIMARY_COLOR[200],
            dark: PRIMARY_COLOR[400],
            darker: PRIMARY_COLOR[600],
          },
          secondary: {
            DEFAULT: SECONDARY_COLOR[200],
            dark: SECONDARY_COLOR[300],
            light: SECONDARY_COLOR[100],
            darker: SECONDARY_COLOR[400],
          },
        },
        bg: {
          basic: GREY_SCALE_COLOR[0],
          elevated: GREY_SCALE_COLOR[0],
          dark: GREY_SCALE_COLOR[50],
          darker: GREY_SCALE_COLOR[100],
          darkest: GREY_SCALE_COLOR[150],
          inverse: GREY_SCALE_COLOR[800],
          primary: {
            DEFAULT: PRIMARY_COLOR[500],
            dark: PRIMARY_COLOR[700],
            light: PRIMARY_COLOR[300],
            lighter: PRIMARY_COLOR[200],
          },
          secondary: {
            DEFAULT: SECONDARY_COLOR[400],
            dark: SECONDARY_COLOR[500],
            light: SECONDARY_COLOR[300],
            lighter: SECONDARY_COLOR[200],
          },
        },
        dark: {
          text: {
            basic: GREY_SCALE_COLOR[0],
            dark: GREY_SCALE_COLOR[200],
            darker: GREY_SCALE_COLOR[400],
            darkest: GREY_SCALE_COLOR[600],
            inverse: GREY_SCALE_COLOR[900],
            primary: {
              DEFAULT: PRIMARY_COLOR[300],
              light: PRIMARY_COLOR[200],
              dark: PRIMARY_COLOR[400],
            },
            secondary: {
              DEFAULT: SECONDARY_COLOR[200],
              dark: SECONDARY_COLOR[300],
              light: SECONDARY_COLOR[100],
            },
          },
          border: {
            basic: GREY_SCALE_COLOR[900],
            light: GREY_SCALE_COLOR[800],
            lighter: GREY_SCALE_COLOR[750],
            dark: GREY_SCALE_COLOR[950],
            darker: GREY_SCALE_COLOR[1000],
            inverse: GREY_SCALE_COLOR[0],
            primary: {
              DEFAULT: PRIMARY_COLOR[300],
              dark: PRIMARY_COLOR[400],
              light: PRIMARY_COLOR[200],
            },
            secondary: {
              DEFAULT: SECONDARY_COLOR[200],
              dark: SECONDARY_COLOR[300],
              light: SECONDARY_COLOR[100],
            },
          },
          bg: {
            basic: GREY_SCALE_COLOR[900],
            elevated: GREY_SCALE_COLOR[1000],
            dark: GREY_SCALE_COLOR[950],
            light: GREY_SCALE_COLOR[850],
            lighter: GREY_SCALE_COLOR[800],
            lightest: GREY_SCALE_COLOR[750],
            inverse: GREY_SCALE_COLOR[300],
            primary: {
              DEFAULT: PRIMARY_COLOR[300],
              dark: PRIMARY_COLOR[400],
              light: PRIMARY_COLOR[200],
            },
            secondary: {
              DEFAULT: SECONDARY_COLOR[200],
              dark: SECONDARY_COLOR[300],
              light: SECONDARY_COLOR[100],
            },
          },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  variants: {},
};
