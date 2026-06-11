import { useMemo, useState } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, ArrowLeft, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { searchIndex, searchSuggestions, aiSnippets } from '../data/portal';
import type { SearchEntry } from '../data/portal';
import { cn } from '../lib/cn';

function matchAi(query: string) {
  const q = query.toLowerCase();
  if (q.length < 3) return null;
  return aiSnippets.find((s) => s.match.some((m) => q.includes(m))) ?? null;
}

export function SearchOverlay({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (serviceId?: string) => void;
}) {
  const [query, setQuery] = useState('');
  const ai = useMemo(() => matchAi(query), [query]);

  const groups = useMemo(() => {
    const order: SearchEntry['group'][] = ['Trámites', 'Documentos', 'Contenido', 'Personas'];
    return order
      .map((g) => ({ group: g, items: searchIndex.filter((e) => e.group === g) }))
      .filter((g) => g.items.length);
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex justify-center bg-paper-2"
        >
          <motion.div
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex h-[100dvh] w-full max-w-[480px] flex-col bg-paper sm:border-x sm:border-line"
          >
            <Command shouldFilter className="flex h-full flex-col" label="Buscar en Crystal">
              {/* header de página */}
              <div className="flex items-center gap-2 border-b border-line px-3 py-3">
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-paper-2"
                  aria-label="Atrás"
                >
                  <ArrowLeft size={20} />
                </button>
                <span className="text-sm font-bold text-ink">Buscar</span>
              </div>
              {/* input */}
              <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
                <SearchIcon size={20} className="text-gef-green" />
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder="¿Qué necesitas? Colilla, vacaciones, carta…"
                  className="flex-1 bg-transparent text-base font-medium text-ink outline-none placeholder:text-ink-mute"
                />
              </div>

              <Command.List className="no-scrollbar flex-1 overflow-y-auto px-3 py-3">
                {/* abrebocas de IA */}
                {ai ? (
                  <button
                    onClick={() => onPick(ai.serviceId)}
                    className="mb-3 flex w-full items-start gap-3 rounded-lg border border-gef-green/30 bg-emerald-50/60 px-3.5 py-3 text-left"
                  >
                    <Sparkles size={18} className="mt-0.5 shrink-0 text-gef-green" />
                    <span className="flex-1">
                      <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-gef-green">
                        Respuesta rápida
                      </span>
                      <span className="block text-sm leading-snug text-ink">{ai.reply}</span>
                    </span>
                    <ArrowRight size={16} className="mt-0.5 shrink-0 text-gef-green" />
                  </button>
                ) : null}

                {query.length === 0 ? (
                  <div className="px-1 pb-2">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-mute">Lo más buscado</p>
                    <div className="flex flex-wrap gap-2">
                      {searchSuggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <Command.Empty className="px-2 py-8 text-center text-sm text-ink-mute">
                  Nada con ese nombre. Prueba “colilla”, “vacaciones” o “reglamento”.
                </Command.Empty>

                {groups.map(({ group, items }) => (
                  <Command.Group
                    key={group}
                    heading={group}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-ink-mute"
                  >
                    {items.map((e) => {
                      const Icon = e.icon;
                      return (
                        <Command.Item
                          key={e.id}
                          value={`${e.label} ${e.hint}`}
                          onSelect={() => onPick(e.serviceId)}
                          className="mb-0.5 flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper-2 text-ink-soft">
                            <Icon size={17} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-ink">{e.label}</span>
                            <span className="block truncate text-xs text-ink-mute">{e.hint}</span>
                          </span>
                          <CornerDownLeft size={14} className="shrink-0 text-ink-mute opacity-0 data-[selected=true]:opacity-100" />
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                ))}
              </Command.List>

              <div className={cn('border-t border-line px-4 py-2.5 text-center text-[11px] text-ink-mute')}>
                Resuelve en segundos · sin clics de más
              </div>
            </Command>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
