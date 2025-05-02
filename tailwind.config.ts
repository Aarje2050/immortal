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
        primary: {
          main: '#0171CE',
          light: '#3E94E6',
          dark: '#0056A4',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#FFFFFF',
          light: '#F5F5F5',
          dark: '#EAEAEA',
          contrastText: '#333333',
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
          disabled: '#999999',
        },
        background: {
          default: '#FFFFFF',
          paper: '#F5F5F5',
          accent: '#F0F8FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
