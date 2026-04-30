import { Download, FileText, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MaturityId } from '../types/app';

const certificates = [
  {
    title: 'Comprobante de nómina',
    detail: 'Colilla de marzo 2026',
    status: 'Disponible',
    action: 'Descargar colilla',
    icon: Receipt,
    accent: 'bg-emerald-50 ring-emerald-200 text-emerald-700',
    accentIcon: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Carta laboral',
    detail: 'Con cargo actual y fecha de ingreso',
    status: 'Generar',
    action: 'Generar carta',
    icon: FileText,
    accent: 'bg-sky-50 ring-sky-200 text-sky-700',
    accentIcon: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Certificado de ingresos y retenciones',
    detail: 'Ano gravable 2025',
    status: 'Disponible',
    action: 'Descargar certificado',
    icon: Download,
    accent: 'bg-violet-50 ring-violet-200 text-violet-700',
    accentIcon: 'bg-violet-100 text-violet-700',
  },
];

const recentDownloads = [
  { name: 'Carta laboral', date: '12 mar 2026' },
  { name: 'Colilla febrero 2026', date: '28 feb 2026' },
  { name: 'Certificado ingresos 2025', date: '15 feb 2026' },
];

export function CertificationsView({ stage: _stage }: { stage: MaturityId }) {
  void _stage;
  return (
    <div className="space-y-6">
      {/* Certificados disponibles */}
      <section className="grid gap-4 sm:grid-cols-3">
        {certificates.map((cert, i) => {
          const Icon = cert.icon;
          return (
            <motion.article
              key={cert.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-[28px] bg-white p-5 ring-1 ring-slate-200 transition-shadow hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${cert.accentIcon}`}>
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-950">{cert.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{cert.detail}</p>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
                <Download size={15} />
                {cert.action}
              </button>
            </motion.article>
          );
        })}
      </section>

      {/* Descargas recientes */}
      <section className="rounded-[28px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Descargas recientes</p>
        <div className="mt-3 divide-y divide-slate-100">
          {recentDownloads.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-700">{item.name}</p>
                <p className="text-xs text-slate-400">{item.date}</p>
              </div>
              <button className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                <Download size={15} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
