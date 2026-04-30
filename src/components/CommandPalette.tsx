import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CornerDownLeft, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { commandSeed } from '../data/portal';
import type { CommandResult } from '../data/portal';
import type { TabId } from '../types/app';
import { cn } from '../lib/cn';

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: TabId) => void;
};

const CATEGORY_ORDER: CommandResult['category'][] = ['Personas', 'Servicios', 'Comunicaciones', 'Documentos'];

export function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  return (
    <AnimatePresence>
      {open ? <PaletteBody onClose={onClose} onNavigate={onNavigate} /> : null}
    </AnimatePresence>
  );
}

function PaletteBody({ onClose, onNavigate }: { onClose: () => void; onNavigate: (tab: TabId) => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? commandSeed.filter(
          (item) => item.label.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q),
        )
      : commandSeed;
    const map = new Map<CommandResult['category'], CommandResult[]>();
    for (const c of CATEGORY_ORDER) map.set(c, []);
    for (const item of filtered) map.get(item.category)?.push(item);
    return Array.from(map.entries()).filter(([, items]) => items.length > 0);
  }, [query]);

  const handleSelect = (item: CommandResult) => {
    if (item.tab) onNavigate(item.tab);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 py-[14vh] sm:py-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
          <button
            aria-label="Cerrar buscador"
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          <motion.div
            className="relative w-full max-w-[640px] overflow-hidden rounded-[28px] bg-white/95 shadow-2xl ring-1 ring-slate-200 backdrop-blur-xl"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <Search size={18} className="text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca personas, servicios, documentos, comunicaciones…"
                className="w-full border-none bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-2 py-3">
              {grouped.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-slate-500">
                  No encontramos resultados para "{query}". Prueba con otro término.
                </div>
              ) : (
                <div className="space-y-3">
                  {grouped.map(([category, items]) => (
                    <div key={category}>
                      <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {category}
                      </p>
                      <div className="space-y-0.5">
                        {items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelect(item)}
                              className={cn(
                                'group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors',
                                'hover:bg-slate-100',
                              )}
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-white">
                                <Icon size={16} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium text-slate-900">
                                  {item.label}
                                </span>
                                <span className="block truncate text-xs text-slate-500">{item.hint}</span>
                              </span>
                              <ArrowRight
                                size={14}
                                className="shrink-0 text-slate-300 transition-colors group-hover:text-slate-600"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                    ↑↓
                  </kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="flex items-center rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                    <CornerDownLeft size={10} />
                  </kbd>
                  abrir
                </span>
              </div>
              <span className="hidden sm:block">Espacio Crystal · Búsqueda</span>
            </div>
          </motion.div>
    </motion.div>
  );
}
