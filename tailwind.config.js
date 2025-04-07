/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // O cualquier ruta que estés utilizando en tu proyecto
  ],
  theme: {
    extend: {
      backgroundImage: {
        notebook: "url('/assets/notebook.avif')",
      },
    },
  },
  plugins: [],
}
