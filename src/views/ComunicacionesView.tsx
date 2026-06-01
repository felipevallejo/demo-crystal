import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Radio } from 'lucide-react';
import { toast } from 'sonner';
import { cultureMoments, newsFeed, type CommsCategory, type NewsItem } from '../data/portal';
import { cn } from '../lib/cn';
import type { ViewProps } from '../types/app';
import { Eyebrow, SectionHeading, StatNumber, Tag } from '../components/v3/ui';

type FilterId = 'all' | CommsCategory;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Todo' },
  { id: 'Campaña', label: 'Campañas' },
  { id: 'Comunicado', label: 'Comunicados' },
  { id: 'Cultura', label: 'Cultura' },
  { id: 'Aprendizaje', label: 'Aprendizaje' },
];

const CTA_LABEL: Record<NewsItem['ctaTone'], string> = {
  inscripcion: 'Inscríbete',
  rsvp: 'Confirmo asistencia',
  lectura: 'Conocer más',
};

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function ComunicacionesView({ onNavigate }: ViewProps) {
  const [filter, setFilter] = useState<FilterId>('all');

  const featured = useMemo(() => newsFeed.find((n) => n.featured) ?? newsFeed[0], []);
  const rest = useMemo(() => newsFeed.filter((n) => n.id !== featured.id), [featured]);
  const filtered = useMemo(
    () => (filter === 'all' ? rest : rest.filter((n) => n.category === filter)),
    [filter, rest],
  );

  const handleCta = (item: NewsItem) => {
    if (item.ctaTone === 'lectura') {
      toast.success(`Abriendo «${item.title}».`);
    } else {
      toast.success(`Listo, quedaste anotado en «${item.title}».`);
    }
  };

  return (
    <div className="space-y-14">
      {/* 1 — PULSO DESTACADO (hero editorial) */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gef-green/10 text-gef-green">
            <Radio size={14} />
          </span>
          <Eyebrow>Pulso de Crystal · esta semana</Eyebrow>
        </div>

        <article className="grain relative overflow-hidden rounded-[34px] bg-ink text-white shadow-lift">
          <div
            className="aspect-[16/11] w-full bg-cover bg-center sm:aspect-[16/8] lg:aspect-[24/9]"
            style={{ backgroundImage: `url(${featured.cover})` }}
          />
          <div className="absolute inset-0" style={{ backgroundImage: 'var(--grad-ink)' }} />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ring-1 ring-white/20 backdrop-blur-sm">
                {featured.category}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
                {featured.eyebrow}
              </span>
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-[1.05] tracking-tightish text-balance drop-shadow sm:text-[2.4rem]">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} className="text-gef-glow" />
                {featured.date}
              </span>
              {featured.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-gef-glow" />
                  {featured.location}
                </span>
              ) : null}
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleCta(featured)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
              >
                {CTA_LABEL[featured.ctaTone]} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </article>
      </motion.section>

      {/* 2 — FEED FILTRABLE */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Lo que se mueve" title="Campañas, comunidad y aprendizaje" />

        <div className="mb-7 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                filter === f.id
                  ? 'bg-ink text-paper shadow-soft'
                  : 'bg-white text-ink-soft ring-1 ring-line hover:-translate-y-0.5 hover:text-ink hover:shadow-soft',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-[24px] bg-white px-6 py-10 text-center text-sm text-ink-soft ring-1 ring-line">
            Aún no hay piezas en esta categoría. Vuelve pronto.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-line transition-shadow hover:shadow-lift"
                >
                  <div className="relative h-44 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url(${item.cover})` }}
                    />
                    <div className="absolute inset-0" style={{ backgroundImage: 'var(--grad-ink)' }} />
                    <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
                        {item.category}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/90 text-ink backdrop-blur-sm">
                        <Icon size={16} />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <Eyebrow>{item.eyebrow}</Eyebrow>
                    <h3 className="font-display text-lg font-semibold leading-snug tracking-tightish text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{item.excerpt}</p>

                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-mute">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={13} />
                        {item.date}
                      </span>
                      {item.location ? (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={13} />
                          {item.location}
                        </span>
                      ) : null}
                    </div>

                    <button
                      onClick={() => handleCta(item)}
                      className="group/cta mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01]"
                    >
                      {CTA_LABEL[item.ctaTone]}
                      <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-0.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </motion.section>

      {/* 3 — CULTURA EN MOVIMIENTO (momentos vivos, no tablón) */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Cultura viva"
          title="Lo que estamos logrando juntos"
          actionLabel="Ver comunidad"
          onAction={() => onNavigate('people')}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {cultureMoments.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.article
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="flex flex-col gap-4 overflow-hidden rounded-[26px] bg-white p-6 ring-1 ring-line transition-shadow hover:shadow-lift"
              >
                <span
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-soft',
                    m.tone,
                  )}
                >
                  <Icon size={22} />
                </span>
                <p className="font-display text-lg font-semibold tracking-tightish text-ink">{m.title}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{m.body}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* 4 — CIERRE: una sola voz */}
      <motion.section
        {...fade}
        className="grain relative overflow-hidden rounded-[30px] signature-grad p-7 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-[2] grid items-center gap-8 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <Eyebrow className="text-white/70">Cómo te llega Crystal</Eyebrow>
            <h3 className="mt-3 max-w-md font-display text-2xl font-semibold leading-tight tracking-tightish text-balance sm:text-3xl">
              Una sola voz, sin saturarte de correos.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
              Campañas, comunicados y cultura conviven aquí, en un solo lugar. Lo importante se destaca; lo demás
              te espera cuando lo necesites.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/15 backdrop-blur-sm">
              <p className="font-display text-3xl font-semibold">
                <StatNumber value={newsFeed.length} />
              </p>
              <p className="mt-1 text-xs text-white/80">piezas activas este mes</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/15 backdrop-blur-sm">
              <p className="font-display text-3xl font-semibold">
                <StatNumber value={4} />
              </p>
              <p className="mt-1 text-xs text-white/80">temas que cuidamos</p>
            </div>
            <div className="col-span-2">
              <Tag className="bg-white/12 text-white ring-white/20">
                <ArrowUpRight size={12} /> Curaduría editorial
              </Tag>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
