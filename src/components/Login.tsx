import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Smartphone, ArrowRight, KeyRound, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../lib/cn';
import { APP_BRAND, empleado } from '../data/portal';

type Step = 'choose' | 'cedula' | 'otp';

export function Login({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState<Step>('choose');
  const [cedula, setCedula] = useState('');

  return (
    <div className="min-h-dvh bg-paper-2">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-paper px-6 sm:border-x sm:border-line">
        {/* marca */}
        <div className="flex flex-col items-center pt-20">
          <img src="/logo-crystal.png" alt={APP_BRAND} className="h-11 w-auto" />
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.24em] text-ink-mute">
            Ingreso de empleados
          </p>
        </div>

        <div className="mt-10 flex-1">
          {step === 'choose' ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <button
                onClick={onEnter}
                className="flex w-full items-center gap-3 rounded-lg bg-ink px-4 py-4 text-left text-paper"
              >
                <ShieldCheck size={22} className="shrink-0" />
                <span className="flex-1">
                  <span className="block text-sm font-bold">Tengo correo corporativo</span>
                  <span className="block text-xs text-paper/70">Ingreso con mi cuenta Microsoft (SSO)</span>
                </span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setStep('cedula')}
                className="flex w-full items-center gap-3 rounded-lg border border-line bg-white px-4 py-4 text-left text-ink"
              >
                <Smartphone size={22} className="shrink-0 text-gef-green" />
                <span className="flex-1">
                  <span className="block text-sm font-bold">Ingreso con mi cédula</span>
                  <span className="block text-xs text-ink-mute">Recibo un código por WhatsApp · sin contraseña</span>
                </span>
                <ArrowRight size={18} className="text-ink-mute" />
              </button>

              <p className="flex items-start gap-2 px-1 pt-3 text-[11px] leading-snug text-ink-mute">
                <KeyRound size={13} className="mt-0.5 shrink-0" />
                Sin contraseñas que se filtren. El código es de un solo uso y tu cédula se valida contra la base de
                empleados antes de enviarlo.
              </p>
            </motion.div>
          ) : null}

          {step === 'cedula' ? (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.18em] text-ink-mute">Número de cédula</label>
                <input
                  autoFocus
                  inputMode="numeric"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder={empleado.cedula}
                  className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3.5 text-lg font-semibold tracking-wide text-ink outline-none focus:border-ink/40"
                />
              </div>
              <button
                onClick={() => {
                  setStep('otp');
                  toast.success('Código enviado por WhatsApp', { description: 'Llega al celular registrado en Crystal.' });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg signature-grad px-4 py-3.5 text-sm font-bold text-white"
              >
                <MessageCircle size={18} />
                Enviarme el código
              </button>
              <button onClick={() => setStep('choose')} className="w-full text-center text-xs font-semibold text-ink-mute">
                Volver
              </button>
            </motion.div>
          ) : null}

          {step === 'otp' ? (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <p className="text-sm text-ink-soft">
                Escribe el código de 6 dígitos que enviamos por WhatsApp al celular registrado.
              </p>
              <OtpBoxes onComplete={onEnter} />
              <p className="text-center text-[11px] text-ink-mute">El código expira en 5 minutos · un solo uso</p>
              <button onClick={onEnter} className="w-full text-center text-xs font-semibold text-gef-green">
                Demo: entrar directo
              </button>
            </motion.div>
          ) : null}
        </div>

        <p className="pb-10 text-center text-[10px] text-ink-mute">
          Identidad gestionada con Microsoft Entra · acceso seguro para toda la población Crystal
        </p>
      </div>
    </div>
  );
}

function OtpBoxes({ onComplete }: { onComplete: () => void }) {
  const [vals, setVals] = useState<string[]>(['', '', '', '', '', '']);
  return (
    <div className="flex justify-between gap-2">
      {vals.map((v, i) => (
        <input
          key={i}
          inputMode="numeric"
          maxLength={1}
          value={v}
          autoFocus={i === 0}
          onChange={(e) => {
            const next = [...vals];
            next[i] = e.target.value.slice(-1);
            setVals(next);
            const el = e.target.nextElementSibling as HTMLInputElement | null;
            if (e.target.value && el) el.focus();
            if (next.every((x) => x)) setTimeout(onComplete, 250);
          }}
          className={cn(
            'h-14 w-12 rounded-lg border border-line bg-white text-center text-xl font-bold text-ink outline-none focus:border-ink/40',
          )}
        />
      ))}
    </div>
  );
}
