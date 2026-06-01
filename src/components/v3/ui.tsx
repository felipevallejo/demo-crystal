import type { ReactNode } from 'react';
import NumberFlow from '@number-flow/react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';

/** Etiqueta pequeña en mayúsculas con tracking amplio (eyebrow editorial). */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-[11px] font-semibold uppercase tracking-[0.32em] text-ink-mute', className)}>
      {children}
    </p>
  );
}

/** Encabezado de sección: eyebrow + título display + acción opcional. */
export function SectionHeading({
  eyebrow,
  title,
  actionLabel,
  onAction,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div className={cn('mb-6 flex items-end justify-between gap-4', className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2 font-display text-2xl font-semibold leading-[1.05] tracking-tightish text-ink sm:text-[1.75rem]">
          {title}
        </h2>
      </div>
      {actionLabel && onAction ? (
        <button
          onClick={onAction}
          className="group hidden shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink sm:inline-flex"
        >
          {actionLabel}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : null}
    </div>
  );
}

/** Número animado (number-flow) con respeto a reduce-motion. */
export function StatNumber({
  value,
  suffix,
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  return (
    <span className={cn('tabular-nums', className)}>
      <NumberFlow value={value} />
      {suffix}
    </span>
  );
}

/** Pill / tag con tinte (clases ring/bg/text). */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Contenedor de ícono redondeado. */
export function IconTile({
  icon: Icon,
  className,
  size = 18,
}: {
  icon: LucideIcon;
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn('flex items-center justify-center rounded-2xl', className)}>
      <Icon size={size} />
    </span>
  );
}

