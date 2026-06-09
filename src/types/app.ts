import type { LucideIcon } from 'lucide-react';

/** Vistas. */
export type ViewId = 'login' | 'home' | 'space';

/** Tipo de servicio. */
export type ServiceKind = 'visualizacion' | 'descarga' | 'consulta';

/** De dónde sale el dato/contenido. */
export type Fuente = 'nomina' | 'contenido' | 'mensajeria';

export type SegmentPerfil = 'operativo' | 'administrativo';

export type Segment = {
  perfil: SegmentPerfil;
  sede: string;
};

export type ViewProps = {
  segment: Segment;
  onNavigate: (view: ViewId) => void;
  onOpenSearch: () => void;
  onOpenService: (id: string) => void;
};

export type EspacioService = {
  id: string;
  title: string;
  kind: ServiceKind;
  fuente: Fuente;
  icon: LucideIcon;
  /** Resumen corto en la tarjeta (ej. "12 días", "$8.450.000"). */
  value?: string;
  detail: string;
  /** Solo para visualización: número animado. */
  stat?: { value: number; suffix?: string };
  /** Para descargas: formato. */
  format?: string;
  /** Segmento al que aplica (si vacío, aplica a todos). */
  soloPerfil?: SegmentPerfil;
};
