import React from 'react';
import { Flame, Dumbbell, HeartPulse } from 'lucide-react';
import { useWorkoutSession } from '../lib/workout/WorkoutContext';

export function Scoreboard() {
  const { streak } = useWorkoutSession();

  const stats = [
    { icon: Flame, value: String(streak).padStart(2, '0'), label: 'Racha', detail: '+1 sesión', accent: 'text-flame' },
    { icon: Dumbbell, value: '12.4k', label: 'Volumen', detail: '+8.6%', accent: 'text-lime' },
    { icon: HeartPulse, value: '82%', label: 'Recup.', detail: 'Excelente', accent: 'text-paper' },
  ];

  return (
    <section aria-labelledby="scoreboard-title">
      <div className="mb-3 flex items-baseline justify-between px-1">
        <h2
          id="scoreboard-title"
          className="text-sm font-bold uppercase tracking-widest text-paper"
        >
          Tu marcador
        </h2>
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/35">
          Esta semana
        </p>
      </div>

      <dl className="grid grid-cols-3 gap-2">
        {stats.map(({ icon: Icon, value, label, detail, accent }) => (
          <div
            key={label}
            className="flex flex-col rounded-2xl bg-ink-soft p-3 border border-ink-line shadow-lg overflow-hidden"
          >
            <Icon className={`size-5 ${accent}`} strokeWidth={2} aria-hidden="true" />
            <dd className="mt-3 text-xl font-extrabold leading-none tracking-tight text-paper truncate">
              {value}
            </dd>
            <dt className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-white/40 truncate">
              {label}
            </dt>
            <p className="mt-0.5 text-[10px] text-white/30 truncate">{detail}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}