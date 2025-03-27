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
        'reverse-gradient-radial-custom': 'radial-gradient(closest-side at 50% 12.5%, #0000 96%, #f03355) 50% 0 / 20% 80% repeat-y, radial-gradient(closest-side at 12.5% 50%, #0000 96%, #f03355) 0 50% / 80% 20% repeat-x'
      },
      // Custom Animations for rotating (steps-based spin)
      animation: {
        'spin-slow': 'l26 1s infinite steps(12)',
        spinGradient: 'spinGradient 3s linear infinite',
        revealAndMoveUp: "revealAndMove 1s ease-out forwards",
        revealAndMoveDown: "revealAndMoveD 1s ease-out forwards",
        revealAndOpen: "revealAndVisible 1.2s ease-out forwards",
        closeRevealAndMoveUp: "revealAndCloseUp 2s ease-in-out forwards",
        closerevealAndMoveDown: "revealAndCloseDown 2s ease-in-out forwards",
        revealModelClosed: "revealModelClosed 0.7s ease-in-out forwards",
      },
      // Custom Keyframes for animation
      keyframes: {
        l26: {
          '100%': {
            transform: 'rotate(1turn)',
          },
        },
        spinGradient: {
          from: { '--angle': '0deg' },
          to: { '--angle': '360deg' },
        },
        // on login after clicking on forget password model will get open with animation code start
        revealAndMove: {
          "0%": { opacity: "0", transform: "scaleY(0) translateX(-50%) translateY(-50%)" }, // Start hidden
          "50%": { opacity: "1", transform: "scaleY(1) translateX(-50%) translateY(-50%)" }, // Fully visible, no movement
          "100%": { opacity: "1", transform: "translateX(-50%) translateY(-200px)" }, // Moves up
        },
        revealAndMoveD: {
          "0%": { opacity: "0", transform: "scaleY(0) translateX(-50%) translateY(40px)" }, // Start hidden
          "50%": { opacity: "1", transform: "scaleY(1) translateX(-50%) translateY(40px)" }, // Fully visible, no movement
          "100%": { opacity: "1", transform: "translateX(-50%) translateY(200px)" }, // Moves down
        },
        revealAndVisible: {
          "0%": { opacity: "0", transform: "scaleY(0) translateX(-50%) translateY(-50%)" }, // Start hidden
          "50%": { opacity: "1", transform: "scaleY(0) translateX(-50%) translateY(-50%)" }, // Fully visible, no movement
          "100%": { opacity: "1", transform: "scaleY(1) translateX(-50%) translateY(-50%)" }, // Moves down
        },
        revealAndCloseUp: {
          "0%": { opacity: "1", transform: "translateX(-50%) translateY(-200px)" }, // Start hidden
          "50%": { opacity: "1", transform: "scaleY(1) translateX(-50%) translateY(-50%)" }, // Fully visible, no movement
          "100%": { opacity: "0", transform: "scaleY(0) translateX(-50%) translateY(-50%)" }, // Moves up
        },
        revealAndCloseDown: {
          "0%": { opacity: "1", transform: "translateX(-50%) translateY(200px)" }, // Start hidden
          "50%": { opacity: "1", transform: "scaleY(1) translateX(-50%) translateY(40px)" }, // Fully visible, no movement
          "100%": { opacity: "0", transform: "scaleY(0) translateX(-50%) translateY(40px))" }, // Moves down
        },
        revealModelClosed: {
          "0%": { opacity: "1", transform: "scaleY(1) translateX(-50%) translateY(-50%)" }, // Start hidden
          "50%": { opacity: "1", transform: "scaleY(1) translateX(-50%) translateY(-50%)" }, // Fully visible, no movement
          "100%": { opacity: "0", transform: "scaleY(0) translateX(-50%) translateY(-50%)" }, // Moves down
        },
      },
      backgroundImage:{
        "background-image": "conic-gradient(from var(--angle), #ff4545, #00ff99, #006aff, #ff0095, #ff4545)",
        "background-image-reverse": "conic-gradient(from var(--angle), #ff4545, #ff4545, #006aff, #00ff99, #ff4545)"
      },
      boxShadow: {
        "neon-pink": "0 0 5px #2bd2ff,0 0 15px #2bd2ff,0 0 30px #2bd2ff,0 0 60px #2bd2ff"
      }
    },
  },
  plugins: [],
}