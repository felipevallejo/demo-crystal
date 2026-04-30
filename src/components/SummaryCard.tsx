import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SummaryItem, TabId } from '../types/app';
import { cn } from '../lib/cn';

type SummaryCardProps = SummaryItem & {
  onOpen: (tab: TabId) => void;
};

export function SummaryCard({ title, value, detail, tone, icon: Icon, tab, onOpen }: SummaryCardProps) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      onClick={() => onOpen(tab)}
      className="card-crystal w-full overflow-hidden text-left transition-shadow hover:shadow-xl hover:shadow-slate-200"
    >
      <div className="mb-8 flex items-start justify-between">
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-[20px] text-white shadow-lg', tone)}>
          <Icon size={18} />
        </div>
        <div className="rounded-full border border-slate-200 p-2 text-slate-400 transition-colors hover:text-slate-900">
          <ChevronRight size={16} />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-4xl font-bold tracking-[-0.03em] text-slate-950 sm:text-[2.6rem]">{value}</p>
      <div className="mt-5 h-px w-12 bg-slate-200" />
      <p className="mt-4 text-sm text-slate-500">{detail}</p>
    </motion.button>
  );
}
