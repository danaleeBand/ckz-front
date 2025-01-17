import {
  GREY_SCALE_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from './src/constants';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  mode: 'jit',
  darkMode: ['selector', 'class'],
  theme: {
  	fontFamily: {
  		sans: [
  			'Noto Sans KR',
  			'sans-serif',
  			'monospace'
  		],
  		serif: [
  			'Noto Sans KR',
  			'sans-serif',
  			'monospace'
  		]
  	},
  	extend: {
  		borderWidth: {
  			'1': '0.063rem'
  		},
  		fontSize: {
  			basic: '0.813rem'
  		},
  		colors: {
  			white: GREY_SCALE_COLOR[0],
  			grey: {
  				'50': GREY_SCALE_COLOR[50],
  				'100': GREY_SCALE_COLOR[100],
  				'150': GREY_SCALE_COLOR[150],
  				'200': GREY_SCALE_COLOR[200],
  				'250': GREY_SCALE_COLOR[250],
  				'300': GREY_SCALE_COLOR[300],
  				'350': GREY_SCALE_COLOR[350],
  				'400': GREY_SCALE_COLOR[400],
  				'450': GREY_SCALE_COLOR[450],
  				'500': GREY_SCALE_COLOR[500],
  				'550': GREY_SCALE_COLOR[550],
  				'600': GREY_SCALE_COLOR[600],
  				'650': GREY_SCALE_COLOR[650],
  				'700': GREY_SCALE_COLOR[700],
  				'750': GREY_SCALE_COLOR[750],
  				'800': GREY_SCALE_COLOR[800],
  				'850': GREY_SCALE_COLOR[850],
  				'900': GREY_SCALE_COLOR[900],
  				'950': GREY_SCALE_COLOR[950]
  			},
  			black: GREY_SCALE_COLOR[1000],
  			transparent: 'transparent',
  			primary: {
  				'100': PRIMARY_COLOR[100],
  				'200': PRIMARY_COLOR[200],
  				'300': PRIMARY_COLOR[300],
  				'400': PRIMARY_COLOR[400],
  				'500': PRIMARY_COLOR[500],
  				'600': PRIMARY_COLOR[600],
  				'700': PRIMARY_COLOR[700],
  				'800': PRIMARY_COLOR[800],
  				'900': PRIMARY_COLOR[900],
  				DEFAULT: PRIMARY_COLOR[500],
  				dark: PRIMARY_COLOR[600],
  				darker: PRIMARY_COLOR[700],
  				light: PRIMARY_COLOR[400],
  				lighter: PRIMARY_COLOR[300],
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'100': SECONDARY_COLOR[100],
  				'200': SECONDARY_COLOR[200],
  				'300': SECONDARY_COLOR[300],
  				'400': SECONDARY_COLOR[400],
  				'500': SECONDARY_COLOR[500],
  				'600': SECONDARY_COLOR[600],
  				'700': SECONDARY_COLOR[700],
  				'800': SECONDARY_COLOR[800],
  				'900': SECONDARY_COLOR[900],
  				DEFAULT: SECONDARY_COLOR[400],
  				light: SECONDARY_COLOR[300],
  				lighter: SECONDARY_COLOR[200],
  				dark: SECONDARY_COLOR[500],
  				darker: SECONDARY_COLOR[600],
  				foreground: 'hsl(var(--secondary-foreground))'
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
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
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
  					darker: PRIMARY_COLOR[900]
  				},
  				secondary: {
  					DEFAULT: SECONDARY_COLOR[400],
  					light: SECONDARY_COLOR[200],
  					dark: SECONDARY_COLOR[700],
  					darker: SECONDARY_COLOR[900]
  				}
  			},
  			border: 'hsl(var(--border))',
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
  					lightest: PRIMARY_COLOR[100]
  				},
  				secondary: {
  					DEFAULT: SECONDARY_COLOR[400],
  					dark: SECONDARY_COLOR[500],
  					light: SECONDARY_COLOR[300],
  					lighter: SECONDARY_COLOR[200]
  				}
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
  						darker: PRIMARY_COLOR[600],
  						darkest: PRIMARY_COLOR[800]
  					},
  					secondary: {
  						DEFAULT: SECONDARY_COLOR[200],
  						dark: SECONDARY_COLOR[300],
  						light: SECONDARY_COLOR[100]
  					}
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
  						light: PRIMARY_COLOR[200]
  					},
  					secondary: {
  						DEFAULT: SECONDARY_COLOR[200],
  						dark: SECONDARY_COLOR[300],
  						light: SECONDARY_COLOR[100]
  					}
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
  						light: PRIMARY_COLOR[200]
  					},
  					secondary: {
  						DEFAULT: SECONDARY_COLOR[200],
  						dark: SECONDARY_COLOR[300],
  						light: SECONDARY_COLOR[100]
  					}
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	boxShadow: {
  		right: '10px 0 10px -10px rgba(0, 0, 0, 0.3)'
  	}
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: true,
    arbitraryValue: true,
  },
  variants: {},
};
