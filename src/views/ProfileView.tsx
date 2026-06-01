import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Pencil,
  Sparkles,
} from 'lucide-react';
import { additionalInfoCategories, profileSections, roleMeta } from '../data/portal';
import type { ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { Eyebrow, SectionHeading, StatNumber, Tag } from '../components/v3/ui';

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

/** Estado de cada sección → progreso y semántica visual. */
const SECTION_STATE: Record<
  string,
  { complete: boolean; pct: number; tint: string; iconTint: string }
> = {
  Completo: {
    complete: true,
    pct: 100,
    tint: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    iconTint: 'bg-emerald-50 text-emerald-600',
  },
  'Pendiente 1 dato': {
    complete: false,
    pct: 75,
    tint: 'bg-amber-50 text-amber-700 ring-amber-100',
    iconTint: 'bg-amber-50 text-amber-600',
  },
  Actualizar: {
    complete: false,
    pct: 60,
    tint: 'bg-amber-50 text-amber-700 ring-amber-100',
    iconTint: 'bg-amber-50 text-amber-600',
  },
};

const FALLBACK_STATE = SECTION_STATE['Actualizar'];

export function ProfileView({ role, onNavigate }: ViewProps) {
  const profile = roleMeta[role];

  const completedCount = profileSections.filter(
    (s) => (SECTION_STATE[s.status] ?? FALLBACK_STATE).complete,
  ).length;
  const pendingCount = profileSections.length - completedCount;
  const completionPct = Math.round(
    profileSections.reduce((acc, s) => acc + (SECTION_STATE[s.status] ?? FALLBACK_STATE).pct, 0) /
      profileSections.length,
  );
  const initials = profile.employeeName
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

  const ringCircumference = 2 * Math.PI * 42;

  return (
    <div className="space-y-12">
      {/* 1 — IDENTIDAD + AVANCE (hero firma) */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[34px] signature-grad p-6 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-[2] flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-white/15 font-display text-2xl font-semibold uppercase ring-1 ring-white/25 backdrop-blur-sm">
              {initials}
            </span>
            <div className="min-w-0">
              <Eyebrow className="text-white/70">Mi perfil</Eyebrow>
              <h2 className="mt-2 font-display text-3xl font-semibold leading-[1.02] tracking-tightish text-balance sm:text-[2.6rem]">
                {profile.employeeName}
              </h2>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80">
                <span>{profile.jobTitle}</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} /> {profile.location}
                </span>
              </p>
            </div>
          </div>

          {/* Anillo de completitud */}
          <div className="flex shrink-0 items-center gap-5 rounded-[26px] bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-sm">
            <div className="relative grid h-24 w-24 place-items-center">
              <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="9" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  initial={{ strokeDashoffset: ringCircumference }}
                  animate={{ strokeDashoffset: ringCircumference * (1 - completionPct / 100) }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                />
              </svg>
              <span className="absolute font-display text-xl font-semibold tracking-tightish">
                <StatNumber value={completionPct} suffix="%" />
              </span>
            </div>
            <div className="max-w-[10rem]">
              <p className="text-sm font-semibold">Tu perfil al día</p>
              <p className="mt-1 text-xs leading-relaxed text-white/75">
                {pendingCount > 0
                  ? `Faltan ${pendingCount} ${pendingCount === 1 ? 'sección' : 'secciones'} por completar.`
                  : 'Todo completo. Gracias por mantenerlo al día.'}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2 — SECCIONES DE DATOS */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Tus datos"
          title="Lo que Crystal sabe de ti"
          actionLabel="Ir a Mi espacio"
          onAction={() => onNavigate('space')}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {profileSections.map((section, i) => {
            const Icon = section.icon;
            const state = SECTION_STATE[section.status] ?? FALLBACK_STATE;
            return (
              <motion.button
                key={section.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col gap-4 rounded-[26px] bg-white p-6 text-left ring-1 ring-line transition-shadow hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                      state.iconTint,
                    )}
                  >
                    <Icon size={20} />
                  </span>
                  {state.complete ? (
                    <Tag className={state.tint}>
                      <CheckCircle2 size={12} /> Completo
                    </Tag>
                  ) : (
                    <Tag className={state.tint}>
                      <AlertCircle size={12} /> {section.status}
                    </Tag>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold tracking-tightish text-ink">
                    {section.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{section.detail}</p>
                </div>

                {/* Barra de completitud por sección */}
                <div className="mt-auto space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-ink-mute">
                    <span>Completitud</span>
                    <StatNumber value={state.pct} suffix="%" />
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-paper-2">
                    <motion.div
                      className={cn(
                        'h-1.5 rounded-full',
                        state.complete ? 'bg-gef-green' : 'bg-amber-400',
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${state.pct}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 + i * 0.07 }}
                    />
                  </div>
                  <span className="inline-flex items-center gap-1 pt-1 text-xs font-semibold text-ink-soft transition-colors group-hover:text-ink">
                    <Pencil size={12} />
                    {state.complete ? 'Revisar y editar' : 'Completar ahora'}
                    <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* 3 — INFORMACIÓN ADICIONAL */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Tu historia en Crystal" title="Información adicional" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {additionalInfoCategories.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="flex flex-col gap-2 rounded-[22px] bg-white p-5 ring-1 ring-line transition-shadow hover:shadow-soft"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">
                {item.label}
              </p>
              <p className="font-display text-base font-semibold tracking-tightish text-ink">
                {item.count}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 4 — INVITACIÓN A MANTENER EL PERFIL VIVO */}
      <motion.section
        {...fade}
        className="grain overflow-hidden rounded-[30px] bg-ink p-7 text-white shadow-lift sm:p-9"
      >
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="max-w-xl">
            <Eyebrow className="flex items-center gap-1.5 text-gef-glow">
              <Sparkles size={13} /> Mantenlo vivo
            </Eyebrow>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tightish">
              Un perfil al día abre puertas dentro de Crystal
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Tus estudios, experiencia y grupo familiar alimentan procesos de movilidad interna,
              beneficios y acompañamiento. Solo toma un par de minutos.
            </p>
          </div>
          <button
            onClick={() => onNavigate('space')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
          >
            Completar mi perfil <ArrowRight size={15} />
          </button>
        </div>
      </motion.section>
    </div>
  );
}
