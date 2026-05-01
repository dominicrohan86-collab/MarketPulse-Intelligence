/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#071018',
          900: '#0b1420',
          850: '#101b2a',
          800: '#162233',
        },
        analyst: {
          500: '#3f8cff',
          400: '#68a4ff',
          200: '#b9d5ff',
        },
        market: {
          green: '#2fc38a',
          teal: '#2bb7a7',
          amber: '#f0b84a',
          rose: '#e36d79',
          violet: '#9b8cff',
        },
      },
      boxShadow: {
        card: '0 18px 55px rgba(2, 8, 23, 0.28)',
        soft: '0 10px 30px rgba(15, 23, 42, 0.12)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'SFMono-Regular',
          'ui-monospace',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
