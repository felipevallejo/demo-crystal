import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Download,
  FileText,
  Search,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { knowledgeCategories, type KnowledgeCategory, type KnowledgeItem } from '../data/portal';
import type { TabId, ViewProps } from '../types/app';
import { cn } from '../lib/cn';
import { Eyebrow, SectionHeading, StatNumber, Tag } from '../components/v3/ui';

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

/** Sugerencias de intención: acortan la distancia entre lo que el empleado quiere y el documento. */
const INTENT_HINTS = ['vacaciones', 'incapacidad', 'teletrabajo', 'certificado', 'préstamo'];

const isDownloadable = (item: KnowledgeItem) => item.meta === 'PDF' || item.meta === 'DOCX';

function handleDoc(
  item: KnowledgeItem,
  category: KnowledgeCategory,
  onNavigate: (tab: TabId) => void,
) {
  if (isDownloadable(item)) {
    toast.success('Documento listo', { description: `${item.title} · ${item.meta}` });
    return;
  }
  toast(`Abriendo: ${item.title}`, { description: category.label });
  onNavigate(category.tab);
}

export function ConocimientoView({ tab, onNavigate }: ViewProps) {
  const activeCategory = knowledgeCategories.find((c) => c.tab === tab);

  if (activeCategory) {
    return <CategoryDetail category={activeCategory} onNavigate={onNavigate} />;
  }

  return <KnowledgeLanding onNavigate={onNavigate} />;
}

/* ───────────────────────── LANDING (4 categorías + buscador) ───────────────────────── */

function KnowledgeLanding({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!q) return [];
    const out: { category: KnowledgeCategory; item: KnowledgeItem }[] = [];
    for (const category of knowledgeCategories) {
      for (const item of category.items) {
        if (
          item.title.toLowerCase().includes(q) ||
          item.area.toLowerCase().includes(q) ||
          category.label.toLowerCase().includes(q)
        ) {
          out.push({ category, item });
        }
      }
    }
    return out;
  }, [q]);

  const totalDocs = useMemo(
    () => knowledgeCategories.reduce((sum, c) => sum + c.items.length, 0),
    [],
  );

  return (
    <div className="space-y-14">
      {/* 1 — HERO: buscar para reducir la distancia intención → resolución */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grain relative overflow-hidden rounded-[34px] bg-ink p-6 text-white shadow-lift sm:p-10"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full opacity-60 blur-3xl"
          style={{ backgroundImage: 'var(--grad-signature)' }}
        />
        <div className="relative z-[2] max-w-2xl">
          <Eyebrow className="text-gef-glow">Memoria de Crystal</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.02] tracking-tightish text-balance sm:text-5xl">
            Todo lo que Crystal sabe, a una pregunta de distancia.
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/75 sm:text-base">
            Procesos, procedimientos, formatos y políticas. Escribe lo que necesitas resolver —
            nosotros encontramos el documento exacto.
          </p>

          {/* Buscador prominente */}
          <label className="mt-7 flex items-center gap-3 rounded-full bg-white/10 px-5 py-3.5 ring-1 ring-white/20 backdrop-blur-sm transition-colors focus-within:bg-white/15 focus-within:ring-white/40">
            <Search size={18} className="shrink-0 text-white/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Cómo solicito mis vacaciones?"
              className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-white/45 sm:text-base"
              aria-label="Buscar en el centro de conocimiento"
            />
          </label>

          {!q ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Prueba con
              </span>
              {INTENT_HINTS.map((hint) => (
                <button
                  key={hint}
                  onClick={() => setQuery(hint)}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 transition-colors hover:bg-white/20 hover:text-white"
                >
                  {hint}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </motion.section>

      {/* 2 — RESULTADOS de búsqueda (sustituyen las categorías mientras se busca) */}
      {q ? (
        <motion.section {...fade}>
          <SectionHeading
            eyebrow="Resultados"
            title={
              matches.length > 0
                ? `${matches.length} ${matches.length === 1 ? 'documento' : 'documentos'} para “${query.trim()}”`
                : `Sin resultados para “${query.trim()}”`
            }
            actionLabel="Limpiar"
            onAction={() => setQuery('')}
          />
          {matches.length > 0 ? (
            <div className="overflow-hidden rounded-[26px] bg-white ring-1 ring-line shadow-soft">
              <ul className="divide-y divide-line">
                {matches.map(({ category, item }, i) => (
                  <DocumentRow
                    key={item.id}
                    item={item}
                    index={i}
                    badge={category.label}
                    onAction={() => handleDoc(item, category, onNavigate)}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <EmptyState query={query.trim()} />
          )}
        </motion.section>
      ) : (
        <>
          {/* 3 — LAS 4 CATEGORÍAS (puertas a la biblioteca) */}
          <motion.section {...fade}>
            <SectionHeading
              eyebrow="La biblioteca"
              title="Cuatro maneras de encontrar lo que buscas"
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {knowledgeCategories.map((cat, i) => (
                <CategoryTile key={cat.id} category={cat} index={i} onNavigate={onNavigate} />
              ))}
            </div>
          </motion.section>

          {/* 4 — NOTA DE CIERRE: una sola fuente de verdad */}
          <motion.section
            {...fade}
            className="flex flex-col items-start gap-4 rounded-[26px] bg-white p-6 ring-1 ring-line shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-paper-2 text-ink">
                <BookOpen size={20} />
              </span>
              <div>
                <p className="font-display text-lg font-semibold tracking-tightish text-ink">
                  Una sola fuente de verdad
                </p>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-soft">
                  <StatNumber value={totalDocs} /> documentos vivos, mantenidos por las áreas dueñas
                  de cada tema. Lo que ves aquí es la versión vigente.
                </p>
              </div>
            </div>
            <Tag className="border-emerald-100 bg-emerald-50 text-emerald-700 ring-emerald-100">
              <Sparkles size={12} /> Siempre al día
            </Tag>
          </motion.section>
        </>
      )}
    </div>
  );
}

/* ───────────────────────── DETALLE DE CATEGORÍA (listado filtrado) ───────────────────────── */

function CategoryDetail({
  category,
  onNavigate,
}: {
  category: KnowledgeCategory;
  onNavigate: (tab: TabId) => void;
}) {
  const Icon = category.icon;

  return (
    <div className="space-y-12">
      {/* Volver al landing */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => onNavigate('knowledge')}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
          Conocimiento
        </button>
      </motion.div>

      {/* Encabezado de categoría con su tinte */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className={cn(
          'grain relative overflow-hidden rounded-[30px] bg-gradient-to-br p-6 text-white shadow-lift sm:p-9',
          category.accent,
        )}
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-[2] max-w-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
            <Icon size={22} />
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
            {category.badge}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold leading-[1.04] tracking-tightish text-balance sm:text-[2.5rem]">
            {category.label}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            {category.description}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-xs font-semibold ring-1 ring-white/20 backdrop-blur-sm">
            <StatNumber value={category.items.length} /> documentos vigentes
          </p>
        </div>
      </motion.section>

      {/* Listado de la categoría */}
      <motion.section {...fade}>
        <SectionHeading eyebrow="Contenido" title="Documentos de esta categoría" />
        <div className="overflow-hidden rounded-[26px] bg-white ring-1 ring-line shadow-soft">
          <ul className="divide-y divide-line">
            {category.items.map((item, i) => (
              <DocumentRow
                key={item.id}
                item={item}
                index={i}
                onAction={() => handleDoc(item, category, onNavigate)}
              />
            ))}
          </ul>
        </div>
      </motion.section>
    </div>
  );
}

/* ───────────────────────── PIEZAS ───────────────────────── */

function CategoryTile({
  category,
  index,
  onNavigate,
}: {
  category: KnowledgeCategory;
  index: number;
  onNavigate: (tab: TabId) => void;
}) {
  const Icon = category.icon;
  return (
    <motion.button
      onClick={() => onNavigate(category.tab)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative flex flex-col items-start overflow-hidden rounded-[26px] bg-gradient-to-br p-6 text-left text-white shadow-soft transition-shadow hover:shadow-lift',
        category.accent,
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
      <div className="relative flex w-full items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/15 backdrop-blur-sm">
          <Icon size={20} />
        </span>
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
          {category.badge}
        </span>
      </div>
      <p className="relative mt-6 font-display text-xl font-semibold tracking-tightish">
        {category.label}
      </p>
      <p className="relative mt-1.5 text-xs leading-relaxed text-white/85">{category.description}</p>
      <div className="relative mt-5 flex w-full items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
          {category.items.length} documentos
        </span>
        <ArrowUpRight
          size={18}
          className="text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </motion.button>
  );
}

function DocumentRow({
  item,
  index,
  badge,
  onAction,
}: {
  item: KnowledgeItem;
  index: number;
  badge?: string;
  onAction: () => void;
}) {
  const downloadable = isDownloadable(item);
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.04 }}
    >
      <button
        onClick={onAction}
        className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-paper-2/60 sm:px-6 sm:py-5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-ink-soft transition-colors group-hover:bg-ink group-hover:text-paper">
          <FileText size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{item.title}</p>
          <p className="mt-0.5 truncate text-xs text-ink-mute">
            {item.area} · {item.updated}
          </p>
        </div>
        {badge ? (
          <span className="hidden rounded-full bg-paper-2 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-soft md:inline-flex">
            {badge}
          </span>
        ) : item.meta ? (
          <span className="hidden rounded-full bg-paper-2 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-soft sm:inline-flex">
            {item.meta}
          </span>
        ) : null}
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink-mute transition-colors group-hover:bg-gef-green group-hover:text-white">
          {downloadable ? <Download size={15} /> : <ArrowRight size={15} />}
        </span>
      </button>
    </motion.li>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[26px] bg-white px-6 py-14 text-center ring-1 ring-line shadow-soft">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-2 text-ink-mute">
        <Search size={20} />
      </span>
      <p className="font-display text-lg font-semibold tracking-tightish text-ink">
        No encontramos nada para “{query}”.
      </p>
      <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
        Prueba con otra palabra o explora las categorías. Si el documento debería existir,
        pídeselo a tu equipo de Gestión Humana.
      </p>
    </div>
  );
}
