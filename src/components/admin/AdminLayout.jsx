import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

// Layout del panel admin: sidebar en desktop, drawer + top bar en móvil.
// Ahora recibe children en lugar de usar <Outlet /> de react-router-dom.
export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-ink">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar solo en móvil */}
        <div
          className="md:hidden flex items-center gap-2 h-auto min-h-14 px-3 sm:px-4 py-2 border-b border-ink-line bg-ink/90 backdrop-blur shrink-0"
          style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.5rem)' }}
        >
          <button
            onClick={() => setOpen(true)}
            className="icon-btn shrink-0"
            aria-label="Abrir menú"
          >
            <Menu size={18} />
          </button>

          <div className="flex-1 min-w-0 flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-sm sm:text-base truncate text-paper">
              RP BOX
            </span>
            <span className="font-extrabold tracking-tight text-sm sm:text-base text-lime truncate">
              ADMIN
            </span>
          </div>

          <span className="ml-auto text-[9px] sm:text-[10px] uppercase tracking-widest text-white/30 whitespace-nowrap shrink-0">
            DEMO
          </span>
        </div>

        <div
          className="shell-content flex-1 overflow-y-auto overflow-x-hidden"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}