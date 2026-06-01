import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Eye,
  Network,
  Sparkles,
  Users,
} from 'lucide-react';
import { orgNodes, roleMeta, teamHighlights, teamMembers } from '../data/portal';
import type { ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { Eyebrow, SectionHeading, StatNumber, Tag } from '../components/v3/ui';

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

/** Tinte suave según el estado del colaborador (sin montos, solo presencia). */
function statusTint(status: string): string {
  const s = status.toLowerCase();
  if (s.includes('vacacion')) return 'bg-emerald-50 text-emerald-700 ring-emerald-100';
  if (s.includes('incapacidad') || s.includes('ausen')) return 'bg-amber-50 text-amber-700 ring-amber-100';
  if (s.includes('solicit')) return 'bg-indigo-50 text-indigo-700 ring-indigo-100';
  return 'bg-paper-2 text-ink-soft ring-line';
}

const orgRoot = orgNodes[0];
const orgLead = orgNodes[1];
const orgPeers = orgNodes.slice(2, 4);
const orgTeam = orgNodes.slice(4);

export function TeamView({ role, onNavigate }: ViewProps) {
  const profile = roleMeta.leader;
  const isLeader = role === 'leader';

  return (
    <div className="space-y-14">
      {/* 1 — HERO DE LIDERAZGO */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[34px] signature-grad p-6 text-white shadow-lift sm:p-10"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-[2] max-w-2xl">
          <Eyebrow className="text-white/70">
            {isLeader ? 'Mi equipo · cabina de liderazgo' : 'Liderazgo · vista de referencia'}
          </Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.02] tracking-tightish text-balance sm:text-5xl">
            {isLeader
              ? `Las personas de ${profile.employeeName.split(' ')[0]}, en un solo lugar.`
              : 'Así se ve liderar un equipo en Crystal.'}
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/80 sm:text-base">
            {isLeader
              ? 'Quién está, quién descansa y qué necesita tu mirada esta semana — sin perseguir correos ni sistemas.'
              : 'Cuando lideres un equipo, aquí verás a tu gente, el organigrama y los temas que requieren acompañamiento.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
              <Users size={15} />
              <StatNumber value={teamMembers.length} suffix=" personas" />
            </span>
            <button
              onClick={() => onNavigate('people')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
            >
              Ver directorio <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.section>

      {/* 2 — ATENCIÓN DEL LÍDER */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Atención del líder"
          title="Lo que requiere tu mirada"
          actionLabel="Ir a vacaciones"
          onAction={() => onNavigate('vacations')}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {teamHighlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.article
                key={h.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="flex flex-col gap-3 rounded-[24px] bg-white p-6 ring-1 ring-line transition-shadow hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-paper-2 text-gef-green">
                  <Icon size={20} />
                </span>
                <p className="font-display text-lg font-semibold tracking-tightish text-ink">{h.title}</p>
                <p className="text-sm leading-relaxed text-ink-soft">{h.body}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      {/* 3 — TARJETAS DEL EQUIPO */}
      <motion.section {...fade}>
        <SectionHeading
          eyebrow="Mi gente"
          title="El equipo, persona a persona"
          actionLabel="Ver directorio"
          onAction={() => onNavigate('people')}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {teamMembers.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex items-start gap-4 rounded-[26px] bg-white p-5 ring-1 ring-line transition-shadow hover:shadow-lift sm:p-6"
            >
              <img
                src={m.photo}
                alt={m.name}
                className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-line"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-semibold tracking-tightish text-ink">
                      {m.name}
                    </p>
                    <p className="truncate text-sm text-ink-soft">
                      {m.role} · {m.area}
                    </p>
                  </div>
                  <Tag className={cn('shrink-0', statusTint(m.status))}>{m.status}</Tag>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute">{m.note}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* 4 — MINI ORGANIGRAMA */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Estructura" title="Dónde encaja tu equipo" />

        {/* Desktop — organigrama editorial */}
        <div className="hidden rounded-[30px] bg-white p-8 ring-1 ring-line shadow-soft lg:block">
          <div className="mb-6 flex items-center gap-2">
            <Network size={15} className="text-ink-mute" />
            <Eyebrow>Organigrama</Eyebrow>
          </div>

          <div className="flex flex-col items-center">
            {/* Raíz */}
            <div className="w-full max-w-[240px] rounded-[24px] bg-paper-2 px-5 py-5 text-center ring-1 ring-line">
              <img src={orgRoot.photo} alt={orgRoot.name} className="mx-auto h-14 w-14 rounded-[20px] object-cover" />
              <p className="mt-3 font-semibold text-ink">{orgRoot.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{orgRoot.role}</p>
              <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-soft ring-1 ring-line">
                {orgRoot.level}
              </span>
            </div>

            <div className="h-8 w-px bg-line" />

            {/* Fila par — líder — par */}
            <div className="relative w-full max-w-[960px]">
              <div className="absolute left-[16.67%] right-[16.67%] top-0 h-px bg-line" />
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-px bg-line" />
                  <div className="w-full max-w-[220px] rounded-[24px] bg-white px-4 py-4 text-center ring-1 ring-line shadow-soft">
                    <img src={orgPeers[0].photo} alt={orgPeers[0].name} className="mx-auto h-14 w-14 rounded-[20px] object-cover" />
                    <p className="mt-3 font-semibold text-ink">{orgPeers[0].name}</p>
                    <p className="mt-1 text-sm text-ink-soft">{orgPeers[0].role}</p>
                    <span className="mt-2 inline-flex rounded-full bg-paper-2 px-3 py-1 text-xs font-semibold text-ink-soft">
                      {orgPeers[0].level}
                    </span>
                  </div>
                </div>

                {/* Posición del líder — destacada */}
                <div className="flex flex-col items-center">
                  <div className="h-8 w-px bg-line" />
                  <div className="grain relative w-full max-w-[280px] overflow-hidden rounded-[28px] bg-ink px-5 py-5 text-center text-white shadow-lift">
                    <img
                      src={orgLead.photo}
                      alt={orgLead.name}
                      className="mx-auto h-16 w-16 rounded-[22px] object-cover ring-2 ring-white/20"
                    />
                    <p className="mt-3 text-base font-semibold">{orgLead.name}</p>
                    <p className="mt-1 text-sm text-white/60">{orgLead.role}</p>
                    <span className="mt-2 inline-flex rounded-full bg-gef-green/20 px-3 py-1 text-xs font-semibold text-gef-glow">
                      {isLeader ? 'Tu posición' : 'Líder del equipo'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-8 w-px bg-line" />
                  <div className="w-full max-w-[220px] rounded-[24px] bg-white px-4 py-4 text-center ring-1 ring-line shadow-soft">
                    <img src={orgPeers[1].photo} alt={orgPeers[1].name} className="mx-auto h-14 w-14 rounded-[20px] object-cover" />
                    <p className="mt-3 font-semibold text-ink">{orgPeers[1].name}</p>
                    <p className="mt-1 text-sm text-ink-soft">{orgPeers[1].role}</p>
                    <span className="mt-2 inline-flex rounded-full bg-paper-2 px-3 py-1 text-xs font-semibold text-ink-soft">
                      {orgPeers[1].level}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-line" />

            {/* Equipo directo */}
            <div className="relative w-full max-w-[980px]">
              <div className="absolute left-[10%] right-[10%] top-0 h-px bg-line" />
              <div className="grid grid-cols-5 gap-4">
                {orgTeam.map((node) => (
                  <div key={node.name} className="flex flex-col items-center">
                    <div className="h-8 w-px bg-line" />
                    <div className="w-full rounded-[22px] bg-white px-3 py-4 text-center ring-1 ring-line transition-shadow hover:shadow-soft">
                      <img src={node.photo} alt={node.name} className="mx-auto h-12 w-12 rounded-2xl object-cover" />
                      <p className="mt-3 text-sm font-semibold text-ink">{node.name}</p>
                      <p className="mt-1 text-xs text-ink-soft">{node.role}</p>
                      <span className="mt-2 inline-flex rounded-full bg-cyan-50 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-800 ring-1 ring-cyan-100">
                        {node.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — lista apilada */}
        <div className="grid gap-3 lg:hidden">
          {[orgRoot, ...orgPeers, orgLead, ...orgTeam].map((node) => {
            const isLead = node.name === orgLead.name;
            return (
              <div
                key={node.name}
                className={cn(
                  'flex items-center gap-4 rounded-[22px] px-4 py-4 ring-1',
                  isLead ? 'bg-ink text-white ring-white/10' : 'bg-white ring-line',
                )}
              >
                <img
                  src={node.photo}
                  alt={node.name}
                  className={cn('h-12 w-12 shrink-0 rounded-2xl object-cover', isLead && 'ring-2 ring-white/20')}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn('truncate font-semibold', isLead ? 'text-white' : 'text-ink')}>{node.name}</p>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                        isLead ? 'bg-gef-green/20 text-gef-glow' : 'bg-paper-2 text-ink-soft',
                      )}
                    >
                      {isLead && isLeader ? 'Tú' : node.level}
                    </span>
                  </div>
                  <p className={cn('mt-0.5 truncate text-sm', isLead ? 'text-white/60' : 'text-ink-soft')}>
                    {node.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* 5 — CIERRE: acompañamiento del líder */}
      <motion.section
        {...fade}
        className="grain overflow-hidden rounded-[30px] bg-ink p-7 text-white shadow-lift sm:p-9"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <Eyebrow className="flex items-center gap-1.5 text-gef-glow">
              <Sparkles size={13} /> Liderar es acompañar
            </Eyebrow>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tightish">
              {isLeader
                ? 'Tu mirada hace la diferencia esta semana.'
                : 'Liderar en Crystal es cuidar a las personas.'}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Revisa solicitudes, anticipa ausencias y mantén al equipo respirado. Crystal te avisa lo importante;
              tú pones la cercanía.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('vacations')}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <Eye size={14} /> Revisar solicitudes
            </button>
            <button
              onClick={() => onNavigate('comms')}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
            >
              Comunicar al equipo <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </motion.section>

      <footer className="flex items-center gap-2 pt-2 text-xs text-ink-mute">
        <CalendarDays size={13} />
        Espacio Crystal · prototipo v3 · vista de liderazgo
      </footer>
    </div>
  );
}
