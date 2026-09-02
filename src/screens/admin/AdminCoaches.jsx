import { coaches, coachPendientes } from "../../lib/mockAdminData";

const statTone = { lime: "text-lime", amber: "text-amber-400", flame: "text-flame" };

function Stat({ label, value, tone }) {
  return (
    <div className="rounded-xl bg-ink border border-ink-line p-3">
      <div className={`text-xl font-extrabold font-mono ${statTone[tone]}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{label}</div>
    </div>
  );
}

function Pendiente({ label, value }) {
  return (
    <div className="rounded-xl bg-ink border border-ink-line p-4">
      <div className="text-2xl font-extrabold font-mono">{value}</div>
      <div className="text-[11px] uppercase tracking-widest text-white/40 mt-1">{label}</div>
    </div>
  );
}

// Responde: "¿Cómo está la carga de cada coach y qué tienen pendiente?"
export default function AdminCoaches() {
  return (
    <div className="p-4 sm:p-5 md:p-8 max-w-4xl mx-auto w-full overflow-x-hidden">
      <header className="mb-4 sm:mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Coaches</h1>
        <p className="text-sm text-white/50 mt-1">Carga y pendientes por coach.</p>
      </header>

      <div className="space-y-3 mb-6">
        {coaches.map((c) => (
          <div key={c.nombre} className="glass-card p-5 animate-fade-slide">
            <div className="flex items-center justify-between gap-2">
              <div className="font-bold tracking-tight text-lg truncate">{c.nombre}</div>
              <span className="text-sm text-white/50 whitespace-nowrap">{c.clientes} clientes</span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
              <Stat label="Con rutina activa" value={c.conRutina} tone="lime" />
              <Stat label="Sin rutina" value={c.sinRutina} tone="amber" />
              <Stat label="Inactivos" value={c.inactivos} tone="flame" />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-5">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-3">Pendientes del coach</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Pendiente label="Clientes sin rutina" value={coachPendientes.sinRutina} />
          <Pendiente label="Rutinas por actualizar" value={coachPendientes.porActualizar} />
          <Pendiente label="Clientes inactivos" value={coachPendientes.inactivos} />
        </div>
      </div>
    </div>
  );
}