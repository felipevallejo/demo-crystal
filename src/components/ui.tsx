import type { ReactNode } from 'react';
import NumberFlow from '@number-flow/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/cn';
import { kindMeta, fuenteMeta } from '../data/portal';
import type { EspacioService, ServiceKind } from '../types/app';

/** Eyebrow editorial en mayúsculas. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-[10px] font-bold uppercase tracking-[0.28em] text-ink-mute', className)}>
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-1.5 font-display text-lg font-bold tracking-tightish text-ink">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function StatNumber({ value, suffix, className }: { value: number; suffix?: string; className?: string }) {
  return (
    <span className={cn('tabular-nums', className)}>
      <NumberFlow value={value} />
      {suffix}
    </span>
  );
}

/** Tag del tipo de servicio. */
export function KindTag({ kind, className }: { kind: ServiceKind; className?: string }) {
  const m = kindMeta[kind];
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ring-1', m.tint, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', m.dot)} />
      {m.label}
    </span>
  );
}

/** Chip de procedencia del dato. */
export function FuenteChip({ fuente }: { fuente: EspacioService['fuente'] }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-ink-mute" title={fuenteMeta[fuente].hint}>
      <span className="h-1 w-1 rounded-full bg-ink-mute/60" />
      {fuenteMeta[fuente].label}
    </span>
  );
}

/** Tarjeta editorial (esquinas suaves, hairline). */
export function Card({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const Comp = onClick ? 'button' : 'div';
  return (
    <Comp
      onClick={onClick}
      className={cn(
        'block w-full rounded-lg border border-line bg-white text-left',
        onClick && 'transition-colors hover:border-ink/20 active:scale-[0.995]',
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export function IconBox({ icon: Icon, className, size = 18 }: { icon: LucideIcon; className?: string; size?: number }) {
  return (
    <span className={cn('flex shrink-0 items-center justify-center rounded-lg', className)}>
      <Icon size={size} />
    </span>
  );
}
