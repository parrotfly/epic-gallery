/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'epic-',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
