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
  Plus,
  Flame,
  X,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "@/components/AnimatedPage";
import { ejerciciosPorMusculo } from "@/lib/rutinasMock";

const STEPS = [
  { id: "info", label: "Nombre", num: 1, desc: "Personalización" },
  { id: "dias", label: "Frecuencia", num: 2, desc: "Días de entreno" },
  { id: "ejercicios", label: "Ejercicios", num: 3, desc: "Carga muscular" },
  { id: "resumen", label: "Resumen", num: 4, desc: "Confirmación" },
];

const DIAS_SEMANA = [
  { id: "lunes", label: "Lunes", short: "Lun" },
  { id: "martes", label: "Martes", short: "Mar" },
  { id: "miercoles", label: "Miércoles", short: "Mié" },
  { id: "jueves", label: "Jueves", short: "Jue" },
  { id: "viernes", label: "Viernes", short: "Vie" },
];

const PRESETS_NOMBRE = [
  "Hipertrofia 4 Días",
  "Torso / Pierna",
  "Empuje / Tirón",
  "Full Body Express",
];

// Variantes de animación entre pantallas (Optimizadas para GPU)
const stepVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

const tabContentVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

// Partículas de confeti livianas
const CELEBRATION_PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  left: `${5 + i * 4.8}%`,
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

  const gruposMuscularesOpciones = useMemo(
    () => Object.keys(ejerciciosPorMusculo),
    []
  );
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

  const tieneDatos =
    routineData.titulo.trim().length > 0 && diasSeleccionados.length > 0;
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
      setLocation("/rutinas");
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col bg-ink text-paper min-h-screen font-sans">
        
        {/* ================= BARRA SUPERIOR INTEGRADA (SIN HERO) ================= */}
        <header className="px-4 pt-4 pb-2 border-b border-ink-line bg-ink sticky top-0 z-30">
          <div className="flex items-center justify-between mb-3">
            {/* Botón Volver solicitado */}
            <button
              type="button"
              onClick={() => setLocation("/rutinas")}
              className="flex items-center gap-1.5 text-white/60 hover:text-paper active:scale-95 transition-all text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              <ChevronLeft size={16} />
              Volver
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-lime px-2 py-0.5 rounded-full bg-lime/10 border border-lime/20">
              Paso {currentStepIndex + 1} de {STEPS.length}
            </span>
          </div>

          {/* Stepper horizontal elegante */}
          <div className="flex items-center gap-1.5 mb-2">
            {STEPS.map((s, idx) => (
              <div
                key={s.id}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx <= currentStepIndex ? "flex-1 bg-paper" : "w-3 bg-ink-line"
                }`}
              />
            ))}
          </div>

          {/* Título y guía rápida de cada paso */}
          <div className="pt-1 pb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-paper font-display tracking-tight leading-tight">
              {step === "info" && "Nombra tu rutina."}
              {step === "dias" && "¿Qué días entrenarás?"}
              {step === "ejercicios" && "Organiza tus ejercicios."}
              {step === "resumen" && "¡Tu rutina está lista!"}
            </h1>
            <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
              {step === "info" &&
                "Asigna un nombre claro a tu plan para seguir tu evolución sesión a sesión."}
              {step === "dias" &&
                "Selecciona los días activos. Los no marcados quedarán como descanso."}
              {step === "ejercicios" &&
                "Elige un día, toca un grupo muscular y añade los ejercicios deseados."}
              {step === "resumen" &&
                "Revisa el desglose por día y guarda para empezar a entrenar."}
            </p>
          </div>
        </header>

        {/* ================= CONTENIDO PRINCIPAL DEL WIZARD ================= */}
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
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!isNextDisabled) handleNextStep();
                  }}
                  className="space-y-4"
                >
                  <div className="bg-ink-soft rounded-2xl border border-ink-line p-4 shadow-sm">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-lime" />
                      Nombre del plan
                    </label>
                    <input
                      type="text"
                      value={routineData.titulo}
                      onChange={(e) =>
                        setRoutineData((prev) => ({
                          ...prev,
                          titulo: e.target.value,
                        }))
                      }
                      placeholder="Ej. Hipertrofia 4 Días, Fuerza..."
                      className="w-full px-3.5 py-3 rounded-xl bg-ink border border-ink-line text-paper placeholder:text-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none transition-colors text-sm"
                      autoFocus
                    />
                    <p className="text-[11px] text-white/40 mt-2">
                      💡 Consejo: Usa un título que te motive cada vez que abras la app.
                    </p>
                  </div>

                  {/* Sugerencias de títulos para novatos */}
                  <div className="bg-ink-soft/60 rounded-2xl border border-ink-line/60 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-2.5">
                      Sugerencias populares (toca una para usarla):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRESETS_NOMBRE.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() =>
                            setRoutineData((prev) => ({
                              ...prev,
                              titulo: preset,
                            }))
                          }
                          className="px-3 py-1.5 rounded-xl bg-ink border border-ink-line text-xs font-semibold text-white/70 hover:text-paper hover:border-white/30 active:scale-95 transition-all cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
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
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-1 gap-1">
  <span className="text-[11px] font-bold uppercase tracking-wider text-white/40">Frecuencia semanal</span>
  <span className="text-xs font-bold text-lime">{diasSeleccionados.length} días seleccionados</span>
</div>

                <div className="bg-ink-soft rounded-2xl border border-ink-line overflow-hidden divide-y divide-ink-line">
                  {DIAS_SEMANA.map((d) => {
                    const isSelected =
                      routineData.diasSeleccionados.includes(d.id);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => handleToggleDay(d.id)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 text-left active:scale-[0.99] transition-all cursor-pointer ${
                          isSelected ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              isSelected
                                ? "bg-paper text-ink"
                                : "bg-ink border border-ink-line text-white/40"
                            }`}
                          >
                            {d.short}
                          </div>
                          <div>
                            <p
                              className={`text-sm font-bold ${
                                isSelected ? "text-paper" : "text-white/60"
                              }`}
                            >
                              {d.label}
                            </p>
                            <p className="text-[11px] text-white/40">
                              {isSelected
                                ? "Día de entrenamiento activo."
                                : "Descanso programado."}
                            </p>
                          </div>
                        </div>

                        {/* Indicador Check */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? "bg-paper border-paper text-ink"
                              : "border-white/15 bg-ink text-transparent"
                          }`}
                        >
                          <Check size={13} strokeWidth={3} />
                        </div>
                      </button>
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
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* 1. Selector de Día activo */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2 flex items-center gap-1.5">
                    <Calendar size={13} className="text-white/60" />
                    1. Selecciona el día a configurar
                  </label>
                  <div className="flex items-center gap-1.5 p-1 bg-ink-soft rounded-xl border border-ink-line overflow-x-auto no-scrollbar relative">
                    {diasSeleccionados.map((d) => {
                      const isActive = selectedDay === d.id;
                      const count = routineData.dias[d.id]?.length || 0;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setSelectedDay(d.id)}
                          className={`relative z-10 flex-1 min-w-[65px] py-2 px-1.5 rounded-lg flex flex-col items-center gap-0.5 text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? "bg-paper text-ink shadow-sm"
                              : "text-white/50 hover:text-paper"
                          }`}
                        >
                          <span>{d.short}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                              isActive
                                ? "bg-ink/10 text-ink font-black"
                                : "bg-ink border border-ink-line text-white/40"
                            }`}
                          >
                            {count} ex
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDay && (
                  <>
                    {/* 2. Selector de Grupo Muscular */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2 flex items-center gap-1.5">
                        <Layers size={13} className="text-white/60" />
                        2. Grupo muscular
                      </label>
                      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                        {gruposMuscularesOpciones.map((musculo) => {
                          const isMusculoActive = selectedMusculo === musculo;
                          return (
                            <button
                              key={musculo}
                              type="button"
                              onClick={() => setSelectedMusculo(musculo)}
                              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all active:scale-95 cursor-pointer ${
                                isMusculoActive
                                  ? "bg-white/15 text-paper border-white/40 shadow-sm"
                                  : "bg-ink-soft border-ink-line text-white/60 hover:text-paper hover:bg-white/[0.04]"
                              }`}
                            >
                              {musculo.charAt(0).toUpperCase() +
                                musculo.slice(1)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. Lista de Ejercicios Disponibles */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Dumbbell size={13} className="text-white/60" />
                          3. Añade ejercicios de {selectedMusculo}
                        </span>
                        <span className="text-[10px] text-white/30">
                          {ejerciciosDisponibles.length} disponibles
                        </span>
                      </label>

                      <div className="bg-ink-soft rounded-2xl border border-ink-line overflow-hidden divide-y divide-ink-line">
                        {ejerciciosDisponibles.map((exercise) => {
                          const isSelected =
                            routineData.dias[selectedDay]?.includes(exercise);
                          return (
                            <button
                              key={exercise}
                              type="button"
                              onClick={() =>
                                handleToggleExerciseToDay(exercise)
                              }
                              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-white/[0.05]"
                                  : "hover:bg-white/[0.02]"
                              }`}
                            >
                              <span
                                className={`text-xs font-medium pr-2 ${
                                  isSelected
                                    ? "text-paper font-bold"
                                    : "text-white/70"
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
                                {isSelected ? (
                                  <Check size={13} strokeWidth={3} />
                                ) : (
                                  <Plus size={13} />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Resumen del Día Actual */}
                    {routineData.dias[selectedDay]?.length > 0 && (
                      <div className="pt-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-2 block">
                          Asignados a {selectedDay} (
                          {routineData.dias[selectedDay].length})
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {routineData.dias[selectedDay].map((exercise) => (
                            <span
                              key={exercise}
                              className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg bg-ink-soft border border-ink-line text-xs font-medium text-paper"
                            >
                              {exercise}
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveExercise(selectedDay, exercise)
                                }
                                className="p-0.5 rounded hover:bg-white/10 text-white/40 hover:text-flame transition-colors cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {/* ================= PASO 4: RESUMEN CON CONFETI ================= */}
            {step === "resumen" && (
              <motion.div
                key="step-resumen"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-3 relative"
              >
                {/* Lluvia de Confeti Animada */}
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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-lime">
                      Plan completado
                    </span>
                    <h3 className="text-xl font-black text-paper mt-0.5 font-display">
                      {routineData.titulo}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-paper font-display">
                      {totalEjercicios}
                    </span>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">
                      Ejercicios
                    </p>
                  </div>
                </div>

                {/* Segmented Day Tabs */}
                <div className="flex p-1 bg-ink-soft rounded-xl border border-ink-line overflow-x-auto no-scrollbar relative">
                  {diasSeleccionados.map((d) => {
                    const isTabActive = resumenSelectedDay === d.id;
                    const count = routineData.dias[d.id]?.length || 0;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setResumenSelectedDay(d.id)}
                        className={`relative z-10 flex-1 py-2 px-1 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                          isTabActive
                            ? "bg-paper text-ink shadow-sm"
                            : "text-white/40 hover:text-paper"
                        }`}
                      >
                        <span>{d.short}</span>
                        <span
                          className={`text-[9px] ${
                            isTabActive
                              ? "text-ink/70 font-bold"
                              : "text-white/30"
                          }`}
                        >
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Contenido del Día en Resumen */}
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
                            {
                              DIAS_SEMANA.find(
                                (d) => d.id === resumenSelectedDay
                              )?.label
                            }
                          </h4>
                        </div>
                        <span className="text-[10px] text-white/40">
                          {
                            (routineData.dias[resumenSelectedDay] || [])
                              .length
                          }{" "}
                          asignados
                        </span>
                      </div>

                      <div className="divide-y divide-ink-line max-h-[220px] overflow-y-auto">
                        {(routineData.dias[resumenSelectedDay] || []).length >
                        0 ? (
                          routineData.dias[resumenSelectedDay].map(
                            (ex, idx) => (
                              <div
                                key={ex}
                                className="px-4 py-2.5 flex items-center justify-between text-xs text-white/80"
                              >
                                <span className="font-medium">{ex}</span>
                                <span className="text-[10px] text-white/30">
                                  #{idx + 1}
                                </span>
                              </div>
                            )
                          )
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

          {/* ================= BOTONES DE ACCIÓN FLUIDOS ================= */}
          <div className="mt-auto pt-8 space-y-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={step === "resumen" ? handleGuardar : handleNextStep}
              disabled={isNextDisabled}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                isNextDisabled
                  ? "opacity-30 cursor-not-allowed bg-ink-soft border border-ink-line text-white/40"
                  : "bg-paper text-ink shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
              }`}
            >
              {step === "resumen" ? "Guardar Rutina" : "Continuar"}
              {step !== "resumen" && (
                <ChevronRight size={16} strokeWidth={2.5} />
              )}
            </motion.button>

            {step !== "info" && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handlePrevStep}
                className="secondary-btn w-full py-3 text-xs uppercase tracking-wider font-bold bg-ink-soft border-ink-line cursor-pointer"
              >
                Atrás
              </motion.button>
            )}

            <button
              type="button"
              onClick={() => setLocation("/rutinas")}
              className="text-[11px] font-semibold uppercase tracking-widest text-white/40 hover:text-paper w-full py-2 transition-colors text-center block cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
}