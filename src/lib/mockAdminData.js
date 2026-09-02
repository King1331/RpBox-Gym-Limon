// Mock data para el panel administrativo de RP BOX — DEMO (datos de ejemplo).
// Sin Firebase / Firestore. Estructura lista para migrar a una colección real.

export const formatCol = (n) => `₡${Number(n).toLocaleString("es-CR")}`;

// ---- KPIs del dashboard ----
export const kpis = [
  { label: "Clientes activos", value: "78", icon: "users", tone: "lime" },
  { label: "Ingresos del mes", value: "₡1.420.000", icon: "wallet", tone: "lime", mono: true },
  { label: "Pagos pendientes", value: "₡80.000", icon: "clock", tone: "flame", mono: true },
  { label: "Nuevos clientes", value: "+7", icon: "user-plus", tone: "lime" },
  { label: "Abandonaron", value: "-4", icon: "user-minus", tone: "flame" },
  { label: "Retención mensual", value: "94%", icon: "trending-up", tone: "lime", mono: true },
  { label: "Entrenamientos", value: "312", icon: "dumbbell", tone: "neutral", mono: true },
];

// ---- Actividad financiera ----
export const finanzas = {
  ingresosMes: 1420000,
  cobradoSemana: 120000,
  pendientePago: 80000,
  membresiasVencidas: 5,
};

export const ingresos6m = [
  { mes: "Abr", monto: 1180000 },
  { mes: "May", monto: 1240000 },
  { mes: "Jun", monto: 1310000 },
  { mes: "Jul", monto: 1280000 },
  { mes: "Ago", monto: 1380000 },
  { mes: "Sep", monto: 1420000 },
];

// ---- Acciones recomendadas ----
// "Ingresos potenciales" = no afirmamos que el dinero se recuperará.
export const alertas = [
  { nivel: "rojo", titulo: "5 membresías vencidas", detalle: "₡100.000 en ingresos potenciales", accion: "Ver clientes", filtro: "vencidos" },
  { nivel: "naranja", titulo: "8 membresías vencen en 7 días", detalle: "₡160.000 en ingresos potenciales", accion: "Ver clientes", filtro: "por-vencer" },
  { nivel: "naranja", titulo: "3 clientes llevan más de 14 días sin entrenar", detalle: "Riesgo de abandono", accion: "Ver clientes", filtro: "riesgo" },
  { nivel: "verde", titulo: "7 clientes cumplen un mes consecutivo entrenando", detalle: "Fidelidad alta", accion: "Ver clientes", filtro: "nuevos" },
];

// ---- Clientes ----
// riesgo: verde | naranja | rojo
export const clientes = [
  // Activos (5)
  { id: 1, nombre: "Carlos Rodríguez", membresia: "Mensual", estado: "Activa", proximoPago: "12/09/2026", ultimoEntreno: "Hoy", coach: "Juan", riesgo: "verde", entrenamientosMes: 12, rutinaActual: "Hipertrofia A", peso: 82, grasa: 16 },
  { id: 2, nombre: "Mariana López", membresia: "Trimestral", estado: "Activa", proximoPago: "30/10/2026", ultimoEntreno: "Ayer", coach: "María", riesgo: "verde", entrenamientosMes: 14, rutinaActual: "Hipertrofia B", peso: 58, grasa: 18 },
  { id: 3, nombre: "Daniela Vargas", membresia: "Mensual", estado: "Activa", proximoPago: "20/09/2026", ultimoEntreno: "Hace 2 días", coach: "María", riesgo: "verde", entrenamientosMes: 11, rutinaActual: "Hipertrofia B", peso: 61, grasa: 17 },
  { id: 4, nombre: "Valentina Rojas", membresia: "Trimestral", estado: "Activa", proximoPago: "15/11/2026", ultimoEntreno: "Hoy", coach: "María", riesgo: "verde", entrenamientosMes: 13, rutinaActual: "Hipertrofia A", peso: 55, grasa: 15 },
  { id: 5, nombre: "Andrés Fallas", membresia: "Mensual", estado: "Activa", proximoPago: "18/09/2026", ultimoEntreno: "Hace 5 días", coach: "Juan", riesgo: "verde", entrenamientosMes: 9, rutinaActual: "Fuerza", peso: 84, grasa: 18 },

  // Por vencer (8)
  { id: 6, nombre: "Andrea Smith", membresia: "Mensual", estado: "Por vencer", proximoPago: "04/09/2026", ultimoEntreno: "Hace 16 días", coach: "María", riesgo: "rojo", entrenamientosMes: 2, rutinaActual: "Principiantes", peso: 64, grasa: 24 },
  { id: 7, nombre: "Luis Tapia", membresia: "Mensual", estado: "Por vencer", proximoPago: "06/09/2026", ultimoEntreno: "Hace 9 días", coach: "Juan", riesgo: "naranja", entrenamientosMes: 4, rutinaActual: "Hipertrofia A", peso: 76, grasa: 20 },
  { id: 8, nombre: "Sofía Castro", membresia: "Mensual", estado: "Por vencer", proximoPago: "07/09/2026", ultimoEntreno: "Hace 12 días", coach: "María", riesgo: "naranja", entrenamientosMes: 3, rutinaActual: "Hipertrofia B", peso: 62, grasa: 21 },
  { id: 9, nombre: "Tomás Ramírez", membresia: "Mensual", estado: "Por vencer", proximoPago: "05/09/2026", ultimoEntreno: "Hace 8 días", coach: "Juan", riesgo: "naranja", entrenamientosMes: 4, rutinaActual: "Fuerza", peso: 88, grasa: 19 },
  { id: 10, nombre: "Lucía Pineda", membresia: "Mensual", estado: "Por vencer", proximoPago: "06/09/2026", ultimoEntreno: "Hace 10 días", coach: "María", riesgo: "naranja", entrenamientosMes: 3, rutinaActual: "Principiantes", peso: 59, grasa: 22 },
  { id: 11, nombre: "Felipe Chaves", membresia: "Mensual", estado: "Por vencer", proximoPago: "07/09/2026", ultimoEntreno: "Hace 7 días", coach: "Juan", riesgo: "naranja", entrenamientosMes: 5, rutinaActual: "Hipertrofia A", peso: 79, grasa: 20 },
  { id: 12, nombre: "Natalia Vega", membresia: "Mensual", estado: "Por vencer", proximoPago: "03/09/2026", ultimoEntreno: "Hace 5 días", coach: "María", riesgo: "verde", entrenamientosMes: 8, rutinaActual: "Hipertrofia B", peso: 60, grasa: 18 },
  { id: 13, nombre: "Diego Barrientos", membresia: "Mensual", estado: "Por vencer", proximoPago: "02/09/2026", ultimoEntreno: "Hace 11 días", coach: "Juan", riesgo: "naranja", entrenamientosMes: 3, rutinaActual: "Fuerza", peso: 91, grasa: 23 },

  // Vencidas (5)
  { id: 14, nombre: "José Pérez", membresia: "Mensual", estado: "Vencida", proximoPago: "25/08/2026", ultimoEntreno: "Hace 3 días", coach: "Juan", riesgo: "naranja", entrenamientosMes: 5, rutinaActual: "Fuerza", peso: 90, grasa: 22 },
  { id: 15, nombre: "Roberto Mora", membresia: "Mensual", estado: "Vencida", proximoPago: "20/08/2026", ultimoEntreno: "Hace 21 días", coach: "Juan", riesgo: "rojo", entrenamientosMes: 1, rutinaActual: "—", peso: 95, grasa: 26 },
  { id: 16, nombre: "Mario Soto", membresia: "Mensual", estado: "Vencida", proximoPago: "18/08/2026", ultimoEntreno: "Hace 6 días", coach: "María", riesgo: "naranja", entrenamientosMes: 4, rutinaActual: "Hipertrofia A", peso: 87, grasa: 21 },
  { id: 17, nombre: "Silvia Hidalgo", membresia: "Mensual", estado: "Vencida", proximoPago: "15/08/2026", ultimoEntreno: "Hace 25 días", coach: "Juan", riesgo: "rojo", entrenamientosMes: 0, rutinaActual: "—", peso: 70, grasa: 27 },
  { id: 18, nombre: "Laura Brenes", membresia: "Mensual", estado: "Vencida", proximoPago: "10/08/2026", ultimoEntreno: "Hace 8 días", coach: "María", riesgo: "naranja", entrenamientosMes: 2, rutinaActual: "Principiantes", peso: 68, grasa: 23 },

  // Nuevos (7)
  { id: 19, nombre: "Camila Núñez", membresia: "Mensual", estado: "Nueva", proximoPago: "29/09/2026", ultimoEntreno: "Hoy", coach: "María", riesgo: "verde", entrenamientosMes: 6, rutinaActual: "Principiantes", peso: 60, grasa: 19 },
  { id: 20, nombre: "Pablo Durán", membresia: "Mensual", estado: "Nueva", proximoPago: "29/09/2026", ultimoEntreno: "Hoy", coach: "Juan", riesgo: "verde", entrenamientosMes: 6, rutinaActual: "Principiantes", peso: 77, grasa: 20 },
  { id: 21, nombre: "María Fernanda Rojas", membresia: "Mensual", estado: "Nueva", proximoPago: "28/09/2026", ultimoEntreno: "Ayer", coach: "María", riesgo: "verde", entrenamientosMes: 5, rutinaActual: "Principiantes", peso: 57, grasa: 18 },
  { id: 22, nombre: "Sebastián Mora", membresia: "Mensual", estado: "Nueva", proximoPago: "28/09/2026", ultimoEntreno: "Hace 2 días", coach: "Juan", riesgo: "verde", entrenamientosMes: 5, rutinaActual: "Principiantes", peso: 80, grasa: 19 },
  { id: 23, nombre: "Alejandra Pinto", membresia: "Mensual", estado: "Nueva", proximoPago: "30/09/2026", ultimoEntreno: "Hoy", coach: "María", riesgo: "verde", entrenamientosMes: 6, rutinaActual: "Principiantes", peso: 63, grasa: 20 },
  { id: 24, nombre: "Rodrigo Salas", membresia: "Mensual", estado: "Nueva", proximoPago: "30/09/2026", ultimoEntreno: "Hace 3 días", coach: "Juan", riesgo: "verde", entrenamientosMes: 4, rutinaActual: "Principiantes", peso: 85, grasa: 21 },
  { id: 25, nombre: "Isabella Gómez", membresia: "Mensual", estado: "Nueva", proximoPago: "01/10/2026", ultimoEntreno: "Hoy", coach: "María", riesgo: "verde", entrenamientosMes: 6, rutinaActual: "Principiantes", peso: 56, grasa: 17 },

  // Inactivos (2)
  { id: 26, nombre: "Esteban Quesada", membresia: "Mensual", estado: "Inactiva", proximoPago: "—", ultimoEntreno: "Hace 30 días", coach: "Juan", riesgo: "naranja", entrenamientosMes: 0, rutinaActual: "—", peso: 88, grasa: 25 },
  { id: 27, nombre: "Héctor Zúñiga", membresia: "Mensual", estado: "Inactiva", proximoPago: "—", ultimoEntreno: "Hace 22 días", coach: "María", riesgo: "naranja", entrenamientosMes: 1, rutinaActual: "—", peso: 92, grasa: 26 },
];

// ---- Pagos ----
export const pagosResumen = { cobradoMes: 1420000, pendiente: 80000, vencido: 100000 };

export const pagos = [
  { cliente: "Carlos Rodríguez", monto: 20000, fecha: "12/08/2026", estado: "Pagado" },
  { cliente: "Andrea Smith", monto: 20000, fecha: "04/09/2026", estado: "Pendiente" },
  { cliente: "José Pérez", monto: 20000, fecha: "25/08/2026", estado: "Vencido" },
  { cliente: "Mariana López", monto: 55000, fecha: "10/08/2026", estado: "Pagado" },
  { cliente: "Luis Tapia", monto: 20000, fecha: "06/09/2026", estado: "Pendiente" },
  { cliente: "Roberto Mora", monto: 20000, fecha: "20/08/2026", estado: "Vencido" },
  { cliente: "Daniela Vargas", monto: 20000, fecha: "15/08/2026", estado: "Pagado" },
  { cliente: "Mario Soto", monto: 20000, fecha: "18/08/2026", estado: "Vencido" },
  { cliente: "Valentina Rojas", monto: 55000, fecha: "12/08/2026", estado: "Pagado" },
  { cliente: "Felipe Chaves", monto: 20000, fecha: "07/09/2026", estado: "Pendiente" },
];

// ---- Rutinas ----
export const rutinas = [
  { nombre: "Hipertrofia A", clientes: 18 },
  { nombre: "Hipertrofia B", clientes: 14 },
  { nombre: "Principiantes", clientes: 9 },
  { nombre: "Fuerza", clientes: 12 },
];
export const rutinasSinAsignar = 3;

// ---- Coaches ----
export const coaches = [
  { nombre: "Juan", clientes: 12, conRutina: 10, sinRutina: 2, inactivos: 3 },
  { nombre: "María", clientes: 18, conRutina: 18, sinRutina: 0, inactivos: 2 },
];
export const coachPendientes = { sinRutina: 4, porActualizar: 3, inactivos: 5 };