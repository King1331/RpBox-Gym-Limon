const riesgoDot = { verde: "bg-lime", naranja: "bg-amber-500", rojo: "bg-flame" };
const riesgoLabel = { verde: "Saludable", naranja: "Atención", rojo: "Alto riesgo" };

const estadoStyle = {
  Activa: "bg-lime/10 text-lime border-lime/30",
  "Por vencer": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Vencida: "bg-flame/10 text-flame border-flame/30",
  Inactiva: "bg-white/5 text-white/50 border-ink-line",
  Nueva: "bg-lime/10 text-lime border-lime/30",
};

function EstadoPill({ estado }) {
  return <span className={`status-pill ${estadoStyle[estado] || estadoStyle.Inactiva}`}>{estado}</span>;
}

// Tabla de clientes responsive: tabla en desktop, tarjetas en móvil.
export default function ClienteTabla({ clientes, onSelect }) {
  if (clientes.length === 0) {
    return <div className="glass-card !mx-0 p-8 text-center text-white/40 text-sm">No hay clientes en esta vista.</div>;
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block glass-card !mx-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-widest text-white/40 border-b border-ink-line">
              <th className="px-4 py-3 font-semibold">Nombre</th>
              <th className="px-4 py-3 font-semibold">Membresía</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 font-semibold">Próximo pago</th>
              <th className="px-4 py-3 font-semibold">Último entreno</th>
              <th className="px-4 py-3 font-semibold">Coach</th>
              <th className="px-4 py-3 font-semibold text-center">Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr
                key={c.id}
                onClick={() => onSelect(c)}
                className="border-b border-ink-line/60 last:border-0 cursor-pointer hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-4 py-3 font-semibold">{c.nombre}</td>
                <td className="px-4 py-3 text-white/60">{c.membresia}</td>
                <td className="px-4 py-3"><EstadoPill estado={c.estado} /></td>
                <td className="px-4 py-3 font-mono text-white/60">{c.proximoPago}</td>
                <td className="px-4 py-3 text-white/60">{c.ultimoEntreno}</td>
                <td className="px-4 py-3 text-white/60">{c.coach}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block w-3 h-3 rounded-full ${riesgoDot[c.riesgo]}`} title={riesgoLabel[c.riesgo]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <div className="md:hidden space-y-3">
        {clientes.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="glass-card !mx-0 p-4 w-full text-left animate-fade-slide"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold tracking-tight">{c.nombre}</span>
              <span className={`inline-block w-3 h-3 rounded-full ${riesgoDot[c.riesgo]}`} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50">
              <EstadoPill estado={c.estado} />
              <span>· {c.membresia}</span>
              <span>· Pago {c.proximoPago}</span>
            </div>
            <div className="mt-1 text-xs text-white/40">
              Último entreno: {c.ultimoEntreno} · Coach {c.coach}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}