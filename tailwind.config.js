//import type { Config } from 'tailwindcss'
//Palete Primary - https://coolors.co/palette/012a4a-013b63-01487c-024f87-2a6f98-2d7da0-468faf-62a5c2-8ac2d9-a8d6e5
//Palete Secondary - https://coolors.co/palette/0466c8-0353a4-023e7d-002855-001845-001233-33415c-5c677d-7d8597-979dac
//Palete Contrast - https://coolors.co/p  alette/ed9625-e58d1b-e28000-e88b12-b56a09

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
        'primary-options': {
          background: {
            container: 'rgb(243, 246, 251)',
            'container-header': 'rgb(214, 220, 229)',
            'container-header-dark': 'rgb(46, 72, 94)',
            'sub-container': 'rgb(0, 121, 142)',
            card: 'rgb(243, 246, 251)',
            stroke: 'rgb(225, 230, 235)',
            'nav-header': '#E4EAEE'
          },
          text: {
            color: 'rgb(228, 241, 255)',
            'sub-text': 'rgb(162, 163, 165)'
          },
          900: '#012A4A',
          800: '#013B63',
          700: '#01487C',
          600: '#024F87',
          500: '#2A6F98',
          400: '#2D7DA0',
          300: '#468FAF',
          200: '#62A5C2',
          100: '#8AC2D9',
          50: '#A8D6E5'
        },
        'secondary-options': {
          900: '#0466C8',
          800: '#0353A4',
          700: '#023E7D',
          600: '#002855',
          500: '#001845',
          400: '#001233',
          300: '#33415C',
          200: '#5C677D',
          100: '#7D8597',
          50: '#979DAC'
        },
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
