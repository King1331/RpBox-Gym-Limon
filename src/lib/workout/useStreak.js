import { useState, useEffect, useCallback } from "react";
import { sesionesMock } from "@/data/mockWorkoutData";

const STORAGE_KEY = "workout_sessions_v1";

const todayStr = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.toISOString().slice(0, 10);
};

const loadSessions = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return sesionesMock;
};

const saveSessions = (sessions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    // ignore
  }
};

// Calcula la racha iterando hacia atrás desde hoy.
const computeStreak = (sessions) => {
  const dates = new Set(sessions.map((s) => s.fecha));
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  // Si hoy aún no se entrenó, empezamos a contar desde ayer (la racha no se rompe
  // hasta que pase un día completo sin sesión).
  if (!dates.has(todayStr(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (dates.has(todayStr(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

// Construye los últimos 7 días con estado entrenado/no entrenado.
const buildWeek = (sessions) => {
  const dates = new Set(sessions.map((s) => s.fecha));
  const days = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    const key = todayStr(d);
    days.push({
      key,
      label: d.toLocaleDateString("es-ES", { weekday: "short" }).slice(0, 1).toUpperCase(),
      dayNum: d.getDate(),
      trained: dates.has(key),
      isToday: key === todayStr(base),
    });
  }
  return days;
};

export function useStreak() {
  const [sessions, setSessions] = useState(() => loadSessions());

  useEffect(() => {
    // Sincroniza si otra pestaña actualizó el storage.
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setSessions(loadSessions());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addSession = useCallback((session) => {
    setSessions((prev) => {
      const next = [...prev, { ...session, id: `s-${Date.now()}`, fecha: todayStr() }];
      saveSessions(next);
      return next;
    });
  }, []);

  const streak = computeStreak(sessions);
  const weekDays = buildWeek(sessions);

  // Resumen agregado simple
  const totalSessions = sessions.length;
  const totalVolume = sessions.reduce((acc, s) => acc + (s.volumenTotal || 0), 0);

  return { sessions, streak, weekDays, addSession, totalSessions, totalVolume };
}