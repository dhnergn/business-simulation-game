/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        'primary-dark': '#1e2993',
        secondary: '#0f766e',
        accent: '#ca8a04',
        'accent-hover': '#a16207',
        danger: '#b91c1c',
        success: '#15803d',
        'card-bg': '#ffffff',
        'stat-bg': '#f1f5f9',
        'border-color': '#e2e8f0',
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
