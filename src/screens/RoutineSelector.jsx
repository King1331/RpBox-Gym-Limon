import React, { useState } from "react";
import { useLocation } from "wouter";
import { 
  Clock, 
  Dumbbell, 
  Plus, 
  Play, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "../components/HeroSection";
import AnimatedPage from "../components/AnimatedPage";
import { rutinasMock } from "../lib/rutinasMock";

const DEFAULT_IMAGES = [
  "images/rutinapierna.jpg",
  "images/pecho-supremo.jpg",
  "images/pierna-hipertrofia.jpg"
];

export default function RoutineSelector() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState("coach");
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  const rawRutinaEnCurso = rutinasMock.find((r) => r.enCurso) || rutinasMock[0];
  const rutinaEnCurso = rawRutinaEnCurso?.titulo === "Pierna y pantorilla" 
    ? { ...rawRutinaEnCurso, titulo: "Rutina de pecho Suprema", imagen: "/pecho-supremo.jpg" } 
    : rawRutinaEnCurso;

  const totalCoach = rutinasMock.filter((r) => r.origen === "coach" && r.visible).length;
  const totalMios = rutinasMock.filter((r) => r.origen === "mio" && r.visible).length;
  
  const lista = rutinasMock
    .filter((r) => r.origen === tab && r.visible)
    .map(r => r.titulo === "Pierna y pantorilla" 
      ? { ...r, titulo: "Rutina de pecho Suprema", imagen: "/pecho-supremo.jpg" } 
      : r
    );

  const totalPages = Math.ceil(lista.length / ITEMS_PER_PAGE);
  const paginatedLista = lista.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setCurrentPage(1);
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
                <div className="p-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-paper">{rutinaEnCurso?.titulo}</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-white/90">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Activa
                    </span>
                  </div>
                  <p className="text-xs text-white/70 mb-3 font-medium">
                    {rutinaEnCurso?.musculos?.join(" · ") || "General"}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-white/60 mb-5 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {rutinaEnCurso?.duracion || 0} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell size={13} /> {rutinaEnCurso?.ejercicios?.length || 0} ejercicios
                    </span>
                  </div>

                  {/* Botón Píldora (En Curso) */}
                  <button
                    type="button"
                    onClick={() => setLocation("/routine")}
                    className="flex w-full items-center justify-between rounded-full bg-lime py-1.5 pl-5 pr-1.5 text-ink transition-transform active:scale-[0.98] cursor-pointer"
                  >
                    <span className="text-[13px] font-bold uppercase tracking-wide">
                      Continuar
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-full bg-ink">
                      <Play className="size-4 fill-lime text-lime" aria-hidden="true" />
                    </span>
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
                    ? "text-white border-b-2 border-white" 
                    : "text-white/40 border-b-2 border-transparent"
                }`}
              >
                Del Coach ({totalCoach})
              </button>
              <button
                onClick={() => handleTabChange("mio")}
                className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  tab === "mio" 
                    ? "text-white border-b-2 border-white" 
                    : "text-white/40 border-b-2 border-transparent"
                }`}
              >
                Mis Rutinas ({totalMios})
              </button>
            </div>

            {/* Botón Crear */}
            {tab === "mio" && (
              <motion.button
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                onClick={() => setLocation("/crear-rutina")}
                className="bg-lime text-ink font-bold rounded-xl w-full flex items-center justify-center gap-2 py-2.5 text-sm overflow-hidden active:scale-95 transition-all"
              >
                <Plus size={16} /> Crear nueva
              </motion.button>
            )}

            {/* Lista Animada con Paginación */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${tab}-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 relative w-full"
              >
                {lista.length === 0 ? (
                  <div className="glass-card flex flex-col items-center justify-center py-6">
                    <Sparkles size={24} className="text-white/30 mb-2" />
                    <p className="text-xs text-white/50">No hay rutinas</p>
                  </div>
                ) : (
                  paginatedLista.map((rutina, index) => {
                    const bgImage = rutina.imagen || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];

                    return (
                      <div 
                        key={rutina.id} 
                        className="rounded-xl overflow-hidden border border-ink-line transition-all duration-200"
                      >
                        {/* Cabecera con la imagen de fondo */}
                        <div 
                          className="p-3 bg-cover bg-center"
                          style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 20, 0.88), rgba(18, 18, 20, 0.96)), url(${bgImage})`
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-sm font-bold text-paper">{rutina.titulo}</h3>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/70 font-medium">
                              {rutina.origen === "coach" ? "Coach" : "Mía"}
                            </span>
                          </div>

                          <p className="text-[11px] text-white/70 mb-2 font-medium">
                            {rutina.musculos?.join(" · ") || "General"}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-white/60 font-medium">
                            <span className="flex items-center gap-0.5">
                              <Clock size={11} /> {rutina.duracion} min
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Dumbbell size={11} /> {rutina.ejercicios?.length || 0}
                            </span>
                          </div>
                        </div>

                        {/* Cuerpo inferior con fondo sólido (Ejercicios + Botón Empezar) */}
                        <div className="border-t border-ink-line bg-ink/95 px-3 py-3">
                          <div className="mb-3">
                            {rutina.ejercicios?.length ? (
                              <ul className="flex flex-col gap-1.5">
                                {rutina.ejercicios.map((ej, idx) => {
                                  const exName = typeof ej === 'string' ? ej : (ej.nombre || 'Ejercicio');
                                  const exDetail = typeof ej === 'string' ? '4 series · 10 reps' : (ej.detalle || '4 series · 10 reps');
                                  const exIndex = String(idx + 1).padStart(2, '0');
                                  
                                  return (
                                    <li
                                      key={idx}
                                      className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-2 border border-white/[0.02]"
                                    >
                                      <span
                                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                                          idx === 0 ? 'bg-white text-ink' : 'bg-white/5 text-white/40'
                                        }`}
                                      >
                                        {exIndex}
                                      </span>
                                      <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-semibold text-paper">
                                          {exName}
                                        </p>
                                        <p className="text-[10px] text-white/40">{exDetail}</p>
                                      </div>
                                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full ring-1 ring-white/10">
                                        <ChevronRight className="size-3 text-white/50" aria-hidden="true" />
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : (
                              <p className="text-[11px] text-white/40 py-1">Sin ejercicios</p>
                            )}
                          </div>

                          {/* Botón Píldora (Empezar) */}
                          <button
                            type="button"
                            onClick={() => setLocation(`/routine/${rutina.id}`)}
                            className="flex w-full items-center justify-between rounded-full bg-lime py-1.5 pl-4 pr-1.5 text-ink transition-transform active:scale-[0.98] cursor-pointer"
                          >
                            <span className="text-[11px] font-bold uppercase tracking-wide">
                              Empezar
                            </span>
                            <span className="flex size-7 items-center justify-center rounded-full bg-ink">
                              <Play className="size-3 fill-lime text-lime" aria-hidden="true" />
                            </span>
                          </button>
                        </div>
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