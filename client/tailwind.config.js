/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6B35D9',
          violet: '#7B3FE4',
          light: '#9B6BFF',
          bg: '#0c0c0c',
          card: '#141414',
          'card-2': '#1c1c1c',
          border: '#202020',
          muted: '#888888',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

