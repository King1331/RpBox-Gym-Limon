import { useEffect } from "react";
import { useLocation } from "wouter";
import { Trophy, Dumbbell, Layers, Clock, TrendingUp } from "lucide-react";
import { useWorkoutSession } from "../../lib/workout/WorkoutContext";
import Confetti from "../../components/workout/Confetti";

const fmtDuration = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export default function WorkoutCompleteScreen() {
  const [, setLocation] = useLocation();
  const { summary, routine, resetWorkout } = useWorkoutSession();

  useEffect(() => {
    if (!summary) {
      // Si entramos sin resumen, volvemos al inicio.
      setLocation("/");
    }
  }, [summary, setLocation]);

  if (!summary) return null;

  const handleFinish = (toProgress) => {
    resetWorkout();
    setLocation(toProgress ? "/workout/streak" : "/");
  };

  const stats = [
    { icon: Clock, label: "Duración", value: fmtDuration(summary.duracionTotal) },
    { icon: Layers, label: "Ejercicios", value: summary.ejerciciosCompletados },
    { icon: Dumbbell, label: "Series totales", value: summary.seriesTotales },
    { icon: TrendingUp, label: "Volumen", value: `${summary.volumenTotal.toLocaleString()} kg` },
  ];

  return (
    <div 
      className="flex flex-col min-h-screen bg-ink text-paper overflow-x-hidden w-full max-w-full"
      style={{ 
        paddingTop: 'calc(env(safe-area-inset-top) + 1rem)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)'
      }}
    >
      <Confetti fire />

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 pt-6 pb-28 w-full max-w-full">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center animate-pop">
            <Trophy size={36} className="text-lime" strokeWidth={2} />
          </div>

          <div className="mt-6 animate-fade-slide">
            <div className="text-[11px] uppercase tracking-widest text-lime font-semibold">¡Listo!</div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">Entrenamiento completado</h1>
            <p className="text-sm text-white/50 mt-2 max-w-xs mx-auto">
              Cerraste la rutina <span className="text-paper font-semibold">{routine?.titulo}</span>. Tu cuerpo lo recuerda.
            </p>
          </div>

          <div className="mt-8 w-full max-w-sm grid grid-cols-2 gap-3 animate-fade-slide">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl bg-ink-soft border border-ink-line p-4 text-left">
                  <Icon size={18} className="text-white/40 mb-2" strokeWidth={2} />
                  <div className="text-2xl font-extrabold tracking-tight">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 w-full max-w-sm space-y-3">
            <button
              onClick={() => handleFinish(true)}
              className="touch-press w-full h-14 rounded-2xl bg-lime text-ink font-extrabold flex items-center justify-center gap-2"
            >
              <Trophy size={20} strokeWidth={2.5} />
              Ver mi progreso
            </button>
            <button
              onClick={() => handleFinish(false)}
              className="touch-press w-full h-12 rounded-2xl bg-ink-soft border border-ink-line text-white/80 font-semibold"
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}