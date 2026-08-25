// Mock data para RP Box — rutinas y banco de ejercicios.
// Estructura de una rutina:
// { id, titulo, duracion (min), musculos: [], visible, origen: 'coach'|'mio', ejercicios: [{ nombre, musculo, series, reps, descripcion, tempo, videoUrl }] }

export const ejerciciosPorMusculo = {
  Pecho: ["Press Banca", "Press Inclinado", "Aperturas", "Fondos", "Cruces en Polea"],
  Espalda: ["Dominadas", "Remo con Barra", "Peso Muerto", "Jalón al Pecho", "Remo en Polea"],
  Pierna: ["Sentadilla", "Sentadilla Libre", "Prensa", "Curl Femoral", "Zancadas", "Extensión Cuádriceps", "Elevación de Gemelos"],
  Hombro: ["Press Militar", "Elevaciones Laterales", "Pájaros", "Elevaciones Frontales"],
  Brazo: ["Curl Bíceps", "Extensión Tríceps", "Curl Martillo", "Francés de Tríceps"],
  Core: ["Plancha", "Crunch", "Elevación de Piernas", "Rueda Abdominal"],
};

export const rutinasMock = [
  {
    id: "rutina-1",
    titulo: "Día de Pierna y Pantorrilla",
    origen: "coach",
    visible: true,
    duracion: 45,
    musculos: ["Cuádriceps", "Femorales", "Pantorrillas"],
    ejercicios: [
      {
        nombre: "Sentadilla Libre",
        musculo: "Pierna",
        series: 4,
        reps: "10-12",
        descripcion: "Mantén la espalda recta, vista al frente y baja hasta romper el paralelo de las rodillas.",
        tempo: "3 seg bajando la carga de forma controlada, 1 seg de pausa estricta en la posición profunda sin despegar la cadera, 1 seg empujando con potencia.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Video MP4 de prueba genérico
      }
    ]
  },
  {
    id: "r1",
    titulo: "Pierna Hipertrofia",
    duracion: 45,
    musculos: ["Pierna"],
    visible: true,
    origen: "coach",
    ejercicios: [
      {
        nombre: "Sentadilla",
        musculo: "Pierna",
        series: 4,
        reps: 8,
        descripcion: "Baja controlando la cadera hasta romper el paralelo. Pecho arriba, core firme, empuja por el talón medio.",
        tempo: "3 seg bajando la carga de forma controlada, 1 seg de pausa estricta en la posición profunda sin despegar la cadera, 1 seg empujando con potencia",
        videoUrl: "",
      },
      {
        nombre: "Prensa",
        musculo: "Pierna",
        series: 4,
        reps: 12,
        descripcion: "Acomoda los pies al ancho de hombros. Baja las rodillas hacia el pecho sin levantar la espalda del respaldo.",
        tempo: "2 seg bajando, 0 seg pausa, 2 seg empujando",
        videoUrl: "",
      },
      {
        nombre: "Curl Femoral",
        musculo: "Pierna",
        series: 3,
        reps: 15,
        descripcion: "Mantén la cadera pegada al banco. Contrae el femoral en cada repetición sin balanceo.",
        tempo: "2 seg flexionando, 1 seg pausa en contracción, 2 seg soltando",
        videoUrl: "",
      },
    ],
  },
  {
    id: "r2",
    titulo: "Empuje Premium",
    duracion: 50,
    musculos: ["Pecho", "Hombro", "Brazo"],
    visible: true,
    origen: "coach",
    ejercicios: [
      {
        nombre: "Press Banca",
        musculo: "Pecho",
        series: 4,
        reps: 8,
        descripcion: "Escápulas retraídas y pegadas al banco. Baja la barra al esternón y empuja explosivo.",
        tempo: "2 seg bajando, 1 seg pausa en el pecho, 1 seg empujando",
        videoUrl: "",
      },
      {
        nombre: "Press Militar",
        musculo: "Hombro",
        series: 4,
        reps: 10,
        descripcion: "Core apretado, glúteos firmes. Empuja la barra por encima de la cabeza sin arquear la lumbar.",
        tempo: "2 seg bajando, 0 seg pausa, 1 seg empujando",
        videoUrl: "",
      },
      {
        nombre: "Extensión Tríceps",
        musculo: "Brazo",
        series: 3,
        reps: 12,
        descripcion: "Codos fijos apuntando al frente. Solo se mueve el antebrazo; estira bien el tríceps arriba.",
        tempo: "2 seg bajando, 1 seg pausa, 1 seg empujando",
        videoUrl: "",
      },
    ],
  },
  {
    id: "r3",
    titulo: "Borrador Full Body",
    duracion: 60,
    musculos: ["Pecho", "Espalda", "Pierna"],
    visible: false,
    origen: "coach",
    ejercicios: [
      {
        nombre: "Press Banca",
        musculo: "Pecho",
        series: 3,
        reps: 10,
        descripcion: "Técnica estricta, baja controlado al esternón y empuja sin rebotar.",
        tempo: "2 seg bajando, 1 seg pausa, 1 seg empujando",
        videoUrl: "",
      },
      {
        nombre: "Dominadas",
        musculo: "Espalda",
        series: 3,
        reps: 8,
        descripcion: "Parte desde colgado completo. Tira con los codos hacia abajo, mentón por encima de la barra.",
        tempo: "1 seg tirando, 1 seg pausa arriba, 3 seg bajando",
        videoUrl: "",
      },
      {
        nombre: "Sentadilla",
        musculo: "Pierna",
        series: 3,
        reps: 10,
        descripcion: "Baja controlando hasta romper el paralelo, empuja por el talón.",
        tempo: "3 seg bajando la carga de forma controlada, 1 seg de pausa estricta en la posición profunda sin despegar la cadera, 1 seg empujando con potencia",
        videoUrl: "",
      },
    ],
  },
  {
    id: "r4",
    titulo: "Mañanas Express",
    duracion: 30,
    musculos: ["Core", "Brazo"],
    visible: true,
    origen: "mio",
    ejercicios: [
      {
        nombre: "Plancha",
        musculo: "Core",
        series: 3,
        reps: 45,
        descripcion: "Cuerpo recto de hombros a talones. Glúteos apretados, no dejes caer la cadera.",
        tempo: "45 seg isométrico, 15 seg descanso",
        videoUrl: "",
      },
      {
        nombre: "Curl Bíceps",
        musculo: "Brazo",
        series: 4,
        reps: 12,
        descripcion: "Codos pegados al cuerpo. Sube controlado sin balancear la espalda.",
        tempo: "2 seg subiendo, 1 seg pausa, 2 seg bajando",
        videoUrl: "",
      },
    ],
  },
];

