import { useState } from 'react';
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
import { useNav } from './lib/useNav';

const AUTH_KEY = 'crystal_auth';

export default function App() {
  // El segmento es fijo por empleado (sede/área/perfil): el sistema lo sabe, no se elige.
  const segment: Segment = defaultSegment;
  const { nav, go, back } = useNav();
  // La sesión vive en sessionStorage: refrescar mantiene al empleado dentro.
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');

  const login = () => {
    sessionStorage.setItem(AUTH_KEY, '1');
    setAuthed(true);
    go({ view: 'home', service: null, search: false });
  };

  // Sin sesión (o "atrás" hasta la raíz) => login.
  if (!authed || nav.view === 'login') {
    return (
      <>
        <Login onEnter={login} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  const onNavigate = (next: ViewId) => {
    go({ view: next, service: null, search: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openService = (id: string) => go({ view: nav.view, service: id, search: false });
  const openSearch = () => go({ view: nav.view, service: null, search: true });

  const viewProps = { segment, onNavigate, onOpenSearch: openSearch, onOpenService: openService };

  return (
    <>
      <AppFrame view={nav.view} onNavigate={onNavigate} onOpenSearch={openSearch}>
        <AnimatePresence mode="wait">
          <motion.div
            key={nav.view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {nav.view === 'space' ? <MiEspacio {...viewProps} /> : <Home {...viewProps} />}
          </motion.div>
        </AnimatePresence>
      </AppFrame>

      <SearchOverlay
        open={nav.search}
        onClose={back}
        onPick={(serviceId) =>
          // Cierra el buscador y, si hay destino, abre el servicio en Mi espacio (reemplaza la entrada del buscador).
          go({ view: 'space', service: serviceId ?? null, search: false }, true)
        }
      />

      <ServiceSheet serviceId={nav.service} segment={segment} onClose={back} />

      <Toaster position="top-center" richColors toastOptions={{ style: { borderRadius: '12px' } }} />
    </>
  );
}
