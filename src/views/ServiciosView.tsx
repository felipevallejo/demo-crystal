import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock3, MessageCircle, Sparkles, Zap } from 'lucide-react';
import { dimensions, servicesCatalog } from '../data/portal';
import type { ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { Eyebrow, SectionHeading, StatNumber, Tag } from '../components/v3/ui';

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const PROMISES = [
  { value: 3, suffix: ' clics', label: 'de tu solicitud al resultado', icon: Zap },
  { value: 24, suffix: ' / 7', label: 'sin esperar a horario de oficina', icon: Clock3 },
  { value: 6, suffix: ' trámites', label: 'resueltos por ti, sin tickets', icon: Sparkles },
];

export function ServiciosView({ onNavigate }: ViewProps) {
  const productividad = dimensions.find((d) => d.id === 'productividad');

  return (
    <div className="space-y-14">
      {/* 1 — HERO: la promesa de autoservicio */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[34px] signature-grad p-6 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-[2] max-w-2xl">
          <Eyebrow className="text-white/70">Servicios · autoservicio</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.02] tracking-tightish text-balance sm:text-5xl">
            Resuelve lo tuyo en segundos, no en trámites.
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/80 sm:text-base">
            Tu nómina, certificados, vacaciones y datos — todo a un clic, con menos fricción y sin
            depender de nadie. Lo importante, autoservicio.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {PROMISES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex flex-col gap-1 rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/15 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2 text-white/85">
                    <Icon size={15} />
                    <span className="font-display text-2xl font-semibold tracking-tightish">
                      <StatNumber value={p.value} suffix={p.suffix} />
                    </span>
                  </span>
                  <span className="text-xs leading-snug text-white/70">{p.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 2 — CATÁLOGO DE SERVICIOS */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow={productividad ? productividad.name : 'Resolver'}
          title="Todo lo que puedes resolver tú mismo"
          actionLabel="Volver al inicio"
          onAction={() => onNavigate('home')}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicesCatalog.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                onClick={() => onNavigate(card.tab)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-[26px] bg-white p-6 text-left ring-1 ring-line transition-shadow hover:shadow-lift"
              >
                <div className="flex w-full items-start justify-between">
                  <span
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-soft',
                      card.accent,
                    )}
                  >
                    <Icon size={22} />
                  </span>
                  {card.badge ? (
                    <Tag className="bg-paper-2 text-ink-soft ring-line">{card.badge}</Tag>
                  ) : null}
                </div>
                <div>
                  <p className="font-display text-xl font-semibold tracking-tightish text-ink">{card.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{card.body}</p>
                </div>
                <div className="mt-auto flex w-full items-center justify-between pt-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-mute">
                    {card.meta}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-2 text-ink transition-all group-hover:bg-ink group-hover:text-paper">
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* 3 — APOYO HUMANO + IA */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Cuando necesitas un poco más" title="No estás solo en esto" />
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="flex flex-col gap-4 rounded-[28px] bg-white p-7 ring-1 ring-line shadow-soft">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-2 text-ink">
              <MessageCircle size={20} />
            </span>
            <div>
              <Eyebrow>¿No encuentras algo?</Eyebrow>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tightish text-ink">
                Talento Humano te acompaña
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Para trámites especiales o casos que no resuelve el autoservicio, escríbele al equipo.
                Tiempo promedio de respuesta: menos de 8 horas.
              </p>
            </div>
            <button
              onClick={() => onNavigate('people')}
              className="group mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-paper-2"
            >
              Escribir a Talento Humano
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </article>

          <article className="grain relative flex flex-col gap-4 overflow-hidden rounded-[28px] bg-ink p-7 text-white shadow-lift">
            <div className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full bg-gef-green/25 blur-3xl" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-gef-glow ring-1 ring-white/15">
              <Sparkles size={20} />
            </span>
            <div className="relative">
              <Eyebrow className="text-gef-glow">Pregúntale a Crystal</Eyebrow>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tightish">
                Resuelve conversando
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                «Descárgame la colilla», «solicita vacaciones del 12 al 16 de mayo», «genérame la carta
                laboral». El asistente entiende lo que necesitas y lo hace por ti.
              </p>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="group relative mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
            >
              Probar el asistente
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </article>
        </div>
      </motion.section>
    </div>
  );
}
