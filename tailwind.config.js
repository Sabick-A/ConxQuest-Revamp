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
        },
        shimmer: {
          '0%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0 50%' }
        }
      },
      animation: {
        bounce: 'bounce 2s infinite',
        'dialogPopIn': 'dialogPopIn 0.3s ease-out forwards',
        'blink': 'blink 1s infinite',
        'shimmer': 'shimmer 1.4s ease infinite'
      },
      fontFamily: {
        'main': ['"Rubik Bubbles"', 'serif'],
        'game': ['"Press Start 2P"', 'cursive'],
        'nerko': ['Nerko One', 'cursive'],
      },
      rotate: {
        'y-180': '180deg',
        '15': '15deg'
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
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3))',
        'radial-gradient-center': 'radial-gradient(circle at center, #4ade80 0%, transparent 100%)'
      },
      clipPath: {
        'hexagon': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
      }
    },
  },
  plugins: [],
}
