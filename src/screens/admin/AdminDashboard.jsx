import { useLocation } from "wouter";
import KpiCard from "../../components/admin/KpiCard";
import AlertaCard from "../../components/admin/AlertaCard";
import { kpis, finanzas, ingresos6m, alertas, formatCol } from "../../lib/mockAdminData";

const finTone = { lime: "text-lime", amber: "text-amber-400", flame: "text-flame" };

function FinCard({ label, value, tone }) {
  return (
    <div className="glass-card p-4">
      <div className="text-[11px] uppercase tracking-widest text-white/40 truncate">{label}</div>
      <div className={`mt-3 text-lg sm:text-xl font-extrabold tracking-tight font-mono whitespace-nowrap ${finTone[tone]}`}>
        {value}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const max = Math.max(...ingresos6m.map((m) => m.monto));

  return (
    <div className="px-2 py-5 sm:px-5 md:p-8 max-w-6xl mx-auto">
      <header className="mb-6">
        <div className="text-[11px] uppercase tracking-widest text-lime font-semibold">RP BOX ADMIN</div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">Resumen del gimnasio</h1>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </section>

      {/* Actividad financiera */}
      <section className="mt-6 sm:mt-8">
        <h2 className="text-lg font-extrabold tracking-tight mb-3">Actividad financiera</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <FinCard label="Ingresos este mes" value={formatCol(finanzas.ingresosMes)} tone="lime" />
          <FinCard label="Cobrado esta semana" value={formatCol(finanzas.cobradoSemana)} tone="lime" />
          <FinCard label="Pendiente de pago" value={formatCol(finanzas.pendientePago)} tone="amber" />
          <FinCard label="Membresías vencidas" value={String(finanzas.membresiasVencidas)} tone="flame" />
        </div>

        {/* Gráfico simple de ingresos 6 meses */}
        <div className="glass-card p-4 sm:p-5 mt-3">
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
      </section>

      {/* Acciones recomendadas */}
      <section className="mt-6 sm:mt-8">
        <h2 className="text-lg font-extrabold tracking-tight mb-3">Acciones recomendadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {alertas.map((a) => (
            <AlertaCard
              key={a.titulo}
              {...a}
              onAction={() => setLocation(`/admin/clientes?filtro=${a.filtro}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}