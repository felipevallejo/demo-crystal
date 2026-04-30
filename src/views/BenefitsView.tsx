import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { benefitCards, purposeMoments } from '../data/portal';
import type { MaturityId } from '../types/app';
import { cn } from '../lib/cn';

export function BenefitsView({ stage: _stage }: { stage: MaturityId }) {
  void _stage;
  return (
    <div className="space-y-6">
      {/* Beneficios destacados */}
      <section className="grid gap-5 lg:grid-cols-2">
        {benefitCards.map((card, i) => {
          const Icon = card.icon;

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={cn(
                'relative overflow-hidden rounded-[28px] bg-gradient-to-br p-6 text-white sm:p-8',
                card.gradient,
              )}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-6 left-1/3 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex h-full flex-col justify-between gap-8">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <Icon size={22} />
                  </div>
                  <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-white/70">{card.title}</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">{card.subtitle}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{card.body}</p>
                </div>
                <button className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-black/10 transition-transform hover:scale-[1.02]">
                  {card.cta}
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* Propósito y bienestar */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Propósito y bienestar</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {purposeMoments.map(({ title, body, metric, icon: CardIcon }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
              className="rounded-[28px] bg-white p-5 ring-1 ring-slate-200 transition-shadow hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <CardIcon size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{body}</p>
              <div className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{metric}</div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
