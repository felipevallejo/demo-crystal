import { PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MaturityId } from '../types/app';
import { cn } from '../lib/cn';

const historyItems = [
  { period: '14 — 18 abr 2026', status: 'Aprobadas', days: 5, statusColor: 'bg-emerald-100 text-emerald-700' },
  { period: '16 — 20 dic 2025', status: 'Tomadas', days: 5, statusColor: 'bg-slate-100 text-slate-600' },
  { period: '7 — 9 ago 2025', status: 'Tomadas', days: 3, statusColor: 'bg-slate-100 text-slate-600' },
];

const upcomingHolidays = [
  { date: 'Jun 22', name: 'Sagrado Corazon', bridge: true },
  { date: 'Jun 29', name: 'San Pedro y San Pablo', bridge: true },
  { date: 'Jul 20', name: 'Dia de la Independencia', bridge: false },
  { date: 'Ago 7', name: 'Batalla de Boyaca', bridge: false },
  { date: 'Ago 18', name: 'Asuncion de la Virgen', bridge: true },
  { date: 'Oct 13', name: 'Dia de la Raza', bridge: true },
];

export function VacationsView({ stage: _stage }: { stage: MaturityId }) {
  void _stage;
  const availableDays = 12;
  const expiringDays = 4;
  const usedDays = 13;
  const totalDays = availableDays + usedDays;
  const usedPct = (usedDays / totalDays) * 100;

  return (
    <div className="space-y-6">
      {/* Dias disponibles — hero */}
      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 left-1/4 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-400">Días disponibles</p>
            <p className="mt-1 text-6xl font-bold tracking-[-0.04em]">{availableDays}</p>
            <p className="mt-2 text-sm text-slate-400">{usedDays} días usados de {totalDays} al año</p>

            {/* Barra visual */}
            <div className="mt-4 w-full max-w-xs">
              <div className="flex overflow-hidden rounded-full">
                <motion.div
                  className="h-3 rounded-l-full bg-gradient-to-r from-slate-500 to-slate-400"
                  initial={{ width: 0 }} animate={{ width: `${usedPct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <motion.div
                  className="h-3 rounded-r-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  initial={{ width: 0 }} animate={{ width: `${100 - usedPct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>Usados</span>
                <span className="text-emerald-400">Disponibles</span>
              </div>
            </div>
          </div>

          {/* Alerta de vencimiento */}
          {expiringDays > 0 && (
            <div className="rounded-2xl bg-amber-500/15 px-5 py-4 ring-1 ring-amber-400/20">
              <p className="text-2xl font-bold text-amber-300">{expiringDays} días</p>
              <p className="mt-1 text-sm text-amber-200/80">vencen antes de junio</p>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        {/* Solicitud en proceso */}
        <article className="rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Solicitud activa</p>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">En aprobación</span>
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">14 al 18 de abril</p>
          <p className="mt-1 text-sm text-slate-500">5 días · Pendiente aprobación de líder</p>

          <div className="mt-5">
            <div className="flex gap-1">
              {['Enviada', 'Líder', 'Confirmada'].map((step, i) => (
                <div key={step} className="flex-1">
                  <div className={cn('h-1.5 rounded-full', i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-sky-400' : 'bg-slate-200')} />
                  <p className="mt-1.5 text-[10px] uppercase tracking-wide text-slate-400">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-5 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
            Solicitar nuevas vacaciones
          </button>
        </article>

        {/* Historico */}
        <article className="rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Historial</p>
          <div className="mt-4 space-y-2">
            {historyItems.map((item) => (
              <div key={item.period} className="flex items-center justify-between rounded-xl px-3 py-3 odd:bg-slate-50">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{item.period}</p>
                  <p className="text-xs text-slate-500">{item.days} días</p>
                </div>
                <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', item.statusColor)}>{item.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Proximos festivos */}
      <section className="rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
        <div className="flex items-center gap-2">
          <PartyPopper size={16} className="text-slate-400" />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Proximos festivos en Colombia</p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingHolidays.map((h) => (
            <div key={h.name} className="flex items-center gap-3 rounded-xl px-3 py-3 ring-1 ring-slate-100">
              <div className="flex h-10 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-slate-950 text-white">
                <span className="text-[10px] uppercase tracking-wide text-slate-400">{h.date.split(' ')[0]}</span>
                <span className="text-sm font-bold">{h.date.split(' ')[1]}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-700">{h.name}</p>
                {h.bridge && <p className="text-xs text-emerald-600">Puente festivo</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
