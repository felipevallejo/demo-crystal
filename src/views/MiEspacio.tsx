import { useState } from 'react';
import NumberFlow from '@number-flow/react';
import { Plane, Landmark, HandCoins, Receipt, FileSignature, FileText, Gift, ArrowRight, Download, Eye, EyeOff } from 'lucide-react';
import { empleado } from '../data/portal';
import type { ViewProps } from '../types/app';
import { Eyebrow, StatNumber } from '../components/ui';
import { cn } from '../lib/cn';

const docs = [
  { id: 'colilla', icon: Receipt, title: 'Colilla de junio', sub: 'Quincena en curso · lista', tint: 'bg-blue-50 text-blue-700' },
  { id: 'carta-laboral', icon: FileSignature, title: 'Certificación laboral', sub: 'Con corte de hoy · PDF', tint: 'bg-violet-50 text-violet-700' },
  { id: 'cir', icon: FileText, title: 'Ingresos y retenciones', sub: 'Año gravable 2025 · PDF', tint: 'bg-amber-50 text-amber-700' },
];

/** Monto sensible: difuminado por defecto, se revela inline al tocar (con animación). */
function Money({ amount, dark }: { amount: number; dark?: boolean }) {
  const [shown, setShown] = useState(false);
  const muted = dark ? 'text-white/60' : 'text-ink-mute';
  return (
    <button
      onClick={() => setShown((v) => !v)}
      className="mt-3 flex items-center gap-2 text-left"
      aria-label={shown ? 'Ocultar saldo' : 'Mostrar saldo'}
    >
      <span
        className={cn(
          'font-display text-xl font-extrabold tracking-tightish transition-all duration-300',
          dark ? 'text-white' : 'text-ink',
          !shown && 'select-none blur-[7px]',
        )}
      >
        {shown ? (
          <>
            $<NumberFlow value={amount} locales="es-CO" />
          </>
        ) : (
          `$${amount.toLocaleString('es-CO')}`
        )}
      </span>
      {shown ? <EyeOff size={14} className={muted} /> : <Eye size={14} className={muted} />}
    </button>
  );
}

export function MiEspacio({ onOpenService }: ViewProps) {
  return (
    <div className="space-y-7">
      {/* identidad */}
      <section className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl signature-grad text-base font-bold text-white">
          {empleado.nombre.split(' ').map((p) => p[0]).slice(0, 2).join('')}
        </span>
        <div>
          <h1 className="font-display text-xl font-extrabold leading-tight tracking-tightish text-ink">{empleado.nombre}</h1>
          <p className="text-xs text-ink-soft">{empleado.cargo} · {empleado.sociedad} · CD Itagüí</p>
        </div>
      </section>

      {/* tu resumen — dato en vivo, consumible */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <Eyebrow>Tu resumen</Eyebrow>
          <span className="text-[10px] font-semibold text-ink-mute">actualizado hoy</span>
        </div>

        {/* vacaciones — héroe (no sensible) */}
        <button
          onClick={() => onOpenService('vacaciones')}
          className="relative mb-2.5 flex w-full items-center overflow-hidden rounded-xl signature-grad px-5 py-5 text-left text-white shadow-soft"
        >
          <Plane size={120} className="pointer-events-none absolute -right-6 -top-5 text-white/10" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Vacaciones disponibles</p>
            <p className="mt-1 font-display text-4xl font-extrabold tracking-tightish">
              <StatNumber value={12} suffix=" días" />
            </p>
            <p className="mt-1 text-sm text-white/85">4 días vencen en julio</p>
          </div>
          <ArrowRight size={20} className="relative ml-auto text-white/80" />
        </button>

        {/* cesantías + préstamo — sensibles, difuminados */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex flex-col rounded-xl bg-[#000078] px-4 py-4 text-white shadow-soft">
            <Landmark size={18} className="text-white/70" />
            <Money amount={8450000} dark />
            <button onClick={() => onOpenService('cesantias')} className="mt-0.5 text-left text-[11px] text-white/75">
              Cesantías · corte 31 may
            </button>
          </div>
          <div className="flex flex-col rounded-xl border border-line bg-paper-2 px-4 py-4">
            <HandCoins size={18} className="text-ink-soft" />
            <Money amount={1280000} />
            <button onClick={() => onOpenService('prestamos')} className="mt-0.5 text-left text-[11px] text-ink-mute">
              Préstamo · 18/24 cuotas
            </button>
          </div>
        </div>
        <p className="mt-2 px-1 text-[10px] leading-snug text-ink-mute">
          Tus saldos están ocultos por privacidad. Tócalos para verlos solo cuando quieras.
        </p>
      </section>

      {/* tus documentos — descarga, consumible */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <Eyebrow>Tus documentos</Eyebrow>
          <span className="text-[10px] font-semibold text-ink-mute">listos para descargar</span>
        </div>
        <div className="space-y-2">
          {docs.map((d) => (
            <button
              key={d.id}
              onClick={() => onOpenService(d.id)}
              className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3.5 text-left shadow-soft"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${d.tint}`}>
                <d.icon size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{d.title}</p>
                <p className="truncate text-xs text-ink-mute">{d.sub}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink text-paper">
                <Download size={16} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* beneficios para ti — editorial, segmentado */}
      <section>
        <Eyebrow>Para ti</Eyebrow>
        <button
          onClick={() => onOpenService('beneficios')}
          className="relative mt-3 flex h-36 w-full items-end overflow-hidden rounded-xl text-left shadow-soft"
        >
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
          <div className="relative p-4 text-white">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur">
              <Gift size={11} /> Pacto colectivo
            </span>
            <p className="mt-2 font-display text-lg font-extrabold leading-tight tracking-tightish">Beneficios para tu gente</p>
            <p className="text-xs text-white/85">Auxilio de estudio, lentes y montura, y más para operativos.</p>
          </div>
        </button>
      </section>

      {/* normas y formatos — repositorio, calmado */}
      <section>
        <Eyebrow>Consulta y formatos</Eyebrow>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onOpenService('normas')}
            className="rounded-xl border border-line bg-white px-4 py-4 text-left shadow-soft"
          >
            <p className="text-sm font-bold text-ink">Normas y políticas</p>
            <p className="mt-1 text-xs text-ink-mute">Reglamento, conducta, higiene y seguridad</p>
          </button>
          <button
            onClick={() => onOpenService('formatos')}
            className="rounded-xl border border-line bg-white px-4 py-4 text-left shadow-soft"
          >
            <p className="text-sm font-bold text-ink">Formatos</p>
            <p className="mt-1 text-xs text-ink-mute">Auxilios, reportes y solicitudes</p>
          </button>
        </div>
        <p className="mt-3 px-1 text-[11px] leading-snug text-ink-mute">
          Todo lo tuyo en un solo lugar, siempre a la mano.
        </p>
      </section>

      <div className="h-2" />
    </div>
  );
}
