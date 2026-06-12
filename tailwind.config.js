/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lineamientos gráficos Crystal (instructivo Andrea, jun-2026):
        // fondo único de interfaz, "negro" no 100%, líneas y texto neutros.
        paper: '#F9F8F4',      // Color de fondo (toda la interfaz)
        'paper-2': '#F9F8F4',  // mismo fondo (sin escalón cálido)
        'paper-3': '#EFEEE9',  // superficie sutil
        ink: '#1C1C1C',        // "negro" (no 100%)
        'ink-soft': '#5B5856', // texto secundario
        'ink-mute': '#5B5856', // apoyo (alineado al neutro del instructivo)
        line: '#B5B5B5',       // color de líneas
        // Paleta oficial Crystal — referencia de marca
        crystal: {
          primary: '#000000',   // compat v2 (legacy, no tocar)
          secondary: '#FFFFFF', // compat v2 (legacy, no tocar)
          milk: '#FBF7F4',
          oat: '#E5DED2',
          taupe: '#A39382',
          mocha: '#685D54',
          charcoal: '#141414',
          dawn: '#CECECE',
          shadow: '#4C4C4C',
        },
        // Acento verde según instructivo Andrea (verde salvia, no el GEF vivo).
        gef: {
          green: '#87BA7D', // verde de acento (trazo / texto)
          deep: '#000078',
          glow: '#D8EDD3',  // verde claro (fondo de chip/badge)
        },
        // Punto Blanco (soporte sobrio)
        pb: { blue: '#9CB2D9', beige: '#BC8B6B', dark: '#333333' },
      },
      fontFamily: {
        // Instructivo Andrea: Montserrat para TODA la interfaz.
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
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
