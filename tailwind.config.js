/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#06b6d4'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto']
      }
    },
  },
  plugins: [],
}
