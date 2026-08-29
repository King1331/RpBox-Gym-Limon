import { X, Check } from "lucide-react";
import { useWorkoutSession } from "../../lib/workout/WorkoutContext";
import ExerciseMedia from "./ExerciseMedia";

// Drawer (hamburguesa) con la lista de ejercicios de la rutina.
export default function ExerciseListDrawer({ open, onClose, onJump }) {
  const { exercises, exerciseIndex, setIndex, completedSetsFor } = useWorkoutSession();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />
      <div 
        className="relative w-full max-w-sm h-full bg-ink border-l border-ink-line animate-slide-in-right flex flex-col"
        style={{ 
          paddingTop: 'calc(env(safe-area-inset-top) + 1rem)',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)'
        }}
      >
        <div className="flex items-center justify-between px-5 pb-4 border-b border-ink-line">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Vista general</div>
            <div className="text-lg font-extrabold tracking-tight">Tu rutina</div>
          </div>
          <button onClick={onClose} className="touch-press w-10 h-10 rounded-full bg-ink-soft border border-ink-line flex items-center justify-center">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {exercises.map((ex, i) => {
            const done = completedSetsFor(ex.id).length;
            const isCurrent = i === exerciseIndex;
            const isComplete = done >= ex.series;
            return (
              <button
                key={ex.id}
                onClick={() => onJump(i)}
                className={`touch-press w-full text-left flex gap-3 p-3 rounded-2xl border transition-colors ${
                  isCurrent ? "border-lime bg-lime/5" : "border-ink-line bg-ink-soft"
                }`}
              >
                <div className="w-24 shrink-0">
                  <ExerciseMedia exercise={ex} compact showPlay={false} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Ej {i + 1}</span>
                    {isComplete && (
                      <span className="ml-auto w-5 h-5 rounded-full bg-lime text-ink flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="font-bold tracking-tight truncate">{ex.nombre}</div>
                  <div className="text-xs text-white/50 capitalize">{ex.grupoMuscular}</div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-white/40">
                    <span>{ex.series} series</span>
                    <span>·</span>
                    <span>{ex.reps} reps</span>
                    {isCurrent && (
                      <span className="ml-auto text-lime font-semibold">Serie {Math.min(setIndex + 1, ex.series)}</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}