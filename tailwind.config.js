/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        show: {
          '0%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        'showing': 'show 0.3s linear',
      }
    },
  },
  plugins: [],
}

