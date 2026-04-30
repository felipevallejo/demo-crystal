import { useMemo, useState } from 'react';
import { ArrowRight, Download, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { knowledgeCategories, type KnowledgeCategory } from '../data/portal';
import type { TabId } from '../types/app';
import { cn } from '../lib/cn';

type ConocimientoViewProps = {
  tab: TabId;
  onNavigate: (tab: TabId) => void;
};

export function ConocimientoView({ tab, onNavigate }: ConocimientoViewProps) {
  const activeCategory = knowledgeCategories.find((c) => c.tab === tab);
  const isLanding = !activeCategory;

  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (activeCategory) return [activeCategory];
    if (!query.trim()) return knowledgeCategories;
    const q = query.toLowerCase();
    return knowledgeCategories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (item) => item.title.toLowerCase().includes(q) || item.area.toLowerCase().includes(q),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [activeCategory, query]);

  return (
    <div className="space-y-8">
      {/* Hero / intro */}
      {isLanding ? (
        <section className="rounded-[28px] bg-white p-6 ring-1 ring-slate-200 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Crystal Conocimiento</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                La biblioteca operativa de Crystal
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Procesos, procedimientos, formatos y políticas. Lo que necesitas para entender cómo se hacen las cosas
                aquí y resolver tus trámites con autonomía.
              </p>
            </div>

            <label className="flex w-full max-w-md items-center gap-3 rounded-full bg-slate-50 px-4 py-2.5 ring-1 ring-slate-200">
              <Search size={16} className="text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en conocimiento…"
                className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>
          </div>
        </section>
      ) : null}

      {/* Tiles de categorías (solo en landing) */}
      {isLanding ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {knowledgeCategories.map((cat, i) => (
            <CategoryTile key={cat.id} category={cat} index={i} onNavigate={onNavigate} />
          ))}
        </section>
      ) : null}

      {/* Listado de items por categoría */}
      <div className="space-y-10">
        {filteredCategories.map((cat) => (
          <CategoryList key={cat.id} category={cat} compact={!isLanding} />
        ))}
        {filteredCategories.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-10 text-center text-sm text-slate-500 ring-1 ring-slate-200">
            No encontramos contenido para "{query}".
          </div>
        ) : null}
      </div>
    </div>
  );
}

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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      className={cn(
        'group relative overflow-hidden rounded-[24px] bg-gradient-to-br p-5 text-left text-white shadow-md shadow-slate-950/10',
        category.accent,
      )}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-2xl" />
      <div className="relative flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/15 backdrop-blur-sm">
          <Icon size={16} />
        </div>
        <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
          {category.badge}
        </span>
      </div>
      <p className="relative mt-5 text-lg font-semibold tracking-tight">{category.label}</p>
      <p className="relative mt-1 text-xs leading-relaxed text-white/85">{category.description}</p>
      <p className="relative mt-4 text-[11px] font-semibold uppercase tracking-wider text-white/80">
        {category.items.length} documentos
      </p>
    </motion.button>
  );
}

function CategoryList({ category, compact }: { category: KnowledgeCategory; compact: boolean }) {
  const Icon = category.icon;
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={cn('flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white', category.accent)}>
            <Icon size={16} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{category.badge}</p>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{category.label}</h3>
          </div>
        </div>
        {!compact ? (
          <span className="hidden text-xs text-slate-400 sm:block">{category.items.length} documentos</span>
        ) : null}
      </div>

      {compact ? (
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-slate-500">{category.description}</p>
      ) : null}

      <div className="overflow-hidden rounded-[24px] bg-white ring-1 ring-slate-200">
        <ul className="divide-y divide-slate-100">
          {category.items.map((item) => (
            <li key={item.id}>
              <button className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {item.area} · {item.updated}
                  </p>
                </div>
                {item.meta ? (
                  <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:inline-flex">
                    {item.meta}
                  </span>
                ) : null}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                  {item.meta === 'PDF' || item.meta === 'DOCX' ? <Download size={14} /> : <ArrowRight size={14} />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
