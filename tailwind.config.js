/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crystal: {
          primary: '#000000',
          secondary: '#FFFFFF',
          gef: {
            green: '#37B34A',
            dark: '#000078',
            light: '#73EDFF',
          },
          pb: {
            blue: '#9CB2D9',
            beige: '#BC8B6B',
            dark: '#333333',
          }
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
