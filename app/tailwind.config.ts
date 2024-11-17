import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          '50': '#f0fdf6',
          '100': '#ddfbeb',
          '200': '#bdf5d8',
          '300': '#89ecba',
          '400': '#4fd993',
          '500': '#2bd17e',
          '600': '#1b9e5c',
          '700': '#197c4b',
          '800': '#19623f',
          '900': '#165135',
          '950': '#062d1b',
        },

        background: {
          '50': '#ecfeff',
          '100': '#d0fafd',
          '200': '#a6f3fb',
          '300': '#69e9f7',
          '400': '#25d4eb',
          '500': '#09b7d1',
          '600': '#0a93b0',
          '700': '#10758e',
          '800': '#165f74',
          '900': '#174f62',
          '950': '#093545',
        },
        error: {
          '50': '#fef2f2',
          '100': '#fde3e3',
          '200': '#fccccc',
          '300': '#f9a8a8',
          '400': '#f47575',
          '500': '#eb5757',
          '600': '#d62c2c',
          '700': '#b42121',
          '800': '#951f1f',
          '900': '#7c2020',
          '950': '#430c0c',
        },
        input: {
          '50': '#effbfc',
          '100': '#d6f4f7',
          '200': '#b3e9ee',
          '300': '#7ed8e2',
          '400': '#42bdce',
          '500': '#26a0b4',
          '600': '#228298',
          '700': '#22697c',
          '800': '#245766',
          '900': '#224957',
          '950': '#112f3b',
        },
        card: {
          '50': '#edfdfe',
          '100': '#d1f9fc',
          '200': '#a8f1f9',
          '300': '#6de6f3',
          '400': '#2acfe6',
          '500': '#0eb2cc',
          '600': '#0f8fab',
          '700': '#13738b',
          '800': '#195d71',
          '900': '#194e60',
          '950': '#092c39',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
