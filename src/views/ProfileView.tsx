import { ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { additionalInfoCategories, profileSections } from '../data/portal';
import type { MaturityId } from '../types/app';
import { cn } from '../lib/cn';

export function ProfileView({ stage: _stage }: { stage: MaturityId }) {
  void _stage;
  const completionPct = 78;

  return (
    <div className="space-y-6">
      {/* Avance del perfil */}
      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 left-1/4 h-24 w-24 rounded-full bg-sky-500/10 blur-2xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm text-slate-400">Tu perfil está al</p>
            <p className="mt-1 text-5xl font-bold tracking-tight">{completionPct}%</p>
            <p className="mt-2 text-sm text-slate-400">Faltan 2 secciones por completar</p>

            <div className="mt-5 w-full max-w-sm">
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-white/10 transition-transform hover:scale-[1.02]">
            Completar perfil
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Secciones del perfil */}
      <section className="grid gap-4 sm:grid-cols-2">
        {profileSections.map((section, i) => {
          const Icon = section.icon;
          const isComplete = section.status === 'Completo';

          return (
            <motion.button
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-[28px] bg-white p-5 text-left ring-1 ring-slate-200 transition-shadow hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
                isComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600',
              )}>
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-950">{section.title}</p>
                <p className="mt-0.5 truncate text-sm text-slate-500">{section.detail}</p>
              </div>
              <div className="shrink-0">
                {isComplete ? (
                  <CheckCircle2 size={18} className="text-emerald-500" />
                ) : (
                  <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 ring-1 ring-amber-200">
                    <AlertCircle size={12} className="text-amber-600" />
                    <span className="text-[11px] font-semibold text-amber-700">{section.status}</span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </section>

      {/* Información adicional */}
      <section className="rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Información adicional</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {additionalInfoCategories.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl px-3 py-3 odd:bg-slate-50">
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
              <span className="text-sm text-slate-500">{item.count}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
