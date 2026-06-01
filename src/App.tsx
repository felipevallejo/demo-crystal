import { useCallback, useEffect, useState, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import { findParentTab, parseRole, parseTab, roleMeta } from './data/portal';
import type { RoleId, TabId, ViewProps } from './types/app';
import { AppShell, SubViewBar } from './components/v3/Shell';
import { AssistantProvider } from './components/v3/Assistant';
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

/** Mapa tab → vista. Las sub-vistas de Conocimiento comparten ConocimientoView. */
const VIEWS: Record<TabId, ComponentType<ViewProps>> = {
  home: DashboardView,
  comms: ComunicacionesView,
  people: PersonasView,
  services: ServiciosView,
  knowledge: ConocimientoView,
  processes: ConocimientoView,
  procedures: ConocimientoView,
  forms: ConocimientoView,
  policies: ConocimientoView,
  space: MiEspacioView,
  payroll: PayrollView,
  certifications: CertificationsView,
  vacations: VacationsView,
  profile: ProfileView,
  team: TeamView,
  benefits: BenefitsView,
};

export default function App() {
  const [role] = useState<RoleId>(() =>
    typeof window === 'undefined' ? 'collaborator' : parseRole(window.location.search),
  );
  const [tab, setTab] = useState<TabId>(() =>
    typeof window === 'undefined' ? 'home' : parseTab(window.location.search, parseRole(window.location.search)),
  );

  const navigate = useCallback((next: TabId) => {
    setTab(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tab);
    params.set('role', role);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [role, tab]);

  const View = VIEWS[tab];
  const isSubView = !!findParentTab(tab);

  return (
    <AssistantProvider onNavigate={navigate} employeeName={roleMeta[role].employeeName}>
      <AppShell role={role} activeTab={tab} onNavigate={navigate}>
        {isSubView ? <SubViewBar activeTab={tab} onNavigate={navigate} /> : null}
        <motion.div
          key={`${role}-${tab}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <View role={role} tab={tab} onNavigate={navigate} />
        </motion.div>
      </AppShell>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#12110f',
            color: '#faf8f4',
            border: 'none',
            borderRadius: '16px',
          },
        }}
      />
    </AssistantProvider>
  );
}
