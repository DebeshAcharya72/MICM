/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1B3D',
          'navy-dark': '#060E21',
          'navy-light': '#142754',
          'navy-muted': '#1E3A78',
          yellow: '#FFC107',
          'yellow-hover': '#E5AC00',
          'yellow-light': '#FFF8E1',
          slate: '#0F172A',
          body: '#64748B',
          light: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 27, 61, 0.06)',
        'premium': '0 20px 40px -15px rgba(11, 27, 61, 0.12)',
        'elevated': '0 25px 50px -12px rgba(11, 27, 61, 0.18)',
      }
    },
  },
  plugins: [],
};
