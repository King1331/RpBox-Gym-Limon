import React, { useState } from "react";
import { useLocation } from "wouter";
import { 
  Clock, 
  Dumbbell, 
  Plus, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/HeroSection";
import AnimatedPage from "../components/AnimatedPage";
import { rutinasMock } from "../lib/rutinasMock";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop"
];

export default function RoutineSelector() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState("coach");
  const [openCardId, setOpenCardId] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  const rutinaEnCurso = rutinasMock.find((r) => r.enCurso) || rutinasMock[0];
  const totalCoach = rutinasMock.filter((r) => r.origen === "coach" && r.visible).length;
  const totalMios = rutinasMock.filter((r) => r.origen === "mio" && r.visible).length;
  const lista = rutinasMock.filter((r) => r.origen === tab && r.visible);

  const totalPages = Math.ceil(lista.length / ITEMS_PER_PAGE);
  const paginatedLista = lista.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setCurrentPage(1);
    setOpenCardId(null);
  };

  const toggleAccordion = (id) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col bg-ink text-paper min-h-screen">
        
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
          {rutinaEnCurso && (
            <section>
              <div className="mb-2 px-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">En curso</p>
              </div>
              <div 
                className="rounded-2xl p-4 border border-ink-line relative overflow-hidden bg-cover bg-center shadow-lg transition-all"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 20, 0.85), rgba(18, 18, 20, 0.95)), url(${rutinaEnCurso?.imagen || DEFAULT_IMAGES[0]})`
                }}
              >
                <div className="backdrop-blur-[2px] -m-4 p-4">
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
              </div>
            </section>
          )}

          {/* Sección: Del Coach / Mis Rutinas */}
          <section>
            {/* Tabs */}
            <div className="flex gap-2 border-b border-ink-line mb-3">
              <button
                onClick={() => handleTabChange("coach")}
                className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  tab === "coach" 
                    ? "text-lime border-b-2 border-lime" 
                    : "text-white/40 border-b-2 border-transparent"
                }`}
              >
                Del Coach ({totalCoach})
              </button>
              <button
                onClick={() => handleTabChange("mio")}
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

            {/* Lista Animada con Paginación */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${tab}-${currentPage}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {lista.length === 0 ? (
                  <div className="glass-card flex flex-col items-center justify-center py-6">
                    <Sparkles size={24} className="text-white/30 mb-2" />
                    <p className="text-xs text-white/50">No hay rutinas</p>
                  </div>
                ) : (
                  paginatedLista.map((rutina, index) => {
                    const isOpen = openCardId === rutina.id;
                    const bgImage = rutina.imagen || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];

                    return (
                      <div 
                        key={rutina.id} 
                        className="rounded-xl overflow-hidden border border-ink-line bg-cover bg-center transition-all duration-200"
                        style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 20, 0.88), rgba(18, 18, 20, 0.96)), url(${bgImage})`
                        }}
                      >
                        {/* Card Header con difuminado */}
                        <div className="p-3 backdrop-blur-[2px]">
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

                        {/* Acordeón Animado */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden border-t border-ink-line bg-ink/80 backdrop-blur-md px-3 pb-3 pt-2 space-y-1.5"
                            >
                              {rutina.ejercicios?.length ? (
                                rutina.ejercicios.map((ej, idx) => (
                                  <div key={idx} className="text-[11px] text-white/50 py-1">
                                    {idx + 1}. {ej.nombre || ej}
                                  </div>
                                ))
                              ) : (
                                <p className="text-[11px] text-white/40 py-2">Sin ejercicios</p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>

            {/* Controles de Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-3 px-1 py-2 text-xs text-white/50 border-t border-ink-line">
                <span>Página {currentPage} de {totalPages}</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg bg-ink-soft border border-ink-line text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg bg-ink-soft border border-ink-line text-white/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </section>

        </main>

      </div>
    </AnimatedPage>
  );
}