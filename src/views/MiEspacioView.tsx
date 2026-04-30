import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  IdCard,
  Wallet,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  additionalInfoCategories,
  profileSections,
  roleMeta,
} from '../data/portal';
import type { RoleId, TabId } from '../types/app';
import { cn } from '../lib/cn';

type MiEspacioViewProps = {
  role: RoleId;
  onNavigate: (tab: TabId) => void;
};

const QUICK_ACTIONS: { label: string; tab: TabId; icon: typeof Download; tone: string }[] = [
  { label: 'Descargar colilla', tab: 'payroll', icon: Download, tone: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  { label: 'Generar carta laboral', tab: 'certifications', icon: FileText, tone: 'bg-sky-50 text-sky-700 ring-sky-200' },
  { label: 'Solicitar vacaciones', tab: 'vacations', icon: Calendar, tone: 'bg-amber-50 text-amber-700 ring-amber-200' },
  { label: 'Actualizar mis datos', tab: 'profile', icon: IdCard, tone: 'bg-violet-50 text-violet-700 ring-violet-200' },
];

const MIS_COSAS = [
  {
    label: 'Próximo pago',
    value: 'Lista la quincena',
    detail: '30 de abril · ábrelo en Mi nómina',
    tab: 'payroll' as TabId,
    icon: Wallet,
    tone: 'from-emerald-50 to-white ring-emerald-100',
  },
  {
    label: 'Vacaciones disponibles',
    value: '12 días',
    detail: '4 vencen en mayo',
    tab: 'vacations' as TabId,
    icon: Calendar,
    tone: 'from-sky-50 to-white ring-sky-100',
  },
  {
    label: 'Perfil al día',
    value: '78%',
    detail: '2 secciones por completar',
    tab: 'profile' as TabId,
    icon: IdCard,
    tone: 'from-rose-50 to-white ring-rose-100',
  },
];

export function MiEspacioView({ role, onNavigate }: MiEspacioViewProps) {
  const completionPct = 78;
  const profile = roleMeta[role];

  return (
    <div className="space-y-7">
      {/* Estado del perfil */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-4 rounded-[24px] bg-white p-5 ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <div className="flex items-center gap-4">
          <img
            src={role === 'leader' ? 'https://i.pravatar.cc/160?img=32' : 'https://i.pravatar.cc/160?img=15'}
            alt={profile.employeeName}
            className="h-14 w-14 rounded-2xl object-cover"
          />
          <div>
            <p className="text-base font-semibold text-slate-950">{profile.employeeName}</p>
            <p className="text-sm text-slate-500">{profile.jobTitle} · {profile.location}</p>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">Perfil al día</p>
          <div className="mt-1 flex items-center gap-3 sm:justify-end">
            <p className="text-2xl font-semibold tracking-tight text-slate-950">{completionPct}%</p>
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100 sm:w-40">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mis cosas */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Mis cosas</p>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            Ver todos los servicios <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {MIS_COSAS.map((c) => {
            const Icon = c.icon;
            return (
              <motion.button
                key={c.label}
                onClick={() => onNavigate(c.tab)}
                whileHover={{ y: -3 }}
                className={cn(
                  'rounded-[24px] bg-gradient-to-br p-5 text-left ring-1 transition-shadow hover:shadow-lg hover:shadow-slate-200/60',
                  c.tone,
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                  <Icon size={16} />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">{c.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">{c.value}</p>
                <p className="mt-1 text-xs text-slate-500">{c.detail}</p>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Acciones rápidas */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Acciones rápidas</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map(({ label, tab, icon: Icon, tone }) => (
            <button
              key={label}
              onClick={() => onNavigate(tab)}
              className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left ring-1 ring-slate-200 transition-shadow hover:shadow-md"
            >
              <span
                className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1', tone)}
              >
                <Icon size={16} />
              </span>
              <span className="text-sm font-medium text-slate-700">{label}</span>
              <ArrowRight size={14} className="ml-auto shrink-0 text-slate-300" />
            </button>
          ))}
        </div>
      </section>

      {/* Secciones del perfil */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Tu información personal</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {profileSections.map((section, i) => {
            const Icon = section.icon;
            const isComplete = section.status === 'Completo';
            return (
              <motion.button
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-4 rounded-[24px] bg-white p-5 text-left ring-1 ring-slate-200 transition-shadow hover:shadow-md"
              >
                <div
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
                    isComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600',
                  )}
                >
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
        </div>
      </section>

      {/* Información adicional */}
      <section className="rounded-[24px] bg-white p-5 ring-1 ring-slate-200 sm:p-6">
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
