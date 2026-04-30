import { BriefcaseBusiness, Download, HeartHandshake, ShieldCheck, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { loanSummary, paymentHistory, severanceSummary } from '../data/portal';
import type { MaturityId } from '../types/app';
import { ProgressRing } from '../components/ProgressRing';
import { cn } from '../lib/cn';

export function PayrollView({ stage: _stage }: { stage: MaturityId }) {
  void _stage;
  const [payrollTab, setPayrollTab] = useState<'pago' | 'aportes' | 'credito'>('pago');
  const gross = 2000000;
  const earnings = [
    { concepto: 'Salario base', valor: 1900000 },
    { concepto: 'Auxilio de transporte', valor: 100000 },
  ];
  const deductions = [
    { concepto: 'Salud', valor: 76000, pct: 3.8, helper: 'Aporte obligatorio' },
    { concepto: 'Pensión', valor: 76000, pct: 3.8, helper: 'Ahorro para tu futuro' },
    { concepto: 'Cuota préstamo', valor: 106500, pct: 5.3, helper: 'Descuento de tu crédito activo' },
    { concepto: 'Retención en la fuente', valor: 74500, pct: 3.7, helper: 'Anticipo de impuesto' },
  ];
  const totalDeductions = deductions.reduce((sum, item) => sum + item.valor, 0);
  const net = gross - totalDeductions;
  const netPct = (net / gross) * 100;
  const loanPct = (loanSummary.paidInstallments / loanSummary.totalInstallments) * 100;

  return (
    <div className="space-y-6">
      <nav className="flex gap-2">
        {[
          { id: 'pago' as const, label: 'Mi pago', icon: Wallet },
          { id: 'aportes' as const, label: 'Mis aportes', icon: ShieldCheck },
          { id: 'credito' as const, label: 'Mi crédito', icon: BriefcaseBusiness },
        ].map(({ id, label, icon: TabIcon }) => (
          <button
            key={id}
            onClick={() => setPayrollTab(id)}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all',
              payrollTab === id
                ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20'
                : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-700',
            )}
          >
            <TabIcon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {payrollTab === 'pago' ? (
        <motion.div key="pago" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">2da quincena · Marzo 2026</p>
                <p className="mt-3 text-5xl font-bold tracking-tight">$1.667.000</p>
                <p className="mt-2 text-sm text-slate-300">Depositado el 30 de marzo en tu cuenta.</p>
              </div>
              <button className="flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-white/10 transition-transform hover:scale-105">
                <Download size={16} />
                Descargar colilla
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] bg-white/5 px-4 py-4 ring-1 ring-white/10">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Ingresos</p>
                <p className="mt-2 text-xl font-semibold text-white">${gross.toLocaleString('es-CO')}</p>
              </div>
              <div className="rounded-[24px] bg-white/5 px-4 py-4 ring-1 ring-white/10">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Descuentos</p>
                <p className="mt-2 text-xl font-semibold text-white">-${totalDeductions.toLocaleString('es-CO')}</p>
              </div>
              <div className="rounded-[24px] bg-emerald-400/10 px-4 py-4 ring-1 ring-emerald-400/20">
                <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-200">Neto recibido</p>
                <p className="mt-2 text-xl font-semibold text-white">${net.toLocaleString('es-CO')}</p>
              </div>
            </div>

            <div className="relative mt-6">
              <div className="flex overflow-hidden rounded-full">
                <motion.div
                  className="h-4 rounded-l-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${netPct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                />
                <motion.div
                  className="h-4 rounded-r-full bg-gradient-to-r from-rose-400/60 to-rose-500/60"
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - netPct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                />
              </div>
              <div className="mt-3 flex justify-between text-xs text-slate-400">
                <span>
                  Recibes el <span className="font-semibold text-emerald-400">{netPct.toFixed(0)}%</span>
                </span>
                <span>
                  Descuentos <span className="font-semibold text-rose-400">{(100 - netPct).toFixed(0)}%</span>
                </span>
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <article className="overflow-hidden rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Qué sumó</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">Ingresos de la quincena</h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  ${gross.toLocaleString('es-CO')}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {earnings.map(({ concepto, valor }) => (
                  <div key={concepto} className="flex items-center justify-between rounded-[22px] bg-emerald-50/60 px-4 py-4">
                    <span className="text-sm font-medium text-slate-700">{concepto}</span>
                    <span className="text-base font-semibold text-emerald-700">+${valor.toLocaleString('es-CO')}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="overflow-hidden rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Qué descontó</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">Descuentos de la quincena</h3>
                </div>
                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                  -${totalDeductions.toLocaleString('es-CO')}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {deductions.map(({ concepto, valor, pct, helper }) => (
                  <div key={concepto} className="rounded-[22px] border border-slate-200 px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{concepto}</p>
                        <p className="mt-1 text-xs text-slate-500">{helper}</p>
                      </div>
                      <span className="text-sm font-semibold text-rose-500">-${valor.toLocaleString('es-CO')}</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-1.5 rounded-full bg-rose-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct * 3}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="overflow-hidden rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Quincenas anteriores</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">Histórico reciente</h3>
              </div>
              <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
                Ver histórico
              </button>
            </div>
            <div className="mt-3 divide-y divide-slate-100">
              {paymentHistory.slice(1).map((item, index) => (
                <div key={item.period} className="flex items-center gap-4 py-3">
                  <div className="hidden h-8 items-end gap-px sm:flex">
                    {[65, 82, 70, 90].map((height, sparkIndex) => (
                      <motion.div
                        key={`${item.period}-${sparkIndex}`}
                        className="w-1 rounded-full bg-slate-200"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.4, delay: index * 0.1 + sparkIndex * 0.05 }}
                      />
                    ))}
                  </div>
                  <span className="flex-1 text-sm text-slate-700">{item.period}</span>
                  <span className="text-sm font-semibold text-slate-950">{item.net}</span>
                  <button className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      ) : null}

      {payrollTab === 'aportes' ? (
        <motion.div key="aportes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white sm:p-8">
            <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-xl" />
            <div className="pointer-events-none absolute -bottom-8 left-1/3 h-24 w-24 rounded-full bg-emerald-400/20 blur-xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-200" />
                  <p className="text-sm font-medium text-emerald-100">Cesantías acumuladas</p>
                </div>
                <p className="mt-2 text-5xl font-bold tracking-tight">{severanceSummary.amount}</p>
                <p className="mt-2 text-sm text-emerald-200">Corte al {severanceSummary.cutOff}</p>
                <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-100/90">{severanceSummary.description}</p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Cada mes se aporta por ti</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { nombre: 'Salud', monto: 152000, icono: HeartHandshake, gradient: 'from-sky-500 to-blue-600', bg: 'bg-sky-50', ring: 'ring-sky-200' },
                { nombre: 'Pensión', monto: 152000, icono: ShieldCheck, gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', ring: 'ring-emerald-200' },
              ].map(({ nombre, monto, icono: CardIcon, gradient, bg, ring }) => (
                <div key={nombre} className={cn('relative overflow-hidden rounded-2xl p-5 ring-1', bg, ring)}>
                  <div className={cn('pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br opacity-20 blur-xl', gradient)} />
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <CardIcon size={18} className="text-slate-600" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-500">{nombre}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-950">${monto.toLocaleString('es-CO')}</p>
                    <div className={cn('mt-3 h-1 w-16 rounded-full bg-gradient-to-r', gradient)} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      ) : null}

      {payrollTab === 'credito' ? (
        <motion.div key="credito" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 left-1/4 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />

            <div className="relative flex flex-col gap-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-400">{loanSummary.title}</p>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">Al día</span>
                  </div>
                  <p className="mt-3 text-4xl font-bold tracking-tight">{loanSummary.balance}</p>
                  <p className="mt-2 text-sm text-slate-300">Esto es lo que te falta por pagar.</p>
                </div>

                <div className="flex items-center gap-4 rounded-[24px] bg-white/5 px-4 py-4 ring-1 ring-white/10">
                  <div className="relative shrink-0">
                    <ProgressRing percent={loanPct} size={88} stroke={10} color="url(#loanGrad)" />
                    <svg className="absolute inset-0" width="88" height="88">
                      <defs>
                        <linearGradient id="loanGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold">{loanPct.toFixed(0)}%</span>
                      <span className="text-[9px] uppercase tracking-wide text-slate-400">pagado</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Progreso</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {loanSummary.paidInstallments} de {loanSummary.totalInstallments} cuotas pagadas
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Cuota mensual', valor: '$213.000' },
                  { label: 'Cuotas restantes', valor: `${loanSummary.totalInstallments - loanSummary.paidInstallments}` },
                  { label: 'Fecha final', valor: '30 sep 2026' },
                ].map(({ label, valor }) => (
                  <div key={label} className="rounded-[24px] bg-white/5 px-4 py-4 ring-1 ring-white/10">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{valor}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      ) : null}
    </div>
  );
}
