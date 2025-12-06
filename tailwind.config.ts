import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fox: {
          black: '#000000',
          darkgray: '#121212',
          orange: '#FF6700',
          gray: {
            800: '#1a1a1a',
            700: '#2a2a2a',
            600: '#3a3a3a',
            500: '#4a4a4a',
          },
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
