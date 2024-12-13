/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-blue": "#092C4C",
        "app-blue-2": "#30385E",
        "app-blue-3": "#5A6181",
        "app-blue-4": "#455ABB",
        "app-gray": "#D0D0D0",
        "app-gray-2": "#202020",
        "app-gray-3": "#8B8B8B",
        "app-gray-4": "#ABB3BB",
        "app-gray-5": "#6D6A6A",
        'app-yellow': "#F3EF15"
      }
    },
  },
  plugins: [],
}

