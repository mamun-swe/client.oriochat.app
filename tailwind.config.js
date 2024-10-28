/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#070F2B",
        secondary: "#535C91",
        muted: "#5C8374",
        danger: "#FC6736",
      },
    },
    container: {
      padding: "1rem",
      center: true,
    },
  },
  plugins: [],
};

