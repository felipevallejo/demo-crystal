import { useEffect, useMemo, useState } from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  findParentTab,
  getVisibleNavItems,
  parseRole,
  parseStage,
  parseTab,
  roleMeta,
  stageMeta,
  tabLabels,
} from './data/portal';
import { cn } from './lib/cn';
import type { MaturityId, RoleId, TabId } from './types/app';
import { SidebarChildren, SidebarItem, SidebarSubItem } from './components/SidebarItem';
import { CommandPalette } from './components/CommandPalette';
import { AssistantBubble } from './components/AssistantBubble';
import { DashboardView } from './views/DashboardView';
import { ComunicacionesView } from './views/ComunicacionesView';
import { PersonasView } from './views/PersonasView';
import { ServiciosView } from './views/ServiciosView';
import { ConocimientoView } from './views/ConocimientoView';
import { MiEspacioView } from './views/MiEspacioView';
import { PayrollView } from './views/PayrollView';
import { CertificationsView } from './views/CertificationsView';
import { VacationsView } from './views/VacationsView';
import { ProfileView } from './views/ProfileView';
import { TeamView } from './views/TeamView';
import { BenefitsView } from './views/BenefitsView';

function App() {
  const [activeRole] = useState<RoleId>(() =>
    typeof window === 'undefined' ? 'collaborator' : parseRole(window.location.search),
  );
  const [activeTab, setActiveTab] = useState<TabId>(() =>
    typeof window === 'undefined' ? 'home' : parseTab(window.location.search, parseRole(window.location.search)),
  );
  const [activeStage] = useState<MaturityId>(() =>
    typeof window === 'undefined' ? 'human' : parseStage(window.location.search),
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [isMac] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    return /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);
  });

  const visibleNavItems = useMemo(() => getVisibleNavItems(activeRole), [activeRole]);
  const activeProfile = roleMeta[activeRole];
  const parentOfActive = useMemo(() => findParentTab(activeTab), [activeTab]);

  const headerTitle = useMemo(() => {
    if (activeTab === 'home') {
      const h = new Date().getHours();
      const greeting = h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
      return `${greeting}, ${activeProfile.employeeName.split(' ')[0]}.`;
    }
    return tabLabels[activeTab];
  }, [activeTab, activeProfile.employeeName]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', activeTab);
    params.set('v', stageMeta[activeStage].urlValue);
    params.set('role', activeRole === 'leader' ? 'leader' : 'collaborator');
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [activeRole, activeStage, activeTab]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-canvas text-slate-900">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col border-r border-slate-200 bg-white/95 px-5 py-6 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
            mobileMenuOpen ? 'translate-x-0 shadow-2xl shadow-black/20' : '-translate-x-full',
          )}
        >
          <div className="flex items-center justify-between">
            <img src="/logo-crystal.png" alt="Crystal" className="h-9 w-auto" />
            <button className="rounded-full p-2 text-slate-500 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <nav className="mt-10 flex-1 space-y-1 overflow-y-auto">
            {visibleNavItems.map((item) => {
              const isParentActive = activeTab === item.id;
              const isInSection = parentOfActive === item.id;
              // Desktop: subitems siempre visibles. Mobile: solo cuando es la sección activa.
              const showChildrenDesktop = !!item.children;
              const showChildrenMobile = !!item.children && (isParentActive || isInSection);

              return (
                <div key={item.id}>
                  <SidebarItem
                    icon={item.icon}
                    label={item.label}
                    active={isParentActive}
                    inSection={!isParentActive && isInSection}
                    hasChildren={!!item.children}
                    expanded={showChildrenDesktop}
                    onClick={() => handleTabChange(item.id)}
                  />
                  {item.children ? (
                    <>
                      {/* Desktop: siempre */}
                      <div className="hidden lg:block">
                        <SidebarChildren visible={showChildrenDesktop}>
                          {item.children.map((child) => (
                            <SidebarSubItem
                              key={child.id}
                              icon={child.icon}
                              label={child.label}
                              active={activeTab === child.id}
                              onClick={() => handleTabChange(child.id)}
                            />
                          ))}
                        </SidebarChildren>
                      </div>
                      {/* Mobile: solo cuando es la sección activa */}
                      <div className="lg:hidden">
                        <SidebarChildren visible={showChildrenMobile}>
                          {item.children.map((child) => (
                            <SidebarSubItem
                              key={child.id}
                              icon={child.icon}
                              label={child.label}
                              active={activeTab === child.id}
                              onClick={() => handleTabChange(child.id)}
                            />
                          ))}
                        </SidebarChildren>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <button
            onClick={() => handleTabChange('space')}
            className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-100 px-3 py-2.5 text-left transition-colors hover:bg-slate-50"
          >
            <img
              src={activeRole === 'leader' ? 'https://i.pravatar.cc/160?img=32' : 'https://i.pravatar.cc/160?img=15'}
              alt={activeProfile.employeeName}
              className="h-9 w-9 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-950">{activeProfile.employeeName}</p>
              <p className="truncate text-[11px] text-slate-500">{activeProfile.jobTitle}</p>
            </div>
          </button>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-20 bg-white/72 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-600 lg:hidden"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu size={18} />
                </button>
                <h1 className="truncate text-base font-semibold tracking-tight text-slate-950 sm:text-lg">
                  {headerTitle}
                </h1>
              </div>

              <div className="flex shrink-0 items-center justify-end gap-2">
                <button
                  onClick={() => setPaletteOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <Search size={17} />
                  <span className="hidden sm:inline">Buscar</span>
                  <kbd className="ml-1 hidden items-center rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:inline-flex">
                    {isMac ? '⌘K' : 'Ctrl K'}
                  </kbd>
                </button>
                <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
                  <Bell size={17} />
                  <span className="absolute right-2 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
                </button>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:py-8 lg:pb-32">
            <motion.div
              key={`${activeRole}-${activeTab}-${activeStage}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {activeTab === 'home' ? (
                <DashboardView role={activeRole} stage={activeStage} onNavigate={handleTabChange} />
              ) : null}
              {activeTab === 'comms' ? <ComunicacionesView /> : null}
              {activeTab === 'people' ? <PersonasView /> : null}
              {activeTab === 'services' ? <ServiciosView onNavigate={handleTabChange} /> : null}
              {activeTab === 'knowledge' ||
              activeTab === 'processes' ||
              activeTab === 'procedures' ||
              activeTab === 'forms' ||
              activeTab === 'policies' ? (
                <ConocimientoView tab={activeTab} onNavigate={handleTabChange} />
              ) : null}
              {activeTab === 'space' ? <MiEspacioView role={activeRole} onNavigate={handleTabChange} /> : null}
              {activeTab === 'payroll' ? <PayrollView stage={activeStage} /> : null}
              {activeTab === 'certifications' ? <CertificationsView stage={activeStage} /> : null}
              {activeTab === 'vacations' ? <VacationsView stage={activeStage} /> : null}
              {activeTab === 'profile' ? <ProfileView stage={activeStage} /> : null}
              {activeTab === 'team' ? <TeamView stage={activeStage} /> : null}
              {activeTab === 'benefits' ? <BenefitsView stage={activeStage} /> : null}
            </motion.div>
          </main>
        </div>
      </div>

      {mobileMenuOpen ? (
        <button
          aria-label="Cerrar menu"
          className="fixed inset-0 z-20 bg-slate-950/35 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      ) : null}

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={handleTabChange} />
      <AssistantBubble />
    </div>
  );
}

export default App;
