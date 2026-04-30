import { useMemo, useState } from 'react';
import { Cake, Mail, MapPin, Search, Sparkles, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { birthdays, directory, newHires } from '../data/portal';
import { cn } from '../lib/cn';

const AREA_TONES: Record<string, string> = {
  Tecnología: 'bg-sky-50 text-sky-700 ring-sky-200',
  'Talento Humano': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Comunicaciones: 'bg-amber-50 text-amber-700 ring-amber-200',
  Estrategia: 'bg-violet-50 text-violet-700 ring-violet-200',
  GEF: 'bg-rose-50 text-rose-700 ring-rose-200',
};

const AREAS = ['Todos', 'Tecnología', 'Talento Humano', 'Comunicaciones', 'Estrategia', 'GEF'];

export function PersonasView() {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState<string>('Todos');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return directory.filter((p) => {
      const matchesArea = area === 'Todos' || p.area === area;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q);
      return matchesArea && matchesQuery;
    });
  }, [query, area]);

  return (
    <div className="space-y-7">
      {/* Cumpleaños y nuevos ingresos */}
      <section className="grid gap-5 lg:grid-cols-2">
        <article className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 ring-1 ring-rose-100 sm:p-6">
          <div className="flex items-center gap-2">
            <Cake size={16} className="text-rose-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">Cumpleaños cercanos</p>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {birthdays.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="min-w-[160px] shrink-0 rounded-2xl bg-white p-4 ring-1 ring-rose-100 shadow-sm"
              >
                <img src={b.photo} alt={b.name} className="h-12 w-12 rounded-2xl object-cover" />
                <p className="mt-3 text-sm font-semibold text-slate-950">{b.name}</p>
                <p className="text-xs text-slate-500">{b.area}</p>
                <span className="mt-3 inline-flex rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-semibold text-rose-700">
                  {b.date}
                </span>
              </motion.div>
            ))}
          </div>
        </article>

        <article className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 ring-1 ring-emerald-100 sm:p-6">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-600" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Nuevos ingresos</p>
          </div>
          <div className="mt-4 space-y-3">
            {newHires.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-emerald-100">
                <img src={p.photo} alt={p.name} className="h-12 w-12 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-950">{p.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    {p.role} · {p.area}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  <UserPlus size={11} className="mr-1 inline-block" />
                  {p.startDate}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Búsqueda + filtros */}
      <section className="rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-full bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
            <Search size={16} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, cargo o área…"
              className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <button
              key={a}
              onClick={() => setArea(a)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all',
                area === a
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-50 text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100',
              )}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Directorio */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4 transition-shadow hover:shadow-md"
            >
              <img src={p.photo} alt={p.name} className="h-14 w-14 shrink-0 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-950">{p.name}</p>
                <p className="truncate text-sm text-slate-500">{p.role}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 font-semibold ring-1',
                      AREA_TONES[p.area] ?? 'bg-slate-50 text-slate-600 ring-slate-200',
                    )}
                  >
                    {p.area}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <MapPin size={10} />
                    {p.location}
                  </span>
                </div>
                {p.status ? (
                  <p className="mt-2 text-xs text-amber-600">{p.status}</p>
                ) : null}
                <a
                  href={`mailto:${p.email}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900"
                >
                  <Mail size={12} />
                  {p.email}
                </a>
              </div>
            </motion.article>
          ))}
          {filtered.length === 0 ? (
            <div className="col-span-full rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              No encontramos personas con ese filtro.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
