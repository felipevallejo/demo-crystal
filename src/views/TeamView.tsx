import { useMemo } from 'react';
import { Network } from 'lucide-react';
import { orgNodes } from '../data/portal';
import type { MaturityId } from '../types/app';

const orgRoot = orgNodes[0];
const orgLead = orgNodes[1];
const orgPeers = orgNodes.slice(2, 4);
const orgTeam = orgNodes.slice(4);

/* Timeline data — next 6 months of team events */
const timelineMonths = ['Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'];
const timelineEvents = [
  { name: 'Camilo Restrepo', type: 'vacaciones' as const, startMonth: 0, startWeek: 1, weeks: 2 },
  { name: 'Hugo E. Munoz', type: 'ausencia' as const, startMonth: 0, startWeek: 0, weeks: 1 },
  { name: 'Laura Giraldo', type: 'vacaciones' as const, startMonth: 1, startWeek: 2, weeks: 3 },
  { name: 'Liliana M. Londoño', type: 'ausencia' as const, startMonth: 2, startWeek: 0, weeks: 1 },
  { name: 'Andres F. Mora', type: 'vacaciones' as const, startMonth: 3, startWeek: 1, weeks: 2 },
  { name: 'Camilo Restrepo', type: 'vacaciones' as const, startMonth: 5, startWeek: 0, weeks: 2 },
];

const totalWeeks = timelineMonths.length * 4;

export function TeamView({ stage: _stage }: { stage: MaturityId }) {
  void _stage;
  const absences = useMemo(
    () => [
      { name: 'Hugo E. Munoz', reason: 'Incapacidad medica', until: '4 de abril' },
      { name: 'Liliana M. Londoño', reason: 'Permiso personal', until: 'Hoy' },
    ],
    [],
  );

  const upcomingVacations = useMemo(
    () => [{ name: 'Camilo Restrepo', dates: '7 — 18 de abril', days: 10 }],
    [],
  );

  return (
    <div className="space-y-8">
      {/* Resumen: quienes estan ausentes y quienes salen de vacaciones */}
      <section className="flex flex-col gap-4 lg:flex-row">
        {/* Ausencias */}
        <div className="flex-1 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Ausencias hoy</p>
          <div className="mt-3 space-y-2">
            {absences.map((a) => (
              <div key={a.name} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-amber-900">{a.name}</p>
                  <p className="text-xs text-amber-700">{a.reason}</p>
                </div>
                <span className="shrink-0 text-xs text-amber-600">Hasta {a.until}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vacaciones proximas */}
        <div className="flex-1 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Vacaciones proximas</p>
          <div className="mt-3 space-y-2">
            {upcomingVacations.map((v) => (
              <div key={v.name} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-emerald-900">{v.name}</p>
                  <p className="text-xs text-emerald-700">{v.dates}</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-200 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">{v.days} días</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organigrama desktop — directo sobre fondo */}
      <section className="hidden lg:block">
        <div className="mb-4 flex items-center gap-2">
          <Network size={16} className="text-slate-400" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Organigrama</p>
        </div>

        <div className="flex flex-col items-center">
          {/* Jefe */}
          <div className="w-full max-w-[240px] rounded-[24px] bg-white px-5 py-5 text-center ring-1 ring-slate-200 shadow-sm">
            <img src={orgRoot.photo} alt={orgRoot.name} className="mx-auto h-14 w-14 rounded-[20px] object-cover" />
            <p className="mt-3 font-semibold text-slate-950">{orgRoot.name}</p>
            <p className="mt-1 text-sm text-slate-500">{orgRoot.role}</p>
            <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{orgRoot.level}</span>
          </div>

          <div className="h-8 w-px bg-slate-300" />

          {/* Fila: par — tu — par */}
          <div className="relative w-full max-w-[960px]">
            <div className="absolute left-[16.67%] right-[16.67%] top-0 h-px bg-slate-300" />
            <div className="grid grid-cols-3 gap-6">
              {/* Par izquierdo */}
              <div className="flex flex-col items-center">
                <div className="h-8 w-px bg-slate-300" />
                <div className="w-full max-w-[220px] rounded-[24px] bg-white px-4 py-4 text-center ring-1 ring-slate-200 shadow-sm">
                  <img src={orgPeers[0].photo} alt={orgPeers[0].name} className="mx-auto h-14 w-14 rounded-[20px] object-cover" />
                  <p className="mt-3 font-semibold text-slate-950">{orgPeers[0].name}</p>
                  <p className="mt-1 text-sm text-slate-500">{orgPeers[0].role}</p>
                  <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{orgPeers[0].level}</span>
                </div>
              </div>

              {/* Tu posicion */}
              <div className="flex flex-col items-center">
                <div className="h-8 w-px bg-slate-300" />
                <div className="relative w-full max-w-[280px] rounded-[28px] bg-slate-950 px-5 py-5 text-center text-white shadow-lg shadow-slate-950/30">
                  <div className="absolute inset-x-8 top-0 h-px bg-white/10" />
                  <img src={orgLead.photo} alt={orgLead.name} className="mx-auto h-16 w-16 rounded-[22px] object-cover ring-3 ring-white/10" />
                  <p className="mt-3 text-base font-semibold">{orgLead.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{orgLead.role}</p>
                  <span className="mt-2 inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">Tu posicion</span>
                </div>
              </div>

              {/* Par derecho */}
              <div className="flex flex-col items-center">
                <div className="h-8 w-px bg-slate-300" />
                <div className="w-full max-w-[220px] rounded-[24px] bg-white px-4 py-4 text-center ring-1 ring-slate-200 shadow-sm">
                  <img src={orgPeers[1].photo} alt={orgPeers[1].name} className="mx-auto h-14 w-14 rounded-[20px] object-cover" />
                  <p className="mt-3 font-semibold text-slate-950">{orgPeers[1].name}</p>
                  <p className="mt-1 text-sm text-slate-500">{orgPeers[1].role}</p>
                  <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{orgPeers[1].level}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-300" />

          {/* Equipo directo */}
          <div className="relative w-full max-w-[980px]">
            <div className="absolute left-[10%] right-[10%] top-0 h-px bg-slate-200" />
            <div className="grid grid-cols-5 gap-4">
              {orgTeam.map((node) => (
                <div key={node.name} className="flex flex-col items-center">
                  <div className="h-8 w-px bg-slate-200" />
                  <div className="w-full rounded-[22px] bg-white px-3 py-4 text-center ring-1 ring-slate-200 shadow-sm transition-shadow hover:shadow-md">
                    <img src={node.photo} alt={node.name} className="mx-auto h-12 w-12 rounded-2xl object-cover" />
                    <p className="mt-3 text-sm font-semibold text-slate-950">{node.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{node.role}</p>
                    <span className="mt-2 inline-flex rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700">{node.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organigrama mobile — lista */}
      <section className="grid gap-3 lg:hidden">
        {[orgRoot, ...orgPeers, orgLead, ...orgTeam].map((node) => (
          <div key={node.name} className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 ring-1 ring-slate-200">
            <img src={node.photo} alt={node.name} className="h-12 w-12 shrink-0 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-semibold text-slate-950">{node.name}</p>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">{node.level}</span>
              </div>
              <p className="mt-0.5 truncate text-sm text-slate-500">{node.role}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Linea de tiempo — planificacion de equipo */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Linea de tiempo del equipo</p>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white p-4 ring-1 ring-slate-200 sm:p-5">
          {/* Meses */}
          <div className="flex border-b border-slate-100 pb-2">
            <div className="w-[140px] shrink-0" />
            {timelineMonths.map((m) => (
              <div key={m} className="flex-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                {m}
              </div>
            ))}
          </div>

          {/* Semanas grid lines */}
          <div className="relative">
            {/* Vertical week lines */}
            <div className="pointer-events-none absolute inset-0 flex" style={{ paddingLeft: '140px' }}>
              {Array.from({ length: totalWeeks }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 border-r border-slate-50"
                  style={i % 4 === 0 ? { borderRightColor: 'rgb(226 232 240)' } : undefined}
                />
              ))}
            </div>

            {/* Event rows */}
            <div className="relative space-y-1.5 pt-3">
              {timelineEvents.map((event, idx) => {
                const startCell = event.startMonth * 4 + event.startWeek;
                const leftPct = (startCell / totalWeeks) * 100;
                const widthPct = (event.weeks / totalWeeks) * 100;
                const isVacation = event.type === 'vacaciones';

                return (
                  <div key={`${event.name}-${idx}`} className="flex h-9 items-center">
                    <div className="w-[140px] shrink-0 truncate pr-3 text-sm text-slate-600">{event.name}</div>
                    <div className="relative flex-1">
                      <div
                        className={`absolute top-1 h-7 rounded-lg text-xs font-medium leading-7 px-2.5 truncate ${
                          isVacation
                            ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200'
                            : 'bg-amber-100 text-amber-800 ring-1 ring-amber-200'
                        }`}
                        style={{ left: `${leftPct}%`, width: `${widthPct}%`, minWidth: '60px' }}
                      >
                        {isVacation ? 'Vacaciones' : 'Ausencia'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leyenda */}
          <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-emerald-200 ring-1 ring-emerald-300" />
              <span className="text-xs text-slate-500">Vacaciones</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-amber-200 ring-1 ring-amber-300" />
              <span className="text-xs text-slate-500">Ausencia</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
