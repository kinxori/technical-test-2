/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      ms: "601px",
      ls: "1121px",
      xls: "1921px",
    },
  },
  plugins: [],
};
