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
        dialogPopIn: {
          '0%': { 
            opacity: '0',
            scale: '0.8'
          },
          '100%': { 
            opacity: '1',
            scale: '1'
          }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
      animation: {
        bounce: 'bounce 2s infinite',
        'dialogPopIn': 'dialogPopIn 0.3s ease-out forwards',
        'blink': 'blink 1s infinite'
      },
      fontFamily: {
        'main': ['"Rubik Bubbles"', 'serif'],
        'game': ['"Press Start 2P"', 'cursive'],
        'nerko': ['Nerko One', 'cursive'],
        'main': ['Poppins', 'sans-serif'],
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
