/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        care: {
          50: '#eff8ff', 100: '#dff1ff', 500: '#0f70b7', 600: '#075f9d', 700: '#064f82'
        }
      },
      boxShadow: { soft: '0 18px 45px rgba(15, 112, 183, 0.10)' }
    }
  },
  plugins: []
};
