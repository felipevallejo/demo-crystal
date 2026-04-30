# Espacio Crystal — Prototipo

Prototipo del **employee workspace** de Crystal: un solo lugar para comunicaciones, personas, servicios y el espacio personal del colaborador.

## Estructura

- **Inicio** — Home editorial: campaña destacada, servicios, personas, cultura.
- **Comunicaciones** — Campañas, comunicados, cultura y aprendizaje.
- **Personas** — Directorio, cumpleaños, nuevos ingresos.
- **Servicios** — Catálogo unificado: nómina, certificaciones, vacaciones, beneficios, perfil, aprendizaje.
- **Mi espacio** — Información personal, mis cosas, acciones rápidas.
- **Mi equipo** — Solo para líderes: organigrama, ausencias, planeación.
- **Pregúntale a Crystal** — Burbuja flotante con asistente conversacional (mock).
- **Búsqueda global** — Command palette con ⌘K / Ctrl+K.

## Stack

- React 19 · Vite 6 · TypeScript
- Tailwind CSS 4
- Framer Motion · Lucide React

## Ejecutar en local

```bash
npm install
npm run dev
```

Variantes por URL:

- `?role=collaborator` o `?role=leader`
- `?tab=home|comms|people|services|space|payroll|certifications|vacations|profile|team|benefits`
- `?v=1|2|3` — etapas de madurez de la experiencia.

Build de producción:

```bash
npm run build      # genera /dist
npm run preview    # sirve /dist localmente
```

Lint:

```bash
npm run lint
```
