import { useState } from "react";
import { useLocation } from "wouter";
import { Dumbbell, Users, Plus, ChevronLeft } from "lucide-react";
import { rutinas, clientes } from "../../lib/mockAdminData";
import ClienteDetalle from "../../components/admin/ClienteDetalle";

// Responde: "¿Quién tiene rutina, quién no, y qué clientes hay en cada rutina?"
export default function AdminRutinas() {
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [, setLocation] = useLocation();

  const conRutina = clientes.filter((c) => c.rutinaActual && c.rutinaActual !== "—");
  const sinRutina = clientes.filter((c) => !c.rutinaActual || c.rutinaActual === "—");

  if (selectedClient) return <ClienteDetalle cliente={selectedClient} onBack={() => setSelectedClient(null)} />;

  // Vista de una rutina: clientes asignados + asignar nueva
  if (selectedRoutine) {
    const asignados = clientes.filter((c) => c.rutinaActual === selectedRoutine.nombre);
    return (
      <div className="p-3 sm:p-5 md:p-8 max-w-4xl mx-auto w-full overflow-x-hidden">
        <button
          onClick={() => setSelectedRoutine(null)}
          className="flex items-center gap-1 text-white/60 hover:text-paper transition-colors text-sm mb-4"
        >
          <ChevronLeft size={16} /> Volver
        </button>

        <header className="mb-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-widest text-lime font-semibold">Rutina</div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight truncate">
              {selectedRoutine.nombre}
            </h1>
            <p className="text-sm text-white/50 mt-1">{asignados.length} clientes asignados</p>
          </div>
          <button
            onClick={() => setLocation("/crear-rutina")}
            className="primary-btn h-11 px-4 gap-2 w-full sm:w-auto shrink-0"
          >
            <Plus size={18} /> Asignar nueva rutina
          </button>
        </header>

        <div className="space-y-3">
          {asignados.length === 0 && (
            <div className="bg-ink-soft border border-white/5 rounded-2xl shadow-lg p-6 text-center text-white/40 text-sm">
              Ningún cliente tiene esta rutina asignada.
            </div>
          )}
          {asignados.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClient(c)}
              className="bg-ink-soft border border-white/5 rounded-2xl shadow-lg p-4 w-full text-left flex items-center justify-between gap-3 animate-fade-slide"
            >
              <div className="min-w-0">
                <div className="font-bold tracking-tight truncate">{c.nombre}</div>
                <div className="text-xs text-white/50 mt-0.5 truncate">
                  Coach {c.coach} · {c.membresia}
                </div>
              </div>
              <span className="status-pill bg-lime/10 text-lime border-lime/30 shrink-0">Con rutina</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5 md:p-8 max-w-4xl mx-auto w-full overflow-x-hidden">
      <header className="mb-2">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Rutinas</h1>
        <p className="text-sm text-white/50 mt-1">Gestiona rutinas y su asignación a clientes.</p>
      </header>

      <p className="text-xs text-white/40 mb-6">
        Los coaches no están obligados a asignar rutinas; depende del gusto de cada cliente.
      </p>

      {/* Rutinas del gimnasio */}
      <h2 className="text-lg font-extrabold tracking-tight mb-3">Rutinas del gimnasio</h2>
      <div className="space-y-3 mb-8">
        {rutinas.map((r) => (
          <div
            key={r.nombre}
            className="bg-ink-soft border border-white/5 rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-slide"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center shrink-0">
                <Dumbbell size={20} className="text-lime" />
              </div>
              <div className="min-w-0">
                <div className="font-bold tracking-tight truncate">{r.nombre}</div>
                <div className="text-xs text-white/50">{r.clientes} clientes asignados</div>
              </div>
            </div>
            <button
              onClick={() => setSelectedRoutine(r)}
              className="secondary-btn h-10 px-4 text-sm gap-2 w-full sm:w-auto shrink-0"
            >
              <Users size={16} /> Ver clientes
            </button>
          </div>
        ))}
      </div>

      {/* Clientes con rutina */}
      <h2 className="text-lg font-extrabold tracking-tight mb-1">Clientes con rutina</h2>
      <p className="text-xs text-white/40 mb-3">
        {conRutina.length} clientes · toca para cambiar o editar su rutina
      </p>
      <div className="space-y-3 mb-8">
        {conRutina.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedClient(c)}
            className="bg-ink-soft border border-white/5 rounded-2xl shadow-lg p-4 w-full text-left flex items-center justify-between gap-3 animate-fade-slide"
          >
            <div className="min-w-0">
              <div className="font-bold tracking-tight truncate">{c.nombre}</div>
              <div className="text-xs text-white/50 mt-0.5 truncate">
                Rutina: {c.rutinaActual} · Coach {c.coach}
              </div>
            </div>
            <span className="status-pill bg-lime/10 text-lime border-lime/30 shrink-0">Con rutina</span>
          </button>
        ))}
      </div>

      {/* Clientes sin rutina */}
      <h2 className="text-lg font-extrabold tracking-tight mb-1">Clientes sin rutina</h2>
      <p className="text-xs text-white/40 mb-3">
        {sinRutina.length} clientes · toca para asignar una rutina
      </p>
      <div className="space-y-3">
        {sinRutina.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedClient(c)}
            className="bg-ink-soft border border-white/5 rounded-2xl shadow-lg p-4 w-full text-left flex items-center justify-between gap-3 animate-fade-slide"
          >
            <div className="min-w-0">
              <div className="font-bold tracking-tight truncate">{c.nombre}</div>
              <div className="text-xs text-white/50 mt-0.5 truncate">
                Coach {c.coach} · {c.membresia}
              </div>
            </div>
            <span className="status-pill bg-amber-500/10 text-amber-400 border-amber-500/30 shrink-0">Sin rutina</span>
          </button>
        ))}
      </div>
    </div>
  );
}