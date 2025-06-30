/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
  content: [
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
