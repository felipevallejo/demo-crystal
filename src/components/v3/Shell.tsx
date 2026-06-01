import { useMemo, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bell, ChevronRight, Home, Compass, Users, IdCard } from 'lucide-react';
import {
  findParentTab,
  getVisibleNavItems,
  roleMeta,
  tabLabels,
} from '../../data/portal';
import type { RoleId, TabId } from '../../types/app';
import { cn } from '../../lib/cn';
import { AssistantBar, AssistantFab } from './Assistant';

/* ----------------------------- marca ----------------------------- */

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center">
      <img
        src="/logo-crystal.png"
        alt="Crystal"
        className={compact ? 'h-7 w-auto' : 'h-auto w-full max-w-[200px]'}
      />
    </div>
  );
}

/* ----------------------------- sidebar (desktop) ----------------------------- */

export function Sidebar({
  role,
  activeTab,
  onNavigate,
}: {
  role: RoleId;
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
}) {
  const items = useMemo(() => getVisibleNavItems(role), [role]);
  const parent = findParentTab(activeTab);
  const profile = roleMeta[role];

  return (
    <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-line bg-paper/70 px-4 py-6 backdrop-blur lg:flex">
      <div className="px-1 pb-1">
        <Wordmark />
      </div>

      <nav className="mt-9 flex-1 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || parent === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-paper-2 hover:text-ink',
                )}
              >
                <Icon size={18} className={cn(isActive ? 'text-paper' : 'text-ink-mute group-hover:text-ink')} />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
              {item.children && (isActive || parent === item.id) ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="ml-5 mt-1 space-y-0.5 border-l border-line pl-3"
                >
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    const childActive = activeTab === child.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => onNavigate(child.id)}
                        className={cn(
                          'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors',
                          childActive ? 'text-gef-green' : 'text-ink-mute hover:text-ink',
                        )}
                      >
                        <ChildIcon size={15} />
                        {child.label}
                      </button>
                    );
                  })}
                </motion.div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-line">
        <span className="flex h-10 w-10 items-center justify-center rounded-full signature-grad text-sm font-semibold text-white">
          {profile.employeeName.split(' ').map((p) => p[0]).slice(0, 2).join('')}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{profile.employeeName}</p>
          <p className="truncate text-xs text-ink-mute">{profile.jobTitle}</p>
        </div>
      </div>
    </aside>
  );
}

/* ----------------------------- topbar ----------------------------- */

export function Topbar({
  role,
  activeTab,
  onNavigate,
}: {
  role: RoleId;
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
}) {
  const profile = roleMeta[role];
  const isHome = activeTab === 'home';
  const title = isHome ? `Hola, ${profile.employeeName.split(' ')[0]}.` : tabLabels[activeTab];

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/80 px-4 py-3.5 backdrop-blur-md sm:px-6 lg:px-10">
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <Wordmark compact />
        </div>
        <h1 className="hidden font-display text-xl font-semibold tracking-tightish text-ink lg:block">
          {title}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden w-[min(34vw,420px)] lg:block">
            <AssistantBar />
          </div>
          <button
            onClick={() => onNavigate('comms')}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink-soft ring-1 ring-line transition-colors hover:text-ink"
            aria-label="Notificaciones"
          >
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gef-green ring-2 ring-paper" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------- bottom nav (mobile) ----------------------------- */

const BOTTOM_LEFT: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'services', label: 'Servicios', icon: Compass },
];
const BOTTOM_RIGHT: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'people', label: 'Personas', icon: Users },
  { id: 'space', label: 'Mi espacio', icon: IdCard },
];

export function BottomNav({
  activeTab,
  onNavigate,
}: {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
}) {
  const parent = findParentTab(activeTab);
  const item = (i: { id: TabId; label: string; icon: typeof Home }) => {
    const Icon = i.icon;
    const active = activeTab === i.id || parent === i.id;
    return (
      <button
        key={i.id}
        onClick={() => onNavigate(i.id)}
        className={cn('flex flex-1 flex-col items-center gap-1 py-1', active ? 'text-gef-green' : 'text-ink-mute')}
      >
        <Icon size={21} />
        <span className="text-[10px] font-semibold">{i.label}</span>
      </button>
    );
  };
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center border-t border-line bg-paper/90 px-2 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md lg:hidden">
      {BOTTOM_LEFT.map(item)}
      <div className="flex flex-1 justify-center">
        <AssistantFab />
      </div>
      {BOTTOM_RIGHT.map(item)}
    </nav>
  );
}

/* ----------------------------- breadcrumb sub-tab (sub-vistas) ----------------------------- */

export function SubViewBar({
  activeTab,
  onNavigate,
}: {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
}) {
  const parent = findParentTab(activeTab);
  if (!parent) return null;
  return (
    <button
      onClick={() => onNavigate(parent)}
      className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mute transition-colors hover:text-ink"
    >
      {tabLabels[parent]}
      <ChevronRight size={14} />
      <span className="text-ink">{tabLabels[activeTab]}</span>
    </button>
  );
}

/* ----------------------------- layout ----------------------------- */

export function AppShell({
  role,
  activeTab,
  onNavigate,
  children,
}: {
  role: RoleId;
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} activeTab={activeTab} onNavigate={onNavigate} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar role={role} activeTab={activeTab} onNavigate={onNavigate} />
        <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-16">
          {children}
        </main>
        <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
