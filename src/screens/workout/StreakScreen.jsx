import { useLocation } from "wouter";
import { Flame, ChevronLeft, Calendar, Dumbbell, TrendingUp } from "lucide-react";
import { useWorkoutSession } from "../../lib/workout/WorkoutContext";

const motivational = (streak) => {
  if (streak === 0) return "Hoy es un buen día para empezar de nuevo.";
  if (streak < 3) return "El impulso empieza con un paso. ¡Sigue!";
  if (streak < 7) return "Vas en serio. La consistencia lo es todo.";
  if (streak < 14) return "Una semana completa. Tu yo del futuro lo agradece.";
  return "Eres imparable. Esta racha es tuya.";
};

export default function StreakScreen() {
  const [, setLocation] = useLocation();
  const { streak, weekDays, totalSessions, totalVolume } = useWorkoutSession();

  return (
    <div className="flex flex-col min-h-screen bg-ink text-paper overflow-x-hidden w-full max-w-full">
      {/* Top bar */}
      <div 
        className="flex items-center justify-between px-4 sm:px-5 pb-3 border-b border-ink-line bg-ink"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}
      >
        <button 
          onClick={() => setLocation("/")} 
          className="touch-press flex items-center gap-1 text-white/60 text-xs uppercase tracking-widest font-semibold"
        >
          <ChevronLeft size={16} strokeWidth={2.5} /> Volver
        </button>
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest text-white/40">Tu progreso</div>
          <div className="text-sm font-bold text-paper">Consistencia</div>
        </div>
        <div className="w-8 sm:w-10" />
      </div>

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-5 pt-4 pb-28 w-full max-w-full">
        <div className="space-y-4">
          {/* Racha */}
          <div className="rounded-3xl bg-ink-soft border border-ink-line p-5 sm:p-6 flex flex-col items-center text-center animate-fade-slide">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-flame/15 border border-flame/30 flex items-center justify-center">
                <Flame size={36} className="text-flame" strokeWidth={2} fill="currentColor" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-flame text-paper flex items-center justify-center font-extrabold text-base sm:text-lg border-2 border-ink">
                {streak}
              </div>
            </div>
            <div className="mt-4 text-xl sm:text-2xl font-extrabold tracking-tight">{streak} días de racha</div>
            <p className="text-sm text-white/50 mt-1 max-w-xs">{motivational(streak)}</p>
          </div>

          {/* Calendario semanal */}
          <div className="rounded-3xl bg-ink-soft border border-ink-line p-2.5 sm:p-5 animate-fade-slide">
            <div className="flex items-center justify-between mb-2.5 sm:mb-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar size={12} className="text-white/40 shrink-0" strokeWidth={2} />
                <span className="text-[8px] sm:text-[11px] uppercase tracking-widest text-white/40 truncate">Últimos 7 días</span>
              </div>
              <span className="text-[9px] sm:text-[11px] text-white/40 shrink-0">{weekDays.filter((d) => d.trained).length}/7</span>
            </div>

            {/* Grid de 7 columnas - compacto en <320px */}
            <div className="grid grid-cols-7 gap-0.5 sm:gap-2 w-full">
              {weekDays.map((d) => (
                <div key={d.key} className="flex flex-col items-center gap-0.5 sm:gap-2 min-w-0">
                  <span className="text-[7px] sm:text-[10px] uppercase tracking-wide text-white/40 truncate text-center w-full">
                    {d.label}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-md sm:rounded-xl flex items-center justify-center text-[10px] sm:text-sm font-bold transition-colors ${
                      d.trained
                        ? "bg-lime text-ink"
                        : "bg-ink border border-ink-line text-white/30"
                    } ${d.isToday ? "ring-1 sm:ring-2 ring-lime/50" : ""}`}
                  >
                    {d.dayNum}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2.5 sm:mt-4 flex items-center gap-2 sm:gap-4 text-[8px] sm:text-[11px] text-white/40 flex-wrap">
              <span className="flex items-center gap-1 sm:gap-1.5">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-lime shrink-0" /> Entrenado
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-ink border border-ink-line shrink-0" /> Descanso
              </span>
            </div>
          </div>

          {/* Resumen */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 animate-fade-slide">
            <div className="rounded-2xl bg-ink-soft border border-ink-line p-3 sm:p-4">
              <Dumbbell size={16} className="text-white/40 mb-2" strokeWidth={2} />
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight">{totalSessions}</div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">Sesiones totales</div>
            </div>
            <div className="rounded-2xl bg-ink-soft border border-ink-line p-3 sm:p-4">
              <TrendingUp size={16} className="text-white/40 mb-2" strokeWidth={2} />
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight">{(totalVolume / 1000).toFixed(1)}k</div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">Volumen (kg)</div>
            </div>
          </div>

          <button
            onClick={() => setLocation("/")}
            className="touch-press w-full h-11 sm:h-12 rounded-2xl bg-lime text-ink font-extrabold flex items-center justify-center gap-2 mt-2 text-sm sm:text-base"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}