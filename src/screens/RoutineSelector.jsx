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
  ArrowRight,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
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
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 1;

  // Rutina en curso
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
    return lista.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  }, [lista, currentPage]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setCurrentPage(1);
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col bg-ink text-paper min-h-screen font-sans">
        
        {/* ================= HERO SECTION ================= */}
        <HeroSection>
          <button
            type="button"
            onClick={handleGoBack}
            className="flex items-center gap-1.5 text-white/60 hover:text-paper active:scale-95 transition-all mb-4 text-xs font-semibold uppercase tracking-widest"
          >
            <ChevronLeft size={16} />
            Volver
          </button>

          <div className="flex items-center gap-1.5 mb-2">
            <span className="flex h-5 items-center px-2 rounded-full bg-ink-soft border border-ink-line text-white/80 text-[10px] font-bold tracking-widest uppercase">
              Programación
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold leading-[0.95] tracking-tight text-paper text-balance font-display">
            Elige tu
            <br />
            rutina.
          </h1>
          <p className="mt-2 text-xs font-medium text-white/65 leading-relaxed text-balance">
            Explora tus entrenamientos activos, los asignados por tu coach o crea un nuevo plan a tu medida.
          </p>
        </HeroSection>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex flex-col gap-5 px-4 pb-36 pt-2">
          
          {/* ================= SECCIÓN: RUTINA EN CURSO ================= */}
          {rutinaEnCurso && (
            <section className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
                  <span className="flex items-center justify-center w-5 h-5">
                    <Flame size={16} className="text-flame" />
                  </span>
                  Sesión en progreso
                </p>
              </div>

              {/* Botón táctil con respuesta CSS instantánea (60fps garantizados) */}
              <div 
                onClick={() => setLocation("/routine")}
                className="relative rounded-2xl overflow-hidden border border-ink-line cursor-pointer shadow-sm active:scale-[0.98] transition-transform duration-100 ease-out"
              >
                {/* Foto destacada */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${rutinaEnCurso?.imagen || DEFAULT_IMAGES[0]})`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent" />

                <div className="relative z-10 p-4 flex flex-col justify-between min-h-[160px]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-semibold text-white/90 tracking-wide uppercase mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Activa hoy
                      </span>
                      <h3 className="text-xl font-semibold text-paper leading-tight tracking-tight font-display">
                        {rutinaEnCurso?.titulo}
                      </h3>
                      <p className="text-[11px] text-white/60 mt-0.5">
                        {rutinaEnCurso?.musculos?.join(" · ") || "Cuerpo completo"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-white/10 mt-3">
                    <div className="flex items-center gap-3 text-xs text-white/70 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-white/60" />
                        {rutinaEnCurso?.duracion || 0} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Dumbbell size={12} className="text-white/60" />
                        {rutinaEnCurso?.ejercicios?.length || 0} ejercicios
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-paper uppercase tracking-wider flex items-center gap-1">
                      Continuar <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================= SECCIÓN: EXPLORADOR DE RUTINAS ================= */}
          <section className="space-y-3">
            
            {/* Control Segmentado Instantáneo sin recálculo de DOM */}
            <div className="flex p-1 bg-ink-soft rounded-xl border border-ink-line">
              <button
                type="button"
                onClick={() => handleTabChange("coach")}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 active:scale-95 ${
                  tab === "coach"
                    ? "bg-lime text-ink font-bold shadow-sm"
                    : "text-white/40 hover:text-paper"
                }`}
              >
                Coach <span className={`text-[10px] ${tab === "coach" ? "text-ink/70" : "text-white/30"}`}>({totalCoach})</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("mio")}
                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 active:scale-95 ${
                  tab === "mio"
                    ? "bg-lime text-ink font-bold shadow-sm"
                    : "text-white/40 hover:text-paper"
                }`}
              >
                Mis Rutinas <span className={`text-[10px] ${tab === "mio" ? "text-ink/70" : "text-white/30"}`}>({totalMios})</span>
              </button>
            </div>

            {/* ================= BOTÓN CREAR RUTINA ================= */}
            {tab === "mio" && (
              <button
                type="button"
                onClick={() => setLocation("/crear-rutina")}
                className="w-full p-3.5 rounded-2xl bg-ink-soft border border-ink-line hover:border-white/30 flex items-center justify-between group shadow-sm text-left active:scale-[0.98] transition-transform duration-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-paper text-ink flex items-center justify-center shrink-0 shadow-sm">
                    <Plus size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-paper font-display">
                      Crear nueva rutina
                    </h4>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      Configura días, grupos musculares y ejercicios.
                    </p>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:text-paper transition-colors shrink-0">
                  <ChevronRight size={15} strokeWidth={2.5} />
                </div>
              </button>
            )}

            {/* ================= LISTA DE RUTINAS ================= */}
            <div className="space-y-3">
              {lista.length === 0 ? (
                <div className="border border-ink-line rounded-2xl flex flex-col items-center justify-center py-10 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-ink-line flex items-center justify-center mb-3 text-white/40">
                    <Layers size={22} />
                  </div>
                  <h4 className="text-sm font-semibold text-paper font-display">No hay rutinas disponibles</h4>
                  <p className="text-xs text-white/40 mt-1 max-w-[220px]">
                    {tab === "mio"
                      ? "Empieza creando tu primer plan personalizado con el botón superior."
                      : "Tu coach aún no ha compartido rutinas contigo."}
                  </p>
                </div>
              ) : (
                paginatedLista.map((rutina, index) => {
                  const bgImage = rutina.imagen || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
                  const exercises = rutina.ejercicios || [];

                  return (
                    <div 
                      key={rutina.id} 
                      className="border border-ink-line rounded-2xl overflow-hidden shadow-sm"
                    >
                      {/* Cabecera con Foto */}
                      <div 
                        className="relative p-3.5 bg-cover bg-center min-h-[110px] flex flex-col justify-between"
                        style={{
                          backgroundImage: `url(${bgImage})`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />

                        <div className="relative z-10 flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80 px-2 py-0.5 rounded-full bg-ink/80 border border-white/10">
                              {rutina.origen === "coach" ? "Coach" : "Personal"}
                            </span>
                            <h3 className="text-base font-semibold text-paper mt-1.5 font-display">
                              {rutina.titulo}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1.5 bg-ink/80 px-2 py-1 rounded-lg border border-white/10 text-[11px] text-white/80">
                            <Clock size={12} className="text-white/60" />
                            <span>{rutina.duracion} min</span>
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 mt-2">
                          <span className="text-[11px] font-medium text-white/70">
                            {rutina.musculos?.join(" · ") || "Cuerpo completo"}
                          </span>
                        </div>
                      </div>

                      {/* Cuerpo con ejercicios */}
                      <div className="p-3 border-t border-ink-line">
                        {exercises.length > 0 ? (
                          <div className="space-y-1.5 mb-3">
                            {exercises.map((ej, idx) => {
                              const exName = typeof ej === 'string' ? ej : (ej.nombre || 'Ejercicio');
                              const exDetail = typeof ej === 'string' ? '4 series · 10 reps' : (ej.detalle || '4 series');
                              const exIndex = String(idx + 1).padStart(2, '0');

                              return (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-ink-line/60 bg-ink/30"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="text-[10px] font-bold text-white/40 w-5">
                                      {exIndex}
                                    </span>
                                    <span className="text-xs font-semibold text-paper truncate">
                                      {exName}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-white/40 shrink-0 font-medium">
                                    {exDetail}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-white/30 italic py-2 text-center">
                            Sin ejercicios asignados.
                          </p>
                        )}

                        {/* Botón Comenzar con respuesta CSS instantánea */}
                        <button
                          type="button"
                          onClick={() => setLocation("/routine")}
                          className="w-full mt-3 flex items-center justify-between rounded-xl bg-lime py-2.5 pl-4 pr-2 text-ink font-semibold text-xs uppercase tracking-wider shadow-sm active:scale-[0.98] transition-transform duration-100 cursor-pointer font-display"
                        >
                          <span>Comenzar rutina</span>
                          <div className="w-6 h-6 rounded-lg bg-ink text-lime flex items-center justify-center">
                            <Play size={11} className="fill-lime ml-0.5" />
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* ================= PAGINACIÓN ================= */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2 px-1 text-xs text-white/50">
                <span className="text-[11px]">
                  Página <strong className="text-paper font-semibold">{currentPage}</strong> de {totalPages}
                </span>
                
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-ink-soft border border-ink-line text-paper disabled:opacity-20 disabled:cursor-not-allowed active:scale-90 transition-transform duration-75"
                  >
                    <ChevronLeft size={15} strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl bg-ink-soft border border-ink-line text-paper disabled:opacity-20 disabled:cursor-not-allowed active:scale-90 transition-transform duration-75"
                  >
                    <ChevronRight size={15} strokeWidth={2.5} />
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