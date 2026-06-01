import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowRight,
  CalendarCheck2,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  PartyPopper,
  Sparkles,
} from 'lucide-react';
import { vacationMoments } from '../data/portal';
import { cn } from '../lib/cn';
import type { ViewProps } from '../types/app';
import { Eyebrow, SectionHeading, StatNumber, Tag } from '../components/v3/ui';

/** Saldo de vacaciones (días, no montos — privacidad). */
const BALANCE = {
  available: 12,
  used: 13,
  expiring: 4,
};
const TOTAL = BALANCE.available + BALANCE.used;
const USED_PCT = Math.round((BALANCE.used / TOTAL) * 100);

type RequestStatus = 'review' | 'approved' | 'taken';

const STATUS_STYLE: Record<RequestStatus, { label: string; tag: string }> = {
  review: { label: 'En aprobación', tag: 'bg-amber-50 text-amber-700 ring-amber-100' },
  approved: { label: 'Aprobadas', tag: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  taken: { label: 'Tomadas', tag: 'bg-paper-2 text-ink-soft ring-line' },
};

type VacationRequest = {
  id: string;
  range: string;
  days: number;
  status: RequestStatus;
  note: string;
};

const REQUESTS: VacationRequest[] = [
  { id: 'req-active', range: '14 — 18 jul 2026', days: 5, status: 'review', note: 'Esperando visto bueno de tu líder' },
  { id: 'req-1', range: '14 — 18 abr 2026', days: 5, status: 'approved', note: 'Confirmadas por talento humano' },
  { id: 'req-2', range: '16 — 20 dic 2025', days: 5, status: 'taken', note: 'Receso de fin de año' },
  { id: 'req-3', range: '7 — 9 ago 2025', days: 3, status: 'taken', note: 'Puente de mitad de año' },
];

const REQUEST_STEPS = ['Enviada', 'Líder', 'Confirmada'] as const;
const ACTIVE_STEP = 1; // índice en revisión del líder

type Holiday = { date: string; name: string; bridge: boolean };

const HOLIDAYS: Holiday[] = [
  { date: 'Jun 22', name: 'Sagrado Corazón', bridge: true },
  { date: 'Jun 29', name: 'San Pedro y San Pablo', bridge: true },
  { date: 'Jul 20', name: 'Día de la Independencia', bridge: false },
  { date: 'Ago 7', name: 'Batalla de Boyacá', bridge: false },
  { date: 'Ago 18', name: 'Asunción de la Virgen', bridge: true },
  { date: 'Oct 13', name: 'Día de la Raza', bridge: true },
];

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function VacationsView({ onNavigate }: ViewProps) {
  function handleRequest() {
    toast.success('Solicitud lista para enviar', {
      description: 'Elige tus fechas y la enviamos a tu líder en un par de toques.',
    });
  }

  function handleBlockBridges() {
    toast('Puentes festivos marcados', {
      description: 'Los dejamos como referencia para que planees tus días.',
    });
  }

  const activeRequest = REQUESTS[0];

  return (
    <div className="space-y-12">
      {/* 1 — HERO: SALDO DE DÍAS */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[34px] signature-grad p-6 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-[2] grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Eyebrow className="text-white/70">Tus vacaciones · 2026</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.02] tracking-tightish sm:text-5xl">
              Tienes{' '}
              <span className="signature-text">
                <StatNumber value={BALANCE.available} suffix=" días" />
              </span>{' '}
              para descansar
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">
              Llevas <StatNumber value={BALANCE.used} suffix=" de" /> {TOTAL} días tomados este año. Planea con tiempo y
              combina tus descansos con los puentes que vienen.
            </p>

            {/* Barra de progreso días usados / disponibles */}
            <div className="mt-6 max-w-sm">
              <div className="flex h-3 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-3 bg-white/45"
                  initial={{ width: 0 }}
                  animate={{ width: `${USED_PCT}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <motion.div
                  className="h-3 bg-gef-glow"
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - USED_PCT}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-white/70">
                <span>Usados</span>
                <span className="text-gef-glow">Disponibles</span>
              </div>
            </div>

            <button
              onClick={handleRequest}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-soft transition-transform hover:scale-[1.02]"
            >
              <CalendarPlus size={16} /> Solicitar vacaciones
            </button>
          </div>

          {/* Tarjeta de días por vencer */}
          {BALANCE.expiring > 0 ? (
            <div className="rounded-[26px] bg-white/12 p-6 ring-1 ring-white/20 backdrop-blur-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-300/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100 ring-1 ring-amber-200/30">
                <Clock3 size={12} /> Por vencer
              </span>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tightish">
                <StatNumber value={BALANCE.expiring} suffix=" días" />
              </p>
              <p className="mt-2 text-sm text-white/80">
                Vencen antes de junio. Un buen momento para tomar un descanso corto.
              </p>
            </div>
          ) : null}
        </div>
      </motion.section>

      {/* 2 — CÓMO FUNCIONA (vacationMoments) */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Cómo funciona" title="Pedir días, sin vueltas" />
        <div className="grid gap-4 sm:grid-cols-3">
          {vacationMoments.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.article
                key={m.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col items-start gap-3 rounded-[24px] bg-white p-6 ring-1 ring-line shadow-soft"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Icon size={20} />
                </span>
                <p className="font-display text-lg font-semibold tracking-tightish text-ink">{m.title}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{m.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* 3 — SOLICITUDES */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Tus solicitudes"
          title="Estado de tus días"
          actionLabel="Solicitar nuevas"
          onAction={handleRequest}
        />
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          {/* Solicitud activa con timeline */}
          <article className="relative overflow-hidden rounded-[28px] bg-white p-6 ring-1 ring-line shadow-soft sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <Eyebrow>Solicitud activa</Eyebrow>
              <Tag className={STATUS_STYLE[activeRequest.status].tag}>{STATUS_STYLE[activeRequest.status].label}</Tag>
            </div>
            <p className="mt-4 font-display text-2xl font-semibold tracking-tightish text-ink">{activeRequest.range}</p>
            <p className="mt-1 text-sm text-ink-soft">
              {activeRequest.days} días · {activeRequest.note}
            </p>

            <div className="mt-6 flex gap-2">
              {REQUEST_STEPS.map((step, i) => (
                <div key={step} className="flex-1">
                  <motion.div
                    className={cn(
                      'h-1.5 rounded-full',
                      i < ACTIVE_STEP ? 'bg-gef-green' : i === ACTIVE_STEP ? 'bg-amber-400' : 'bg-paper-2',
                    )}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                  />
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-mute">{step}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleRequest}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
            >
              <CalendarPlus size={16} /> Solicitar nuevas vacaciones
            </button>
          </article>

          {/* Historial */}
          <article className="rounded-[28px] bg-white p-6 ring-1 ring-line shadow-soft sm:p-7">
            <div className="flex items-center gap-2">
              <CalendarCheck2 size={16} className="text-ink-mute" />
              <Eyebrow>Historial reciente</Eyebrow>
            </div>
            <div className="mt-4 space-y-2">
              {REQUESTS.slice(1).map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 transition-colors odd:bg-paper-2/60 hover:bg-paper-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{r.range}</p>
                    <p className="truncate text-xs text-ink-soft">
                      {r.days} días · {r.note}
                    </p>
                  </div>
                  <Tag className={cn('shrink-0', STATUS_STYLE[r.status].tag)}>{STATUS_STYLE[r.status].label}</Tag>
                </div>
              ))}
            </div>
          </article>
        </div>
      </motion.section>

      {/* 4 — PRÓXIMOS FESTIVOS */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Para planear"
          title="Próximos festivos en Colombia"
          actionLabel="Marcar puentes"
          onAction={handleBlockBridges}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HOLIDAYS.map((h, i) => {
            const [month, day] = h.date.split(' ');
            return (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex items-center gap-4 rounded-[22px] bg-white p-4 ring-1 ring-line transition-shadow hover:shadow-soft"
              >
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-ink text-white">
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">{month}</span>
                  <span className="font-display text-lg font-semibold leading-none">{day}</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{h.name}</p>
                  {h.bridge ? (
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gef-green">
                      <Sparkles size={12} /> Puente festivo
                    </span>
                  ) : (
                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-ink-mute">
                      <CheckCircle2 size={12} /> Festivo nacional
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* 5 — CIERRE */}
      <motion.section
        {...fade}
        className="grain flex flex-col items-start gap-4 overflow-hidden rounded-[28px] bg-ink p-7 text-white shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-9"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gef-glow">
            <PartyPopper size={22} />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tightish">¿Te animas a planear el semestre?</h3>
            <p className="mt-1 max-w-md text-sm text-white/75">
              Revisa tus días por vencer y combínalos con los próximos puentes para descansar mejor.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('space')}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
        >
          Ir a Mi espacio <ArrowRight size={14} />
        </button>
      </motion.section>
    </div>
  );
}
