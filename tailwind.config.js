/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-green": "#8dbf41",
        "dark-green": "#017731",
        "light-blue": "#1f4b9a",
        "dark-blue": "#272a5d",
      },
    },
  },
  plugins: [],
};
