import React from 'react';
import { Home, Dumbbell, BarChart3, User } from 'lucide-react';
import { useLocation } from 'wouter';

const navItems = [
  { icon: Home, label: 'Inicio', path: '/' },
  { icon: Dumbbell, label: 'Rutinas', path: '/rutina' },
  { icon: BarChart3, label: 'Progreso', path: '/progreso' },
  { icon: User, label: 'Perfil', path: '/perfil' },
];

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <nav
      aria-label="Navegación principal"
      // Cambié `py-3` por `pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]`
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[440px] border-t border-white/5 bg-ink/90 px-6 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl"
    >
      <ul className="flex items-center justify-between">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location === path;

          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => setLocation(path)}
                className="flex flex-col items-center gap-1 cursor-pointer"
                aria-current={active ? 'page' : undefined}
              >
                <Icon
                  className={`size-6 ${active ? 'text-lime' : 'text-white/35'}`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span
                  className={`text-[10px] font-medium ${active ? 'text-paper' : 'text-white/35'}`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}