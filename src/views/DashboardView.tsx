import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Cake, CalendarDays, Sparkles } from 'lucide-react';
import {
  birthdays,
  dimensions,
  featuredNews,
  intentChips,
  newHires,
  peopleHighlightsForLeader,
  servicesCatalog,
} from '../data/portal';
import type { TabId, ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { AssistantBar } from '../components/v3/Assistant';
import { Eyebrow, SectionHeading, StatNumber } from '../components/v3/ui';

const PENDIENTES = [
  { label: 'Vacaciones', value: 12, suffix: ' días', detail: '4 vencen en mayo', tab: 'vacations' as TabId },
  { label: 'Tu perfil', value: 78, suffix: '%', detail: '2 secciones por terminar', tab: 'profile' as TabId },
  { label: 'Próximo pago', value: 30, suffix: ' abr', detail: 'Desprendible en Mi nómina', tab: 'payroll' as TabId },
];

const HOME_SERVICES = servicesCatalog.filter((s) =>
  ['srv-payroll', 'srv-certifications', 'srv-vacations', 'srv-benefits'].includes(s.id),
);

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function DashboardView({ role, onNavigate }: ViewProps) {
  const hire = newHires[0];

  return (
    <div className="space-y-14">
      {/* 1 — HERO POR INTENCIÓN */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[34px] signature-grad p-6 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-[2] max-w-2xl">
          <Eyebrow className="text-white/70">Tu espacio · hoy</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.02] tracking-tightish text-balance sm:text-5xl">
            ¿Qué necesitas hoy?
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/80 sm:text-base">
            Resuelve, infórmate, encuentra, conecta y crece — sin aprenderte ningún sistema.
          </p>

          <div className="mt-6">
            <AssistantBar />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {intentChips.map((chip, i) => {
              const Icon = chip.icon;
              return (
                <motion.button
                  key={chip.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  onClick={() => onNavigate(chip.tab)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <Icon size={15} />
                  {chip.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 2 — PULSO DE CRYSTAL (campaña editorial) */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Pulso de Crystal"
          title="Lo que está vivo esta semana"
          actionLabel="Ver comunicaciones"
          onAction={() => onNavigate('comms')}
        />
        <article className="grain relative overflow-hidden rounded-[30px] bg-ink text-white shadow-lift">
          <div
            className="aspect-[16/10] w-full bg-cover bg-center sm:aspect-[21/8] lg:aspect-[26/9]"
            style={{ backgroundImage: `url(${featuredNews.cover})` }}
          />
          <div className="absolute inset-0" style={{ backgroundImage: 'var(--grad-ink)' }} />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ring-1 ring-white/20 backdrop-blur-sm">
              {featuredNews.category}
            </span>
            <h3 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-[1.08] text-balance drop-shadow sm:text-[2rem]">
              {featuredNews.title}
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]">
                Inscríbete <ArrowRight size={15} />
              </button>
              <span className="text-sm text-white/75">{featuredNews.date}</span>
            </div>
          </div>
        </article>
      </motion.section>

      {/* 3 — LAS 5 DIMENSIONES (la tesis hecha UI) */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Lo que cuidamos" title="Cinco dimensiones de tu vida en Crystal" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate(d.tab)}
                className={cn(
                  'group relative flex flex-col items-start gap-3 overflow-hidden rounded-[26px] bg-white p-6 text-left ring-1 ring-line transition-shadow hover:shadow-lift',
                  i === 0 && 'sm:col-span-2 lg:col-span-1',
                )}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-soft"
                  style={{ backgroundColor: d.accent }}
                >
                  <Icon size={22} />
                </span>
                <p className="font-display text-xl font-semibold tracking-tightish text-ink">{d.name}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{d.tagline}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {d.examples.slice(0, 3).map((ex) => (
                    <span key={ex} className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-medium text-ink-soft">
                      {ex}
                    </span>
                  ))}
                </div>
                <ArrowUpRight
                  size={18}
                  className="absolute right-5 top-5 text-ink-mute opacity-0 transition-opacity group-hover:opacity-100"
                />
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* 4 — RESOLVER RÁPIDO (self-service, sin montos) */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Resolver"
          title="Tus trámites, en segundos"
          actionLabel="Ver todos"
          onAction={() => onNavigate('services')}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate(s.tab)}
                className="group flex flex-col items-start gap-4 rounded-[24px] bg-white p-5 text-left ring-1 ring-line transition-shadow hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-paper-2 text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                  <Icon size={19} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{s.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">{s.meta}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* 5 — COMUNIDAD VIVA */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Comunidad"
          title="La gente que mueve a Crystal"
          actionLabel="Ver directorio"
          onAction={() => onNavigate('people')}
        />
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <article className="relative flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-line shadow-soft sm:flex-row">
            <div className="relative sm:w-2/5">
              <img src={hire.photo.replace('/120', '/600')} alt={hire.name} className="h-56 w-full object-cover sm:h-full" />
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 sm:flex-1">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 ring-1 ring-emerald-100">
                <Sparkles size={12} /> Nueva en Crystal
              </span>
              <p className="font-display text-2xl font-semibold leading-tight tracking-tightish text-ink">
                Bienvenida, {hire.name.split(' ')[0]}.
              </p>
              <p className="text-sm text-ink-soft">{hire.role} · {hire.area}</p>
              <p className="text-xs text-ink-mute">{hire.startDate}</p>
            </div>
          </article>

          <div className="flex flex-col gap-3">
            <Eyebrow className="flex items-center gap-1.5 text-rose-500">
              <Cake size={13} /> Cumpleaños cercanos
            </Eyebrow>
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              {birthdays.slice(0, 4).map((b) => (
                <article
                  key={b.id}
                  className="flex items-center gap-3 rounded-[20px] bg-white p-3 ring-1 ring-line transition-shadow hover:shadow-soft"
                >
                  <img src={b.photo.replace('/120', '/240')} alt={b.name} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{b.name}</p>
                    <p className="truncate text-[11px] text-ink-mute">{b.area}</p>
                    <p className="mt-1 inline-flex rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">{b.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6 — MIS COSAS (colaborador, sin salario) */}
      {role === 'collaborator' ? (
        <motion.section {...fade}>
          <SectionHeading
            eyebrow="Mis cosas"
            title="Lo que tienes pendiente"
            actionLabel="Ir a Mi espacio"
            onAction={() => onNavigate('space')}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {PENDIENTES.map((p) => (
              <button
                key={p.label}
                onClick={() => onNavigate(p.tab)}
                className="flex flex-col gap-1 rounded-[22px] bg-white px-5 py-5 text-left ring-1 ring-line transition-shadow hover:shadow-soft"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">{p.label}</p>
                <p className="font-display text-3xl font-semibold tracking-tightish text-ink">
                  <StatNumber value={p.value} suffix={p.suffix} />
                </p>
                <p className="text-xs text-ink-soft">{p.detail}</p>
              </button>
            ))}
          </div>
        </motion.section>
      ) : null}

      {/* 7 — ATENCIÓN DEL LÍDER */}
      {role === 'leader' ? (
        <motion.section {...fade} className="grain overflow-hidden rounded-[30px] bg-ink p-7 text-white shadow-lift sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="text-gef-glow">Atención del líder</Eyebrow>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tightish">Lo que requiere tu mirada</h3>
            </div>
            <button
              onClick={() => onNavigate('team')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              Ver mi equipo <ArrowRight size={14} />
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {peopleHighlightsForLeader.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl bg-white/5 px-5 py-5 ring-1 ring-white/10">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gef-glow">
                  <Icon size={16} />
                </span>
                <p className="text-sm leading-snug text-white/85">{label}</p>
              </div>
            ))}
          </div>
        </motion.section>
      ) : null}

      <footer className="flex items-center gap-2 pt-2 text-xs text-ink-mute">
        <CalendarDays size={13} />
        Espacio Crystal · prototipo v3 · experiencia digital del empleado
      </footer>
    </div>
  );
}
