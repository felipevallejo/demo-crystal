import { useMemo, useState } from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { newsFeed, type CommsCategory, type NewsItem } from '../data/portal';
import { cn } from '../lib/cn';

const FILTERS: { id: 'all' | CommsCategory; label: string }[] = [
  { id: 'all', label: 'Todo' },
  { id: 'Campaña', label: 'Campañas' },
  { id: 'Comunicado', label: 'Comunicados' },
  { id: 'Cultura', label: 'Cultura' },
  { id: 'Aprendizaje', label: 'Aprendizaje' },
];

const CTA_LABEL: Record<NewsItem['ctaTone'], string> = {
  inscripcion: 'Inscríbete',
  rsvp: 'Confirma asistencia',
  lectura: 'Conocer más',
};

export function ComunicacionesView() {
  const [filter, setFilter] = useState<'all' | CommsCategory>('all');

  const featured = useMemo(() => newsFeed.find((n) => n.featured) ?? newsFeed[0], []);
  const rest = useMemo(() => newsFeed.filter((n) => n.id !== featured.id), [featured]);
  const filtered = useMemo(
    () => (filter === 'all' ? rest : rest.filter((n) => n.category === filter)),
    [filter, rest],
  );

  return (
    <div className="space-y-7">
      {/* Hero */}
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[32px] bg-slate-950 text-white shadow-xl shadow-slate-950/20"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${featured.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-slate-950/30" />
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50 mix-blend-overlay', featured.accent)} />

        <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
              <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 ring-1 ring-emerald-300/30">{featured.category}</span>
              <span>{featured.eyebrow}</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">{featured.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200">{featured.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="text-emerald-300" />
                {featured.date}
              </span>
              {featured.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-emerald-300" />
                  {featured.location}
                </span>
              ) : null}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-black/10 transition-transform hover:scale-[1.02]">
                {CTA_LABEL[featured.ctaTone]}
                <ArrowRight size={14} />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                Ver detalle
              </button>
            </div>
          </div>

          <div className="hidden flex-col items-end justify-between gap-4 lg:flex">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <featured.icon size={22} />
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">Cupos disponibles</p>
              <p className="mt-1 text-2xl font-semibold">42 / 60</p>
              <p className="mt-1 text-xs text-slate-300">Inscripciones abiertas hasta el jueves</p>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all',
              filter === f.id
                ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20'
                : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-700',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-200 transition-shadow hover:shadow-lg hover:shadow-slate-200/60"
          >
            <div className="relative h-44 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${item.cover})` }}
              />
              <div className={cn('absolute inset-0 bg-gradient-to-tr opacity-60 mix-blend-overlay', item.accent)} />
              <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                  {item.category}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/90 text-slate-700">
                  <item.icon size={16} />
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{item.eyebrow}</p>
              <h3 className="text-lg font-semibold leading-snug text-slate-950">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{item.excerpt}</p>

              <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} />
                  {item.date}
                </span>
                {item.location ? (
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} />
                    {item.location}
                  </span>
                ) : null}
              </div>

              <button className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01]">
                {CTA_LABEL[item.ctaTone]}
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
