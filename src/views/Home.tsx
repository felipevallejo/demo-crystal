import { useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Search, CalendarPlus, Cake, IdCard, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import {
  empleado,
  news,
  events,
  birthdays,
  recognitions,
  espacioServices,
  quickActionIds,
} from '../data/portal';
import type { ViewProps } from '../types/app';
import { Eyebrow, SectionHeading } from '../components/ui';
import { cn } from '../lib/cn';

const quickTints: Record<string, string> = {
  colilla: 'bg-blue-50 text-blue-700',
  vacaciones: 'bg-emerald-50 text-emerald-700',
  'carta-laboral': 'bg-violet-50 text-violet-700',
  cesantias: 'bg-amber-50 text-amber-700',
};

export function Home({ segment, onNavigate, onOpenSearch, onOpenService }: ViewProps) {
  const visibleNews = useMemo(
    () => news.filter((n) => n.segmento === 'todos' || n.segmento === segment.perfil),
    [segment.perfil],
  );
  const visibleEvents = useMemo(
    () => events.filter((e) => e.segmento === 'todos' || e.segmento === segment.perfil),
    [segment.perfil],
  );
  const quickActions = quickActionIds
    .map((id) => espacioServices.find((s) => s.id === id))
    .filter(Boolean) as typeof espacioServices;

  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });

  return (
    <div className="space-y-7">
      {/* saludo + buscador */}
      <section>
        <Eyebrow>Hola, {empleado.primerNombre}</Eyebrow>
        <h1 className="mt-1.5 font-display text-2xl font-extrabold leading-tight tracking-tightish text-ink text-balance">
          ¿Qué necesitas resolver hoy?
        </h1>
        <button
          onClick={onOpenSearch}
          className="mt-3 flex w-full items-center gap-3 rounded-xl border border-line bg-white px-3 py-3 text-left shadow-soft"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg signature-grad text-white">
            <Search size={18} />
          </span>
          <span className="flex-1 text-sm text-ink-mute">Colilla, vacaciones, carta laboral…</span>
        </button>
      </section>

      {/* accesos rápidos */}
      <section>
        <div className="grid grid-cols-2 gap-2.5">
          {quickActions.map((s) => {
            const t = quickTints[s.id] ?? 'bg-paper-2 text-ink-soft';
            return (
              <button
                key={s.id}
                onClick={() => {
                  onNavigate('space');
                  onOpenService(s.id);
                }}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-3 text-left shadow-soft"
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${t}`}>
                  <s.icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-bold text-ink">{s.title}</span>
                  {s.id === 'cesantias' ? (
                    <span className="block truncate text-[11px] font-semibold text-ink-mute">Ver saldo</span>
                  ) : (
                    <span className="block truncate text-[11px] font-semibold text-gef-green">{s.value ?? 'Descargar'}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* rotabanner noticias */}
      <section>
        <SectionHeading
          eyebrow="Noticias"
          title="Lo que pasa en Crystal"
          action={<SegBadge label={segment.perfil} />}
        />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {visibleNews.map((n) => (
              <article
                key={n.id}
                className="relative w-[86%] shrink-0 overflow-hidden rounded-xl border border-line bg-white"
              >
                <div className="relative h-32 w-full overflow-hidden">
                  <img src={n.cover} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
                    {n.eyebrow}
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">{n.date}</span>
                </div>
                <div className="p-3.5">
                  <h3 className="font-display text-[15px] font-bold leading-snug tracking-tightish text-ink">{n.title}</h3>
                  <p className="mt-1 text-xs leading-snug text-ink-soft text-pretty">{n.excerpt}</p>
                  <button
                    onClick={() => toast('Abriendo…')}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-gef-green"
                  >
                    Ver más
                    <ChevronRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* cumpleaños y reconocimientos */}
      <section>
        <SectionHeading eyebrow="Comunidad" title="Cumpleaños y reconocimientos" />
        <div className="mb-3 flex gap-3 overflow-x-auto no-scrollbar">
          {birthdays.map((b) => (
            <div key={b.id} className="flex w-16 shrink-0 flex-col items-center">
              <div className="relative">
                <img src={b.photo} alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-white" />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gef-green text-white">
                  <Cake size={11} />
                </span>
              </div>
              <p className="mt-1.5 w-full truncate text-center text-[11px] font-semibold text-ink">{b.name.split(' ')[0]}</p>
              <p className="text-[10px] text-ink-mute">{b.date}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {recognitions.map((r) => (
            <div key={r.id} className="flex items-center gap-3 rounded-lg border border-line bg-white px-3.5 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <r.icon size={17} />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-ink">{r.title}</p>
                <p className="truncate text-xs text-ink-mute">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* eventos */}
      <section>
        <SectionHeading eyebrow="Agenda" title="Eventos y reuniones" />
        <div className="space-y-2">
          {visibleEvents.map((e) => (
            <div key={e.id} className="flex items-center gap-3 rounded-lg border border-line bg-white px-3.5 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-paper">
                <e.icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{e.title}</p>
                <p className="truncate text-xs text-ink-mute">{e.when} · {e.place}</p>
              </div>
              {e.agendable ? (
                <button
                  onClick={() => toast.success('Agendado', { description: 'Lo añadimos a tu calendario (demo).' })}
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-[11px] font-bold text-ink-soft"
                >
                  <CalendarPlus size={13} />
                  Agendar
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* entrada a mi espacio */}
      <button
        onClick={() => onNavigate('space')}
        className="flex w-full items-center gap-3 rounded-xl signature-grad px-4 py-4 text-left text-white"
      >
        <IdCard size={22} className="shrink-0" />
        <span className="flex-1">
          <span className="block text-sm font-bold">Mi espacio</span>
          <span className="block text-xs text-white/80">Vacaciones, colilla, cesantías, certificados y más</span>
        </span>
        <ChevronRight size={20} />
      </button>

      <div className="h-2" />
    </div>
  );
}

function SegBadge({ label }: { label: string }) {
  return (
    <span className={cn('rounded-md bg-paper-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-soft')}>
      Para ti · {label}
    </span>
  );
}

