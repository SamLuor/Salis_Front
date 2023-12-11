//import type { Config } from 'tailwindcss'

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.js',
    './src/**/*.ts',
    './src/**/*.css',
    './src/**/*.scss'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          principal: 'rgb(0, 78, 204)',
          100: 'rgb(202, 240, 248)',
          200: 'rgb(173, 232, 244)',
          300: 'rgb(144, 224, 239)',
          400: 'rgb(72, 202, 228)',
          500: 'rgb(0, 180, 216)',
          600: 'rgb(0, 150, 199)',
          700: 'rgb(0, 119, 182)',
          800: 'rgb(0, 78, 204)',
          900: 'rgb(3, 4, 94)'
        },
        secondary: {
          100: 'rgb(255, 218, 179)',
          200: 'rgb(255, 186, 128)',
          300: 'rgb(255, 155, 77)',
          400: 'rgb(255, 124, 26)',
          500: 'rgb(237, 151, 36)',
          600: 'rgb(217, 126, 0)',
          700: 'rgb(186, 108, 0)',
          800: 'rgb(155, 89, 0)',
          900: 'rgb(124, 71, 0)'
        },
        background: {
          'light-white': 'var(--background-light-white)',
          'light-white70': 'var(--background-light-white70)',
          'dark-blue': 'var(--background-dark-blue)',
          'dark-blue70': 'var(--background-dark-blue70)'
        },
        'light-black70': 'var(--text-light-black70)',
        'light-gray': 'var(--text-light-gray)',
        'dark-gray': 'var(--text-dark-gray)',
        'dark-white70': 'var(--text-dark-white70)',
        warning: {
          light: 'var(--warning-light)',
          dark: 'var(--warning-dark)'
        },
        danger: {
          light: 'var(--danger-light)',
          dark: 'var(--danger-dark)'
        },
        info: {
          light: 'var(--info-light)',
          dark: 'var(--info-dark)'
        },
        success: {
          light: 'var(--success-color-light)',
          dark: 'var(--success-color-dark)'
        }
      }
    }
  },
  plugins: [
    function ({ addUtilities, theme, variants }) {
      const filters = {
        '.brightness-clean-100': { filter: 'brightness(100)' }
      }

      addUtilities(filters, variants('brightness'))
    }
  ]
}
