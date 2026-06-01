import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Drawer } from 'vaul';
import { toast } from 'sonner';
import {
  ArrowUp,
  Calendar,
  Download,
  FileText,
  MessageCircleHeart,
  Search,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { aiIntents, type AICard, type AIIntent } from '../../data/portal';
import type { TabId } from '../../types/app';
import { cn } from '../../lib/cn';
import { useIsMobile } from '../../lib/useIsMobile';

/* ----------------------------- estado / contexto ----------------------------- */

type Msg =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; text: string; card?: AICard; typing?: boolean };

type Ctx = {
  open: boolean;
  messages: Msg[];
  thinking: boolean;
  openAssistant: (seed?: string) => void;
  close: () => void;
  ask: (q: string) => void;
};

const AssistantContext = createContext<Ctx | null>(null);

function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error('useAssistant debe usarse dentro de <AssistantProvider>');
  return ctx;
}

let _id = 0;
const nextId = () => `m${++_id}`;

function matchIntent(q: string): AIIntent | null {
  const norm = q.trim().toLowerCase();
  if (!norm) return null;
  const exact = aiIntents.find((i) => i.q.toLowerCase() === norm);
  if (exact) return exact;
  const kw: Record<string, string[]> = {
    'ai-vac': ['vacacion', 'días', 'dias', 'descanso'],
    'ai-cert': ['carta', 'certificad', 'laboral'],
    'ai-pay': ['pago', 'paga', 'nómina', 'nomina', 'quincena', 'sueldo', 'salario', 'desprendible'],
    'ai-event': ['bienestar', 'jornada', 'inscrib', 'evento'],
    'ai-person': ['quién', 'quien', 'líder', 'lider', 'comunicaciones', 'jefe'],
    'ai-festivos': ['festivo', 'puente', 'feriado'],
  };
  let best: { id: string; score: number } | null = null;
  for (const i of aiIntents) {
    const score = (kw[i.id] ?? []).reduce((s, k) => (norm.includes(k) ? s + 1 : s), 0);
    if (score > 0 && (!best || score > best.score)) best = { id: i.id, score };
  }
  return best ? aiIntents.find((i) => i.id === best!.id) ?? null : null;
}

export function AssistantProvider({
  children,
  onNavigate,
  employeeName,
}: {
  children: ReactNode;
  onNavigate: (tab: TabId) => void;
  employeeName: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [thinking, setThinking] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const ask = useCallback((q: string) => {
    const query = q.trim();
    if (!query) return;
    setMessages((m) => [...m, { id: nextId(), role: 'user', text: query }]);
    setThinking(true);
    const intent = matchIntent(query);
    const t = window.setTimeout(() => {
      setThinking(false);
      if (intent) {
        setMessages((m) => [...m, { id: nextId(), role: 'assistant', text: intent.reply, card: intent.card, typing: true }]);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: nextId(),
            role: 'assistant',
            text: 'Puedo ayudarte con vacaciones, certificados, nómina, eventos y encontrar personas. Prueba con una de estas:',
            typing: true,
          },
        ]);
      }
    }, 820);
    timers.current.push(t);
  }, []);

  const openAssistant = useCallback(
    (seed?: string) => {
      setOpen(true);
      setMessages((prev) =>
        prev.length
          ? prev
          : [
              {
                id: nextId(),
                role: 'assistant',
                text: `Hola, ${employeeName.split(' ')[0]}. Soy Crystal. Cuéntame qué necesitas y lo resolvemos aquí mismo.`,
              },
            ],
      );
      if (seed) {
        const t = window.setTimeout(() => ask(seed), 260);
        timers.current.push(t);
      }
    },
    [ask, employeeName],
  );

  const close = useCallback(() => setOpen(false), []);

  // ⌘K / Ctrl+K abre el asistente
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setMessages((prev) =>
          prev.length
            ? prev
            : [{ id: nextId(), role: 'assistant', text: `Hola, ${employeeName.split(' ')[0]}. ¿Qué necesitas hoy?` }],
        );
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [employeeName]);

  const value = useMemo<Ctx>(
    () => ({ open, messages, thinking, openAssistant, close, ask }),
    [open, messages, thinking, openAssistant, close, ask],
  );

  return (
    <AssistantContext.Provider value={value}>
      {children}
      <AssistantOverlay onNavigate={onNavigate} />
    </AssistantContext.Provider>
  );
}

/* ----------------------------- overlay (desktop modal / mobile sheet) ----------------------------- */

function AssistantOverlay({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const { open, close } = useAssistant();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer.Root open={open} onOpenChange={(o) => !o && close()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex h-[90dvh] flex-col rounded-t-[28px] bg-paper outline-none">
            <Drawer.Title className="sr-only">Pregúntale a Crystal</Drawer.Title>
            <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-paper-3" />
            <AssistantSurface onNavigate={onNavigate} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-ink/35 backdrop-blur-[3px]"
          />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="relative mt-[6vh] flex h-[78vh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] bg-paper shadow-lift ring-1 ring-line"
          >
            <AssistantSurface onNavigate={onNavigate} />
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

/* ----------------------------- superficie conversacional ----------------------------- */

function AssistantSurface({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const { messages, thinking, ask, close } = useAssistant();
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  const empty = messages.filter((m) => m.role === 'user').length === 0;
  const filtered = draft.trim()
    ? aiIntents.filter((i) => i.q.toLowerCase().includes(draft.trim().toLowerCase()))
    : aiIntents;

  const submit = () => {
    if (!draft.trim()) return;
    ask(draft);
    setDraft('');
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-line px-5 py-4">
        <span className="grain flex h-10 w-10 items-center justify-center rounded-2xl signature-grad text-white shadow-glow">
          <Sparkles size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold leading-none text-ink">Pregúntale a Crystal</p>
          <p className="mt-1 text-xs text-ink-mute">Tu copiloto: resuelve, encuentra y te acompaña.</p>
        </div>
        <button
          onClick={close}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper-2 hover:text-ink"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>
      </div>

      {/* conversación */}
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-[20px] rounded-br-md bg-ink px-4 py-2.5 text-sm font-medium text-paper">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex flex-col gap-3">
              <div className="flex max-w-[88%] gap-2.5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl signature-grad text-white">
                  <Sparkles size={13} />
                </span>
                <div className="rounded-[20px] rounded-tl-md bg-white px-4 py-2.5 text-sm leading-relaxed text-ink ring-1 ring-line">
                  {m.typing ? <Typewriter text={m.text} /> : m.text}
                </div>
              </div>
              {m.card ? <AICardView card={m.card} onNavigate={onNavigate} /> : null}
            </div>
          ),
        )}
        {thinking ? (
          <div className="flex gap-2.5">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl signature-grad text-white">
              <Sparkles size={13} />
            </span>
            <div className="flex items-center gap-1 rounded-[20px] rounded-tl-md bg-white px-4 py-3 ring-1 ring-line">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-ink-mute"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* sugerencias */}
        {(empty || draft.trim()) && filtered.length ? (
          <div className="space-y-2 pt-1">
            {empty ? <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-mute">Prueba con</p> : null}
            {filtered.map((i) => {
              const Icon = i.icon;
              return (
                <button
                  key={i.id}
                  onClick={() => {
                    ask(i.q);
                    setDraft('');
                  }}
                  className="group flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left text-sm font-medium text-ink ring-1 ring-line transition-all hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-paper-2 text-ink-soft transition-colors group-hover:bg-gef-green/10 group-hover:text-gef-green">
                    <Icon size={15} />
                  </span>
                  <span className="flex-1">{i.q}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* input */}
      <div className="shrink-0 border-t border-line bg-paper/80 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
        <div className="flex items-center gap-2 rounded-full bg-white px-2 py-2 ring-1 ring-line focus-within:ring-2 focus-within:ring-gef-green/40">
          <span className="pl-2 text-ink-mute">
            <Search size={17} />
          </span>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Escribe lo que necesitas…"
            className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-mute focus:outline-none"
          />
          <button
            onClick={submit}
            disabled={!draft.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-transform enabled:hover:scale-105 disabled:opacity-30"
            aria-label="Enviar"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- tarjetas ricas ----------------------------- */

function AICardView({ card, onNavigate }: { card: AICard; onNavigate: (tab: TabId) => void }) {
  const go = (tab: TabId, msg: string) => {
    onNavigate(tab);
    toast.success(msg);
  };

  const wrap = 'ml-[38px] overflow-hidden rounded-[22px] bg-white ring-1 ring-line shadow-soft';

  if (card.kind === 'stat') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={wrap}>
        <div className="flex items-center justify-between gap-4 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-mute">{card.label}</p>
            <p className="mt-1 font-display text-4xl font-semibold tracking-tightish" style={{ color: card.accent }}>
              <NumberFlow value={card.value} />
              {card.suffix}
            </p>
            <p className="mt-1 text-xs text-ink-soft">{card.foot}</p>
          </div>
          <button
            onClick={() => go(card.tab, 'Te llevo a vacaciones')}
            className="shrink-0 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
          >
            {card.action}
          </button>
        </div>
      </motion.div>
    );
  }
  if (card.kind === 'doc') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn(wrap, 'flex items-center gap-4 p-4')}>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
          <FileText size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{card.title}</p>
          <p className="truncate text-xs text-ink-soft">{card.detail}</p>
        </div>
        <button
          onClick={() => go(card.tab, 'Descarga lista')}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
        >
          <Download size={14} /> {card.action}
        </button>
      </motion.div>
    );
  }
  if (card.kind === 'person') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn(wrap, 'flex items-center gap-4 p-4')}>
        <img src={card.photo} alt={card.name} className="h-12 w-12 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{card.name}</p>
          <p className="truncate text-xs text-ink-soft">{card.role}</p>
        </div>
        <button
          onClick={() => go(card.tab, 'Abriendo perfil')}
          className="shrink-0 rounded-full bg-paper-2 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-paper-3"
        >
          Ver perfil
        </button>
      </motion.div>
    );
  }
  if (card.kind === 'event') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={wrap}>
        <div className="flex items-center gap-4 p-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Calendar size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{card.title}</p>
            <p className="truncate text-xs text-ink-soft">{card.when} · {card.place}</p>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
            Inscrito ✓
          </span>
        </div>
      </motion.div>
    );
  }
  if (card.kind === 'pay') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn(wrap, 'flex items-center gap-4 p-4')}>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Wallet size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">Próximo pago · {card.when}</p>
          <p className="truncate text-xs text-ink-soft">{card.note}</p>
        </div>
        <button
          onClick={() => go(card.tab, 'Te llevo a Mi nómina')}
          className="shrink-0 rounded-full bg-paper-2 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-paper-3"
        >
          Mi nómina
        </button>
      </motion.div>
    );
  }
  // list
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn(wrap, 'p-3')}>
      {card.items.map((it, idx) => (
        <div
          key={it.label}
          className={cn('flex items-center justify-between px-3 py-2.5', idx !== card.items.length - 1 && 'border-b border-line')}
        >
          <span className="text-sm font-medium text-ink">{it.label}</span>
          <span className="text-xs font-semibold text-ink-mute">{it.hint}</span>
        </div>
      ))}
    </motion.div>
  );
}

/* ----------------------------- typewriter ----------------------------- */

function Typewriter({ text }: { text: string }) {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [n, setN] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          window.clearInterval(id);
          return v;
        }
        return v + 2;
      });
    }, 16);
    return () => window.clearInterval(id);
  }, [text, reduce]);
  return <span>{text.slice(0, n)}</span>;
}

/* ----------------------------- triggers ----------------------------- */

/** Barra de intención del home: invita a hablarle a Crystal. */
export function AssistantBar() {
  const { openAssistant } = useAssistant();
  return (
    <button
      onClick={() => openAssistant()}
      className="group flex w-full items-center gap-3 rounded-full bg-white/90 px-3 py-3 text-left shadow-soft ring-1 ring-line backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lift sm:px-4"
    >
      <span className="grain flex h-10 w-10 shrink-0 items-center justify-center rounded-full signature-grad text-white shadow-glow">
        <Sparkles size={18} />
      </span>
      <span className="flex-1 text-sm text-ink-soft sm:text-base">
        Pregúntale a Crystal — “{aiIntents[0].q}”
      </span>
      <kbd className="mr-1 hidden items-center gap-1 rounded-lg bg-paper-2 px-2 py-1 text-[11px] font-semibold text-ink-mute ring-1 ring-line sm:inline-flex">
        ⌘K
      </kbd>
    </button>
  );
}

/** Acción flotante de IA para el bottom-nav mobile. */
export function AssistantFab() {
  const { openAssistant } = useAssistant();
  return (
    <button
      onClick={() => openAssistant()}
      aria-label="Pregúntale a Crystal"
      className="grain flex h-14 w-14 -translate-y-4 items-center justify-center rounded-full signature-grad text-white shadow-glow ring-4 ring-paper"
    >
      <MessageCircleHeart size={24} />
    </button>
  );
}
