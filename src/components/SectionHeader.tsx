type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-crystal-gef-green">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <p className="max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}
