import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ArrowRight, Check, HeartPulse, Sparkles, Users } from 'lucide-react';
import { benefitCards, purposeMoments } from '../data/portal';
import type { ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { Eyebrow, SectionHeading, StatNumber } from '../components/v3/ui';

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

/** Tres lentes con que Crystal lee el bienestar: cuerpo, comunidad y cultura. */
const LENSES = [
  {
    id: 'bienestar',
    eyebrow: 'Cuidarte',
    title: 'Bienestar',
    body: 'Descanso, autocuidado y salud emocional como parte del trabajo, no como un extra.',
    icon: HeartPulse,
    accent: '#37B34A',
  },
  {
    id: 'comunidad',
    eyebrow: 'Pertenecer',
    title: 'Comunidad',
    body: 'Voluntariados, encuentros y causas donde tu tiempo deja huella en otras personas.',
    icon: Users,
    accent: '#0E7490',
  },
  {
    id: 'cultura',
    eyebrow: 'Crecer juntos',
    title: 'Cultura',
    body: 'Rituales, retos y experiencias que hacen propio el orgullo de ser Crystal.',
    icon: Sparkles,
    accent: '#7C3AED',
  },
] as const;

const IMPACT = [
  { label: 'Personas activas en campañas', value: 218, suffix: '' },
  { label: 'Horas de voluntariado este año', value: 1140, suffix: ' h' },
  { label: 'Iniciativas con propósito vivas', value: 9, suffix: '' },
];

export function BenefitsView({ onNavigate }: ViewProps) {
  const enroll = (label: string) =>
    toast.success(`Te inscribiste en ${label}`, {
      description: 'Te enviaremos los detalles y recordatorios a tu correo Crystal.',
    });

  return (
    <div className="space-y-14">
      {/* 1 — HERO: beneficios como propósito */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[34px] signature-grad p-6 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-[2] max-w-2xl">
          <Eyebrow className="text-white/70">Beneficios · con propósito</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.02] tracking-tightish text-balance sm:text-5xl">
            No son perks. Son formas de cuidarte y de cuidar a los demás.
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/80 sm:text-base">
            Cada beneficio y cada campaña existe para sumar a tu bienestar, a la comunidad Crystal y a
            la cultura que construimos juntos.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {LENSES.map((lens, i) => {
              const Icon = lens.icon;
              return (
                <motion.span
                  key={lens.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm"
                >
                  <Icon size={15} />
                  {lens.title}
                </motion.span>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 2 — TRES LENTES DE BIENESTAR */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Cómo lo cuidamos" title="Tres maneras de estar bien en Crystal" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LENSES.map((lens, i) => {
            const Icon = lens.icon;
            return (
              <motion.article
                key={lens.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col items-start gap-3 rounded-[26px] bg-white p-6 ring-1 ring-line shadow-soft"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-soft"
                  style={{ backgroundColor: lens.accent }}
                >
                  <Icon size={22} />
                </span>
                <Eyebrow>{lens.eyebrow}</Eyebrow>
                <p className="font-display text-xl font-semibold tracking-tightish text-ink">{lens.title}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{lens.body}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* 3 — BENEFICIOS DESTACADOS (inscribibles) */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Para ti"
          title="Beneficios vivos esta temporada"
          actionLabel="Ver comunicaciones"
          onAction={() => onNavigate('comms')}
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {benefitCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={cn(
                  'grain relative flex flex-col justify-between gap-8 overflow-hidden rounded-[28px] bg-gradient-to-br p-7 text-white shadow-soft transition-shadow hover:shadow-lift sm:p-9',
                  card.gradient,
                )}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-6 left-1/3 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <Icon size={22} />
                  </span>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                    {card.title}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tightish text-balance">
                    {card.subtitle}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">{card.body}</p>
                </div>
                <button
                  onClick={() => enroll(card.subtitle)}
                  className="relative inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-soft transition-transform hover:scale-[1.02]"
                >
                  {card.cta}
                  <ArrowRight size={16} />
                </button>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* 4 — CAMPAÑAS CON PROPÓSITO (inscribibles) */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Propósito y bienestar" title="Campañas donde tu tiempo deja huella" />
        <div className="grid gap-4 lg:grid-cols-3">
          {purposeMoments.map(({ title, body, metric, icon: CardIcon }, i) => {
            const numericMetric = parseInt(metric, 10);
            const metricSuffix = Number.isNaN(numericMetric)
              ? null
              : metric.slice(String(numericMetric).length);
            return (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="flex flex-col gap-4 rounded-[26px] bg-white p-6 ring-1 ring-line shadow-soft transition-shadow hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <CardIcon size={20} />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold tracking-tightish text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {metricSuffix !== null ? (
                    <span>
                      <StatNumber value={numericMetric} suffix={metricSuffix} />
                    </span>
                  ) : (
                    <span>{metric}</span>
                  )}
                </div>
                <button
                  onClick={() => enroll(title)}
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-gef-green"
                >
                  Inscribirme
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* 5 — IMPACTO COLECTIVO */}
      <motion.section
        {...fade}
        className="grain overflow-hidden rounded-[30px] bg-ink p-7 text-white shadow-lift sm:p-9"
      >
        <Eyebrow className="text-gef-glow">Impacto colectivo</Eyebrow>
        <h3 className="mt-2 max-w-xl font-display text-2xl font-semibold tracking-tightish">
          Lo que logramos cuando nos sumamos
        </h3>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {IMPACT.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/5 px-5 py-5 ring-1 ring-white/10">
              <p className="font-display text-3xl font-semibold tracking-tightish text-gef-glow">
                <StatNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1.5 flex items-start gap-1.5 text-sm leading-snug text-white/80">
                <Check size={14} className="mt-0.5 shrink-0 text-gef-glow" />
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
