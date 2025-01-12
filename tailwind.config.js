/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,vue,md}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
}

