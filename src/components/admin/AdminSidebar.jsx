import { useLocation } from "wouter";
import { LayoutDashboard, Users, Wallet, Dumbbell, UserCog, X, Home } from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Clientes", to: "/admin/clientes", icon: Users },
  { label: "Pagos", to: "/admin/pagos", icon: Wallet },
  { label: "Rutinas", to: "/admin/rutinas", icon: Dumbbell },
  { label: "Coaches", to: "/admin/coaches", icon: UserCog },
  { label: "Volver a inicio", to: "/", icon: Home, exact: true },
];

// Sidebar fijo en desktop (izquierda) y drawer colapsable en móvil.
export default function AdminSidebar({ open, onClose }) {
  const [location, setLocation] = useLocation();

  const isActive = (item) =>
    item.exact ? location === item.to : location.startsWith(item.to);

  const go = (to) => {
    setLocation(to);
    onClose?.();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden animate-fade-in" onClick={onClose} />
      )}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-ink-soft border-r border-ink-line flex flex-col transition-transform duration-200 md:translate-x-0 md:static md:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.5rem)' }}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-ink-line">
          <div>
            <div className="text-sm font-extrabold tracking-tight">RP BOX</div>
            <div className="text-[10px] uppercase tracking-widest text-lime font-semibold">Admin</div>
          </div>
          <button onClick={onClose} className="icon-btn md:hidden" aria-label="Cerrar menú">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <button
                key={item.to}
                onClick={() => go(item.to)}
                className={`w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-semibold transition-colors ${
                  active ? "bg-lime text-ink" : "text-white/60 hover:bg-white/5 hover:text-paper"
                }`}
              >
                <Icon size={18} strokeWidth={2.2} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-ink-line">
          <div className="text-[10px] uppercase tracking-widest text-white/30">DEMO — Datos de ejemplo</div>
        </div>
      </aside>
    </>
  );
}