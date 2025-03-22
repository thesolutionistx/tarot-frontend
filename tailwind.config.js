/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#2c003e',
        'primary-darker': '#1a0026',
        'primary-light': '#4a0066',
        'accent-gold': '#ffd700',
        'accent-gold-light': '#ffe566',
        'accent-red': '#ff6b6b',
        'card-bg-light': '#f5f5f5',
        'card-bg-dark': '#e0e0e0',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'gradient-mystical': 'linear-gradient(135deg, var(--primary-dark), var(--primary-darker))',
        'gradient-gold': 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light))',
        'gradient-card': 'linear-gradient(135deg, var(--card-bg-light), var(--card-bg-dark))',
        'gradient-card-back': 'linear-gradient(135deg, var(--accent-gold), var(--accent-red))',
      },
      boxShadow: {
        'gold': '0 4px 15px rgba(255, 215, 0, 0.3)',
        'gold-hover': '0 6px 20px rgba(255, 215, 0, 0.5)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.3)',
      },
      textShadow: {
        'gold': '0 0 10px rgba(255, 215, 0, 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.8s ease forwards',
        'slide-in-right': 'slideInRight 0.8s ease forwards',
        'slide-in-left': 'slideInLeft 0.8s ease forwards',
        'pulse': 'pulse 2s infinite',
        'twinkle': 'twinkle 4s infinite alternate',
        'rotate': 'rotate 60s linear infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { transform: 'translateY(50px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          'from': { transform: 'translateX(50px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          'from': { transform: 'translateX(-50px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        twinkle: {
          '0%': { opacity: '0.1' },
          '100%': { opacity: '0.7' },
        },
        rotate: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      zIndex: {
        '-10': '-10',
      },
      transitionProperty: {
        'transform': 'transform',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.backface-visibility-hidden': {
          'backface-visibility': 'hidden',
        },
        '.text-shadow-gold': {
          'text-shadow': '0 0 10px rgba(255, 215, 0, 0.5)',
        },
        '.perspective': {
          'perspective': '1000px',
        },
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
