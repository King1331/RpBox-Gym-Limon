import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, ChevronLeft, Check, ArrowRight } from "lucide-react";
import { useWorkoutSession } from "../../lib/workout/WorkoutContext";
import ExerciseMedia from "../../components/workout/ExerciseMedia";
import SeriesProgressDots, { SeriesCheckDots } from "../../components/workout/SeriesProgressDots";
import SetInputRow from "../../components/workout/SetInputRow";
import ExerciseListDrawer from "../../components/workout/ExerciseListDrawer";
import { rutinasMock } from "../../data/mockWorkoutData";

export default function ExerciseScreen() {
  const [, setLocation] = useLocation();
  const {
    routine,
    exercises,
    exerciseIndex,
    setIndex,
    currentExercise,
    completeSet,
    completedSetsFor,
    skipToExercise,
    startRoutine,
  } = useWorkoutSession();

  const [peso, setPeso] = useState(0);
  const [reps, setReps] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNextPreview, setShowNextPreview] = useState(false);

  // Cargar automáticamente la primera rutina disponible si no hay una activa
  useEffect(() => {
    if (!routine && rutinasMock.length > 0) {
      startRoutine(rutinasMock[0]);
    }
  }, [routine, startRoutine]);

  useEffect(() => {
    if (currentExercise) {
      setPeso(currentExercise.pesoRecomendado || 0);
      setReps(currentExercise.reps || 0);
    }
  }, [exerciseIndex, setIndex, currentExercise]);

  if (!routine || !currentExercise) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6 min-h-screen bg-ink text-paper">
        <p className="text-white/60">Cargando rutina...</p>
        <button onClick={() => setLocation("/")} className="px-5 h-11 rounded-full bg-lime text-ink font-bold active:scale-95 transition-transform">
          Volver al inicio
        </button>
      </div>
    );
  }

  const done = completedSetsFor(currentExercise.id).length;
  const isLastSet = setIndex + 1 >= currentExercise.series;
  const isLastExercise = exerciseIndex + 1 >= exercises.length;
  const nextExercise = isLastSet ? exercises[exerciseIndex + 1] : currentExercise;

  const handleComplete = () => {
    const result = completeSet(peso, reps);
    if (result.done) {
      setLocation("/workout/complete");
    } else {
      setShowNextPreview(true);
      setTimeout(() => {
        setShowNextPreview(false);
        setLocation("/workout/rest");
      }, 1600);
    }
  };

  const handleJump = (i) => {
    skipToExercise(i);
    setDrawerOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-ink text-paper overflow-x-hidden w-full max-w-full">
      {/* Top bar */}
      <div 
        className="flex items-center justify-between px-5 pb-3 border-b border-ink-line bg-ink"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}
      >
        <button 
          onClick={() => setLocation("/rutinas")} 
          className="flex items-center gap-1 text-white/60 text-xs uppercase tracking-widest font-semibold hover:text-paper active:scale-95 transition-transform"
        >
          <ChevronLeft size={16} strokeWidth={2.5} /> Volver
        </button>
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest text-white/40">{routine.titulo}</div>
          <div className="text-xs font-semibold text-white/70">Ej {exerciseIndex + 1} / {exercises.length}</div>
        </div>
        <button 
          onClick={() => setDrawerOpen(true)} 
          className="w-10 h-10 rounded-full bg-ink-soft border border-ink-line flex items-center justify-center active:scale-95 transition-transform"
        >
          <Menu size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 pt-4 pb-28 w-full max-w-full">
        <div key={`${exerciseIndex}-${setIndex}`} className="animate-fade-slide-up w-full max-w-full">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-lime font-semibold mb-1">{currentExercise.grupoMuscular}</div>
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">{currentExercise.nombre}</h1>
            <p className="text-sm text-white/50 mt-1.5 leading-snug">{currentExercise.descripcion}</p>
          </div>

          <ExerciseMedia exercise={currentExercise} />

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-widest text-white/40">Progreso de series</span>
              <span className="text-[11px] font-semibold text-white/70">Serie {setIndex + 1} de {currentExercise.series}</span>
            </div>
            <SeriesProgressDots total={currentExercise.series} current={setIndex} completed={done} />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-widest text-white/40">Objetivo</span>
              <span className="text-sm font-bold">{currentExercise.reps} reps · {currentExercise.descansoEntreSeries}s descanso</span>
            </div>
            <SetInputRow peso={peso} reps={reps} onChangePeso={setPeso} onChangeReps={setReps} />
          </div>

          <div className="mt-5">
            <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2">Series completadas</div>
            <SeriesCheckDots total={currentExercise.series} completed={done} />
          </div>

          {/* Botón Completar serie - En el flujo del contenido */}
          <div className="mt-6">
            <button
              onClick={handleComplete}
              className="w-full h-14 rounded-2xl bg-lime text-ink font-extrabold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              <Check size={22} strokeWidth={3} />
              Completar serie {setIndex + 1}
            </button>
          </div>
        </div>
      </div>

      {/* Preview del siguiente ejercicio */}
      {showNextPreview && nextExercise && (
        <div className="fixed inset-0 z-40 bg-ink/95 flex flex-col items-center justify-center px-8 animate-fade-in">
          <div className="text-[11px] uppercase tracking-widest text-lime font-semibold mb-2">A continuación</div>
          <div className="w-full max-w-xs">
            <ExerciseMedia exercise={nextExercise} compact showPlay={false} />
          </div>
          <div className="mt-4 text-xl font-extrabold tracking-tight">{nextExercise.nombre}</div>
          <div className="mt-1 text-sm text-white/50 capitalize">{nextExercise.grupoMuscular}</div>
          <div className="mt-6 flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest">
            Descanso <ArrowRight size={14} />
          </div>
        </div>
      )}

      <ExerciseListDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onJump={handleJump} />
    </div>
  );
}