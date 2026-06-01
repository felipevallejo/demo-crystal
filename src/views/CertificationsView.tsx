import { motion } from 'framer-motion';
import { ArrowRight, Clock3, Download, FileText, Receipt, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { certificationCards } from '../data/portal';
import type { ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { Eyebrow, SectionHeading } from '../components/v3/ui';

/** Capa de presentación (ícono + tinte por documento) sobre el contrato de datos. */
const CARD_STYLE: { icon: LucideIcon; accent: string; dot: string; tint: string; ring: string }[] = [
  { icon: Receipt, accent: 'text-emerald-600', dot: 'bg-emerald-600', tint: 'bg-emerald-50', ring: 'ring-emerald-100' },
  { icon: FileText, accent: 'text-indigo-600', dot: 'bg-indigo-600', tint: 'bg-indigo-50', ring: 'ring-indigo-100' },
  { icon: ShieldCheck, accent: 'text-violet-600', dot: 'bg-violet-600', tint: 'bg-violet-50', ring: 'ring-violet-100' },
];

const recentDownloads = [
  { name: 'Carta laboral', date: '12 mar 2026' },
  { name: 'Certificado de ingresos y retenciones 2025', date: '15 feb 2026' },
  { name: 'Comprobante de nómina · febrero', date: '28 feb 2026' },
];

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function CertificationsView({ onNavigate }: ViewProps) {
  const handleDownload = (title: string) => {
    toast.success('Documento listo', {
      description: `${title} · descarga iniciada en segundos.`,
    });
  };

  return (
    <div className="space-y-12">
      {/* HERO — promesa: tus documentos, sin filas */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[30px] bg-ink p-7 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-gef-green/25 blur-3xl" />
        <div className="relative z-[2] max-w-xl">
          <Eyebrow className="text-gef-glow">Certificaciones</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.04] tracking-tightish text-balance sm:text-[2.6rem]">
            Tus documentos, listos cuando los necesitas.
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">
            Descarga directa, sin filas ni correos. Carta laboral, comprobantes y certificados — generados al instante.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/85 ring-1 ring-white/15 backdrop-blur-sm">
            <Clock3 size={15} className="text-gef-glow" />
            Disponibles 24/7
          </div>
        </div>
      </motion.section>

      {/* DOCUMENTOS — descarga directa */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Descarga directa"
          title="Genera y descarga"
          actionLabel="Ir a Mi nómina"
          onAction={() => onNavigate('payroll')}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificationCards.map((card, i) => {
            const style = CARD_STYLE[i % CARD_STYLE.length];
            const Icon = style.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col rounded-[26px] bg-white p-6 ring-1 ring-line transition-shadow hover:shadow-lift"
              >
                <span
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-2xl ring-1',
                    style.tint,
                    style.ring,
                    style.accent,
                  )}
                >
                  <Icon size={22} />
                </span>
                <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">
                  <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />
                  {card.status}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tightish text-ink">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{card.body}</p>
                <button
                  onClick={() => handleDownload(card.title)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
                >
                  <Download size={15} />
                  {card.action}
                </button>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* DESCARGAS RECIENTES */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Historial" title="Tus descargas recientes" />
        <div className="overflow-hidden rounded-[26px] bg-white ring-1 ring-line shadow-soft">
          {recentDownloads.map((item, i) => (
            <div
              key={item.name}
              className={cn(
                'flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-paper-2/60',
                i !== 0 && 'border-t border-line',
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-ink-soft">
                  <FileText size={16} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-ink-mute">{item.date}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(item.name)}
                aria-label={`Descargar ${item.name}`}
                className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-ink hover:text-paper"
              >
                <Download size={15} />
                <span className="hidden sm:inline">Descargar</span>
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      <footer className="flex items-center gap-2 pt-2 text-xs text-ink-mute">
        <ArrowRight size={13} />
        ¿Necesitas otro documento? Pídelo desde el asistente de Crystal.
      </footer>
    </div>
  );
}
