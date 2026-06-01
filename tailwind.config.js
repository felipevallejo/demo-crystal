/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas cálido + estructura grafito
        paper: '#FAF8F4',
        'paper-2': '#F1ECE3',
        'paper-3': '#E9E2D6',
        ink: '#12110F',
        'ink-soft': '#57524B',
        'ink-mute': '#8A8278',
        line: '#E7E1D7',
        // Marca GEF auténtica (verde + azul oscuro; sin cyan inventado)
        gef: {
          green: '#37B34A',
          deep: '#000078',
          glow: '#5BC85E', // verde claro (acento luminoso, antes cyan)
        },
        // Punto Blanco (soporte sobrio)
        pb: { blue: '#9CB2D9', beige: '#BC8B6B', dark: '#333333' },
        // Compat v2 (no romper vistas heredadas durante transición)
        crystal: {
          primary: '#000000',
          secondary: '#FFFFFF',
        },
      },
      fontFamily: {
        // Marca Crystal: Montserrat (principal) + Inter (cuerpo)
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 18px 50px -28px rgba(18,17,15,0.30)',
        lift: '0 30px 80px -40px rgba(18,17,15,0.45)',
        glow: '0 20px 60px -24px rgba(55,179,74,0.40)',
      },
      letterSpacing: {
        tightish: '-0.02em',
      },
    },
  },
  plugins: [],
}
