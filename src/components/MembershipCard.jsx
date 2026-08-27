import React from 'react';
import { Zap } from 'lucide-react';
import { useLocation } from 'wouter';

export function MembershipCard() {
  const [, setLocation] = useLocation();

  return (
    <section
      aria-labelledby="membership-title"
      className="rounded-[2rem] bg-ink-soft p-5 border border-ink-line shadow-lg"
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
          Membresía
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-lime">
          <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
          Activa
        </span>
      </div>

      <h2
        id="membership-title"
        className="mt-4 text-2xl font-bold tracking-tight text-paper text-balance"
      >
        Plan Box mensual
      </h2>
      <p className="mt-1.5 text-sm text-white/45">
        Próximo pago en{' '}
        <span className="font-semibold text-flame">3 días</span>
        {' · '}Vence 25 Sep
      </p>

      <button
        type="button"
        onClick={() => setLocation('/staff')}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-paper py-3.5 text-[14px] font-bold uppercase tracking-wide text-ink transition-transform active:scale-[0.98] cursor-pointer"
      >
        <Zap className="size-4 fill-ink" strokeWidth={2.5} aria-hidden="true" />
        Pagar con Sinpe
      </button>
    </section>
  );
}