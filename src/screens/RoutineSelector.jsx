import React, { useState, useMemo } from "react";
import { useLocation } from "wouter";
import {
  Clock,
  Dumbbell,
  Plus,
  Play,
  ChevronLeft,
  ChevronRight,
  Flame,
  Layers,
} from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { rutinasMock } from "../lib/rutinasMock";

const DEFAULT_IMAGES = [
  "/images/rutinapierna.jpg",
  "/images/pecho-supremo.jpg",
  "/images/pierna-hipertrofia.jpg"
];

export default function RoutineSelector() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState("coach");
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 1;

  const rawRutinaEnCurso = rutinasMock.find((r) => r.enCurso) || rutinasMock[0];
  const rutinaEnCurso = useMemo(() => {
    if (!rawRutinaEnCurso) return null;
    return rawRutinaEnCurso.titulo === "Pierna y pantorilla"
      ? { ...rawRutinaEnCurso, titulo: "Rutina de pecho Suprema", imagen: "/images/pecho-supremo.jpg" }
      : rawRutinaEnCurso;
  }, [rawRutinaEnCurso]);

  const totalCoach = useMemo(() => rutinasMock.filter((r) => r.origen === "coach" && r.visible).length, []);
  const totalMios = useMemo(() => rutinasMock.filter((r) => r.origen === "mio" && r.visible).length, []);

  const lista = useMemo(() => {
    const filtered = rutinasMock
      .filter((r) => r.origen === tab && r.visible)
      .map(r => {
        const tituloNormalizado = r.titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (tituloNormalizado === "pierna y pantorilla") {
          return { ...r, titulo: "Rutina de pecho Suprema", imagen: "/images/pecho-supremo.jpg" };
        }
        if (tituloNormalizado === "empuje premium") {
          return { ...r, imagen: "/images/pecho-supremo.jpg" };
        }
        if (tituloNormalizado === "mañanas express" || tituloNormalizado === "mananas express") {
          return { ...r, imagen: "/images/atleta2.jpg" };
        }
        return r;
      });

    return filtered.sort((a, b) => {
      const order = { "Empuje Premium": 0, "Pierna hipertrofia": 1 };
      const aOrder = order[a.titulo] ?? 2;
      const bOrder = order[b.titulo] ?? 2;
      return aOrder - bOrder;
    });
  }, [tab]);

  const totalPages = Math.ceil(lista.length / ITEMS_PER_PAGE);
  const paginatedLista = useMemo(() => {
    return lista.slice(currentPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  }, [lista, currentPage]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setCurrentPage(0);
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };

  const handleStartWorkout = (rutina) => {
    localStorage.setItem('activeRoutine', JSON.stringify(rutina));
    setLocation("/workout/exercise");
  };

  const handleContinueWorkout = () => {
    localStorage.setItem('activeRoutine', JSON.stringify(rutinaEnCurso));
    setLocation("/workout/exercise");
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col bg-ink text-paper min-h-screen font-sans">
        {/* Barra superior compacta con título centrado */}
        <div
          className="grid grid-cols-3 items-center px-4 py-3 border-b border-ink-line bg-ink sticky top-0 z-30"
          style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
        >
          <div className="justify-self-start">
            <button
              type="button"
              onClick={handleGoBack}
              className="icon-btn active:scale-95 transition-transform"
              aria-label="Volver"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="text-center justify-self-center min-w-0 px-2">
            <div className="text-[10px] uppercase tracking-widest text-lime font-semibold">Programación</div>
            <div className="text-base font-extrabold tracking-tight truncate">Rutinas</div>
          </div>

          <div className="justify-self-end w-10" />
        </div>

        {/* Contenido principal */}
        <main className="flex flex-col gap-4 px-4 pb-28 pt-3">
          {/* Botón crear rutina */}
          <button
            type="button"
            onClick={() => setLocation("/crear-rutina")}
            className="w-full p-4 rounded-2xl bg-ink-soft border border-ink-line hover:border-white/20 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform"
          >
            <span className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-lime text-ink flex items-center justify-center">
                <Plus size={20} strokeWidth={2.5} />
              </span>
              <span>
                <span className="block text-sm font-bold text-paper">Crear nueva rutina</span>
                <span className="text-xs text-white/50">Personaliza tu plan</span>
              </span>
            </span>
            <ChevronRight size={18} className="text-white/40" />
          </button>

          {/* Banner de sesión en curso */}
          {rutinaEnCurso && (
            <button
              type="button"
              onClick={handleContinueWorkout}
              className="w-full relative rounded-2xl overflow-hidden border border-ink-line cursor-pointer shadow-sm active:scale-[0.98] transition-transform duration-100"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${rutinaEnCurso?.imagen || DEFAULT_IMAGES[0]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/30" />

              <div className="relative z-10 p-4 flex items-center justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-flame/10 border border-flame/20 text-flame text-[10px] font-semibold uppercase tracking-wider">
                    <Flame size={12} />
                    En curso
                  </span>
                  <h2 className="mt-2 text-xl font-semibold text-paper leading-tight font-display">
                    {rutinaEnCurso?.titulo}
                  </h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    {rutinaEnCurso?.duracion || 0} min · {rutinaEnCurso?.ejercicios?.length || 0} ejercicios
                  </p>
                </div>
                <div className="shrink-0 bg-lime text-ink rounded-full px-4 py-2 font-bold text-xs uppercase tracking-wider shadow-sm">
                  Continuar
                </div>
              </div>
            </button>
          )}

          {/* Pestañas Coach / Mis rutinas */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleTabChange("coach")}
              className={`py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all active:scale-95 ${
                tab === "coach"
                  ? "bg-lime text-ink shadow-sm"
                  : "bg-ink-soft text-white/50 border border-ink-line hover:text-paper"
              }`}
            >
              Coach
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("mio")}
              className={`py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all active:scale-95 ${
                tab === "mio"
                  ? "bg-lime text-ink shadow-sm"
                  : "bg-ink-soft text-white/50 border border-ink-line hover:text-paper"
              }`}
            >
              Mis rutinas
            </button>
          </div>

          {/* Lista de rutinas */}
          {lista.length === 0 ? (
            <div className="border border-ink-line rounded-2xl flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-ink-line flex items-center justify-center mb-3 text-white/40">
                <Layers size={24} />
              </div>
              <h4 className="text-base font-semibold text-paper">No hay rutinas disponibles</h4>
              <p className="text-sm text-white/40 mt-1 max-w-[220px]">
                {tab === "mio"
                  ? "Crea tu primera rutina con el botón superior."
                  : "Tu coach aún no ha compartido rutinas contigo."}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {paginatedLista.map((rutina, index) => {
                  const bgImage = rutina.imagen || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
                  const exercises = rutina.ejercicios || [];
                  const firstExercise = exercises[0];

                  return (
                    <div 
                      key={rutina.id} 
                      className="border border-ink-line rounded-2xl overflow-hidden shadow-sm"
                    >
                      <div 
                        className="relative p-4 bg-cover bg-center min-h-[120px] flex flex-col justify-between"
                        style={{ backgroundImage: `url(${bgImage})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />

                        <div className="relative z-10">
                          <h3 className="text-xl font-bold text-paper font-display">
                            {rutina.titulo}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-white/70 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock size={12} /> {rutina.duracion} min
                            </span>
                            <span>{rutina.musculos?.join(" · ") || "Cuerpo completo"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-ink-line">
                        {firstExercise ? (
                          <div className="flex items-center justify-between mb-3">
                            <span className="flex items-center gap-2 text-sm text-paper/80">
                              <Dumbbell size={14} className="text-white/40" />
                              {typeof firstExercise === 'string' ? firstExercise : (firstExercise.nombre || 'Ejercicio')}
                            </span>
                            {exercises.length > 1 && (
                              <span className="text-xs text-white/40">+{exercises.length - 1} más</span>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-white/40 italic mb-3">Sin ejercicios</p>
                        )}

                        <button
                          type="button"
                          onClick={() => handleStartWorkout(rutina)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-lime py-3 text-ink font-bold text-sm uppercase tracking-wider shadow-sm active:scale-[0.98] transition-transform"
                        >
                          <Play size={16} className="fill-ink" />
                          Empezar rutina
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                    disabled={currentPage === 0}
                    className="p-2 rounded-lg bg-ink-soft border border-ink-line text-paper disabled:opacity-20 disabled:cursor-not-allowed active:scale-90 transition-transform"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === currentPage ? "w-6 bg-lime" : "w-2 bg-white/20"
                        }`}
                        aria-label={`Ir a página ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                    className="p-2 rounded-lg bg-ink-soft border border-ink-line text-paper disabled:opacity-20 disabled:cursor-not-allowed active:scale-90 transition-transform"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </AnimatedPage>
  );
}