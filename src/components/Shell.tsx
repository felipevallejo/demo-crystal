import { type ReactNode } from 'react';
import { Home as HomeIcon, IdCard, Search, Bell } from 'lucide-react';
import { cn } from '../lib/cn';
import { APP_BRAND } from '../data/portal';
import type { ViewId } from '../types/app';

/* ----------------------------- header ----------------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-paper/90 px-4 py-3 backdrop-blur">
      <img src="/logo-crystal-sin-sas.png" alt={APP_BRAND} className="h-6 w-auto" />
      <button
        className="relative ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink-soft"
        aria-label="Notificaciones"
      >
        <Bell size={17} />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gef-green ring-2 ring-white" />
      </button>
    </header>
  );
}

/* ----------------------------- bottom nav (fijo al viewport) ----------------------------- */

function BottomNav({
  view,
  onNavigate,
  onOpenSearch,
}: {
  view: ViewId;
  onNavigate: (v: ViewId) => void;
  onOpenSearch: () => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center">
      <nav className="pointer-events-auto flex w-full max-w-[480px] items-center justify-around border-t border-line bg-paper/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
        <NavBtn active={view === 'home'} icon={HomeIcon} label="Inicio" onClick={() => onNavigate('home')} />
        <button
          onClick={onOpenSearch}
          className="-mt-7 flex h-14 w-14 flex-col items-center justify-center rounded-2xl signature-grad text-white shadow-lift"
          aria-label="Buscar"
        >
          <Search size={22} />
        </button>
        <NavBtn active={view === 'space'} icon={IdCard} label="Mi espacio" onClick={() => onNavigate('space')} />
      </nav>
    </div>
  );
}

function NavBtn({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof HomeIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn('flex w-20 flex-col items-center gap-1 py-1', active ? 'text-gef-green' : 'text-ink-mute')}
    >
      <Icon size={21} />
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

/* ----------------------------- layout (mobile-first real) ----------------------------- */

export function AppFrame({
  view,
  onNavigate,
  onOpenSearch,
  children,
}: {
  view: ViewId;
  onNavigate: (v: ViewId) => void;
  onOpenSearch: () => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-paper-2">
      {/* En móvil ocupa todo el ancho; en desktop se centra en una columna cómoda, sin disfraz de teléfono. */}
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col border-line bg-paper sm:border-x">
        <Header />
        <main className="flex-1 px-4 pb-28 pt-4">{children}</main>
      </div>
      <BottomNav view={view} onNavigate={onNavigate} onOpenSearch={onOpenSearch} />
    </div>
  );
}
