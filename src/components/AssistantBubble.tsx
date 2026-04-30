import { useState } from 'react';
import { ArrowUp, MessageCircle, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { assistantSuggestions } from '../data/portal';

export function AssistantBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-end px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          <AnimatePresence>
            {open ? (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-[28px] bg-white/95 shadow-2xl ring-1 ring-slate-200 backdrop-blur-xl"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-5 py-5 text-white">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-12 left-1/3 h-24 w-24 rounded-full bg-sky-500/20 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                        <Sparkles size={16} className="text-emerald-300" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Crystal te acompaña</p>
                        <p className="text-[11px] text-slate-400">Beta · próximamente disponible</p>
                      </div>
                      <button
                        onClick={() => setOpen(false)}
                        className="ml-auto rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      Pídele a Crystal lo que necesitas hoy: trámites, personas o información del equipo.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 px-3 py-3">
                  <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Sugerencias para empezar
                  </p>
                  {assistantSuggestions.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-slate-100"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Icon size={14} />
                      </span>
                      <span className="text-sm text-slate-700">{label}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-100 px-3 py-3">
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2.5">
                    <input
                      type="text"
                      placeholder="Escríbele a Crystal…"
                      disabled
                      className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                    />
                    <button
                      disabled
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-white disabled:cursor-not-allowed"
                    >
                      <ArrowUp size={14} />
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    Esta vista es una proyección. La conversación real llegará en una próxima fase.
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.button
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-slate-950/40 ring-1 ring-white/10"
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-sky-500/30 to-violet-500/30 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              {open ? <X size={16} /> : <MessageCircle size={16} />}
              <span>{open ? 'Cerrar' : 'Pregúntale a Crystal'}</span>
              {!open ? (
                <span className="ml-1 hidden rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 sm:inline">
                  beta
                </span>
              ) : null}
            </span>
          </motion.button>
        </div>
      </div>
    </>
  );
}
