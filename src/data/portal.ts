import {
  Award,
  BookMarked,
  FileText,
  FileSignature,
  FileBox,
  Gift,
  GraduationCap,
  Glasses,
  HandCoins,
  HeartHandshake,
  IdCard,
  Landmark,
  Megaphone,
  Newspaper,
  Plane,
  Receipt,
  ShieldCheck,
  Sprout,
  Coffee,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { EspacioService, Segment, ServiceKind } from '../types/app';

export const APP_BRAND = 'Crystal';
export const APP_TAGLINE = 'Tu gente y tus trámites, en un solo lugar.';

/* ============================================================
   Empleado de demo + segmentación
   ============================================================ */

export const empleado = {
  nombre: 'Carlos Vargas',
  primerNombre: 'Carlos',
  cedula: '1.017.245.880',
  cargo: 'Operario de confección',
  sociedad: 'GEF',
};

export const sedes = ['CD Itagüí', 'Planta Rionegro', 'Oficinas Medellín', 'Tienda El Tesoro'];

export const defaultSegment: Segment = { perfil: 'operativo', sede: 'CD Itagüí' };

/** Etiquetas y tinte de cada tipo de servicio. */
export const kindMeta: Record<ServiceKind, { label: string; verb: string; tint: string; dot: string }> = {
  visualizacion: { label: 'Consulta', verb: 'Ver', tint: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' },
  descarga: { label: 'Descarga', verb: 'Descargar', tint: 'bg-blue-50 text-blue-700 ring-blue-200', dot: 'bg-blue-500' },
  consulta: { label: 'Repositorio', verb: 'Abrir', tint: 'bg-stone-100 text-stone-700 ring-stone-300', dot: 'bg-stone-500' },
};

export const fuenteMeta: Record<EspacioService['fuente'], { label: string; hint: string }> = {
  nomina: { label: 'Nómina', hint: 'Dato en vivo de tu nómina' },
  contenido: { label: 'Contenido', hint: 'Publicado por Comunicaciones y GH' },
  mensajeria: { label: 'Mensajería', hint: 'Mensajería al empleado' },
};

/* ============================================================
   INICIO — Noticias (rotabanner segmentable y vinculable)
   ============================================================ */

export type NewsItem = {
  id: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  /** A qué perfil aplica; 'todos' si general. */
  segmento: 'todos' | 'operativo' | 'administrativo';
  /** El detalle vive en el origen. */
  origen: string;
  icon: LucideIcon;
};

export const news: NewsItem[] = [
  {
    id: 'n-bienestar',
    eyebrow: 'Bienestar',
    title: 'Jornada de salud y movilidad en el CD',
    excerpt: 'Tamizaje, pausas activas y feria de hábitos. Tres turnos el viernes.',
    date: 'Vie 12 jun',
    cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    segmento: 'operativo',
    origen: 'Boletín Crystal',
    icon: Sprout,
  },
  {
    id: 'n-pacto',
    eyebrow: 'Gestión Humana',
    title: 'Nuevos beneficios del pacto colectivo 2026',
    excerpt: 'Auxilios de estudio y de lentes actualizados. Consúltalos en Mi espacio.',
    date: 'Esta semana',
    cover: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    segmento: 'todos',
    origen: 'Intranet de GH',
    icon: HeartHandshake,
  },
  {
    id: 'n-plancarrera',
    eyebrow: 'Crecimiento',
    title: 'Plan carrera para líderes de tienda',
    excerpt: 'Convocatoria abierta para el programa de desarrollo del segundo semestre.',
    date: 'Hasta 30 jun',
    cover: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    segmento: 'administrativo',
    origen: 'Escuela Crystal',
    icon: GraduationCap,
  },
  {
    id: 'n-quincena',
    eyebrow: 'Nómina',
    title: 'Pago de la segunda quincena de junio',
    excerpt: 'El depósito se hace el 30 de junio. Las colillas quedan disponibles desde las 9 a.m.',
    date: '30 jun',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    segmento: 'todos',
    origen: 'Comunicado de GH',
    icon: Newspaper,
  },
];

/* ============================================================
   INICIO — Cumpleaños y reconocimientos (segmentado)
   ============================================================ */

export type PersonChip = { id: string; name: string; area: string; date: string; photo: string };

export const birthdays: PersonChip[] = [
  { id: 'b1', name: 'Marta Quintero', area: 'Confección', date: 'Hoy', photo: 'https://i.pravatar.cc/120?img=45' },
  { id: 'b2', name: 'Jhon Restrepo', area: 'Logística', date: '14 jun', photo: 'https://i.pravatar.cc/120?img=15' },
  { id: 'b3', name: 'Sara Mejía', area: 'Calidad', date: '16 jun', photo: 'https://i.pravatar.cc/120?img=49' },
];

export type Recognition = { id: string; title: string; body: string; icon: LucideIcon };

export const recognitions: Recognition[] = [
  { id: 'r1', title: 'Equipo del mes', body: 'Confección turno 2 cerró junio sin reprocesos.', icon: Award },
  { id: 'r2', title: '15 años contigo', body: 'Celebramos a Marta Quintero por su trayectoria en Crystal.', icon: HeartHandshake },
];

/* ============================================================
   INICIO — Eventos y reuniones (vinculable, agendable)
   ============================================================ */

export type EventItem = {
  id: string;
  title: string;
  when: string;
  place: string;
  segmento: 'todos' | 'operativo' | 'administrativo';
  agendable: boolean;
  icon: LucideIcon;
};

export const events: EventItem[] = [
  {
    id: 'e-cafe',
    title: 'Café con la Presidencia',
    when: 'Mié 18 jun · 10:00 a.m.',
    place: 'Auditorio + transmisión',
    segmento: 'todos',
    agendable: true,
    icon: Coffee,
  },
  {
    id: 'e-sst',
    title: 'Capacitación de seguridad (SST)',
    when: 'Jue 19 jun · 7:00 a.m.',
    place: 'CD Itagüí · Salón 2',
    segmento: 'operativo',
    agendable: true,
    icon: ShieldCheck,
  },
];

/* ============================================================
   MI ESPACIO — Servicios
   ============================================================ */

export const espacioServices: EspacioService[] = [
  {
    id: 'vacaciones',
    title: 'Vacaciones',
    kind: 'visualizacion',
    fuente: 'nomina',
    icon: Plane,
    value: '12 días',
    detail: 'Días disponibles · 4 vencen en julio',
    stat: { value: 12, suffix: ' días' },
  },
  {
    id: 'cesantias',
    title: 'Cesantías',
    kind: 'visualizacion',
    fuente: 'nomina',
    icon: Landmark,
    value: '$8.450.000',
    detail: 'Saldo acumulado · corte 31 may 2026',
  },
  {
    id: 'colilla',
    title: 'Colilla de pago',
    kind: 'descarga',
    fuente: 'nomina',
    icon: Receipt,
    detail: 'Desprendible de la quincena en curso',
    format: 'PDF',
  },
  {
    id: 'cir',
    title: 'Certificado de ingresos y retenciones',
    kind: 'descarga',
    fuente: 'nomina',
    icon: FileText,
    detail: 'Documento anual para trámites tributarios',
    format: 'PDF',
  },
  {
    id: 'carta-laboral',
    title: 'Certificación laboral',
    kind: 'descarga',
    fuente: 'nomina',
    icon: FileSignature,
    detail: 'Carta con cargo, salario y antigüedad',
    format: 'PDF',
  },
  {
    id: 'prestamos',
    title: 'Préstamos',
    kind: 'visualizacion',
    fuente: 'nomina',
    icon: HandCoins,
    value: '$1.280.000',
    detail: 'Saldo · 18 de 24 cuotas pagadas',
  },
  {
    id: 'beneficios',
    title: 'Beneficios de pacto',
    kind: 'consulta',
    fuente: 'contenido',
    icon: Gift,
    detail: 'Auxilios y beneficios del pacto colectivo',
  },
  {
    id: 'formatos',
    title: 'Formatos',
    kind: 'descarga',
    fuente: 'contenido',
    icon: FileBox,
    detail: 'Auxilios, reportes y solicitudes para diligenciar',
  },
  {
    id: 'normas',
    title: 'Normas y políticas',
    kind: 'consulta',
    fuente: 'contenido',
    icon: BookMarked,
    detail: 'Reglamentos, código de conducta y políticas',
  },
];

/** Accesos rápidos del home: los de más uso, a un toque. */
export const quickActionIds = ['colilla', 'vacaciones', 'carta-laboral', 'cesantias'];

/* ============================================================
   Detalle de servicios de repositorio
   ============================================================ */

export type DocItem = {
  id: string;
  title: string;
  meta: string;
  /** descarga directa o solo lectura. */
  accion: 'descargar' | 'consultar';
};

export const beneficiosPacto: DocItem[] = [
  { id: 'bp-estudio', title: 'Auxilio de estudio', meta: 'Hasta 70% · pregrado y técnico', accion: 'consultar' },
  { id: 'bp-lentes', title: 'Auxilio de lentes y montura', meta: 'Una vez al año', accion: 'consultar' },
  { id: 'bp-especializacion', title: 'Auxilio de especialización / maestría', meta: 'Solo administrativos', accion: 'consultar' },
  { id: 'bp-otros', title: 'Otros auxilios del pacto', meta: 'Calamidad, óptica, funerario', accion: 'consultar' },
];

export const formatos: { grupo: string; icon: LucideIcon; items: DocItem[] }[] = [
  {
    grupo: 'Auxilios',
    icon: Glasses,
    items: [
      { id: 'f-estudio', title: 'Formato de auxilio de estudio', meta: 'PDF · diligenciar y adjuntar', accion: 'descargar' },
      { id: 'f-lentes', title: 'Formato de auxilio de lentes y montura', meta: 'PDF', accion: 'descargar' },
    ],
  },
  {
    grupo: 'Seguridad y salud (SST)',
    icon: ShieldCheck,
    items: [
      { id: 'f-accidente', title: 'Reporte de accidente de trabajo', meta: 'PDF · requiere firma', accion: 'descargar' },
      { id: 'f-incidente', title: 'Reporte de incidente', meta: 'PDF · requiere firma', accion: 'descargar' },
      { id: 'f-inseguro', title: 'Reporte de condición insegura', meta: 'PDF', accion: 'descargar' },
    ],
  },
  {
    grupo: 'Solicitudes',
    icon: HandCoins,
    items: [
      { id: 'f-cesantias', title: 'Solicitud de cesantías', meta: 'PDF', accion: 'descargar' },
      { id: 'f-datos', title: 'Actualización de datos', meta: 'Anual · precarga automática', accion: 'descargar' },
    ],
  },
];

export const normas: DocItem[] = [
  { id: 'no-reglamento', title: 'Reglamento interno de trabajo', meta: 'Vigente 2026', accion: 'consultar' },
  { id: 'no-conducta', title: 'Código de conducta', meta: 'Versión 3', accion: 'consultar' },
  { id: 'no-higiene', title: 'Reglamento de higiene y seguridad', meta: 'Vigente 2026', accion: 'consultar' },
  { id: 'no-politicas', title: 'Políticas de la compañía', meta: 'Tratamiento de datos, teletrabajo y más', accion: 'consultar' },
];

/* ============================================================
   Buscador instantáneo — el inicio que resuelve en segundos
   ============================================================ */

export type SearchEntry = {
  id: string;
  label: string;
  hint: string;
  group: 'Trámites' | 'Documentos' | 'Personas' | 'Contenido';
  icon: LucideIcon;
  /** A dónde lleva: id de servicio en Mi espacio. */
  serviceId?: string;
};

export const searchIndex: SearchEntry[] = [
  { id: 'q-colilla', label: 'Descargar mi colilla', hint: 'Quincena en curso', group: 'Trámites', icon: Receipt, serviceId: 'colilla' },
  { id: 'q-vac', label: 'Mis días de vacaciones', hint: 'Te quedan 12 días', group: 'Trámites', icon: Plane, serviceId: 'vacaciones' },
  { id: 'q-cesantias', label: 'Saldo de cesantías', hint: 'Corte 31 may', group: 'Trámites', icon: Landmark, serviceId: 'cesantias' },
  { id: 'q-carta', label: 'Certificación laboral', hint: 'Carta con cargo y salario', group: 'Trámites', icon: FileSignature, serviceId: 'carta-laboral' },
  { id: 'q-cir', label: 'Certificado de ingresos y retenciones', hint: 'Trámites tributarios', group: 'Trámites', icon: FileText, serviceId: 'cir' },
  { id: 'q-prestamo', label: 'Saldo de mi préstamo', hint: '18 de 24 cuotas', group: 'Trámites', icon: HandCoins, serviceId: 'prestamos' },
  { id: 'd-reglamento', label: 'Reglamento interno de trabajo', hint: 'Normas y políticas', group: 'Documentos', icon: BookMarked, serviceId: 'normas' },
  { id: 'd-conducta', label: 'Código de conducta', hint: 'Normas y políticas', group: 'Documentos', icon: ShieldCheck, serviceId: 'normas' },
  { id: 'd-estudio', label: 'Formato de auxilio de estudio', hint: 'Formatos para diligenciar', group: 'Documentos', icon: FileBox, serviceId: 'formatos' },
  { id: 'd-accidente', label: 'Reporte de accidente de trabajo', hint: 'Formatos SST', group: 'Documentos', icon: FileBox, serviceId: 'formatos' },
  { id: 'd-pacto', label: 'Beneficios del pacto colectivo', hint: 'Auxilios del pacto', group: 'Documentos', icon: Gift, serviceId: 'beneficios' },
  { id: 'c-bienestar', label: 'Jornada de salud y movilidad', hint: 'Noticia · 12 jun', group: 'Contenido', icon: Megaphone },
  { id: 'c-cafe', label: 'Café con la Presidencia', hint: 'Evento · 18 jun', group: 'Contenido', icon: Coffee },
  { id: 'p-gh', label: 'Servicio al personal', hint: 'Gestión Humana · ext. 1200', group: 'Personas', icon: IdCard },
];

/** Sugerencias visibles cuando el buscador está vacío. */
export const searchSuggestions = ['Colilla', 'Vacaciones', 'Carta laboral', 'Cesantías', 'Reglamento'];

/* ============================================================
   Abrebocas de IA (canned, costo cero) — guía y enruta
   ============================================================ */

export type AiSnippet = { match: string[]; reply: string; serviceId?: string };

export const aiSnippets: AiSnippet[] = [
  {
    match: ['vacacion', 'dias', 'descanso'],
    reply: 'Tienes 12 días de vacaciones disponibles y 4 vencen en julio. Abre Vacaciones para verlos.',
    serviceId: 'vacaciones',
  },
  {
    match: ['colilla', 'desprendible', 'pago', 'nomina'],
    reply: 'Tu colilla de la quincena en curso está lista. Toca para descargarla en PDF.',
    serviceId: 'colilla',
  },
  {
    match: ['cesantia'],
    reply: 'Tu saldo de cesantías es $8.450.000 con corte al 31 de mayo. Sale en vivo de nómina.',
    serviceId: 'cesantias',
  },
  {
    match: ['carta', 'certificacion', 'laboral'],
    reply: 'Puedo generar tu certificación laboral con corte de hoy, firmada y lista para descargar.',
    serviceId: 'carta-laboral',
  },
];
