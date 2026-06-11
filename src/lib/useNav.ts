import { useCallback, useEffect, useState } from 'react';
import type { ViewId } from '../types/app';

/**
 * Navegación mínima basada en la URL — sin librería de router.
 * La URL es la fuente de verdad para back/forward y para refrescar.
 *   /                      -> login
 *   /?view=home            -> inicio
 *   /?view=space           -> mi espacio
 *   /?view=space&s=colilla -> mi espacio con una ficha de servicio abierta
 *   /?view=home&find=1     -> buscador abierto
 */
export type Nav = { view: ViewId; service: string | null; search: boolean };

function parse(): Nav {
  const p = new URLSearchParams(window.location.search);
  const v = p.get('view');
  const view: ViewId = v === 'home' ? 'home' : v === 'space' ? 'space' : 'login';
  return { view, service: p.get('s'), search: p.get('find') === '1' };
}

function toUrl(next: Nav): string {
  const p = new URLSearchParams();
  if (next.view !== 'login') p.set('view', next.view);
  if (next.service) p.set('s', next.service);
  if (next.search) p.set('find', '1');
  const qs = p.toString();
  return qs ? `?${qs}` : '/';
}

export function useNav() {
  const [nav, setNav] = useState<Nav>(parse);

  useEffect(() => {
    const onPop = () => setNav(parse());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  /** Empuja (o reemplaza) una nueva ubicación y sincroniza el estado. */
  const go = useCallback((next: Nav, replace = false) => {
    const url = toUrl(next);
    if (replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
    setNav(next);
  }, []);

  /** Equivalente al botón "atrás" del navegador. */
  const back = useCallback(() => window.history.back(), []);

  return { nav, go, back };
}
