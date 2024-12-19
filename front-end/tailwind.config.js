// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // All pages
    './components/**/*.{js,ts,jsx,tsx}', // All components
    './app/**/*.{js,ts,jsx,tsx}', // If using the `app` directory (Next.js 13)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
