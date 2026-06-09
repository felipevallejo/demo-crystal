import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';
import type { Segment, ViewId } from './types/app';
import { defaultSegment } from './data/portal';
import { AppFrame } from './components/Shell';
import { Login } from './components/Login';
import { SearchOverlay } from './components/Search';
import { ServiceSheet } from './components/ServiceSheet';
import { Home } from './views/Home';
import { MiEspacio } from './views/MiEspacio';

export default function App() {
  const [authed, setAuthed] = useState(false);
  // El segmento es fijo por empleado (sede/área/perfil): el sistema lo sabe, no se elige.
  const segment: Segment = defaultSegment;
  const [view, setView] = useState<ViewId>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

  const onNavigate = useCallback((next: ViewId) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openService = useCallback((id: string) => setActiveService(id), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);

  if (!authed) {
    return (
      <>
        <Login onEnter={() => setAuthed(true)} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  const viewProps = { segment, onNavigate, onOpenSearch: openSearch, onOpenService: openService };

  return (
    <>
      <AppFrame view={view} onNavigate={onNavigate} onOpenSearch={openSearch}>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {view === 'home' ? <Home {...viewProps} /> : <MiEspacio {...viewProps} />}
          </motion.div>
        </AnimatePresence>
      </AppFrame>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onPick={(serviceId) => {
          setSearchOpen(false);
          if (serviceId) {
            setView('space');
            setActiveService(serviceId);
          }
        }}
      />

      <ServiceSheet
        serviceId={activeService}
        segment={segment}
        onClose={() => setActiveService(null)}
      />

      <Toaster position="top-center" richColors toastOptions={{ style: { borderRadius: '12px' } }} />
    </>
  );
}
