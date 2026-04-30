import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { servicesCatalog } from '../data/portal';
import type { TabId } from '../types/app';
import { cn } from '../lib/cn';

type ServiciosViewProps = {
  onNavigate: (tab: TabId) => void;
};

export function ServiciosView({ onNavigate }: ServiciosViewProps) {
  return (
    <div className="space-y-7">
      {/* Grid de servicios */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {servicesCatalog.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.id}
              onClick={() => card.tab && onNavigate(card.tab)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className={cn(
                'group relative overflow-hidden rounded-[28px] bg-gradient-to-br p-6 text-left text-white shadow-xl shadow-slate-950/10 transition-shadow',
                card.accent,
              )}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 left-1/4 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/15 backdrop-blur-sm">
                  <Icon size={20} />
                </div>
                {card.badge ? (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white ring-1 ring-white/20 backdrop-blur-sm">
                    {card.badge}
                  </span>
                ) : null}
              </div>

              <h3 className="relative mt-6 text-2xl font-semibold tracking-tight">{card.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/85">{card.body}</p>

              <div className="relative mt-6 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-white/70">{card.meta}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </div>
            </motion.button>
          );
        })}
      </section>

      {/* Banda de ayuda */}
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="overflow-hidden rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <MessageCircle size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">¿No encuentras algo?</p>
              <h3 className="mt-1 font-semibold text-slate-950">Habla con Talento Humano</h3>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Nuestro equipo te acompaña en trámites no estandarizados o casos especiales. Tiempo promedio de respuesta:
            menos de 8 horas.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
            Escribir a Talento Humano
            <ArrowRight size={14} />
          </button>
        </article>

        <article className="overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 text-white ring-1 ring-slate-800 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 text-emerald-300">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Próximamente</p>
              <h3 className="mt-1 font-semibold">Pídele a Crystal</h3>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Resolverás trámites conversando: «descárgame la colilla», «solicíta vacaciones del 12 al 16 de mayo», «¿cuánto
            llevo en cesantías?». Lo estamos preparando.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-400/20">
            Beta · próximas fases
          </span>
        </article>
      </section>
    </div>
  );
}
