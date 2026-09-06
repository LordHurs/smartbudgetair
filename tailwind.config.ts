import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef4ff',
          100: '#dce6fe',
          200: '#bccffd',
          300: '#8fabfa',
          400: '#6690fa',
          500: '#3f68f0',
          600: '#2748d6',
          700: '#1f39ab',
          800: '#1c2f87',
          900: '#1a2a6e',
          950: '#11173d',
        },
        sunset: {
          50:  '#fff7ed',
          100: '#ffedd3',
          200: '#ffd9a8',
          300: '#ffbd70',
          400: '#ff9736',
          500: '#f9720f',
          600: '#e2560a',
          700: '#bb3f0c',
          800: '#953211',
          900: '#7a2c12',
          950: '#421204',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(120deg, #11173d 0%, #1f39ab 32%, #2748d6 55%, #bb3f0c 88%, #f9720f 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
