/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6A1DB5',   // Vivid Violet — primary
          violet: '#4A1285',   // Pressed Violet — hover / active
          soft: '#A178FA',     // Soft Violet — secondary cards
          green: '#C8F139',    // Volt Green — accent / punch
          teal: '#00C2A8',     // Teal Mint — supporting
          coral: '#FF6B6B',    // Coral Red — errors
          amber: '#F5A623',    // Amber Gold — ratings
          bg: '#0D0D0D',       // Ink Black — dark bg
          card: '#161616',     // Dark card bg
          'card-2': '#1E1E1E', // Dark card bg 2
          border: '#242424',   // Dark border
          muted: '#888888',    // Muted text
          light: '#F5F3FF',    // Very light violet tint — light section cards
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
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
