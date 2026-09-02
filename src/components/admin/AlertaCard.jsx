const nivelStyle = {
  rojo: { dot: "bg-flame", border: "border-flame/40" },
  naranja: { dot: "bg-amber-500", border: "border-amber-500/40" },
  verde: { dot: "bg-lime", border: "border-lime/40" },
};

// Alerta accionable. Responde: "¿Qué debo hacer ahora?"
export default function AlertaCard({ nivel, titulo, detalle, accion, onAction }) {
  const s = nivelStyle[nivel] || nivelStyle.verde;
  return (
    <div className={`glass-card p-4 border-l-4 ${s.border} flex flex-col sm:flex-row sm:items-center gap-3 animate-fade-slide`}>
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <span className={`mt-1.5 w-2.5 h-2.5 rounded-full ${s.dot} shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="font-bold tracking-tight truncate">{titulo}</div>
          {detalle && <div className="text-sm text-white/50 mt-0.5 truncate">{detalle}</div>}
        </div>
      </div>
      <button onClick={onAction} className="secondary-btn w-full sm:w-auto shrink-0 px-3 h-9 text-sm">
        {accion}
      </button>
    </div>
  );
}