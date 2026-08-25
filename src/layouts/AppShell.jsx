import React from 'react';
import { Bell, Dumbbell, Home, BarChart3, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/rutinas', label: 'Rutina', icon: Dumbbell },
  { href: '/progreso', label: 'Progreso', icon: BarChart3 },
  { href: '/staff', label: 'Staff', icon: User },
];

export default function AppShell({ children }) {
  const [location] = useLocation();

  return (
    <div className="app-frame">
      <div className="hero-backdrop" />

      {/* 
        Añadimos las clases para ocultar la barra de scroll en todos los navegadores móviles/desktop:
        - [&::-webkit-scrollbar]:hidden -> Oculta en Chrome, Safari y Edge
        - [scrollbar-width:none] -> Oculta en Firefox
      */}
      <main className="shell-content relative overflow-y-auto overflow-x-hidden flex-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {children}
      </main>

      <nav className="bottom-nav" aria-label="Navegación principal">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isItemActive = 
            location === href || 
            (href === '/rutina' && (location === '/routine' || location === '/crear-rutina'));

          return (
            <Link
              href={href}
              className={cn(
                'nav-item', 
                isItemActive && 'active',
                // Regla 3: Micro-interacción de resorte al tocar usando Tailwind puramente
                'active:scale-95 transition-transform duration-100'
              )}
              data-testid={`link-nav-${label.toLowerCase()}`}
              key={href}
            >
              <Icon size={19} strokeWidth={isItemActive ? 2.5 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}