/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas cálido + estructura grafito — anclado a la paleta oficial
        // "Base Maestra Crystal" (MILK / OAT / CHARCOAL / SHADOW / MOCHA).
        paper: '#FBF7F4',      // MILK
        'paper-2': '#EFE8DC',  // paso suave MILK→OAT
        'paper-3': '#E5DED2',  // OAT (superficie más profunda)
        ink: '#141414',        // CHARCOAL (negro editorial)
        'ink-soft': '#4C4C4C', // SHADOW (texto secundario)
        'ink-mute': '#685D54', // MOCHA (apoyo cálido, tierra sutil)
        line: '#E5DED2',       // OAT (hairlines)
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
        // Acento de marca GEF. El corporativo Crystal es neutro; este verde
        // pertenece al contexto GEF, no a la paleta corporativa.
        gef: {
          green: '#37B34A',
          deep: '#000078',
          glow: '#5BC85E', // verde claro (acento luminoso, antes cyan)
        },
        // Punto Blanco (soporte sobrio)
        pb: { blue: '#9CB2D9', beige: '#BC8B6B', dark: '#333333' },
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
