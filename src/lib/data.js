import {
  CalendarDays,
  Flame,
  Medal,
} from 'lucide-react';

export const exercises = [
  {
    id: 'squat',
    name: 'Sentadilla trasera',
    cue: 'Control 3s · Profundidad completa',
    target: 'Fuerza / cuádriceps',
    sets: 4,
    reps: 8,
    initialWeight: '85',
  },
  {
    id: 'press',
    name: 'Prensa inclinada',
    cue: 'Pies medios · No bloquees rodillas',
    target: 'Volumen / pierna',
    sets: 3,
    reps: 12,
    initialWeight: '140',
  },
  {
    id: 'rdl',
    name: 'Peso muerto rumano',
    cue: 'Cadera atrás · Espalda neutra',
    target: 'Cadena posterior',
    sets: 3,
    reps: 10,
    initialWeight: '70',
  },
  {
    id: 'curl',
    name: 'Curl femoral',
    cue: 'Pausa 1s en contracción',
    target: 'Aislamiento / femoral',
    sets: 3,
    reps: 12,
    initialWeight: '42',
  },
];

export const notifications = [
  {
    icon: CalendarDays,
    title: 'Tu mensualidad vence pronto',
    copy: 'Renueva antes del 25 Sep para no perder tu ritmo.',
  },
  {
    icon: Flame,
    title: 'Tu racha pide otro set',
    copy: 'Llevas 4 sesiones seguidas. Juan, el box te espera hoy.',
  },
  {
    icon: Medal,
    title: 'Nuevo récord personal',
    copy: 'Subiste 5 kg en sentadilla esta semana. Sigue así.',
  },
];