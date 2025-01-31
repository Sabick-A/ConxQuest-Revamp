/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        bounce: 'bounce 2s infinite',
      },
      fontFamily: {
        'main': ['"Rubik Bubbles"', 'serif'],
        'game': ['"Press Start 2P"', 'sans-serif'],
        'nerko': ['Nerko One', 'cursive'],
      },
      rotate: {
        'y-180': '180deg',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      perspective: {
        'DEFAULT': '1000px',
      },
      colors: {
        whitesmoke: 'whitesmoke',
      },
    },
  },
  plugins: [],
}
