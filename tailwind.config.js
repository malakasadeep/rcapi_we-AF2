/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLight: '#D6C7A8',     // replaces old '#F5EFE7'
        accent: '#A26769',      // replaces old '#D8C4B6'
        primary: '#8a4c28',     // stays the same
        primaryDark: '#40112D',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      // Add animation delay utilities
      transitionDelay: {
        '150': '150ms',
        '300': '300ms',
        '450': '450ms',
        '600': '600ms',
      },
      // Add custom animation delay class
      utilities: {
        '.animation-delay-150': {
          'animation-delay': '150ms',
        },
        '.animation-delay-300': {
          'animation-delay': '300ms',
        },
        '.animation-delay-450': {
          'animation-delay': '450ms',
        },
        '.animation-delay-600': {
          'animation-delay': '600ms',
        },
      },
    },
  },
  plugins: [],
}

