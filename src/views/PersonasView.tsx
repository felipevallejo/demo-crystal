import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowUpRight,
  Cake,
  HeartHandshake,
  Mail,
  MapPin,
  Search,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react';
import { birthdays, directory, newHires, type DirectoryPerson } from '../data/portal';
import type { ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { Eyebrow, SectionHeading, StatNumber } from '../components/v3/ui';

/** Tinte suave por área — mismo lenguaje cromático que las dimensiones. */
const AREA_TONES: Record<string, string> = {
  Tecnología: 'bg-indigo-50 text-indigo-700 ring-indigo-100',
  'Talento Humano': 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Comunicaciones: 'bg-amber-50 text-amber-700 ring-amber-100',
  Estrategia: 'bg-violet-50 text-violet-700 ring-violet-100',
  GEF: 'bg-cyan-50 text-cyan-800 ring-cyan-100',
};

const AREA_FILTERS = ['Todas', 'Tecnología', 'Talento Humano', 'Comunicaciones', 'Estrategia', 'GEF'] as const;
type AreaFilter = (typeof AREA_FILTERS)[number];

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

/** Sube la resolución del avatar pravatar manteniendo el mismo rostro. */
function hi(src: string, size = 240) {
  return src.replace(/\/\d+\?/, `/${size}?`);
}

export function PersonasView({ onNavigate }: ViewProps) {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState<AreaFilter>('Todas');

  const filtered = useMemo<DirectoryPerson[]>(() => {
    const q = query.trim().toLowerCase();
    return directory.filter((p) => {
      const matchesArea = area === 'Todas' || p.area === area;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q);
      return matchesArea && matchesQuery;
    });
  }, [query, area]);

  const lead = newHires[0];
  const restHires = newHires.slice(1);

  return (
    <div className="space-y-14">
      {/* 1 — HERO: la comunidad como tesis */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[34px] bg-ink p-7 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-gef-green/15 blur-3xl" />
        <div className="relative z-[2] max-w-2xl">
          <Eyebrow className="text-amber-300/80">Comunidad · Personas Crystal</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.04] tracking-tightish text-balance sm:text-5xl">
            Que nadie en Crystal se sienta invisible.
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/80 sm:text-base">
            Más que un directorio: una forma de reconocernos, celebrarnos y conectar. Encuentra a quien necesitas y
            saluda a quienes llegan.
          </p>
          <div className="mt-7 flex flex-wrap gap-8">
            <div>
              <p className="font-display text-3xl font-semibold tracking-tightish text-white">
                <StatNumber value={directory.length} />
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">en el directorio</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold tracking-tightish text-amber-300">
                <StatNumber value={birthdays.length} />
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">cumpleaños cercanos</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold tracking-tightish text-gef-glow">
                <StatNumber value={newHires.length} />
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">nuevos ingresos</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2 — NUEVOS INGRESOS: dar la bienvenida */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Damos la bienvenida" title="Caras nuevas en Crystal" />
        <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
          <article className="relative flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-line shadow-soft sm:flex-row">
            <div className="relative sm:w-2/5">
              <img src={hi(lead.photo, 600)} alt={lead.name} className="h-56 w-full object-cover sm:h-full" />
            </div>
            <div className="flex flex-col justify-center gap-3 p-6 sm:flex-1">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 ring-1 ring-emerald-100">
                <Sparkles size={12} /> Recién llegada
              </span>
              <p className="font-display text-2xl font-semibold leading-tight tracking-tightish text-ink">
                Bienvenida, {lead.name.split(' ')[0]}.
              </p>
              <p className="text-sm text-ink-soft">
                {lead.role} · {lead.area}
              </p>
              <p className="text-xs text-ink-mute">{lead.startDate}</p>
              <button
                onClick={() => toast.success(`Le diste la bienvenida a ${lead.name.split(' ')[0]}.`)}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
              >
                <HeartHandshake size={15} /> Darle la bienvenida
              </button>
            </div>
          </article>

          <div className="flex flex-col gap-3">
            <Eyebrow className="flex items-center gap-1.5 text-emerald-600">
              <UserPlus size={13} /> Llegan al equipo
            </Eyebrow>
            <div className="flex flex-1 flex-col gap-3">
              {restHires.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + i * 0.06 }}
                  className="flex items-center gap-4 rounded-[22px] bg-white p-4 ring-1 ring-line transition-shadow hover:shadow-soft"
                >
                  <img src={hi(p.photo)} alt={p.name} className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{p.name}</p>
                    <p className="truncate text-xs text-ink-soft">
                      {p.role} · {p.area}
                    </p>
                    <p className="mt-1.5 inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                      {p.startDate}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3 — CUMPLEAÑOS: celebrar */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Celebramos juntos" title="Cumpleaños de la semana" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {birthdays.map((b, i) => (
            <motion.article
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-[24px] bg-white p-5 ring-1 ring-line transition-shadow hover:shadow-lift"
            >
              <span className="absolute right-4 top-4 text-rose-300 transition-colors group-hover:text-rose-400">
                <Cake size={18} />
              </span>
              <img src={hi(b.photo)} alt={b.name} className="h-14 w-14 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink">{b.name}</p>
                <p className="truncate text-xs text-ink-soft">{b.area}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-700 ring-1 ring-rose-100">
                <Cake size={11} /> {b.date}
              </span>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* 4 — DIRECTORIO: encontrar y conectar */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Encuentra a tu gente" title="Directorio de personas" />

        {/* Buscador + filtros por área */}
        <div className="mb-6 flex flex-col gap-4">
          <label className="flex items-center gap-3 rounded-full bg-white px-5 py-3 ring-1 ring-line shadow-soft transition-shadow focus-within:shadow-lift">
            <Search size={17} className="shrink-0 text-ink-mute" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, cargo o área…"
              className="w-full border-none bg-transparent text-sm text-ink outline-none placeholder:text-ink-mute"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {AREA_FILTERS.map((a) => (
              <button
                key={a}
                onClick={() => setArea(a)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
                  area === a ? 'bg-ink text-paper' : 'bg-white text-ink-soft ring-1 ring-line hover:bg-paper-2',
                )}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjetas de persona */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => {
            const areaTone = AREA_TONES[p.area] ?? 'bg-paper-2 text-ink-soft ring-line';
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: Math.min(i * 0.03, 0.3) }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col gap-4 rounded-[24px] bg-white p-5 ring-1 ring-line transition-shadow hover:shadow-lift"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={hi(p.photo)}
                    alt={p.name}
                    className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-line"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg font-semibold tracking-tightish text-ink">{p.name}</p>
                    <p className="truncate text-sm text-ink-soft">{p.role}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className={cn('rounded-full px-2.5 py-0.5 font-semibold ring-1', areaTone)}>{p.area}</span>
                      <span className="inline-flex items-center gap-1 text-ink-mute">
                        <MapPin size={11} /> {p.location}
                      </span>
                    </div>
                  </div>
                </div>

                {p.status ? (
                  <p className="inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-100">
                    {p.status}
                  </p>
                ) : null}

                <a
                  href={`mailto:${p.email}`}
                  className="mt-auto inline-flex items-center gap-2 text-xs font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  <Mail size={13} /> {p.email}
                </a>

                <ArrowUpRight
                  size={18}
                  className="absolute right-5 top-5 text-ink-mute opacity-0 transition-opacity group-hover:opacity-100"
                />
              </motion.article>
            );
          })}

          {filtered.length === 0 ? (
            <div className="col-span-full flex flex-col items-center gap-3 rounded-[24px] bg-white px-6 py-14 text-center ring-1 ring-line">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-2 text-ink-mute">
                <Users size={22} />
              </span>
              <p className="font-display text-lg font-semibold tracking-tightish text-ink">
                Nadie coincide con esa búsqueda
              </p>
              <p className="max-w-sm text-sm text-ink-soft">
                Prueba con otro nombre, cargo o área. La comunidad es grande, seguro está por aquí.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setArea('Todas');
                }}
                className="mt-1 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
              >
                Limpiar filtros
              </button>
            </div>
          ) : null}
        </div>
      </motion.section>

      {/* 5 — PIE: invitación a conectar */}
      <motion.section
        {...fade}
        className="grain overflow-hidden rounded-[30px] signature-grad p-7 text-white shadow-lift sm:p-9"
      >
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-xl">
            <Eyebrow className="text-white/70">Comunidad viva</Eyebrow>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tightish text-balance">
              Conectar también es parte del trabajo.
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Eventos, voluntariados y reconocimiento que nos unen viven en Comunicaciones. Súmate a lo que te mueve.
            </p>
          </div>
          <button
            onClick={() => onNavigate('comms')}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
          >
            Ver qué está pasando <ArrowUpRight size={15} />
          </button>
        </div>
      </motion.section>
    </div>
  );
}
