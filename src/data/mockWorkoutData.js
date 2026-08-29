// Mock data para el módulo de entrenamiento guiado — Fase 1 (prototipo).
// Estructura pensada para migrar a Firestore sin cambiar la lógica de UI.

export const exercisesMock = [
  {
    id: "sentadilla-trasera",
    nombre: "Sentadilla trasera",
    grupoMuscular: "pierna",
    descripcion: "Ejercicio compuesto de empuje. Baja controlada, subida explosiva.",
    videoUrl: "/videos/sentadilla.mp4",
    thumbnail: "/images/sentadilla-thumb.jpg",
    series: 4,
    reps: 8,
    descansoEntreSeries: 90,
    descansoDespuesEjercicio: 120,
    pesoRecomendado: 60,
  },
  {
    id: "press-banca",
    nombre: "Press de banca",
    grupoMuscular: "pecho",
    descripcion: "Empuje horizontal con barra. Codos a 45°, pecho como guía.",
    videoUrl: "/videos/press-banca.mp4",
    thumbnail: "/images/press-banca-thumb.jpg",
    series: 4,
    reps: 10,
    descansoEntreSeries: 75,
    descansoDespuesEjercicio: 100,
    pesoRecomendado: 50,
  },
  {
    id: "remo-barra",
    nombre: "Remo con barra",
    grupoMuscular: "espalda",
    descripcion: "Tracción horizontal. Espalda recta, codos pegados al cuerpo.",
    videoUrl: "/videos/remo-barra.mp4",
    thumbnail: "/images/remo-barra-thumb.jpg",
    series: 4,
    reps: 12,
    descansoEntreSeries: 75,
    descansoDespuesEjercicio: 100,
    pesoRecomendado: 45,
  },
  {
    id: "peso-muerto-rumano",
    nombre: "Peso muerto rumano",
    grupoMuscular: "pierna",
    descripcion: "Cadena posterior. Cadera atrás, leve flexión de rodilla.",
    videoUrl: "/videos/peso-muerto-rumano.mp4",
    thumbnail: "/images/peso-muerto-rumano-thumb.jpg",
    series: 3,
    reps: 10,
    descansoEntreSeries: 90,
    descansoDespuesEjercicio: 120,
    pesoRecomendado: 55,
  },
  {
    id: "press-militar",
    nombre: "Press militar",
    grupoMuscular: "hombros",
    descripcion: "Empuje vertical. Core firme, no arquear la lumbar.",
    videoUrl: "/videos/press-militar.mp4",
    thumbnail: "/images/press-militar-thumb.jpg",
    series: 4,
    reps: 8,
    descansoEntreSeries: 80,
    descansoDespuesEjercicio: 100,
    pesoRecomendado: 35,
  },
];

export const rutinasMock = [
  {
    id: "rutina-pierna",
    titulo: "Pierna Hipertrofia",
    origen: "coach",
    descripcion: "Foco en cuádriceps y cadena posterior. Volumen moderado.",
    ejercicios: ["sentadilla-trasera", "peso-muerto-rumano"],
  },
  {
    id: "rutina-tiro",
    titulo: "Torso Completo",
    origen: "coach",
    descripcion: "Pecho, espalda y hombros en una sesión equilibrada.",
    ejercicios: ["press-banca", "remo-barra", "press-militar"],
  },
  {
    id: "rutina-fullbody",
    titulo: "Full Body Express",
    origen: "creator",
    descripcion: "Rutina creada por ti. 4 ejercicios, sesión completa.",
    ejercicios: ["sentadilla-trasera", "press-banca", "remo-barra", "press-militar"],
  },
];

// Historial simulado de sesiones (últimos días). Se persiste en localStorage
// durante el prototipo para que la racha sobreviva recargas.
export const sesionesMock = [
  { id: "s-1", fecha: "2026-08-21", ejerciciosCompletados: 4, seriesTotales: 15, volumenTotal: 3200, duracionTotal: 2400 },
  { id: "s-2", fecha: "2026-08-22", ejerciciosCompletados: 3, seriesTotales: 12, volumenTotal: 2100, duracionTotal: 1900 },
  { id: "s-3", fecha: "2026-08-24", ejerciciosCompletados: 5, seriesTotales: 18, volumenTotal: 4100, duracionTotal: 3100 },
  { id: "s-4", fecha: "2026-08-25", ejerciciosCompletados: 4, seriesTotales: 14, volumenTotal: 2900, duracionTotal: 2200 },
  { id: "s-5", fecha: "2026-08-26", ejerciciosCompletados: 3, seriesTotales: 11, volumenTotal: 2400, duracionTotal: 1800 },
];

export const getExerciseById = (id) => exercisesMock.find((e) => e.id === id);

export const getRoutineExercises = (routine) =>
  (routine.ejercicios || []).map(getExerciseById).filter(Boolean);