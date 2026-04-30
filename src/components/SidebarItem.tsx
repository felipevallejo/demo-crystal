import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/cn';

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  inSection?: boolean;
  hasChildren?: boolean;
  expanded?: boolean;
  onClick: () => void;
};

export function SidebarItem({ icon: Icon, label, active, inSection, hasChildren, expanded, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-sm transition-all duration-200',
        active
          ? 'bg-crystal-primary text-white shadow-lg shadow-black/10'
          : inSection
          ? 'bg-slate-100 text-slate-900'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      )}
    >
      <Icon size={18} />
      <span className="flex-1 font-medium">{label}</span>
      {hasChildren ? (
        <ChevronDown
          size={14}
          className={cn(
            'transition-transform',
            expanded ? 'rotate-0 opacity-80' : '-rotate-90 opacity-50',
          )}
        />
      ) : null}
    </button>
  );
}

type SidebarSubItemProps = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
};

export function SidebarSubItem({ icon: Icon, label, active, onClick }: SidebarSubItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13px] transition-all duration-150',
        active
          ? 'bg-slate-900 font-medium text-white'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
      )}
    >
      <Icon size={14} className="shrink-0" />
      <span className="flex-1">{label}</span>
    </button>
  );
}

type SidebarChildrenProps = {
  visible: boolean;
  children: React.ReactNode;
};

export function SidebarChildren({ visible, children }: SidebarChildrenProps) {
  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3 py-1">{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
