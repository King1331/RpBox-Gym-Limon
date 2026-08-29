import React, { createContext, useContext, useState, useCallback } from "react";
import { getRoutineExercises } from "../../data/mockWorkoutData";
import { useStreak } from "./useStreak";

const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const streakApi = useStreak();

  const [routine, setRoutine] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  // sets: { [exerciseId]: [{ peso, reps }, ...] }
  const [sets, setSets] = useState({});
  const [startedAt, setStartedAt] = useState(null);
  const [restInfo, setRestInfo] = useState(null); // { duration, nextExercise, isLast }
  const [summary, setSummary] = useState(null);

  const startRoutine = useCallback((selectedRoutine) => {
    const exs = getRoutineExercises(selectedRoutine);
    setRoutine(selectedRoutine);
    setExercises(exs);
    setExerciseIndex(0);
    setSetIndex(0);
    setSets({});
    setStartedAt(Date.now());
    setRestInfo(null);
    setSummary(null);
  }, []);

  const currentExercise = exercises[exerciseIndex] || null;

  const completedSetsFor = (exerciseId) => sets[exerciseId] || [];

  // Completa la serie actual con peso y reps. Devuelve info de descanso / fin.
  const completeSet = useCallback(
    (peso, reps) => {
      const ex = exercises[exerciseIndex];
      if (!ex) return { done: false };

      const newSets = { ...sets, [ex.id]: [...(sets[ex.id] || []), { peso, reps }] };
      setSets(newSets);

      const isLastSetOfExercise = setIndex + 1 >= ex.series;
      const isLastExercise = exerciseIndex + 1 >= exercises.length;

      if (isLastSetOfExercise && isLastExercise) {
        // Fin del entrenamiento
        const totalSeries = Object.values(newSets).reduce((a, l) => a + l.length, 0);
        const volumen = Object.values(newSets).reduce(
          (a, l) => a + l.reduce((s, r) => s + (Number(r.peso) || 0) * (Number(r.reps) || 0), 0),
          0
        );
        const duracion = Math.round((Date.now() - (startedAt || Date.now())) / 1000);
        const ejerciciosCompletados = Object.values(newSets).filter((l) => l.length > 0).length;
        const s = {
          ejerciciosCompletados,
          seriesTotales: totalSeries,
          volumenTotal: volumen,
          duracionTotal: duracion,
        };
        setSummary(s);
        streakApi.addSession(s);
        return { done: true, summary: s };
      }

      const duration = isLastSetOfExercise ? ex.descansoDespuesEjercicio : ex.descansoEntreSeries;
      const nextExercise = isLastSetOfExercise
        ? exercises[exerciseIndex + 1]
        : ex;

      setRestInfo({ duration, nextExercise, isLastSetOfExercise });
      return { done: false, rest: { duration, nextExercise, isLastSetOfExercise } };
    },
    [exercises, exerciseIndex, setIndex, sets, startedAt, streakApi]
  );

  // Avanza desde la pantalla de descanso al siguiente set o ejercicio.
  const advanceFromRest = useCallback(() => {
    const ex = exercises[exerciseIndex];
    if (!ex) return;
    const isLastSetOfExercise = setIndex + 1 >= ex.series;
    if (isLastSetOfExercise) {
      setExerciseIndex((i) => i + 1);
      setSetIndex(0);
    } else {
      setSetIndex((i) => i + 1);
    }
    setRestInfo(null);
  }, [exercises, exerciseIndex, setIndex]);

  const skipToExercise = useCallback(
    (index) => {
      if (index < 0 || index >= exercises.length) return;
      setExerciseIndex(index);
      setSetIndex(0);
      setRestInfo(null);
    },
    [exercises.length]
  );

  const resetWorkout = useCallback(() => {
    setRoutine(null);
    setExercises([]);
    setExerciseIndex(0);
    setSetIndex(0);
    setSets({});
    setStartedAt(null);
    setRestInfo(null);
    setSummary(null);
  }, []);

  const value = {
    ...streakApi,
    routine,
    exercises,
    exerciseIndex,
    setIndex,
    currentExercise,
    sets,
    completedSetsFor,
    restInfo,
    summary,
    startRoutine,
    completeSet,
    advanceFromRest,
    skipToExercise,
    resetWorkout,
  };

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkoutSession() {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkoutSession must be used within WorkoutProvider");
  return ctx;
}