import { useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";
import { useWorkoutSession } from "../../lib/workout/WorkoutContext";
import RestTimer from "../../components/workout/RestTimer";
import ExerciseMedia from "../../components/workout/ExerciseMedia";

export default function RestScreen() {
  const [, setLocation] = useLocation();
  const { restInfo, advanceFromRest, routine } = useWorkoutSession();

  useEffect(() => {
    if (!restInfo) setLocation("/workout/exercise", { replace: true });
  }, [restInfo, setLocation]);

  if (!restInfo) return null;

  const { duration, nextExercise } = restInfo;

  const handleComplete = () => {
    advanceFromRest();
    setLocation("/workout/exercise");
  };

  return (
    <div className="flex flex-col min-h-screen bg-ink text-paper overflow-x-hidden w-full max-w-full">
      {/* Top bar */}
      <div 
        className="flex items-center justify-between px-5 pb-3 border-b border-ink-line bg-ink"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}
      >
        <button 
          onClick={() => setLocation("/workout/exercise")} 
          className="touch-press flex items-center gap-1 text-white/60 text-xs uppercase tracking-widest font-semibold"
        >
          <ChevronLeft size={16} strokeWidth={2.5} /> Volver
        </button>
        <div className="text-[10px] uppercase tracking-widest text-white/40">{routine?.titulo}</div>
        <div className="w-10" />
      </div>

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 pt-4 pb-28 w-full max-w-full">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-widest text-white/40">Descanso activo</div>
            <div className="text-xl font-extrabold tracking-tight mt-1">Recupérate</div>
          </div>

          <RestTimer duration={duration} onComplete={handleComplete} />

          {nextExercise && (
            <div className="w-full max-w-sm">
              <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2 text-center">Siguiente ejercicio</div>
              <div className="flex gap-3 items-center p-3 rounded-2xl bg-ink-soft border border-ink-line">
                <div className="w-20 sm:w-24 shrink-0">
                  <ExerciseMedia exercise={nextExercise} compact showPlay={false} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold tracking-tight truncate">{nextExercise.nombre}</div>
                  <div className="text-xs text-white/50 capitalize">{nextExercise.grupoMuscular}</div>
                  <div className="mt-1 text-[11px] text-white/40">{nextExercise.series} series · {nextExercise.reps} reps</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}