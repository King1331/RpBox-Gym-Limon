import React from 'react';
import { Dumbbell, ChevronLeft } from 'lucide-react';

import ExerciseCard from '@/components/ExerciseCard';
import HeroSection from '@/components/HeroSection';
import { exercises } from '@/lib/data';
import useRoutineLogs from '@/hooks/useRoutineLogs';

export default function RoutineScreen() {
  const { logs, saved, completed, completeSet, updateLog } =
    useRoutineLogs(exercises);

  return (
    <div className="flex flex-col bg-ink text-paper">
      
      {/* Hero unificado, tamaño idéntico al Home */}
      <HeroSection>
        <button 
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-white/60 hover:text-paper active:scale-95 transition-all mb-4 text-xs font-semibold uppercase tracking-widest"
        >
          <ChevronLeft size={16} />
          Volver
        </button>

        <span className="text-[11px] font-semibold uppercase tracking-widest text-white">
          Martes · Día 03
        </span>
        <h1 className="mt-2 text-5xl font-extrabold leading-[0.95] tracking-tight text-paper text-balance">
          Pierna
        </h1>
        <p className="mt-3 text-base font-medium text-white/70">
          Hipertrofia · Enfócate en el control.
        </p>
      </HeroSection>

      {/* Contenido Principal */}
      <main className="flex flex-col gap-4 px-5 pb-32 pt-4">
        {/* Tarjeta de resumen de progreso */}
        <section className="flex items-center justify-between rounded-2xl bg-ink-soft border border-white/5 p-4 shadow-lg">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
              Progreso de sesión
            </span>
            <strong className="text-lg font-bold text-paper mt-0.5">
              {completed} / 13 series
            </strong>
          </div>
          <div className="flex size-12 items-center justify-center rounded-xl bg-ink/10 text-white">
            <Dumbbell size={24} />
          </div>
        </section>

        {/* Lista de ejercicios */}
        <div className="flex flex-col gap-4 mt-2">
          {exercises.map((exercise, exerciseIndex) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              exerciseIndex={exerciseIndex}
              logs={logs[exercise.id]}
              saved={saved}
              onCompleteSet={completeSet}
              onUpdateLog={updateLog}
            />
          ))}
        </div>
      </main>

    </div>
  );
}