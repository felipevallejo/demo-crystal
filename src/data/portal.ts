import {
  Award,
  BookMarked,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Cake,
  Calendar,
  CheckCircle2,
  Clock3,
  Coffee,
  Compass,
  FileBox,
  FileText,
  Gift,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Home,
  IdCard,
  Leaf,
  Library,
  ListChecks,
  MapPin,
  Megaphone,
  Newspaper,
  PawPrint,
  Receipt,
  Salad,
  ShieldCheck,
  Shirt,
  Sparkles,
  Sprout,
  SunMedium,
  Trophy,
  UserPlus,
  Users,
  Wallet,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { MaturityId, NavItem, RoleId, SummaryItem, TabId } from '../types/app';

export const APP_NAME = 'Espacio Crystal';
export const APP_TAGLINE = 'El espacio de las personas Crystal';

export const navItems: NavItem[] = [
  { id: 'home', label: 'Inicio', icon: Home, roles: ['collaborator', 'leader'] },
  { id: 'comms', label: 'Comunicaciones', icon: Megaphone, roles: ['collaborator', 'leader'] },
  { id: 'people', label: 'Personas', icon: Users, roles: ['collaborator', 'leader'] },
  {
    id: 'services',
    label: 'Servicios',
    icon: Compass,
    roles: ['collaborator', 'leader'],
    children: [
      { id: 'payroll', label: 'Mi nómina', icon: Wallet },
      { id: 'certifications', label: 'Certificaciones', icon: FileText },
      { id: 'vacations', label: 'Vacaciones', icon: Calendar },
      { id: 'benefits', label: 'Beneficios', icon: Gift },
    ],
  },
  {
    id: 'knowledge',
    label: 'Conocimiento',
    icon: Library,
    roles: ['collaborator', 'leader'],
    children: [
      { id: 'processes', label: 'Procesos', icon: Workflow },
      { id: 'procedures', label: 'Procedimientos', icon: ListChecks },
      { id: 'forms', label: 'Formatos', icon: FileBox },
      { id: 'policies', label: 'Políticas', icon: BookMarked },
    ],
  },
  {
    id: 'space',
    label: 'Mi espacio',
    icon: IdCard,
    roles: ['collaborator', 'leader'],
    children: [{ id: 'profile', label: 'Mi perfil', icon: IdCard }],
  },
  { id: 'team', label: 'Mi equipo', icon: Building2, roles: ['leader'] },
];

export function findParentTab(tab: TabId): TabId | null {
  for (const item of navItems) {
    if (item.children?.some((c) => c.id === tab)) return item.id;
  }
  return null;
}

export const stageMeta: Record<MaturityId, { label: string; shortLabel: string; urlValue: string }> = {
  human: { label: 'Espacio', shortLabel: 'v1', urlValue: '1' },
  assisted: { label: 'Asistido', shortLabel: 'v2', urlValue: '2' },
  agentic: { label: 'Conversacional', shortLabel: 'v3', urlValue: '3' },
};

export const roleMeta: Record<RoleId, { label: string; shortLabel: string; employeeName: string; jobTitle: string; location: string }> = {
  collaborator: {
    label: 'Colaborador',
    shortLabel: 'Mi espacio',
    employeeName: 'Carlos Vargas',
    jobTitle: 'Operario de planta',
    location: 'GEF · Medellín',
  },
  leader: {
    label: 'Líder',
    shortLabel: 'Vista liderazgo',
    employeeName: 'Bibiana Jaramillo',
    jobTitle: 'Jefe de Tecnología',
    location: 'TI · Medellín',
  },
};

export const personalSpaces: Record<
  RoleId,
  {
    coverLabel: string;
    ambientTitle: string;
    ambientBody: string;
    memoryChips: string[];
    ritual: string;
    companionLabel: string;
    companionIcon: typeof PawPrint;
    causeTitle: string;
    causeBody: string;
    causeMetric: string;
  }
> = {
  collaborator: {
    coverLabel: 'Es tu espacio',
    ambientTitle: 'Tu fondo puede sentirse más hogar que portal.',
    ambientBody:
      'El escritorio mezcla trámites, recuerdos y pequeños anclajes emocionales para que el espacio se sienta propio y no impuesto por la organización.',
    memoryChips: ['Familia', 'Lola la perrita', 'Viaje a Jardín'],
    ritual: 'Martes de café con el equipo de planta',
    companionLabel: 'Tu compañera del día',
    companionIcon: PawPrint,
    causeTitle: 'Voluntariado que sí conecta contigo',
    causeBody: 'Inscríbete en jornadas de lectura, moda circular o siembra urbana según lo que te mueve fuera del trabajo.',
    causeMetric: '12 horas con impacto este trimestre',
  },
  leader: {
    coverLabel: 'Tu cabina de liderazgo',
    ambientTitle: 'La vista del líder combina foco, equipo y cercanía.',
    ambientBody:
      'No se trata solo de control. Esta capa hace visible a las personas, el contexto del equipo y los temas que requieren acompañamiento real.',
    memoryChips: ['Equipo TI', 'Mentoría', 'Hija en competencia'],
    ritual: 'Viernes de feedback y café',
    companionLabel: 'Intención de la semana',
    companionIcon: Sparkles,
    causeTitle: 'Propósito compartido con el equipo',
    causeBody: 'Activa retos de voluntariado, bienestar y acompañamiento para que liderazgo también conecte con servicio.',
    causeMetric: '3 iniciativas activas con el equipo',
  },
};

export const purposeMoments = [
  {
    title: 'Moda circular',
    body: 'Entrega prendas, suma puntos de impacto y conecta con iniciativas de reutilización.',
    metric: '84 prendas recuperadas',
    icon: Shirt,
  },
  {
    title: 'Lectura con niños',
    body: 'Inscribe a tu familia en la jornada del sábado y registra tus horas de aporte.',
    metric: '32 cupos disponibles',
    icon: HandHeart,
  },
  {
    title: 'Bienestar con propósito',
    body: 'Participa en retos internos que generan impacto social y ambiental desde tu día a día.',
    metric: '2 retos activos este mes',
    icon: SunMedium,
  },
];

export const tabLabels: Record<TabId, string> = {
  home: 'Inicio',
  comms: 'Comunicaciones',
  people: 'Personas',
  services: 'Servicios',
  knowledge: 'Conocimiento',
  processes: 'Procesos',
  procedures: 'Procedimientos',
  forms: 'Formatos',
  policies: 'Políticas',
  space: 'Mi espacio',
  payroll: 'Mi nómina',
  certifications: 'Certificaciones',
  vacations: 'Vacaciones',
  profile: 'Mi perfil',
  team: 'Mi equipo',
  benefits: 'Beneficios',
};

export const summaryItems: Record<RoleId, SummaryItem[]> = {
  collaborator: [
    {
      tab: 'payroll',
      title: 'Tu próximo pago',
      value: '$1.667.000',
      detail: 'Lo recibes el 30 de abril',
      tone: 'bg-crystal-primary',
      icon: Wallet,
    },
    {
      tab: 'vacations',
      title: 'Vacaciones disponibles',
      value: '12 días',
      detail: '4 días vencen en mayo',
      tone: 'bg-crystal-pb-blue',
      icon: Calendar,
    },
    {
      tab: 'profile',
      title: 'Tu perfil al día',
      value: '78%',
      detail: 'Faltan 2 secciones por completar',
      tone: 'bg-crystal-gef-green',
      icon: IdCard,
    },
  ],
  leader: [
    {
      tab: 'team',
      title: 'Equipo directo',
      value: '4 personas',
      detail: '1 solicitud por revisar hoy',
      tone: 'bg-crystal-primary',
      icon: Users,
    },
    {
      tab: 'team',
      title: 'Ausencias activas',
      value: '2 casos',
      detail: '1 incapacidad y 1 vacaciones próximas',
      tone: 'bg-amber-500',
      icon: MapPin,
    },
    {
      tab: 'payroll',
      title: 'Trámites del área',
      value: '3 alertas',
      detail: 'Cesantías, vacaciones y certificados en seguimiento',
      tone: 'bg-crystal-gef-green',
      icon: ShieldCheck,
    },
  ],
};

export const paymentHistory = [
  { period: '2da quincena Mar 2026', net: '$1.667.000', status: 'Disponible' },
  { period: '1ra quincena Mar 2026', net: '$1.667.000', status: 'Descargada' },
  { period: '2da quincena Feb 2026', net: '$1.659.000', status: 'Descargada' },
  { period: '1ra quincena Feb 2026', net: '$1.659.000', status: 'Descargada' },
  { period: '2da quincena Ene 2026', net: '$1.650.500', status: 'Descargada' },
  { period: '1ra quincena Ene 2026', net: '$1.650.500', status: 'Descargada' },
];

export const certificationCards = [
  {
    title: 'Comprobante de nómina',
    body: 'Descarga tu colilla del período actual o busca desprendibles recientes.',
    status: 'Disponible hoy',
    action: 'Descargar colilla',
  },
  {
    title: 'Carta laboral',
    body: 'Genera tu certificado con datos básicos de vinculación y cargo actual.',
    status: 'Listo en segundos',
    action: 'Generar carta',
  },
  {
    title: 'Certificado de ingresos y retenciones',
    body: 'Consulta tu documento anual para trámites tributarios o bancarios.',
    status: 'Actualizado a 2025',
    action: 'Descargar certificado',
  },
];

export const vacationMoments = [
  { title: 'Solicita tus días', detail: 'Elige fechas, revisa festivos y envía la solicitud en menos de 2 minutos.', icon: Calendar },
  { title: 'Sigue la aprobación', detail: 'Recibe confirmación de líder y talento humano sin correos innecesarios.', icon: CheckCircle2 },
  { title: 'Planea con tiempo', detail: 'Detecta días por vencer y combina descansos con puentes cercanos.', icon: Clock3 },
];

export const benefitCards = [
  {
    title: 'GEF para ti',
    subtitle: '30% de descuento en nueva colección',
    body: 'Usa tu cupo mensual en tienda física o canal interno para colaboradores.',
    cta: 'Generar cupón',
    gradient: 'from-crystal-gef-green via-emerald-500 to-emerald-700',
    icon: Shirt,
  },
  {
    title: 'Punto Blanco Bienestar',
    subtitle: 'Taller de descanso y autocuidado',
    body: 'Reserva tu cupo para la sesión guiada del viernes y suma puntos de bienestar.',
    cta: 'Reservar cupo',
    gradient: 'from-crystal-pb-blue via-sky-400 to-blue-600',
    icon: HeartHandshake,
  },
];

export const severanceSummary = {
  amount: '$8.450.000',
  cutOff: '28 de febrero de 2026',
  description: 'Es el valor acumulado de tus cesantías a la fecha de corte reportada.',
};

export const loanSummary = {
  title: 'Préstamo de libre inversión',
  balance: '$1.280.000',
  paidInstallments: 18,
  totalInstallments: 24,
  endDate: '30 de septiembre de 2026',
};

export const profileSections = [
  {
    title: 'Datos personales',
    detail: 'Documento, dirección, contacto y datos básicos actualizados.',
    status: 'Completo',
    icon: IdCard,
  },
  {
    title: 'Grupo familiar',
    detail: 'Personas a cargo, beneficiarios y datos de contacto.',
    status: 'Pendiente 1 dato',
    icon: HeartHandshake,
  },
  {
    title: 'Estudios y cursos',
    detail: 'Formación académica, certificaciones y cursos internos.',
    status: 'Completo',
    icon: GraduationCap,
  },
  {
    title: 'Experiencia laboral',
    detail: 'Historial relevante para procesos internos y movilidad.',
    status: 'Actualizar',
    icon: BriefcaseBusiness,
  },
];

export const additionalInfoCategories = [
  { label: 'Licencias', count: '2 registros' },
  { label: 'Incapacidades', count: '1 activa' },
  { label: 'Nacimiento de hijos', count: '0 registros' },
  { label: 'Otros eventos relevantes', count: '3 registros' },
];

export const teamMembers = [
  {
    name: 'Bibiana Jaramillo',
    role: 'Jefe de Tecnología',
    area: 'TI',
    status: 'En oficina',
    note: 'Aprueba vacaciones y acompañamiento del equipo.',
    photo: 'https://i.pravatar.cc/160?img=32',
  },
  {
    name: 'Hugo Esneider Muñoz',
    role: 'Analista TI',
    area: 'TI',
    status: 'Vacaciones 7-11 Abr',
    note: 'Tiene vacaciones programadas para la próxima semana.',
    photo: 'https://i.pravatar.cc/160?img=12',
  },
  {
    name: 'Liliana Maria Londoño',
    role: 'Analista TI',
    area: 'TI',
    status: 'Incapacidad corta',
    note: 'Regresa el jueves según novedad registrada.',
    photo: 'https://i.pravatar.cc/160?img=47',
  },
  {
    name: 'Carlos Vargas',
    role: 'Operario de planta',
    area: 'GEF',
    status: 'Solicitó vacaciones',
    note: 'Pendiente validación del líder para abril.',
    photo: 'https://i.pravatar.cc/160?img=15',
  },
];

export const orgNodes = [
  {
    name: 'Juan Carlos Jaramillo',
    role: 'Gerente Corporativo',
    level: 'Dirección',
    photo: 'https://i.pravatar.cc/160?img=68',
  },
  {
    name: 'Bibiana Jaramillo',
    role: 'Jefe de Tecnología',
    level: 'Líder',
    photo: 'https://i.pravatar.cc/160?img=32',
  },
  {
    name: 'Diana Marcela Rios',
    role: 'Jefe de Transformación',
    level: 'Par',
    photo: 'https://i.pravatar.cc/160?img=21',
  },
  {
    name: 'Santiago Ospina',
    role: 'Jefe de Operaciones Digitales',
    level: 'Par',
    photo: 'https://i.pravatar.cc/160?img=54',
  },
  {
    name: 'Hugo Esneider Muñoz',
    role: 'Analista TI',
    level: 'Equipo',
    photo: 'https://i.pravatar.cc/160?img=12',
  },
  {
    name: 'Liliana Maria Londoño',
    role: 'Analista TI',
    level: 'Equipo',
    photo: 'https://i.pravatar.cc/160?img=47',
  },
  {
    name: 'Camilo Restrepo',
    role: 'Desarrollador Frontend',
    level: 'Equipo',
    photo: 'https://i.pravatar.cc/160?img=30',
  },
  {
    name: 'Laura Giraldo',
    role: 'Analista de Datos',
    level: 'Equipo',
    photo: 'https://i.pravatar.cc/160?img=26',
  },
  {
    name: 'Andres Felipe Mora',
    role: 'Soporte Aplicaciones',
    level: 'Equipo',
    photo: 'https://i.pravatar.cc/160?img=61',
  },
];

export const teamHighlights = [
  { title: 'Ausencias activas', body: '1 incapacidad y 1 ausencia programada esta semana.', icon: MapPin },
  { title: 'Vacaciones próximas', body: '1 colaborador sale del 7 al 11 de abril.', icon: Calendar },
  { title: 'Cobertura sugerida', body: 'Considera redistribuir tareas del área de corte esta semana.', icon: Users },
];

export const homeBanner = {
  enabled: true,
  eyebrow: 'Comunicado destacado',
  title: 'Nueva jornada de bienestar para colaboradores el viernes 8 de mayo',
  body: 'Inscríbete antes del jueves para acceder a las actividades de yoga, tamizaje y feria de hábitos saludables.',
  cta: 'Inscribirme',
};

export type CommsCategory = 'Campaña' | 'Comunicado' | 'Cultura' | 'Aprendizaje';

export type NewsItem = {
  id: string;
  category: CommsCategory;
  eyebrow: string;
  title: string;
  excerpt: string;
  date: string;
  location?: string;
  cta: string;
  ctaTone: 'inscripcion' | 'lectura' | 'rsvp';
  accent: string;
  cover: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const newsFeed: NewsItem[] = [
  {
    id: 'jornada-bienestar-mayo',
    category: 'Campaña',
    eyebrow: 'Bienestar',
    title: 'Jornada de bienestar y movilidad',
    excerpt:
      'Yoga, tamizaje, ergonomía y feria de hábitos saludables. Cupos limitados para los tres turnos del viernes.',
    date: 'Viernes 8 de mayo · 7:00 a.m. – 4:00 p.m.',
    location: 'Centro de Distribución Itagüí',
    cta: 'Inscribirme',
    ctaTone: 'inscripcion',
    accent: 'from-emerald-400 via-emerald-500 to-emerald-700',
    cover: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    icon: Salad,
    featured: true,
  },
  {
    id: 'voluntariado-lectura',
    category: 'Campaña',
    eyebrow: 'Voluntariado',
    title: 'Lectura con niños del Barrio Aranjuez',
    excerpt: 'Una mañana de lectura compartida con los niños de la fundación. Aporta tu tiempo o lleva libros.',
    date: 'Sábado 17 de mayo · 9:00 a.m. – 12:00 m.',
    location: 'Fundación Las Golondrinas',
    cta: 'Inscribirme',
    ctaTone: 'inscripcion',
    accent: 'from-amber-400 via-amber-500 to-orange-600',
    cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    icon: BookOpen,
  },
  {
    id: 'moda-circular',
    category: 'Cultura',
    eyebrow: 'Moda circular',
    title: 'Trae tus prendas y suma impacto',
    excerpt:
      'Entrega prendas que ya no usas y conecta con iniciativas de reutilización en GEF y Punto Blanco.',
    date: 'Hasta el 30 de mayo',
    location: 'Puntos de recolección en planta y oficinas',
    cta: 'Conocer más',
    ctaTone: 'lectura',
    accent: 'from-rose-400 via-rose-500 to-pink-600',
    cover: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    icon: Shirt,
  },
  {
    id: 'siembra-urbana',
    category: 'Campaña',
    eyebrow: 'Sostenibilidad',
    title: 'Siembra urbana en sede Itagüí',
    excerpt: 'Reforestación liderada por el equipo de Sostenibilidad. Inscribe a tu familia y suma horas de impacto.',
    date: 'Domingo 1 de junio · 8:00 a.m.',
    location: 'Parque Ditaires',
    cta: 'Inscribirme',
    ctaTone: 'inscripcion',
    accent: 'from-emerald-400 via-green-500 to-lime-600',
    cover: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
    icon: Sprout,
  },
  {
    id: 'comunicado-quincenal',
    category: 'Comunicado',
    eyebrow: 'Talento Humano',
    title: 'Recordatorio: pago segunda quincena de abril',
    excerpt: 'El depósito se hará el 30 de abril. Las colillas estarán disponibles desde las 9:00 a.m.',
    date: '30 de abril',
    cta: 'Leer comunicado',
    ctaTone: 'lectura',
    accent: 'from-slate-700 via-slate-800 to-slate-950',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    icon: Newspaper,
  },
  {
    id: 'cultura-cafe',
    category: 'Cultura',
    eyebrow: 'Cultura Crystal',
    title: 'Café con Bibiana — abril',
    excerpt: 'Espacio abierto con liderazgo para conversar sobre el plan del año y resolver dudas.',
    date: 'Miércoles 30 de abril · 10:00 a.m.',
    location: 'Auditorio Crystal · Transmisión simultánea por Teams',
    cta: 'Confirmar asistencia',
    ctaTone: 'rsvp',
    accent: 'from-amber-300 via-orange-400 to-rose-500',
    cover: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80',
    icon: Coffee,
  },
  {
    id: 'aprendizaje-liderazgo',
    category: 'Aprendizaje',
    eyebrow: 'Escuela Crystal',
    title: 'Curso de liderazgo cercano',
    excerpt: 'Programa de 4 sesiones con casos reales de líderes Crystal. Aplican líderes nuevos y consolidados.',
    date: 'Inicia 12 de mayo',
    cta: 'Postularme',
    ctaTone: 'inscripcion',
    accent: 'from-sky-400 via-indigo-500 to-violet-600',
    cover: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    icon: Trophy,
  },
];

export const featuredNews = newsFeed.find((item) => item.featured) ?? newsFeed[0];

export type DirectoryPerson = {
  id: string;
  name: string;
  role: string;
  area: string;
  location: string;
  photo: string;
  email: string;
  status?: string;
};

export const directory: DirectoryPerson[] = [
  {
    id: 'bibiana-jaramillo',
    name: 'Bibiana Jaramillo',
    role: 'Jefe de Tecnología',
    area: 'Tecnología',
    location: 'Medellín',
    email: 'bibiana.jaramillo@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=32',
    status: 'En oficina',
  },
  {
    id: 'ana-marquez',
    name: 'Ana Márquez',
    role: 'Jefe de Desarrollo Humano',
    area: 'Talento Humano',
    location: 'Medellín',
    email: 'ana.marquez@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=20',
  },
  {
    id: 'monica-restrepo',
    name: 'Mónica Restrepo',
    role: 'Coordinadora de Gestión Humana',
    area: 'Talento Humano',
    location: 'Medellín',
    email: 'monica.restrepo@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=45',
  },
  {
    id: 'andrea-gonzalez',
    name: 'Andrea González',
    role: 'Líder de Comunicaciones',
    area: 'Comunicaciones',
    location: 'Medellín',
    email: 'andrea.gonzalez@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=44',
  },
  {
    id: 'hugo-munoz',
    name: 'Hugo Esneider Muñoz',
    role: 'Analista TI',
    area: 'Tecnología',
    location: 'Medellín',
    email: 'hugo.munoz@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=12',
    status: 'Vacaciones 7-11 abr',
  },
  {
    id: 'liliana-londono',
    name: 'Liliana María Londoño',
    role: 'Analista TI',
    area: 'Tecnología',
    location: 'Medellín',
    email: 'liliana.londono@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=47',
    status: 'Incapacidad corta',
  },
  {
    id: 'camilo-restrepo',
    name: 'Camilo Restrepo',
    role: 'Desarrollador Frontend',
    area: 'Tecnología',
    location: 'Medellín',
    email: 'camilo.restrepo@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=30',
  },
  {
    id: 'laura-giraldo',
    name: 'Laura Giraldo',
    role: 'Analista de Datos',
    area: 'Tecnología',
    location: 'Medellín',
    email: 'laura.giraldo@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=26',
  },
  {
    id: 'andres-mora',
    name: 'Andrés Felipe Mora',
    role: 'Soporte Aplicaciones',
    area: 'Tecnología',
    location: 'Medellín',
    email: 'andres.mora@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=61',
  },
  {
    id: 'carlos-vargas',
    name: 'Carlos Vargas',
    role: 'Operario de planta',
    area: 'GEF',
    location: 'Itagüí',
    email: 'carlos.vargas@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=15',
    status: 'Solicitó vacaciones',
  },
  {
    id: 'diana-rios',
    name: 'Diana Marcela Ríos',
    role: 'Jefe de Transformación',
    area: 'Estrategia',
    location: 'Medellín',
    email: 'diana.rios@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=21',
  },
  {
    id: 'santiago-ospina',
    name: 'Santiago Ospina',
    role: 'Jefe de Operaciones Digitales',
    area: 'Tecnología',
    location: 'Medellín',
    email: 'santiago.ospina@crystal.com.co',
    photo: 'https://i.pravatar.cc/160?img=54',
  },
];

export type BirthdayItem = { id: string; name: string; area: string; date: string; photo: string };

export const birthdays: BirthdayItem[] = [
  { id: 'b1', name: 'Laura Giraldo', area: 'Tecnología', date: '29 abr', photo: 'https://i.pravatar.cc/120?img=26' },
  { id: 'b2', name: 'Carlos Vargas', area: 'GEF', date: '2 may', photo: 'https://i.pravatar.cc/120?img=15' },
  { id: 'b3', name: 'Andrés Mora', area: 'Tecnología', date: '6 may', photo: 'https://i.pravatar.cc/120?img=61' },
  { id: 'b4', name: 'Mónica Restrepo', area: 'Talento Humano', date: '11 may', photo: 'https://i.pravatar.cc/120?img=45' },
];

export type NewHireItem = { id: string; name: string; role: string; area: string; startDate: string; photo: string };

export const newHires: NewHireItem[] = [
  {
    id: 'nh1',
    name: 'Sofía Bedoya',
    role: 'Diseñadora de Producto',
    area: 'Tecnología',
    startDate: 'Inició el 14 de abril',
    photo: 'https://i.pravatar.cc/120?img=49',
  },
  {
    id: 'nh2',
    name: 'Andrés Cárdenas',
    role: 'Coordinador de Cultura',
    area: 'Talento Humano',
    startDate: 'Inicia el 5 de mayo',
    photo: 'https://i.pravatar.cc/120?img=33',
  },
  {
    id: 'nh3',
    name: 'Valentina Suárez',
    role: 'Analista de Comunicaciones',
    area: 'Comunicaciones',
    startDate: 'Inicia el 12 de mayo',
    photo: 'https://i.pravatar.cc/120?img=48',
  },
];

export type ServiceCard = {
  id: string;
  title: string;
  body: string;
  tab: TabId;
  icon: LucideIcon;
  accent: string;
  meta: string;
  badge?: string;
};

export const servicesCatalog: ServiceCard[] = [
  {
    id: 'srv-payroll',
    title: 'Mi nómina',
    body: 'Colillas quincenales, aportes, cesantías y crédito al día.',
    tab: 'payroll',
    icon: Wallet,
    accent: 'from-emerald-400 via-emerald-500 to-emerald-700',
    meta: 'Próxima quincena: 30 abr',
    badge: 'Disponible',
  },
  {
    id: 'srv-certifications',
    title: 'Certificaciones',
    body: 'Carta laboral, certificado de ingresos y descargas frecuentes.',
    tab: 'certifications',
    icon: FileText,
    accent: 'from-violet-400 via-violet-500 to-indigo-600',
    meta: '3 documentos disponibles',
  },
  {
    id: 'srv-vacations',
    title: 'Vacaciones',
    body: 'Solicita días, sigue aprobaciones y planea con festivos.',
    tab: 'vacations',
    icon: Calendar,
    accent: 'from-sky-400 via-sky-500 to-blue-700',
    meta: '12 días disponibles',
    badge: '4 vencen pronto',
  },
  {
    id: 'srv-benefits',
    title: 'Beneficios',
    body: 'Campañas, descuentos y propósito que se inscriben.',
    tab: 'benefits',
    icon: Gift,
    accent: 'from-amber-400 via-orange-500 to-rose-500',
    meta: '2 campañas activas',
  },
  {
    id: 'srv-profile',
    title: 'Mi perfil',
    body: 'Actualiza datos, grupo familiar, estudios y experiencia.',
    tab: 'profile',
    icon: IdCard,
    accent: 'from-rose-400 via-pink-500 to-fuchsia-600',
    meta: '78% completado',
  },
  {
    id: 'srv-learning',
    title: 'Aprendizaje',
    body: 'Cursos internos y rutas de formación de la Escuela Crystal.',
    tab: 'comms',
    icon: GraduationCap,
    accent: 'from-indigo-400 via-indigo-500 to-violet-700',
    meta: 'Próximamente',
  },
];

export const servicesCatalogShort: ServiceCard[] = servicesCatalog.slice(0, 5);

export type CommandResult = {
  id: string;
  category: 'Personas' | 'Servicios' | 'Documentos' | 'Comunicaciones';
  label: string;
  hint: string;
  tab?: TabId;
  icon: LucideIcon;
};

export const commandSeed: CommandResult[] = [
  { id: 'p-bibiana', category: 'Personas', label: 'Bibiana Jaramillo', hint: 'Jefe de Tecnología · TI', tab: 'people', icon: Users },
  { id: 'p-ana', category: 'Personas', label: 'Ana Márquez', hint: 'Desarrollo Humano', tab: 'people', icon: Users },
  { id: 'p-andrea', category: 'Personas', label: 'Andrea González', hint: 'Comunicaciones', tab: 'people', icon: Users },
  { id: 'p-carlos', category: 'Personas', label: 'Carlos Vargas', hint: 'Operario · GEF Itagüí', tab: 'people', icon: Users },
  { id: 's-payroll', category: 'Servicios', label: 'Descargar colilla de nómina', hint: 'Quincena en curso', tab: 'payroll', icon: Wallet },
  { id: 's-cert', category: 'Servicios', label: 'Generar carta laboral', hint: 'Listo en segundos', tab: 'certifications', icon: FileText },
  { id: 's-vac', category: 'Servicios', label: 'Solicitar vacaciones', hint: 'Te quedan 12 días', tab: 'vacations', icon: Calendar },
  { id: 's-profile', category: 'Servicios', label: 'Actualizar mis datos', hint: 'Mi perfil', tab: 'profile', icon: IdCard },
  { id: 'd-cir', category: 'Documentos', label: 'Certificado de ingresos 2025', hint: 'Actualizado en marzo', tab: 'certifications', icon: Receipt },
  { id: 'd-pol', category: 'Documentos', label: 'Política de teletrabajo', hint: 'Vigente desde feb 2026', tab: 'policies', icon: BookMarked },
  { id: 'd-cod', category: 'Documentos', label: 'Código de ética Crystal', hint: 'Versión 3 · 2025', tab: 'policies', icon: ShieldCheck },
  { id: 'd-fvac', category: 'Documentos', label: 'Formato de solicitud de vacaciones', hint: 'PDF · Versión 4', tab: 'forms', icon: FileBox },
  { id: 'd-onb', category: 'Documentos', label: 'Proceso de onboarding', hint: 'Talento Humano', tab: 'processes', icon: Workflow },
  { id: 'd-inc', category: 'Documentos', label: 'Cómo registrar una incapacidad', hint: 'Procedimiento', tab: 'procedures', icon: ListChecks },
  { id: 'c-bienestar', category: 'Comunicaciones', label: 'Jornada de bienestar 8 mayo', hint: 'Inscripciones abiertas', tab: 'comms', icon: Salad },
  { id: 'c-lectura', category: 'Comunicaciones', label: 'Voluntariado lectura', hint: 'Sábado 17 mayo', tab: 'comms', icon: BookOpen },
  { id: 'c-cafe', category: 'Comunicaciones', label: 'Café con Bibiana', hint: '30 abril · auditorio', tab: 'comms', icon: Coffee },
];

export const assistantSuggestions = [
  { id: 'as1', label: '¿Cuándo me pagan la próxima quincena?', icon: Wallet },
  { id: 'as2', label: 'Solicítame vacaciones del 12 al 16 de mayo', icon: Calendar },
  { id: 'as3', label: 'Genérame mi carta laboral', icon: FileText },
  { id: 'as4', label: 'Inscríbeme en la jornada de bienestar', icon: Sparkles },
  { id: 'as5', label: '¿Quién es el líder de Comunicaciones?', icon: Users },
  { id: 'as6', label: 'Recuérdame los puentes festivos del semestre', icon: Compass },
];

export const cultureMoments = [
  {
    id: 'cm1',
    title: 'Reconocimiento mensual',
    body: 'Hugo y Liliana cierran el primer trimestre con el reto de soporte resuelto en menos de 24 h.',
    icon: Award,
    tone: 'from-amber-400 to-orange-500',
  },
  {
    id: 'cm2',
    title: 'Crystal verde',
    body: '320 prendas recuperadas en moda circular — superamos la meta del trimestre.',
    icon: Leaf,
    tone: 'from-emerald-400 to-emerald-600',
  },
  {
    id: 'cm3',
    title: 'Comunidad lectora',
    body: '47 colaboradores se inscribieron este mes en jornadas de lectura con niños.',
    icon: BookOpen,
    tone: 'from-sky-400 to-indigo-500',
  },
];

export type KnowledgeCategoryId = 'processes' | 'procedures' | 'forms' | 'policies';

export type KnowledgeItem = {
  id: string;
  title: string;
  area: string;
  updated: string;
  meta?: string;
};

export type KnowledgeCategory = {
  id: KnowledgeCategoryId;
  tab: TabId;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  badge: string;
  items: KnowledgeItem[];
};

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'processes',
    tab: 'processes',
    label: 'Procesos',
    description: 'Cómo funcionan las cosas en Crystal: flujos extremo a extremo y responsables.',
    icon: Workflow,
    accent: 'from-emerald-400 via-emerald-500 to-emerald-700',
    badge: 'End-to-end',
    items: [
      { id: 'p-onboarding', title: 'Onboarding de nuevos colaboradores', area: 'Talento Humano', updated: 'Actualizado 12 mar 2026' },
      { id: 'p-vacaciones', title: 'Solicitud y aprobación de vacaciones', area: 'Gestión Humana', updated: 'Actualizado 02 abr 2026' },
      { id: 'p-nomina', title: 'Cierre de nómina quincenal', area: 'Nómina', updated: 'Actualizado 10 mar 2026' },
      { id: 'p-evaluacion', title: 'Evaluación de desempeño anual', area: 'Desarrollo Humano', updated: 'Actualizado 28 ene 2026' },
      { id: 'p-movilidad', title: 'Movilidad interna y plan carrera', area: 'Talento Humano', updated: 'Actualizado 18 feb 2026' },
    ],
  },
  {
    id: 'procedures',
    tab: 'procedures',
    label: 'Procedimientos',
    description: 'Pasos concretos para resolver una situación específica del día a día.',
    icon: ListChecks,
    accent: 'from-sky-400 via-sky-500 to-blue-700',
    badge: 'Paso a paso',
    items: [
      { id: 'pr-incapacidad', title: 'Cómo registrar una incapacidad médica', area: 'Salud Ocupacional', updated: 'Actualizado 25 feb 2026' },
      { id: 'pr-prestamo', title: 'Cómo solicitar préstamo de libre inversión', area: 'Bienestar', updated: 'Actualizado 14 mar 2026' },
      { id: 'pr-incidente', title: 'Cómo reportar un incidente de seguridad', area: 'TI', updated: 'Actualizado 03 abr 2026' },
      { id: 'pr-dotacion', title: 'Cómo gestionar tu dotación de planta', area: 'GEF Itagüí', updated: 'Actualizado 05 mar 2026' },
      { id: 'pr-retenciones', title: 'Cómo descargar el certificado de ingresos y retenciones', area: 'Nómina', updated: 'Actualizado 22 ene 2026' },
    ],
  },
  {
    id: 'forms',
    tab: 'forms',
    label: 'Formatos',
    description: 'Plantillas listas para diligenciar y enviar a los equipos correspondientes.',
    icon: FileBox,
    accent: 'from-amber-400 via-orange-500 to-rose-500',
    badge: 'Descargables',
    items: [
      { id: 'f-vacaciones', title: 'Formato de solicitud de vacaciones', area: 'Gestión Humana', updated: 'PDF · Versión 4', meta: 'PDF' },
      { id: 'f-incapacidad', title: 'Formato de incapacidad médica', area: 'Salud Ocupacional', updated: 'PDF · Versión 2', meta: 'PDF' },
      { id: 'f-auxilio', title: 'Formato de auxilio educativo', area: 'Bienestar', updated: 'DOCX · Versión 3', meta: 'DOCX' },
      { id: 'f-cesantias', title: 'Formato de cesión de cesantías', area: 'Nómina', updated: 'PDF · Versión 5', meta: 'PDF' },
      { id: 'f-carta-noobjecion', title: 'Carta de no objeción', area: 'Talento Humano', updated: 'DOCX · Versión 2', meta: 'DOCX' },
    ],
  },
  {
    id: 'policies',
    tab: 'policies',
    label: 'Políticas',
    description: 'Las reglas claras que ordenan a Crystal y nos protegen como organización.',
    icon: BookMarked,
    accent: 'from-violet-400 via-violet-500 to-indigo-700',
    badge: 'Vigentes',
    items: [
      { id: 'po-teletrabajo', title: 'Política de teletrabajo', area: 'Talento Humano', updated: 'Vigente desde feb 2026' },
      { id: 'po-uniformes', title: 'Política de uso de uniformes', area: 'GEF', updated: 'Vigente desde ene 2025' },
      { id: 'po-etica', title: 'Código de ética Crystal', area: 'Compliance', updated: 'Versión 3 · 2025' },
      { id: 'po-seginfo', title: 'Política de seguridad de la información', area: 'TI', updated: 'Vigente desde mar 2026' },
      { id: 'po-bienestar', title: 'Política de bienestar y compensación', area: 'Bienestar', updated: 'Vigente desde dic 2025' },
    ],
  },
];

export const peopleHighlightsForLeader = [
  { icon: UserPlus, label: '3 nuevos ingresos en Tecnología este mes' },
  { icon: Cake, label: '4 cumpleaños esta semana' },
  { icon: Award, label: '2 personas postuladas a Líder cercano' },
];

export function getVisibleNavItems(role: RoleId) {
  return navItems.filter((item) => item.roles.includes(role));
}

export function parseStage(search: string): MaturityId {
  const params = new URLSearchParams(search);
  const raw = (params.get('v') ?? params.get('stage') ?? '').toLowerCase();

  if (raw === '2' || raw === 'assisted' || raw === 'asistido') return 'assisted';
  if (raw === '3' || raw === 'agentic' || raw === 'conversacional') return 'agentic';

  return 'human';
}

export function parseRole(search: string): RoleId {
  const params = new URLSearchParams(search);
  const raw = (params.get('role') ?? params.get('rol') ?? '').toLowerCase();

  if (raw === 'leader' || raw === 'lider' || raw === 'jefe') return 'leader';

  return 'collaborator';
}

const ALL_TAB_IDS: TabId[] = [
  'home',
  'comms',
  'people',
  'services',
  'knowledge',
  'processes',
  'procedures',
  'forms',
  'policies',
  'space',
  'payroll',
  'certifications',
  'vacations',
  'profile',
  'team',
  'benefits',
];

export function parseTab(search: string, role: RoleId): TabId {
  const params = new URLSearchParams(search);
  const raw = params.get('tab') as TabId | null;

  if (!raw || !ALL_TAB_IDS.includes(raw)) return 'home';
  if (raw === 'team' && role !== 'leader') return 'home';

  return raw;
}
