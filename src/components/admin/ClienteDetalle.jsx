import { ChevronLeft, MessageCircle } from "lucide-react";

const riesgoColor = { verde: "text-lime", naranja: "text-amber-400", rojo: "text-flame" };
const riesgoLabel = { verde: "Saludable", naranja: "Atención", rojo: "Alto riesgo" };
const estadoPill = {
  Activa: "bg-lime/10 text-lime border-lime/30",
  "Por vencer": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Vencida: "bg-flame/10 text-flame border-flame/30",
  Inactiva: "bg-white/5 text-white/50 border-ink-line",
  Nueva: "bg-lime/10 text-lime border-lime/30",
};

function Field({ label, value, mono }) {
  return (
    <div className="rounded-xl bg-ink border border-ink-line p-3 min-w-0">
      <div className="text-[10px] uppercase tracking-widest text-white/40 truncate">{label}</div>
      <div className={`mt-1 font-bold tracking-tight break-words ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}

export default function ClienteDetalle({ cliente, onBack }) {
  const tieneRutina = cliente.rutinaActual && cliente.rutinaActual !== "—";

  return (
    <div className="p-4 sm:p-5 md:p-8 max-w-3xl mx-auto w-full overflow-x-hidden">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-white/60 hover:text-paper transition-colors text-sm mb-4"
      >
        <ChevronLeft size={16} /> Volver
      </button>

      {/* Tarjeta sin clase glass-card para evitar márgenes globales */}
      <div className="bg-ink-soft border border-white/5 rounded-2xl p-4 sm:p-6 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight break-words">
              {cliente.nombre}
            </h1>
            <div className="text-sm text-white/50 mt-1 break-words">
              {cliente.membresia} · Coach {cliente.coach}
            </div>
          </div>
          <span className={`status-pill shrink-0 ${estadoPill[cliente.estado]}`}>
            {cliente.estado}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-5">
          <Field label="Próximo pago" value={cliente.proximoPago} mono />
          <Field label="Último entrenamiento" value={cliente.ultimoEntreno} />
          <Field label="Entrenamientos este mes" value={cliente.entrenamientosMes} mono />
          <Field label="Rutina actual" value={cliente.rutinaActual} />
          <Field label="Peso" value={`${cliente.peso} kg`} mono />
          <Field label="% Grasa" value={`${cliente.grasa}%`} mono />
        </div>

        <div className="mt-4 text-sm">
          <span className="text-white/40">Riesgo: </span>
          <span className={`font-bold ${riesgoColor[cliente.riesgo]}`}>
            {riesgoLabel[cliente.riesgo]}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-6">
          <button className="primary-btn h-11">Editar</button>
          <button className="secondary-btn h-11">Suspender</button>
          <button className="secondary-btn h-11">Renovar</button>
          <button className="secondary-btn h-11">Ver progreso</button>
          {tieneRutina ? (
            <>
              <button className="secondary-btn h-11">Cambiar rutina</button>
              <button className="secondary-btn h-11">Editar rutina en curso</button>
            </>
          ) : (
            <button className="secondary-btn h-11">Asignar rutina</button>
          )}
          <button className="secondary-btn h-11 gap-2">
            <MessageCircle size={16} /> Contactar
          </button>
        </div>
      </div>
    </div>
  );
}