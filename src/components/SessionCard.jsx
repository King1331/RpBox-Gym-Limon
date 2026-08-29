import React from 'react';
import { Play, Clock, Flame, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';

const exercises = [
  { name: 'Sentadilla trasera', detail: '4 series · 8 reps', index: '01' },
  { name: 'Prensa de pierna', detail: '4 series · 10 reps', index: '02' },
  { name: 'Peso muerto rumano', detail: '3 series · 12 reps', index: '03' },
  { name: 'Extensión de cuádriceps', detail: '3 series · 15 reps', index: '04' },
];

export default function SessionCard() {
  const [, setLocation] = useLocation();

  // Mostrar solo el primer ejercicio
  const visibleExercises = exercises.slice(0, 1);

  const handleStartWorkout = () => {
    setLocation('/workout/exercise');
  };

  return (
    <section
      aria-labelledby="session-title"
      className="rounded-[2rem] bg-ink-soft p-4 sm:p-5 border border-ink-line shadow-lg"
    >
      {/* Encabezado de la sesión adaptado para pantallas S */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="rounded-full bg-white/5 px-3 py-1">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-white/50 whitespace-nowrap">
            Hoy · Día 03
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-[12px] sm:text-[13px] font-medium text-white/50 whitespace-nowrap">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            58 min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="size-3.5 text-flame" aria-hidden="true" />
            420 kcal
          </span>
        </div>
      </div>

      {/* Título gigante */}
      <div className="mt-5">
        <h2
          id="session-title"
          className="text-4xl sm:text-5xl font-extrabold leading-none tracking-tight text-paper"
        >
          Pierna
        </h2>
        <p className="mt-2 text-sm sm:text-base font-medium text-white/45">
          Hipertrofia · Intensidad alta
        </p>
      </div>

      {/* Botón protagonista con navegación */}
      <button
        type="button"
        onClick={handleStartWorkout}
        className="mt-5 flex w-full items-center justify-between rounded-full bg-lime py-2 pl-5 pr-2 text-ink transition-transform active:scale-[0.98] cursor-pointer"
      >
        <span className="text-[14px] sm:text-[15px] font-bold uppercase tracking-wide">
          Empezar entrenamiento
        </span>
        <span className="flex size-10 sm:size-11 items-center justify-center rounded-full bg-ink">
          <Play className="size-4 sm:size-5 fill-lime text-lime" aria-hidden="true" />
        </span>
      </button>

      {/* Lista de ejercicios (solo 1 visible) */}
      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Ronda 1
          </h3>
          <span className="text-xs font-medium text-white/40">
            {visibleExercises.length} ejercicio{visibleExercises.length !== 1 && 's'}
          </span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {visibleExercises.map((ex, i) => (
            <li
              key={ex.index}
              className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-2.5 border border-white/[0.02]"
            >
              <span
                className={`flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl text-xs sm:text-sm font-bold ${
                  i === 0 ? 'bg-lime text-ink' : 'bg-white/5 text-white/40'
                }`}
              >
                {ex.index}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-paper">
                  {ex.name}
                </p>
                <p className="text-[11px] sm:text-xs text-white/40">{ex.detail}</p>
              </div>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-white/10">
                <ChevronRight className="size-4 text-white/50" aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}