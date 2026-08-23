import { useMemo, useState } from 'react';

function createInitialLogs(exercises) {
  return Object.fromEntries(
    exercises.map((exercise) => [
      exercise.id,
      Array.from({ length: exercise.sets }, () => ({
        weight: exercise.initialWeight,
        reps: String(exercise.reps),
        done: false,
      })),
    ]),
  );
}

export default function useRoutineLogs(exercises) {
  const [logs, setLogs] = useState(() => createInitialLogs(exercises));
  const [saved, setSaved] = useState(null);

  // Para escalar la racha en producción: guardar lastCompletedAt y comparar
  // días calendario con una variable de tiempo (Date.now), otorgando +1 solo
  // si la sesión es del día siguiente.
  const completeSet = (exerciseId, setIndex) => {
    setLogs((current) => ({
      ...current,
      [exerciseId]: current[exerciseId].map((set, index) =>
        index === setIndex ? { ...set, done: !set.done } : set,
      ),
    }));
    setSaved(`${exerciseId}-${setIndex}`);
    window.setTimeout(() => setSaved(null), 1300);
  };

  const updateLog = (exerciseId, setIndex, key, value) => {
    setLogs((current) => ({
      ...current,
      [exerciseId]: current[exerciseId].map((set, index) =>
        index === setIndex ? { ...set, [key]: value } : set,
      ),
    }));
  };

  const completed = useMemo(
    () =>
      Object.values(logs).reduce(
        (total, rows) => total + rows.filter((row) => row.done).length,
        0,
      ),
    [logs],
  );

  return { logs, saved, completed, completeSet, updateLog };
}