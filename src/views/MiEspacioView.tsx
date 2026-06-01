import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Coffee,
  HandHeart,
  Heart,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  personalSpaces,
  profileSections,
  roleMeta,
  summaryItems,
} from '../data/portal';
import type { ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { Eyebrow, SectionHeading, StatNumber } from '../components/v3/ui';

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

/** Acentos suaves por dimensión para las tarjetas de pendientes. */
const SUMMARY_ACCENTS = [
  'bg-emerald-50 text-emerald-700 ring-emerald-100',
  'bg-indigo-50 text-indigo-700 ring-indigo-100',
  'bg-amber-50 text-amber-700 ring-amber-100',
] as const;

/** Lee una métrica numérica al inicio de un texto (ej. "78%" → 78). Sin match, no anima. */
function leadingNumber(value: string): { n: number; suffix: string } | null {
  const match = value.match(/^(\d+)\s*(.*)$/);
  if (!match) return null;
  return { n: Number(match[1]), suffix: match[2] ? ` ${match[2].trim()}` : '' };
}

export function MiEspacioView({ role, onNavigate }: ViewProps) {
  const profile = roleMeta[role];
  const space = personalSpaces[role];
  const Companion = space.companionIcon;
  const completion = 78;
  const items = summaryItems[role];

  return (
    <div className="space-y-12 sm:space-y-14">
      {/* 1 — CABECERA PERSONAL (cover ambiente) */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[34px] signature-grad p-6 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-gef-glow/20 blur-3xl" />

        <div className="relative z-[2]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={role === 'leader' ? 'https://i.pravatar.cc/200?img=32' : 'https://i.pravatar.cc/200?img=15'}
                alt={profile.employeeName}
                className="h-16 w-16 shrink-0 rounded-[20px] object-cover shadow-soft ring-2 ring-white/40"
              />
              <div>
                <Eyebrow className="text-white/70">{space.coverLabel}</Eyebrow>
                <h2 className="mt-1.5 font-display text-3xl font-semibold leading-[1.02] tracking-tightish sm:text-4xl">
                  {profile.employeeName.split(' ')[0]}, este lugar es tuyo.
                </h2>
                <p className="mt-1 text-sm text-white/80">
                  {profile.jobTitle} · {profile.location}
                </p>
              </div>
            </div>

            {/* Ritual del día */}
            <div className="flex max-w-xs items-start gap-3 rounded-2xl bg-white/12 px-4 py-3.5 ring-1 ring-white/20 backdrop-blur-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Coffee size={16} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Tu ritual</p>
                <p className="mt-0.5 text-sm leading-snug text-white/90">{space.ritual}</p>
              </div>
            </div>
          </div>

          <p className="mt-7 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            {space.ambientBody}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {space.memoryChips.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm"
              >
                <Heart size={12} className="text-gef-glow" />
                {chip}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 2 — LO QUE TIENES PENDIENTE (sin montos de salario) */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Tus pendientes"
          title="Lo que tienes abierto hoy"
          actionLabel="Ver todos los servicios"
          onAction={() => onNavigate('services')}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            const accent = SUMMARY_ACCENTS[i % SUMMARY_ACCENTS.length];
            // CONSTRAINT: nómina no muestra cifra — solo detalle + acción.
            const isPayroll = item.tab === 'payroll';
            const metric = !isPayroll ? leadingNumber(item.value) : null;

            return (
              <motion.button
                key={`${item.tab}-${item.title}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate(item.tab)}
                className="group flex flex-col items-start gap-4 rounded-[24px] bg-white p-6 text-left ring-1 ring-line transition-shadow hover:shadow-lift"
              >
                <span className={cn('flex h-11 w-11 items-center justify-center rounded-2xl ring-1', accent)}>
                  <Icon size={19} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">{item.title}</p>
                  {isPayroll ? (
                    <p className="mt-1 font-display text-xl font-semibold leading-tight tracking-tightish text-ink">
                      Ábrelo en Mi nómina
                    </p>
                  ) : metric ? (
                    <p className="mt-1 font-display text-3xl font-semibold tracking-tightish text-ink">
                      <StatNumber value={metric.n} suffix={metric.suffix} />
                    </p>
                  ) : (
                    <p className="mt-1 font-display text-xl font-semibold leading-tight tracking-tightish text-ink">
                      {item.value}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{item.detail}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-gef-green opacity-0 transition-opacity group-hover:opacity-100">
                  Abrir <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* 3 — TU INFORMACIÓN PERSONAL (perfil) */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Tu perfil"
          title="Tu información, al día"
          actionLabel="Ir a mi perfil"
          onAction={() => onNavigate('profile')}
        />

        {/* Barra de avance del perfil */}
        <div className="mb-5 flex flex-col gap-3 rounded-[22px] bg-white p-5 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">Perfil al día</p>
            <p className="mt-1 text-sm text-ink-soft">Faltan 2 secciones para completarlo del todo.</p>
          </div>
          <div className="flex items-center gap-3 sm:shrink-0">
            <p className="font-display text-2xl font-semibold tracking-tightish text-ink">
              <StatNumber value={completion} suffix="%" />
            </p>
            <div className="h-1.5 w-36 overflow-hidden rounded-full bg-paper-2 sm:w-44">
              <motion.div
                className="h-full rounded-full bg-gef-green"
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {profileSections.map((section, i) => {
            const Icon = section.icon;
            const isComplete = section.status === 'Completo';
            return (
              <motion.button
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-4 rounded-[24px] bg-white p-5 text-left ring-1 ring-line transition-shadow hover:shadow-lift"
              >
                <span
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
                    isComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600',
                  )}
                >
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{section.title}</p>
                  <p className="mt-0.5 truncate text-sm text-ink-soft">{section.detail}</p>
                </div>
                <span className="shrink-0">
                  {isComplete ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 ring-1 ring-amber-100">
                      <AlertCircle size={12} className="text-amber-600" />
                      <span className="text-[11px] font-semibold text-amber-700">{section.status}</span>
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* 4 — ANCLAS EMOCIONALES: compañera del día + causa */}
      <motion.section {...fade} className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        {/* Compañera / intención del día */}
        <article className="grain relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-ink p-7 text-white shadow-lift sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gef-glow/20 blur-3xl" />
          <div className="relative z-[2]">
            <Eyebrow className="text-gef-glow">{space.companionLabel}</Eyebrow>
            <span className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gef-glow ring-1 ring-white/15">
              <Companion size={26} />
            </span>
          </div>
          <p className="relative z-[2] mt-6 max-w-sm font-display text-xl font-semibold leading-snug tracking-tightish text-white">
            {space.ambientTitle}
          </p>
        </article>

        {/* Causa / voluntariado */}
        <article className="relative flex flex-col overflow-hidden rounded-[28px] bg-white p-7 ring-1 ring-line shadow-soft sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <Eyebrow className="flex items-center gap-1.5 text-violet-600">
              <Sparkles size={13} /> Propósito
            </Eyebrow>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <HandHeart size={19} />
            </span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tightish text-ink">
            {space.causeTitle}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{space.causeBody}</p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1.5 text-sm font-semibold text-violet-700 ring-1 ring-violet-100">
              <Heart size={13} /> {space.causeMetric}
            </p>
            <button
              onClick={() => toast.success('Te avisaremos cuando abra la próxima jornada.')}
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
            >
              Quiero participar
              <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </article>
      </motion.section>
    </div>
  );
}
