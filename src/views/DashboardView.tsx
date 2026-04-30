import { ArrowRight, Calendar, IdCard, MapPin, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  birthdays,
  featuredNews,
  newHires,
  peopleHighlightsForLeader,
  servicesCatalog,
} from '../data/portal';
import type { MaturityId, RoleId, TabId } from '../types/app';
import { cn } from '../lib/cn';

type DashboardViewProps = {
  role: RoleId;
  stage: MaturityId;
  onNavigate: (tab: TabId) => void;
};

const MIS_COSAS_PRIVATE = [
  {
    label: 'Próximo pago',
    headline: 'Lista la quincena',
    detail: '30 abr · descárgala en Mi nómina',
    tab: 'payroll' as TabId,
    icon: Wallet,
    tone: 'text-emerald-600',
  },
  {
    label: 'Vacaciones',
    headline: '12 días disponibles',
    detail: '4 vencen en mayo',
    tab: 'vacations' as TabId,
    icon: Calendar,
    tone: 'text-sky-600',
  },
  {
    label: 'Tu perfil',
    headline: '78% completado',
    detail: '2 secciones por terminar',
    tab: 'profile' as TabId,
    icon: IdCard,
    tone: 'text-rose-500',
  },
];

const SERVICES_HOME = servicesCatalog.filter((s) =>
  ['srv-payroll', 'srv-certifications', 'srv-vacations', 'srv-benefits'].includes(s.id),
);

export function DashboardView({ role, onNavigate }: DashboardViewProps) {
  const featuredHire = newHires[0];

  return (
    <div className="space-y-12">
      {/* Hero — campaña destacada, foto dominante */}
      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[32px] bg-slate-950 text-white shadow-[0_30px_90px_-40px_rgba(2,6,23,0.55)]"
      >
        <div
          className="aspect-[16/10] w-full bg-cover bg-center sm:aspect-[21/8] lg:aspect-[28/9]"
          style={{ backgroundImage: `url(${featuredNews.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-200">
            <span className="rounded-full bg-emerald-400/25 px-3 py-1 ring-1 ring-emerald-300/30 backdrop-blur-sm">
              {featuredNews.category}
            </span>
            <span className="drop-shadow">{featuredNews.eyebrow}</span>
          </div>
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold leading-[1.1] tracking-tight drop-shadow-lg sm:text-3xl lg:text-[2.25rem]">
            {featuredNews.title}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-200">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-emerald-300" />
              {featuredNews.date}
            </span>
            {featuredNews.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} className="text-emerald-300" />
                {featuredNews.location}
              </span>
            ) : null}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-black/20 transition-transform hover:scale-[1.02]">
              Inscríbete
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onNavigate('comms')}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Ver más comunicaciones
            </button>
          </div>
        </div>
      </motion.article>

      {/* Servicios */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Servicios</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              Tus trámites en pocos clics
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="hidden items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900 sm:inline-flex"
          >
            Ver todos <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_HOME.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                onClick={() => card.tab && onNavigate(card.tab)}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: i * 0.05 }}
                className={cn(
                  'group relative overflow-hidden rounded-[28px] bg-gradient-to-br p-6 text-left text-white shadow-lg shadow-slate-950/15',
                  card.accent,
                )}
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/15 backdrop-blur-sm">
                  <Icon size={18} />
                </div>
                <p className="relative mt-6 text-lg font-semibold tracking-tight">{card.title}</p>
                <p className="relative mt-1 text-xs leading-relaxed text-white/80">{card.body}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Personas — sección editorial con foto prominente */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Personas Crystal</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
              La gente que mueve a Crystal hoy
            </h2>
          </div>
          <button
            onClick={() => onNavigate('people')}
            className="hidden items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900 sm:inline-flex"
          >
            Ver directorio <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
          {/* Persona destacada — nuevo ingreso, horizontal en desktop */}
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col overflow-hidden rounded-[28px] bg-white shadow-lg shadow-slate-950/10 ring-1 ring-slate-200 sm:flex-row sm:items-stretch"
          >
            <div className="relative aspect-[4/5] sm:aspect-auto sm:w-2/5 sm:shrink-0">
              <img
                src={featuredHire.photo.replace('/120', '/600')}
                alt={featuredHire.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-white/0" />
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 sm:flex-1 sm:p-7">
              <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 ring-1 ring-emerald-100">
                Nueva en Crystal
              </span>
              <p className="text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-[1.6rem]">
                Bienvenida, {featuredHire.name.split(' ')[0]}.
              </p>
              <p className="text-sm text-slate-500">
                {featuredHire.role} · {featuredHire.area}
              </p>
              <p className="text-xs text-slate-400">{featuredHire.startDate}</p>
            </div>
          </motion.article>

          {/* Cumpleaños — cards grandes con respiro */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-rose-500">Cumpleaños cercanos</p>
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              {birthdays.slice(0, 4).map((b, i) => (
                <motion.article
                  key={b.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-[20px] bg-white p-3 ring-1 ring-slate-200 transition-shadow hover:shadow-md"
                >
                  <img
                    src={b.photo.replace('/120', '/240')}
                    alt={b.name}
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">{b.name}</p>
                    <p className="text-[11px] text-slate-500">{b.area}</p>
                    <p className="mt-1 inline-flex rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 ring-1 ring-rose-100">
                      {b.date}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mis cosas — slim, sin montos */}
      {role === 'collaborator' ? (
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Mis cosas</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                Lo que tienes pendiente
              </h2>
            </div>
            <button
              onClick={() => onNavigate('space')}
              className="hidden items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-900 sm:inline-flex"
            >
              Ir a Mi espacio <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {MIS_COSAS_PRIVATE.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.tab)}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 text-left transition-shadow hover:shadow-md"
                >
                  <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50', item.tone)}>
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{item.label}</p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-slate-950">{item.headline}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{item.detail}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Líder: atención */}
      {role === 'leader' ? (
        <section className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl shadow-slate-950/20 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">Atención del líder</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">Lo que requiere tu mirada esta semana</h3>
            </div>
            <button
              onClick={() => onNavigate('team')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver mi equipo <ArrowRight size={14} />
            </button>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {peopleHighlightsForLeader.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl bg-white/5 px-5 py-5 ring-1 ring-white/10">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                  <Icon size={16} />
                </span>
                <p className="text-sm leading-snug text-slate-200">{label}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
