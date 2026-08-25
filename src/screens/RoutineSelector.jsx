import React, { useState } from "react";
import { useLocation } from "wouter";
import { Clock, Dumbbell, Plus, Play, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { rutinasMock } from "@/lib/rutinasMock";

export default function RoutineSelector() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState("coach");
  const [openCardId, setOpenCardId] = useState(null);

  const rutinaEnCurso = rutinasMock.find((r) => r.enCurso) || rutinasMock[0];
  const totalCoach = rutinasMock.filter((r) => r.origen === "coach" && r.visible).length;
  const totalMios = rutinasMock.filter((r) => r.origen === "mio" && r.visible).length;
  const lista = rutinasMock.filter((r) => r.origen === tab && r.visible);

  const toggleAccordion = (id) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  return (
    <div className="flex flex-col bg-ink text-paper">
      
      {/* Hero Section */}
      <HeroSection>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
          Entrenamientos
        </p>
        <h1 className="mt-2 text-5xl font-extrabold leading-[0.95] tracking-tight text-paper text-balance">
          Elige tu
          <br />
          rutina.
        </h1>
        <p className="mt-3 text-base font-medium text-white/70">
          En curso, del coach o tus creaciones
        </p>
      </HeroSection>

      {/* Main Content */}
      <main className="flex flex-col gap-3 px-5 pb-28 pt-4">
        
        {/* Sección: En Curso */}
        <section>
          <div className="mb-2 px-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">En curso</p>
          </div>
          <div className="rounded-2xl bg-ink-soft p-4 border border-ink-line">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-paper">{rutinaEnCurso?.titulo}</h3>
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            </div>
            <p className="text-xs text-white/50 mb-3">
              {rutinaEnCurso?.musculos?.join(" · ") || "General"}
            </p>
            <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
              <span className="flex items-center gap-1">
                <Clock size={13} /> {rutinaEnCurso?.duracion || 0} min
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell size={13} /> {rutinaEnCurso?.ejercicios?.length || 0} ejercicios
              </span>
            </div>
            <button 
              onClick={() => setLocation("/routine")}
              className="primary-btn w-full flex items-center justify-center gap-2 py-2.5 text-sm"
            >
              <Play size={14} fill="currentColor" /> Continuar
            </button>
          </div>
        </section>

        {/* Sección: Del Coach / Mis Rutinas */}
        <section>
          {/* Tabs */}
          <div className="flex gap-2 border-b border-ink-line mb-3">
            <button
              onClick={() => setTab("coach")}
              className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                tab === "coach" 
                  ? "text-lime border-b-2 border-lime" 
                  : "text-white/40 border-b-2 border-transparent"
              }`}
            >
              Del Coach ({totalCoach})
            </button>
            <button
              onClick={() => setTab("mio")}
              className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                tab === "mio" 
                  ? "text-lime border-b-2 border-lime" 
                  : "text-white/40 border-b-2 border-transparent"
              }`}
            >
              Mis Rutinas ({totalMios})
            </button>
          </div>

          {/* Botón Crear */}
          {tab === "mio" && (
            <button
              onClick={() => setLocation("/crear-rutina")}
              className="primary-btn w-full flex items-center justify-center gap-2 py-2.5 mb-3 text-sm"
            >
              <Plus size={16} /> Crear nueva
            </button>
          )}

          {/* Lista Compacta */}
          <div className="space-y-2">
            {lista.length === 0 ? (
              <div className="glass-card flex flex-col items-center justify-center py-6">
                <Sparkles size={24} className="text-white/30 mb-2" />
                <p className="text-xs text-white/50">No hay rutinas</p>
              </div>
            ) : (
              lista.map((rutina) => {
                const isOpen = openCardId === rutina.id;

                return (
                  <div 
                    key={rutina.id} 
                    className="rounded-xl overflow-hidden bg-ink-soft border border-ink-line"
                  >
                    {/* Card Header */}
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-bold text-paper">{rutina.titulo}</h3>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/60">
                          {rutina.origen === "coach" ? "Coach" : "Mía"}
                        </span>
                      </div>

                      <p className="text-[11px] text-white/50 mb-2">
                        {rutina.musculos?.join(" · ") || "General"}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-white/40 mb-3">
                        <span className="flex items-center gap-0.5">
                          <Clock size={11} /> {rutina.duracion} min
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Dumbbell size={11} /> {rutina.ejercicios?.length || 0}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setLocation(`/routine/${rutina.id}`)}
                          className="primary-btn flex-1 flex items-center justify-center gap-1.5 py-2 text-xs"
                        >
                          <Play size={12} fill="currentColor" /> Empezar
                        </button>
                        <button 
                          onClick={() => toggleAccordion(rutina.id)} 
                          className="secondary-btn px-2.5 flex items-center"
                        >
                          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Acordeón */}
                    {isOpen && (
                      <div className="px-3 pb-3 space-y-1.5 border-t border-ink-line bg-ink/50">
                        {rutina.ejercicios?.length ? (
                          rutina.ejercicios.map((ej, idx) => (
                            <div key={idx} className="text-[11px] text-white/50 py-1">
                              {idx + 1}. {ej.nombre || ej}
                            </div>
                          ))
                        ) : (
                          <p className="text-[11px] text-white/40 py-2">Sin ejercicios</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

      </main>

    </div>
  );
}