/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "trading-background": "url('/cutebackground.jpg')",
      },
    },
  },
  plugins: [daisyui],
};
