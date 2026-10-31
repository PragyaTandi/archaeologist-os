/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // forest-green OS palette
        desktop: '#123d2b',
        'desktop-dark': '#0e2f20',
        'win-bg': '#c8d5c0',
        'win-bg-shadow': '#aab8a1',
        'win-title': '#91a987',
        'win-title-active': '#6f8a62',
        'deep-green': '#183a28',
        'deep-green-soft': '#2c4a36',
        phosphor: '#75c66a',
        'phosphor-dim': '#4f8a47',
        paper: '#e8e0c9',
        'paper-dark': '#d8cfb3',
        ink: '#2a2417',
        'green-black': '#10251a',
        'line-dark': '#5a6e50',
        'line-light': '#eef3ea',
      },
      fontFamily: {
        mono: ['Source Code Pro', 'Courier New', 'monospace'],
        pixel: ['VT323', 'Courier New', 'monospace'],
        serif: ['IM Fell English', 'Georgia', 'serif'],
        pica: ['IM Fell DW Pica', 'Georgia', 'serif'],
      },
      spacing: {
        'px-1': '1px',
      },
    },
  },
  plugins: [],
};
