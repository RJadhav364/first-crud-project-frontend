/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      aspectRatio: {
        1: '1',
      },
      // Custom Background Gradients (using radial gradient)
      backgroundColor: {
        'gradient-radial-custom': 'radial-gradient(closest-side at 50% 12.5%, #f03355 96%, #0000) 50% 0 / 20% 80% repeat-y, radial-gradient(closest-side at 12.5% 50%, #f03355 96%, #0000) 0 50% / 80% 20% repeat-x',
      },
      // Custom Animations for rotating (steps-based spin)
      animation: {
        'spin-slow': 'l26 1s infinite steps(12)',
      },
      // Custom Keyframes for animation
      keyframes: {
        l26: {
          '100%': {
            transform: 'rotate(1turn)',
          },
        },
      }
    },
  },
  plugins: [],
}