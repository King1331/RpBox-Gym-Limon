import React, { useState } from "react";
import { useLocation } from "wouter";
import { Check, Trash2, ChevronRight, ChevronLeft } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { ejerciciosPorMusculo } from "@/lib/rutinasMock";

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

  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  const gruposMuscularesOpciones = Object.keys(ejerciciosPorMusculo);
  const ejerciciosDisponibles = selectedMusculo
    ? ejerciciosPorMusculo[selectedMusculo] || []
    : [];

  const handleToggleDay = (dia) => {
    setRoutineData((prev) => {
      const isSelected = prev.diasSeleccionados.includes(dia);
      return {
        ...prev,
        diasSeleccionados: isSelected
          ? prev.diasSeleccionados.filter((d) => d !== dia)
          : [...prev.diasSeleccionados, dia],
      };
    });
  };

  const handleAddExerciseToDay = (exercise) => {
    if (!selectedDay) return;
    setRoutineData((prev) => ({
      ...prev,
      dias: {
        ...prev.dias,
        [selectedDay]: prev.dias[selectedDay].includes(exercise)
          ? prev.dias[selectedDay].filter((e) => e !== exercise)
          : [...prev.dias[selectedDay], exercise],
      },
    }));
  };

  const handleRemoveExerciseFromDay = (dia, exercise) => {
    setRoutineData((prev) => ({
      ...prev,
      dias: {
        ...prev.dias,
        [dia]: prev.dias[dia].filter((e) => e !== exercise),
      },
    }));
  };

  const diasSeleccionados = dias.filter((dia) =>
    routineData.diasSeleccionados.includes(dia)
  );
  const tieneDatos = routineData.titulo && diasSeleccionados.length > 0;

  const handleNextStep = () => {
    if (step === "info" && routineData.titulo.trim()) setStep("dias");
    else if (step === "dias" && diasSeleccionados.length > 0) {
      setStep("ejercicios");
      setSelectedDay(diasSeleccionados[0]);
    } else if (step === "ejercicios" && tieneDatos) setStep("resumen");
  };

  const handlePrevStep = () => {
    if (step === "dias") setStep("info");
    else if (step === "ejercicios") {
      setStep("dias");
      setSelectedDay(null);
    } else if (step === "resumen") setStep("ejercicios");
  };

  const handleGuardar = () => {
    if (tieneDatos) {
      console.log("Rutina guardada:", routineData);
      setLocation("/routine");
    }
  };

  return (
    <div className="flex flex-col bg-ink text-paper min-h-screen">
      
      {/* Hero Section unificado con estilo de Progreso */}
      <HeroSection>
        <button 
          type="button"
          onClick={() => setLocation("/routine")}
          className="flex items-center gap-1.5 text-white/50 font-mono text-[11px] tracking-widest uppercase mb-4 hover:text-paper transition-colors cursor-pointer w-fit"
        >
          <ChevronLeft size={16} />
          Volver atrás
        </button>

        <p className="text-[11px] font-semibold uppercase tracking-widest text-lime">
          {step === "info" && "Define el nombre"}
          {step === "dias" && "Organiza tu semana"}
          {step === "ejercicios" && "Personaliza tu carga"}
          {step === "resumen" && "Paso final"}
        </p>

        <h1 className="mt-2 text-5xl font-extrabold leading-[0.95] tracking-tight text-paper text-balance">
          Diseña tu
          <br />
          rutina.
        </h1>

        <p className="mt-3 text-base font-medium text-white/70">
          {step === "info" && "Dale un título a tu nuevo plan de entrenamiento."}
          {step === "dias" && "Selecciona los días que planeas entrenar."}
          {step === "ejercicios" && "Agrega ejercicios específicos por cada día."}
          {step === "resumen" && "Revisa tu rutina completa antes de guardarla."}
        </p>
      </HeroSection>

      {/* Main */}
      <main className="flex flex-col flex-1 px-5 pb-28 pt-6">

        {/* PASO 1: INFO */}
        {step === "info" && (
          <section className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 block">
                Nombre de la rutina
              </label>
              <input
                type="text"
                value={routineData.titulo}
                onChange={(e) =>
                  setRoutineData((prev) => ({ ...prev, titulo: e.target.value }))
                }
                placeholder="Ej: Mi rutina semanal"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-paper placeholder:text-white/30 focus:bg-white/[0.05] focus:border-white/15 focus:outline-none transition-all"
              />
            </div>
          </section>
        )}

        {/* PASO 2: DÍAS */}
        {step === "dias" && (
          <section className="space-y-3">
            {dias.map((dia) => {
              const isSelected = diasSeleccionados.includes(dia);
              return (
                <button
                  key={dia}
                  onClick={() => handleToggleDay(dia)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all border ${
                    isSelected
                      ? "bg-lime/15 border-lime/40 text-lime"
                      : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.05]"
                  }`}
                >
                  {isSelected && (
                    <Check size={14} className="inline mr-2" />
                  )}
                  {dia.charAt(0).toUpperCase() + dia.slice(1)}
                </button>
              );
            })}
          </section>
        )}

        {/* PASO 3: EJERCICIOS */}
        {step === "ejercicios" && (
          <section className="space-y-4">
            {/* Selector de Días */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 block">
                Selecciona un día
              </label>
              <div className="grid grid-cols-2 gap-2">
                {diasSeleccionados.map((dia) => (
                  <button
                    key={dia}
                    onClick={() => setSelectedDay(dia)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all ${
                      selectedDay === dia
                        ? "bg-lime/15 border border-lime/40 text-lime"
                        : "bg-white/[0.03] border border-white/[0.08] text-white/60"
                    }`}
                  >
                    {dia.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {selectedDay && (
              <>
                {/* Selector de Músculos */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 block">
                    Grupo muscular
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {gruposMuscularesOpciones.map((musculo) => (
                      <button
                        key={musculo}
                        onClick={() => setSelectedMusculo(musculo)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all ${
                          selectedMusculo === musculo
                            ? "bg-white/20 border border-white/40 text-paper"
                            : "bg-white/[0.03] border border-white/[0.08] text-white/60"
                        }`}
                      >
                        {musculo}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lista de Ejercicios */}
                {selectedMusculo && (
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 block">
                      Ejercicios
                    </label>
                    <div className="space-y-2">
                      {ejerciciosDisponibles.map((exercise) => (
                        <button
                          key={exercise}
                          onClick={() => handleAddExerciseToDay(exercise)}
                          className={`w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest text-left transition-all border ${
                            routineData.dias[selectedDay]?.includes(exercise)
                              ? "bg-lime/15 border-lime/40 text-lime"
                              : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.05]"
                          }`}
                        >
                          {routineData.dias[selectedDay]?.includes(exercise) && (
                            <Check size={12} className="inline mr-1" />
                          )}
                          {exercise}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ejercicios del día seleccionado */}
                {routineData.dias[selectedDay]?.length > 0 && (
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 block">
                      Ejercicios de {selectedDay}
                    </label>
                    <div className="space-y-2">
                      {routineData.dias[selectedDay].map((exercise) => (
                        <div
                          key={exercise}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                        >
                          <span className="text-xs font-semibold text-paper">
                            {exercise}
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveExerciseFromDay(selectedDay, exercise)
                            }
                            className="p-1 hover:bg-white/[0.05] rounded transition"
                          >
                            <Trash2 size={14} className="text-white/40" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* PASO 4: RESUMEN */}
        {step === "resumen" && (
          <section className="space-y-4">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
              <h3 className="text-sm font-bold text-paper mb-3">
                {routineData.titulo}
              </h3>

              <div className="space-y-4">
                {diasSeleccionados.map((dia) => (
                  <div key={dia}>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                      {dia.charAt(0).toUpperCase() + dia.slice(1)}
                    </h4>
                    <div className="space-y-1">
                      {routineData.dias[dia].length > 0 ? (
                        routineData.dias[dia].map((exercise) => (
                          <div
                            key={exercise}
                            className="text-xs text-white/60 pl-3 py-1 border-l border-white/[0.1]"
                          >
                            • {exercise}
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-white/40 italic">Descanso o sin ejercicios</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Botones */}
        <div className="mt-8 space-y-2">
          <button
            onClick={step === "resumen" ? handleGuardar : handleNextStep}
            disabled={
              (step === "info" && !routineData.titulo.trim()) ||
              (step === "dias" && diasSeleccionados.length === 0) ||
              (step === "ejercicios" && !tieneDatos)
            }
            className="primary-btn w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === "resumen" ? "Guardar rutina" : "Siguiente"}
            {step !== "resumen" && <ChevronRight size={16} />}
          </button>

          {step !== "info" && (
            <button onClick={handlePrevStep} className="secondary-btn w-full py-3">
              Atrás
            </button>
          )}

          <button
            onClick={() => setLocation("/routine")}
            className="text-xs font-semibold uppercase tracking-widest text-white/40 hover:text-white/60 w-full py-2 transition"
          >
            Cancelar
          </button>
        </div>

      </main>

    </div>
  );
}