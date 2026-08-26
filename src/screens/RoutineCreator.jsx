import React, { useState, useMemo } from "react";
import { useLocation } from "wouter";
import {
  Check,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Dumbbell,
  Calendar,
  Sparkles,
  Layers,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "@/components/AnimatedPage";
import HeroSection from "@/components/HeroSection";
import { ejerciciosPorMusculo } from "@/lib/rutinasMock";

const STEPS = [
  { id: "info", label: "Nombre", num: 1 },
  { id: "dias", label: "Frecuencia", num: 2 },
  { id: "ejercicios", label: "Cargas", num: 3 },
  { id: "resumen", label: "Resumen", num: 4 },
];

const DIAS_SEMANA = [
  { id: "lunes", label: "Lunes", short: "Lun" },
  { id: "martes", label: "Martes", short: "Mar" },
  { id: "miercoles", label: "Miércoles", short: "Mié" },
  { id: "jueves", label: "Jueves", short: "Jue" },
  { id: "viernes", label: "Viernes", short: "Vie" },
];

// Variantes de animación de pantalla (Optimizadas para GPU)
const stepVariants = {
  initial: { opacity: 0, x: 18 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -18 },
};

const tabContentVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

// Partículas de celebración con la paleta de la app (Blanco, sutil Lime y Flame)
const CELEBRATION_PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  left: `${5 + (i * 4.8)}%`,
  delay: (i % 6) * 0.05,
  size: i % 3 === 0 ? 7 : i % 2 === 0 ? 5 : 4,
  isRound: i % 2 === 0,
  color: i % 5 === 0 ? "#f3ff47" : i % 7 === 0 ? "#f55d3b" : "#ffffff",
  targetY: 140 + (i % 5) * 25,
  driftX: (i % 2 === 0 ? 1 : -1) * (15 + (i % 4) * 8),
  rotate: (i % 2 === 0 ? 1 : -1) * (180 + i * 20),
}));

export default function RoutineCreator() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState("info");

  const [routineData, setRoutineData] = useState({
    titulo: "",
    diasSeleccionados: [],
    dias: {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
    },
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMusculo, setSelectedMusculo] = useState(null);
  const [resumenSelectedDay, setResumenSelectedDay] = useState(null);

  const gruposMuscularesOpciones = useMemo(() => Object.keys(ejerciciosPorMusculo), []);
  const ejerciciosDisponibles = useMemo(() => {
    return selectedMusculo ? ejerciciosPorMusculo[selectedMusculo] || [] : [];
  }, [selectedMusculo]);

  const diasSeleccionados = DIAS_SEMANA.filter((d) =>
    routineData.diasSeleccionados.includes(d.id)
  );

  const totalEjercicios = useMemo(() => {
    return Object.values(routineData.dias).reduce(
      (acc, curr) => acc + curr.length,
      0
    );
  }, [routineData.dias]);

  const tieneDatos = routineData.titulo.trim().length > 0 && diasSeleccionados.length > 0;
  const currentStepIndex = STEPS.findIndex((s) => s.id === step);

  // Handlers
  const handleToggleDay = (diaId) => {
    setRoutineData((prev) => {
      const exists = prev.diasSeleccionados.includes(diaId);
      const updated = exists
        ? prev.diasSeleccionados.filter((d) => d !== diaId)
        : [...prev.diasSeleccionados, diaId];
      return { ...prev, diasSeleccionados: updated };
    });
  };

  const handleToggleExerciseToDay = (exercise) => {
    if (!selectedDay) return;
    setRoutineData((prev) => {
      const currentList = prev.dias[selectedDay] || [];
      const exists = currentList.includes(exercise);
      return {
        ...prev,
        dias: {
          ...prev.dias,
          [selectedDay]: exists
            ? currentList.filter((e) => e !== exercise)
            : [...currentList, exercise],
        },
      };
    });
  };

  const handleRemoveExercise = (diaId, exercise) => {
    setRoutineData((prev) => ({
      ...prev,
      dias: {
        ...prev.dias,
        [diaId]: prev.dias[diaId].filter((e) => e !== exercise),
      },
    }));
  };

  const isNextDisabled = useMemo(() => {
    if (step === "info") return routineData.titulo.trim().length === 0;
    if (step === "dias") return diasSeleccionados.length === 0;
    if (step === "ejercicios") return !tieneDatos;
    return false;
  }, [step, routineData.titulo, diasSeleccionados.length, tieneDatos]);

  const handleNextStep = () => {
    if (step === "info") {
      if (routineData.titulo.trim().length === 0) return;
      setStep("dias");
    } else if (step === "dias") {
      if (diasSeleccionados.length === 0) return;
      setStep("ejercicios");
      if (!selectedDay || !routineData.diasSeleccionados.includes(selectedDay)) {
        setSelectedDay(diasSeleccionados[0].id);
      }
      if (!selectedMusculo && gruposMuscularesOpciones.length > 0) {
        setSelectedMusculo(gruposMuscularesOpciones[0]);
      }
    } else if (step === "ejercicios") {
      if (!tieneDatos) return;
      setStep("resumen");
      setResumenSelectedDay(diasSeleccionados[0]?.id || null);
    }
  };

  const handlePrevStep = () => {
    if (step === "dias") setStep("info");
    else if (step === "ejercicios") setStep("dias");
    else if (step === "resumen") setStep("ejercicios");
  };

  const handleGuardar = () => {
    if (tieneDatos) {
      setLocation("/routine");
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col bg-ink text-paper min-h-screen relative overflow-hidden">
        
        {/* ================= HERO SECTION CON GUÍA MOTIVACIONAL ================= */}
        <HeroSection>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setLocation("/routine")}
            className="touch-press inline-flex items-center gap-1 text-white/50 font-mono text-[11px] tracking-wider uppercase mb-3 hover:text-paper transition-colors cursor-pointer w-fit"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            Volver
          </motion.button>

          {/* Barra de Progreso Dinámica */}
          <div className="flex items-center gap-1.5 mb-3">
            {STEPS.map((s, idx) => (
              <motion.div
                key={s.id}
                animate={{
                  backgroundColor: idx <= currentStepIndex ? "#ffffff" : "#2a2a2a",
                  flexGrow: idx <= currentStepIndex ? 1 : 0,
                  width: idx <= currentStepIndex ? "auto" : "12px",
                }}
                transition={{ duration: 0.25 }}
                className="h-1 rounded-full"
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-5 items-center px-2 rounded-full bg-ink-soft border border-ink-line text-white/80 font-mono text-[10px] font-bold tracking-widest uppercase">
              Paso {currentStepIndex + 1} de {STEPS.length}
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-white/60">
              {step === "info" && "Personalización"}
              {step === "dias" && "Frecuencia Semanal"}
              {step === "ejercicios" && "Carga y Ejercicios"}
              {step === "resumen" && "Confirmación"}
            </span>
          </div>

          <h1 className="mt-2 text-4xl font-black leading-[1.05] tracking-tight text-paper text-balance">
            {step === "info" && "Nombra tu rutina."}
            {step === "dias" && "Días de entreno."}
            {step === "ejercicios" && "Carga muscular."}
            {step === "resumen" && "¡Plan completado!"}
          </h1>

          {/* Guía motivacional con signos de puntuación */}
          <p className="mt-2 text-xs font-medium text-white/65 leading-relaxed text-balance">
            {step === "info" &&
              "¿Cuál es tu próximo objetivo? Dale un nombre claro e inspirador a este plan para llevar el control de tus progresos."}
            {step === "dias" &&
              "La disciplina vence a la motivación. Elige los días que vas a entrenar; nosotros programaremos tus descansos de forma óptima."}
            {step === "ejercicios" &&
              "Diseña tus sesiones a medida. Selecciona cada día, navega por los grupos musculares y añade los ejercicios clave."}
            {step === "resumen" &&
              "¡Excelente trabajo! Tu rutina está estructurada y lista para la acción. Revisa el plan por día y dale a guardar."}
          </p>
        </HeroSection>

        {/* ================= CONTENEDOR PRINCIPAL ================= */}
        <main className="flex flex-col flex-1 px-4 pt-4 pb-36 relative">
          
          <AnimatePresence mode="wait">
            
            {/* ================= PASO 1: NOMBRE ================= */}
            {step === "info" && (
              <motion.div
                key="step-info"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="space-y-4"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!isNextDisabled) handleNextStep();
                  }}
                >
                  <div className="bg-ink-soft rounded-2xl border border-ink-line p-4 shadow-sm">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-white/70" />
                      Nombre del plan
                    </label>
                    <input
                      type="text"
                      value={routineData.titulo}
                      onChange={(e) =>
                        setRoutineData((prev) => ({ ...prev, titulo: e.target.value }))
                      }
                      placeholder="Ej. Hipertrofia 4 Días, Fuerza..."
                      className="w-full px-3.5 py-3 rounded-xl bg-ink border border-ink-line text-paper placeholder:text-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none transition-colors"
                      autoFocus
                    />
                    <p className="text-[11px] text-white/40 mt-2">
                      💡 Consejo: Usa un título que te motive cada vez que abras la aplicación.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ================= PASO 2: DÍAS ================= */}
            {step === "dias" && (
              <motion.div
                key="step-dias"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="space-y-2"
              >
                <div className="bg-ink-soft rounded-2xl border border-ink-line overflow-hidden divide-y divide-ink-line">
                  {DIAS_SEMANA.map((d) => {
                    const isSelected = routineData.diasSeleccionados.includes(d.id);
                    return (
                      <motion.button
                        key={d.id}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => handleToggleDay(d.id)}
                        className={`touch-press w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors ${
                          isSelected ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                              isSelected
                                ? "bg-paper text-ink"
                                : "bg-ink border border-ink-line text-white/40"
                            }`}
                          >
                            {d.short}
                          </div>
                          <div>
                            <p className={`text-sm font-bold ${isSelected ? "text-paper" : "text-white/60"}`}>
                              {d.label}
                            </p>
                            <p className="text-[11px] text-white/40">
                              {isSelected ? "Día de entrenamiento activo." : "Descanso programado."}
                            </p>
                          </div>
                        </div>

                        {/* iOS Pill Check */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? "bg-paper border-paper text-ink"
                              : "border-white/15 bg-ink text-transparent"
                          }`}
                        >
                          <Check size={13} strokeWidth={3} />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ================= PASO 3: EJERCICIOS ================= */}
            {step === "ejercicios" && (
              <motion.div
                key="step-ejercicios"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="space-y-4"
              >
                {/* Segmented Selector de Día */}
                <div className="flex items-center gap-1.5 p-1 bg-ink-soft rounded-xl border border-ink-line overflow-x-auto no-scrollbar relative">
                  {diasSeleccionados.map((d) => {
                    const isActive = selectedDay === d.id;
                    const count = routineData.dias[d.id]?.length || 0;
                    return (
                      <motion.button
                        key={d.id}
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={() => setSelectedDay(d.id)}
                        className={`touch-press relative z-10 flex-1 min-w-[70px] py-2 px-2 rounded-lg flex flex-col items-center gap-0.5 text-xs font-bold transition-colors ${
                          isActive ? "text-ink" : "text-white/50 hover:text-paper"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeDayPill"
                            className="absolute inset-0 bg-paper rounded-lg -z-10 shadow-sm"
                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          />
                        )}
                        <span>{d.short}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                            isActive
                              ? "bg-ink/10 text-ink font-black"
                              : "bg-ink border border-ink-line text-white/40"
                          }`}
                        >
                          {count} ex
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {selectedDay && (
                  <>
                    {/* Selector de Músculos */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2 flex items-center gap-1.5">
                        <Layers size={13} className="text-white/60" />
                        Grupo Muscular
                      </label>
                      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                        {gruposMuscularesOpciones.map((musculo) => {
                          const isMusculoActive = selectedMusculo === musculo;
                          return (
                            <motion.button
                              key={musculo}
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={() => setSelectedMusculo(musculo)}
                              className={`touch-press whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                                isMusculoActive
                                  ? "bg-white/15 text-paper border-white/40 shadow-sm"
                                  : "bg-ink-soft border-ink-line text-white/60 hover:text-paper hover:bg-white/[0.04]"
                              }`}
                            >
                              {musculo.charAt(0).toUpperCase() + musculo.slice(1)}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Lista de Ejercicios Disponibles */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Dumbbell size={13} className="text-white/60" />
                          Ejercicios de {selectedMusculo}
                        </span>
                        <span className="font-mono text-[10px] text-white/30">
                          {ejerciciosDisponibles.length} disponibles
                        </span>
                      </label>

                      <div className="bg-ink-soft rounded-2xl border border-ink-line overflow-hidden divide-y divide-ink-line">
                        {ejerciciosDisponibles.map((exercise) => {
                          const isSelected = routineData.dias[selectedDay]?.includes(exercise);
                          return (
                            <motion.button
                              key={exercise}
                              whileTap={{ scale: 0.99 }}
                              type="button"
                              onClick={() => handleToggleExerciseToDay(exercise)}
                              className={`touch-press w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                                isSelected ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"
                              }`}
                            >
                              <span
                                className={`text-xs font-medium pr-2 ${
                                  isSelected ? "text-paper font-bold" : "text-white/70"
                                }`}
                              >
                                {exercise}
                              </span>
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                  isSelected
                                    ? "bg-paper border-paper text-ink"
                                    : "border-ink-line bg-ink text-white/40"
                                }`}
                              >
                                {isSelected ? <Check size={13} strokeWidth={3} /> : <Plus size={13} />}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Resumen del Día Actual */}
                    {routineData.dias[selectedDay]?.length > 0 && (
                      <div className="pt-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2 block">
                          Seleccionados para {selectedDay} ({routineData.dias[selectedDay].length})
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {routineData.dias[selectedDay].map((exercise) => (
                            <motion.span
                              key={exercise}
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.9, opacity: 0 }}
                              className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg bg-ink-soft border border-ink-line text-xs font-medium text-paper"
                            >
                              {exercise}
                              <button
                                type="button"
                                onClick={() => handleRemoveExercise(selectedDay, exercise)}
                                className="touch-press p-0.5 rounded hover:bg-white/10 text-white/40 hover:text-flame transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {/* ================= PASO 4: RESUMEN CON TABS Y CONFETI ================= */}
            {step === "resumen" && (
              <motion.div
                key="step-resumen"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="space-y-3 relative"
              >
                {/* Lluvia de Confeti Animada (Ligera para GPU) */}
                <div className="pointer-events-none absolute inset-0 -top-6 overflow-hidden z-20">
                  {CELEBRATION_PARTICLES.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 1, y: -10, x: 0, rotate: 0 }}
                      animate={{
                        opacity: [1, 1, 0],
                        y: p.targetY,
                        x: p.driftX,
                        rotate: p.rotate,
                      }}
                      transition={{
                        duration: 1.6,
                        delay: p.delay,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "absolute",
                        left: p.left,
                        width: `${p.size}px`,
                        height: `${p.size * (p.isRound ? 1 : 1.6)}px`,
                        backgroundColor: p.color,
                        borderRadius: p.isRound ? "9999px" : "2px",
                      }}
                    />
                  ))}
                </div>

                {/* Header Resumen */}
                <div className="bg-ink-soft border border-ink-line rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      Rutina lista para guardar
                    </span>
                    <h3 className="text-xl font-black text-paper mt-0.5">{routineData.titulo}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-paper font-mono">{totalEjercicios}</span>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Ejercicios</p>
                  </div>
                </div>

                {/* Segmented Day Tabs en el Resumen */}
                <div className="flex p-1 bg-ink-soft rounded-xl border border-ink-line overflow-x-auto no-scrollbar relative">
                  {diasSeleccionados.map((d) => {
                    const isTabActive = resumenSelectedDay === d.id;
                    const count = routineData.dias[d.id]?.length || 0;
                    return (
                      <motion.button
                        key={d.id}
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={() => setResumenSelectedDay(d.id)}
                        className={`touch-press relative z-10 flex-1 py-2 px-1 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-colors flex flex-col items-center gap-0.5 ${
                          isTabActive ? "text-ink" : "text-white/40 hover:text-paper"
                        }`}
                      >
                        {isTabActive && (
                          <motion.div
                            layoutId="activeResumenDayTab"
                            className="absolute inset-0 bg-paper rounded-lg -z-10 shadow-sm"
                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          />
                        )}
                        <span>{d.short}</span>
                        <span className={`text-[9px] font-mono ${isTabActive ? "text-ink/70 font-bold" : "text-white/30"}`}>
                          ({count})
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Contenido Animado del Día Seleccionado en Resumen */}
                <AnimatePresence mode="wait">
                  {resumenSelectedDay && (
                    <motion.div
                      key={resumenSelectedDay}
                      variants={tabContentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.18 }}
                      className="bg-ink-soft border border-ink-line rounded-2xl overflow-hidden"
                    >
                      <div className="px-4 py-2.5 bg-white/[0.02] border-b border-ink-line flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-white/60" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-paper">
                            {DIAS_SEMANA.find(d => d.id === resumenSelectedDay)?.label}
                          </h4>
                        </div>
                        <span className="font-mono text-[10px] text-white/40">
                          {(routineData.dias[resumenSelectedDay] || []).length} asignados
                        </span>
                      </div>

                      <div className="divide-y divide-ink-line max-h-[220px] overflow-y-auto">
                        {(routineData.dias[resumenSelectedDay] || []).length > 0 ? (
                          routineData.dias[resumenSelectedDay].map((ex, idx) => (
                            <div
                              key={ex}
                              className="px-4 py-2.5 flex items-center justify-between text-xs text-white/80"
                            >
                              <span className="font-medium">{ex}</span>
                              <span className="font-mono text-[10px] text-white/30">#{idx + 1}</span>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-xs text-white/30 italic text-center">
                            Día de descanso programado.
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

          </AnimatePresence>

          {/* ================= BOTONES DE ACCIÓN (PASO 4 EN BLANCO CON TEXTO NEGRO) ================= */}
          <div className="mt-auto pt-8 space-y-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={step === "resumen" ? handleGuardar : handleNextStep}
              disabled={isNextDisabled}
              className={`touch-press w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                isNextDisabled
                  ? "opacity-30 cursor-not-allowed bg-ink-soft border border-ink-line text-white/40"
                  : "bg-paper text-ink shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
              }`}
            >
              {step === "resumen" ? "Guardar Rutina" : "Continuar"}
              {step !== "resumen" && <ChevronRight size={16} strokeWidth={2.5} />}
            </motion.button>

            {step !== "info" && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handlePrevStep}
                className="touch-press secondary-btn w-full py-3 text-xs uppercase tracking-wider font-bold bg-ink-soft border-ink-line"
              >
                Atrás
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setLocation("/routine")}
              className="touch-press text-[11px] font-semibold uppercase tracking-widest text-white/40 hover:text-paper w-full py-2 transition-colors text-center block"
            >
              Cancelar
            </motion.button>
          </div>

        </main>
      </div>
    </AnimatedPage>
  );
}