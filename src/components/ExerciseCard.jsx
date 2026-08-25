import React from 'react';
import { Check, CircleCheck, Flame } from 'lucide-react';

export default function ExerciseCard({
  exercise,
  exerciseIndex,
  logs,
  saved,
  onCompleteSet,
  onUpdateLog,
}) {
  return (
    <section
      className="flex flex-col rounded-2xl bg-ink-soft border border-white/5 p-4 sm:p-5 shadow-lg"
      data-testid={`card-exercise-${exercise.id}`}
    >
      {/* Cabecera del ejercicio */}
      <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/5 mb-4">
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-lime flex items-center gap-1.5 truncate">
            0{exerciseIndex + 1} — {exercise.target}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-paper mt-0.5 truncate">
            {exercise.name}
          </h3>
          <p className="text-xs text-white/60 mt-1 leading-relaxed line-clamp-2">
            {exercise.cue}
          </p>
        </div>
        <div className="shrink-0 rounded-full bg-ink/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-white border border-white/20 whitespace-nowrap">
          {exercise.sets} × {exercise.reps}
        </div>
      </div>

      {/* Filas de series (Sets) */}
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {logs.map((set, setIndex) => (
          <div 
            className="flex items-end gap-2 sm:gap-3 bg-ink/50 p-2 sm:p-2.5 rounded-xl border border-white/5" 
            key={setIndex}
          >
            {/* Indicador de serie */}
            <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 font-mono text-xs font-bold text-white/70 mb-0.5">
              S{setIndex + 1}
            </div>

            {/* Input de Peso */}
            <div className="flex flex-1 flex-col min-w-0">
              <label className="text-[10px] font-medium uppercase tracking-wider text-white/40 mb-1 truncate">
                Peso (kg)
              </label>
              <input
                type="number"
                value={set.weight}
                onChange={(event) =>
                  onUpdateLog(exercise.id, setIndex, 'weight', event.target.value)
                }
                className="w-full rounded-lg bg-ink px-2.5 sm:px-3 py-2 text-sm font-mono text-paper border border-white/10 focus:border-lime focus:outline-none transition-colors"
                data-testid={`input-weight-${exercise.id}-${setIndex + 1}`}
              />
            </div>

            {/* Input de Reps */}
            <div className="flex flex-1 flex-col min-w-0">
              <label className="text-[10px] font-medium uppercase tracking-wider text-white/40 mb-1 truncate">
                Reps
              </label>
              <input
                type="number"
                value={set.reps}
                onChange={(event) =>
                  onUpdateLog(exercise.id, setIndex, 'reps', event.target.value)
                }
                className="w-full rounded-lg bg-ink px-2.5 sm:px-3 py-2 text-sm font-mono text-paper border border-white/10 focus:border-lime focus:outline-none transition-colors"
                data-testid={`input-reps-${exercise.id}-${setIndex + 1}`}
              />
            </div>

            {/* Botón de Completar Serie (Alineado perfectamente abajo con flex items-end) */}
            <button
              type="button"
              className={`flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl transition-all cursor-pointer mb-0.5 ${
                set.done
                  ? 'bg-lime text-ink shadow-md shadow-lime/20'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-paper'
              }`}
              onClick={() => onCompleteSet(exercise.id, setIndex)}
              aria-label={set.done ? 'Serie completada' : 'Completar serie'}
              data-testid={`button-complete-${exercise.id}-${setIndex + 1}`}
            >
              {set.done ? <Check size={18} strokeWidth={3} /> : <CircleCheck size={18} />}
            </button>
          </div>
        ))}
      </div>

      {/* Nota de guardado o completado */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-center font-mono text-[11px] font-semibold tracking-wider text-lime">
        {logs.every((set) => set.done) && <Flame className="size-3.5 text-flame" />}
        {logs.every((set) => set.done)
          ? 'ENTRENAMIENTO COMPLETO'
          : saved?.startsWith(exercise.id)
            ? 'GUARDADO LOCALMENTE ✓'
            : ''}
      </div>
    </section>
  );
}