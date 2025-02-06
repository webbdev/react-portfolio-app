/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      '2lg': '110px',
      'xl': '1280px',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      colors: {
        'red': '#e1422c',
        'grey_1': '#fbfbfb',
        'grey_2': '#f6f6f6',
        'grey_3': '#969696',
        'grey_4': '#323232',
        'light_blue_1': '#d8e3e8',
        'light_blue_2': 'rgba(216, 227, 232, 1)',
        'dark-grey': 'rgba(26, 26, 26, 0.8)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          xs: '1.75rem',
          sm: '2.5rem',
          md: '2.5rem',
          lg: '3rem'
        },
      },
      gridTemplateColumns: {
        '55/43': '55% 43%'
      },
      transitionDuration: {
        1000: '1000ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in',
        fadeOut: 'fadeOut 1s ease-out',
      },
    },
  },
  plugins: [
    forms,
  ],
}