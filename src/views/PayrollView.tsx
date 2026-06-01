import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileText,
  PiggyBank,
  ReceiptText,
  Wallet,
} from 'lucide-react';
import { loanSummary, paymentHistory, severanceSummary } from '../data/portal';
import type { ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { Eyebrow, SectionHeading, StatNumber, Tag } from '../components/v3/ui';

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

/** El monto del período se oculta tras una intención explícita del usuario. */
const HIDDEN_AMOUNT = '••••••••';

export function PayrollView({ onNavigate }: ViewProps) {
  const [revealed, setRevealed] = useState(false);
  const latest = paymentHistory[0];
  const history = paymentHistory.slice(1);

  const loanProgress = useMemo(
    () => Math.round((loanSummary.paidInstallments / loanSummary.totalInstallments) * 100),
    [],
  );
  const remainingInstallments = loanSummary.totalInstallments - loanSummary.paidInstallments;

  return (
    <div className="space-y-12">
      {/* 1 — DESPRENDIBLE DE LA QUINCENA (monto bajo intención) */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Mi nómina · período actual"
          title="Tu desprendible de quincena"
          actionLabel="Mis certificados"
          onAction={() => onNavigate('certifications')}
        />

        <article className="grain relative overflow-hidden rounded-[30px] signature-grad p-6 text-white shadow-lift sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="relative z-[2] flex flex-col gap-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Eyebrow className="text-white/70">{latest.period}</Eyebrow>
                <p className="mt-2 max-w-sm text-sm text-white/80">
                  Tu pago quincenal ya está disponible. El detalle es solo tuyo: muéstralo cuando lo necesites.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ring-1 ring-white/20 backdrop-blur-sm">
                <CheckCircle2 size={13} /> {latest.status}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">Neto recibido</span>
              <div className="flex flex-wrap items-end gap-4">
                <span
                  className={cn(
                    'font-display text-5xl font-semibold tracking-tightish text-balance transition-all sm:text-6xl',
                    !revealed && 'select-none blur-[2px]',
                  )}
                >
                  {revealed ? latest.net : HIDDEN_AMOUNT}
                </span>
                <button
                  onClick={() => setRevealed((v) => !v)}
                  className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
                  {revealed ? 'Ocultar' : 'Mostrar monto'}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => toast.success('Desprendible descargado', { description: latest.period })}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
              >
                <Download size={15} /> Descargar desprendible
              </button>
              <button
                onClick={() => onNavigate('certifications')}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <FileText size={15} /> Comprobantes
              </button>
            </div>
          </div>
        </article>
      </motion.section>

      {/* 2 — HISTORIAL DE PAGOS */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Historial" title="Tus quincenas anteriores" />

        <div className="overflow-hidden rounded-[26px] bg-white ring-1 ring-line shadow-soft">
          <div className="hidden grid-cols-[1.4fr_1fr_auto] items-center gap-4 border-b border-line px-6 py-3 sm:grid">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-mute">Período</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-mute">Estado</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-mute">Acción</span>
          </div>
          <div className="divide-y divide-line">
            {history.map((item, i) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="grid grid-cols-[1fr_auto] items-center gap-3 px-6 py-4 transition-colors hover:bg-paper-2/60 sm:grid-cols-[1.4fr_1fr_auto]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-ink-soft">
                    <ReceiptText size={16} />
                  </span>
                  <span className="text-sm font-medium text-ink">{item.period}</span>
                </div>
                <span className="hidden text-xs text-ink-soft sm:inline">{item.status}</span>
                <button
                  onClick={() => toast.success('Desprendible descargado', { description: item.period })}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-paper-2 hover:text-ink"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Descargar</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3 — CESANTÍAS Y CRÉDITO */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Tu futuro financiero" title="Cesantías y crédito" />

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Cesantías */}
          <article className="flex flex-col gap-5 rounded-[28px] bg-white p-6 ring-1 ring-line shadow-soft transition-shadow hover:shadow-lift sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <PiggyBank size={22} />
              </span>
              <Tag className="bg-emerald-50 text-emerald-700 ring-emerald-100">Acumulado</Tag>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-mute">Cesantías</p>
              <p className="mt-2 font-display text-4xl font-semibold tracking-tightish text-ink">
                {severanceSummary.amount}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{severanceSummary.description}</p>
            </div>
            <div className="mt-auto flex items-center gap-2 border-t border-line pt-4 text-xs text-ink-mute">
              <CalendarClock size={14} />
              Corte al {severanceSummary.cutOff}
            </div>
          </article>

          {/* Crédito */}
          <article className="flex flex-col gap-6 rounded-[28px] bg-white p-6 ring-1 ring-line shadow-soft transition-shadow hover:shadow-lift sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-gef-deep ring-1 ring-indigo-100">
                <Wallet size={22} />
              </span>
              <Tag className="bg-emerald-50 text-emerald-700 ring-emerald-100">Al día</Tag>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-mute">{loanSummary.title}</p>
              <p className="mt-2 font-display text-4xl font-semibold tracking-tightish text-ink">{loanSummary.balance}</p>
              <p className="mt-2 text-sm text-ink-soft">Saldo pendiente por pagar.</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-ink-soft">
                  <StatNumber value={loanSummary.paidInstallments} /> de {loanSummary.totalInstallments} cuotas
                </span>
                <span className="font-display font-semibold text-gef-deep">
                  <StatNumber value={loanProgress} suffix="%" />
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-2">
                <motion.div
                  className="h-full rounded-full bg-gef-deep"
                  initial={{ width: 0 }}
                  animate={{ width: `${loanProgress}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">Cuotas restantes</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">
                  <StatNumber value={remainingInstallments} />
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">Fecha final</p>
                <p className="mt-1 text-sm font-medium text-ink">{loanSummary.endDate}</p>
              </div>
            </div>
          </article>
        </div>
      </motion.section>

      {/* 4 — AYUDA / SIGUIENTE PASO */}
      <motion.section {...fade}>
        <article className="flex flex-col items-start justify-between gap-5 rounded-[26px] bg-paper-2 p-7 ring-1 ring-line sm:flex-row sm:items-center sm:p-8">
          <div>
            <Eyebrow>¿Algo no cuadra?</Eyebrow>
            <p className="mt-2 max-w-md font-display text-xl font-semibold tracking-tightish text-ink">
              Resuelve dudas de tu nómina sin escribir un solo correo.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
          >
            Ir a trámites <ArrowRight size={15} />
          </button>
        </article>
      </motion.section>
    </div>
  );
}
