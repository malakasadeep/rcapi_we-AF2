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
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [], // Removed the incomplete require() call
}

