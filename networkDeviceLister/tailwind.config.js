/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Original Farbpalette
        'app-primary': '#33808d',
        'app-primary-dark': '#2a6b75',
        'app-primary-light': '#4a9aa8',
        'app-bg': '#1f2121',
        'app-surface': '#2a2d2d',
        'app-surface-light': '#343838',
        'app-sidebar': '#1a1d1d',
        'app-sidebar-hover': '#252929',
        'app-sidebar-active': '#33808d20',
        'app-border': '#404545',
        'app-text': '#ffffff',
        'app-text-secondary': '#b8c5c5',
        'app-text-muted': '#8a9999',
        'app-table-header': '#1e3a8a',
        'app-success': '#10b981',
        'app-warning': '#f59e0b',
        'app-error': '#ef4444',
      },
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        'mono': ['"SF Mono"', 'Monaco', 'monospace'],
      },
      boxShadow: {
        'app': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'app-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        'app': '12px',
      }
    },
  },
  plugins: [],
};
