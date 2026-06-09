import { useState } from 'react';
import { Drawer } from 'vaul';
import { Download, ExternalLink, ChevronDown, FileText, Info } from 'lucide-react';
import { toast } from 'sonner';
import { espacioServices, beneficiosPacto, formatos, normas, fuenteMeta } from '../data/portal';
import type { DocItem } from '../data/portal';
import type { Segment } from '../types/app';
import { cn } from '../lib/cn';
import { KindTag, StatNumber } from './ui';

export function ServiceSheet({
  serviceId,
  onClose,
}: {
  serviceId: string | null;
  segment: Segment;
  onClose: () => void;
}) {
  const svc = espacioServices.find((s) => s.id === serviceId) ?? null;

  return (
    <Drawer.Root open={!!serviceId} onClose={onClose} onOpenChange={(o) => !o && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] w-full max-w-[480px] flex-col rounded-t-[1.6rem] border-t border-line bg-paper">
          <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-line" />
          {svc ? (
            <div className="no-scrollbar overflow-y-auto px-5 pb-10 pt-4">
              <Drawer.Title className="sr-only">{svc.title}</Drawer.Title>
              <div className="mb-4 flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-paper">
                  <svc.icon size={20} />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold tracking-tightish text-ink">{svc.title}</h3>
                  <p className="text-xs text-ink-mute">{fuenteMeta[svc.fuente].hint}</p>
                </div>
                <KindTag kind={svc.kind} />
              </div>

              <Body id={svc.id} />
            </div>
          ) : null}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function Body({ id }: { id: string }) {
  switch (id) {
    case 'vacaciones':
      return (
        <Stat value={12} suffix=" días" caption="Días disponibles" foot="4 días vencen en julio">
          <HelpNote text="Tus vacaciones las coordinas con tu líder. Aquí ves tu saldo siempre al día." />
        </Stat>
      );
    case 'cesantias':
      return (
        <BigValue value="$8.450.000" caption="Saldo de cesantías" foot="Corte 31 may 2026 · actualizado hoy">
          <HelpNote text="¿Vas a solicitar un retiro? Descarga el formato de solicitud en Formatos." />
        </BigValue>
      );
    case 'prestamos':
      return (
        <BigValue value="$1.280.000" caption="Saldo del préstamo" foot="18 de 24 cuotas pagadas · finaliza sep 2026" />
      );
    case 'colilla':
      return <DownloadBlock label="Descargar colilla" sub="Quincena en curso · PDF" history={['1ra quincena jun 2026', '2da quincena may 2026', '1ra quincena may 2026']} />;
    case 'cir':
      return <DownloadBlock label="Descargar certificado" sub="Ingresos y retenciones 2025 · PDF" history={['Año gravable 2025', 'Año gravable 2024']} />;
    case 'carta-laboral':
      return <DownloadBlock label="Generar certificación" sub="Con corte de hoy · PDF firmado" history={['Generada 28 may 2026', 'Generada 12 mar 2026']} />;
    case 'beneficios':
      return <DocList items={beneficiosPacto} />;
    case 'normas':
      return <DocList items={normas} />;
    case 'formatos':
      return <Formatos />;
    default:
      return null;
  }
}

/* ---- bloques ---- */

function Stat({
  value,
  suffix,
  caption,
  foot,
  children,
}: {
  value: number;
  suffix?: string;
  caption: string;
  foot: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="rounded-xl border border-line bg-white p-6 text-center">
        <p className="font-display text-5xl font-extrabold tracking-tightish text-ink">
          <StatNumber value={value} suffix={suffix} />
        </p>
        <p className="mt-1 text-sm font-semibold text-ink-soft">{caption}</p>
        <p className="mt-0.5 text-xs text-ink-mute">{foot}</p>
      </div>
      {children}
    </div>
  );
}

function BigValue({ value, caption, foot, children }: { value: string; caption: string; foot: string; children?: React.ReactNode }) {
  return (
    <div>
      <div className="rounded-xl border border-line bg-white p-6 text-center">
        <p className="font-display text-4xl font-extrabold tracking-tightish text-ink">{value}</p>
        <p className="mt-1 text-sm font-semibold text-ink-soft">{caption}</p>
        <p className="mt-0.5 text-xs text-ink-mute">{foot}</p>
      </div>
      {children}
    </div>
  );
}

function DownloadBlock({ label, sub, history }: { label: string; sub: string; history: string[] }) {
  return (
    <div>
      <button
        onClick={() => toast.success('Documento listo', { description: 'Se descargó en tu dispositivo (demo).' })}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3.5 text-sm font-bold text-paper"
      >
        <Download size={18} />
        {label}
      </button>
      <p className="mt-2 text-center text-xs text-ink-mute">{sub}</p>
      <p className="mb-2 mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-mute">Historial</p>
      <div className="space-y-1.5">
        {history.map((h) => (
          <div key={h} className="flex items-center gap-3 rounded-lg border border-line bg-white px-3.5 py-2.5">
            <FileText size={15} className="text-ink-mute" />
            <span className="flex-1 text-sm text-ink-soft">{h}</span>
            <Download size={15} className="text-ink-mute" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DocList({ items }: { items: DocItem[] }) {
  return (
    <div className="space-y-1.5">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => toast(it.accion === 'descargar' ? 'Descargando (demo)' : 'Abriendo en el repositorio (demo)')}
          className="flex w-full items-center gap-3 rounded-lg border border-line bg-white px-3.5 py-3 text-left"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{it.title}</p>
            <p className="truncate text-xs text-ink-mute">{it.meta}</p>
          </div>
          {it.accion === 'descargar' ? <Download size={16} className="text-ink-mute" /> : <ExternalLink size={15} className="text-ink-mute" />}
        </button>
      ))}
    </div>
  );
}

function Formatos() {
  const [open, setOpen] = useState<string | null>(formatos[0]?.grupo ?? null);
  return (
    <div className="space-y-2">
      <p className="mb-1 text-xs leading-snug text-ink-mute">
        Descarga el formato, diligéncialo y radícalo en servicio al personal.
      </p>
      {formatos.map((g) => {
        const isOpen = open === g.grupo;
        return (
          <div key={g.grupo} className="overflow-hidden rounded-lg border border-line bg-white">
            <button
              onClick={() => setOpen(isOpen ? null : g.grupo)}
              className="flex w-full items-center gap-3 px-3.5 py-3 text-left"
            >
              <g.icon size={17} className="text-ink-soft" />
              <span className="flex-1 text-sm font-bold text-ink">{g.grupo}</span>
              <ChevronDown size={16} className={cn('text-ink-mute transition-transform', isOpen && 'rotate-180')} />
            </button>
            {isOpen ? (
              <div className="space-y-1 border-t border-line px-3 pb-3 pt-2">
                {g.items.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => toast('Descargando formato (demo)')}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-paper-2"
                  >
                    <Download size={14} className="text-ink-mute" />
                    <span className="flex-1 text-[13px] text-ink-soft">{it.title}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function HelpNote({ text }: { text: string }) {
  return (
    <div className="mt-3 flex items-start gap-2 rounded-lg bg-paper-2 px-3 py-2.5 text-ink-soft">
      <Info size={14} className="mt-0.5 shrink-0" />
      <p className="text-xs leading-snug">{text}</p>
    </div>
  );
}

