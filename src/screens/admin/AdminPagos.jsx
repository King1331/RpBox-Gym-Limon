import { useState } from "react";
import { formatCol, pagos, pagosResumen, ingresos6m, clientes } from "../../lib/mockAdminData";
import ClienteDetalle from "../../components/admin/ClienteDetalle";

const estadoStyle = {
  Pagado: "bg-lime/10 text-lime border-lime/30",
  Pendiente: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Vencido: "bg-flame/10 text-flame border-flame/30",
};

const sumTone = { lime: "text-lime", amber: "text-amber-400", flame: "text-flame" };

const tabs = [
  { key: "todos", label: "Todos" },
  { key: "Pagado", label: "Pagado" },
  { key: "Pendiente", label: "Pendiente" },
  { key: "Vencido", label: "Vencido" },
];

function SumCard({ label, value, tone }) {
  return (
    <div className="bg-ink-soft border border-white/5 rounded-2xl shadow-lg p-4 sm:p-5">
      <div className="text-[11px] uppercase tracking-widest text-white/40 truncate">{label}</div>
      <div className={`mt-2 text-xl sm:text-2xl font-extrabold font-mono whitespace-nowrap ${sumTone[tone]}`}>
        {value}
      </div>
    </div>
  );
}

// Responde: "¿Cuánto cobré, cuánto está pendiente/vencido y cómo van los ingresos?"
export default function AdminPagos() {
  const [tab, setTab] = useState("todos");
  const [selected, setSelected] = useState(null);

  const lista = tab === "todos" ? pagos : pagos.filter((p) => p.estado === tab);
  const max = Math.max(...ingresos6m.map((m) => m.monto));

  const verPerfil = (nombre) => {
    const cli = clientes.find((c) => c.nombre === nombre);
    if (cli) setSelected(cli);
  };

  if (selected) return <ClienteDetalle cliente={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="p-3 sm:p-5 md:p-8 max-w-5xl mx-auto w-full overflow-x-hidden">
      <header className="mb-4 sm:mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Pagos</h1>
        <p className="text-sm text-white/50 mt-1">Control de cobros y estados de pago.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 mb-4">
        <SumCard label="Cobrado este mes" value={formatCol(pagosResumen.cobradoMes)} tone="lime" />
        <SumCard label="Pendiente" value={formatCol(pagosResumen.pendiente)} tone="amber" />
        <SumCard label="Vencido" value={formatCol(pagosResumen.vencido)} tone="flame" />
      </div>

      {/* Ingresos últimos 6 meses */}
      <div className="bg-ink-soft border border-white/5 rounded-2xl shadow-lg p-4 sm:p-5 mb-6">
        <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4">Ingresos últimos 6 meses</div>
        <div className="flex items-end justify-between gap-2 sm:gap-3 h-40">
          {ingresos6m.map((m) => (
            <div key={m.mes} className="flex-1 flex flex-col items-center gap-2 h-full justify-end min-w-0">
              <div
                className="w-full rounded-t-lg bg-lime/80 hover:bg-lime transition-colors"
                style={{ height: `${Math.max(8, (m.monto / max) * 100)}%` }}
              />
              <div className="text-[10px] uppercase tracking-widest text-white/40 truncate w-full text-center">{m.mes}</div>
              <div className="text-[10px] font-mono text-white/60">{(m.monto / 1000000).toFixed(1)}M</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs por estado */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 px-3 h-9 rounded-full text-xs font-semibold border transition-colors ${
              tab === t.key ? "bg-lime text-ink border-lime" : "bg-ink-soft text-white/60 border-ink-line"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block bg-ink-soft border border-white/5 rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-widest text-white/40 border-b border-ink-line">
              <th className="px-4 py-3 font-semibold">Cliente</th>
              <th className="px-4 py-3 font-semibold">Monto</th>
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p, i) => (
              <tr
                key={i}
                onClick={() => verPerfil(p.cliente)}
                className="border-b border-ink-line/60 last:border-0 cursor-pointer hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-4 py-3 font-semibold">{p.cliente}</td>
                <td className="px-4 py-3 font-mono">{formatCol(p.monto)}</td>
                <td className="px-4 py-3 text-white/60 font-mono">{p.fecha}</td>
                <td className="px-4 py-3"><span className={`status-pill ${estadoStyle[p.estado]}`}>{p.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Móvil */}
      <div className="md:hidden space-y-3">
        {lista.map((p, i) => (
          <button
            key={i}
            onClick={() => verPerfil(p.cliente)}
            className="bg-ink-soft border border-white/5 rounded-2xl shadow-lg p-4 w-full text-left"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold tracking-tight truncate">{p.cliente}</span>
              <span className={`status-pill shrink-0 ${estadoStyle[p.estado]}`}>{p.estado}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="font-mono">{formatCol(p.monto)}</span>
              <span className="text-white/50 font-mono">{p.fecha}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}