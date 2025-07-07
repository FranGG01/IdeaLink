/** @type {import('tailwindcss').Config} */
import { mtConfig } from "@material-tailwind/react";
module.exports = {
   darkMode: 'class',
  content: [
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    mtConfig
  ],
};
export default config;