import { useState, useMemo } from "react";
import { useSearch } from "wouter";
import { Search } from "lucide-react";
import ClienteTabla from "../../components/admin/ClienteTabla";
import ClienteDetalle from "../../components/admin/ClienteDetalle";
import { clientes } from "../../lib/mockAdminData";

const filtros = [
  { key: "todos", label: "Todos" },
  { key: "activos", label: "Activos" },
  { key: "por-vencer", label: "Por vencer" },
  { key: "vencidos", label: "Vencidos" },
  { key: "inactivos", label: "Inactivos" },
  { key: "nuevos", label: "Nuevos" },
  { key: "riesgo", label: "En riesgo" },
];

const filtrar = (lista, f) => {
  switch (f) {
    case "activos": return lista.filter((c) => c.estado === "Activa");
    case "por-vencer": return lista.filter((c) => c.estado === "Por vencer");
    case "vencidos": return lista.filter((c) => c.estado === "Vencida");
    case "inactivos": return lista.filter((c) => c.estado === "Inactiva");
    case "nuevos": return lista.filter((c) => c.estado === "Nueva");
    case "riesgo": return lista.filter((c) => c.riesgo === "rojo");
    default: return lista;
  }
};

export default function AdminClientes() {
  const searchString = useSearch();
  const initial = new URLSearchParams(searchString).get("filtro") || "todos";
  const [filtro, setFiltro] = useState(initial);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const lista = useMemo(() => {
    let l = filtrar(clientes, filtro);
    if (query.trim()) l = l.filter((c) => c.nombre.toLowerCase().includes(query.trim().toLowerCase()));
    return l;
  }, [filtro, query]);

  if (selected) return <ClienteDetalle cliente={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="p-4 sm:p-5 md:p-8 max-w-6xl mx-auto w-full overflow-x-hidden">
      <header className="mb-4 sm:mb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Clientes</h1>
        <p className="text-sm text-white/50 mt-1">{lista.length} clientes en la vista actual</p>
      </header>

      {/* Búsqueda */}
      <div className="relative mb-3 sm:mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-ink-soft border border-ink-line text-sm outline-none focus:border-lime/50 transition-colors"
        />
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filtros.map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            className={`shrink-0 px-3 h-9 rounded-full text-xs font-semibold border transition-colors ${
              filtro === f.key ? "bg-lime text-ink border-lime" : "bg-ink-soft text-white/60 border-ink-line"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ClienteTabla clientes={lista} onSelect={setSelected} />
    </div>
  );
}