import { useEffect, useState } from 'react';
import {
  Bell,
  Dumbbell,
  Home,
  BarChart3,
  User,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Asignamos un índice u orden a nuestras rutas principales
const navItems = [
  { href: '/', label: 'Inicio', icon: Home, index: 0 },
  { href: '/rutina', label: 'Rutina', icon: Dumbbell, index: 1 },
  { href: '/progreso', label: 'Progreso', icon: BarChart3, index: 2 },
  { href: '/staff', label: 'Staff', icon: User, index: 3 },
];

export default function AppShell({ children, onNotifications }) {
  const [location] = useLocation();
  const [direction, setDirection] = useState(1); // 1 (derecha), -1 (izquierda)

  // 2. Efecto para calcular la dirección basada en la ruta anterior y la nueva
  useEffect(() => {
    // Encontramos el índice de la ruta actual (por defecto 0 si no se encuentra en las principales)
    const currentItem = navItems.find(item => location === item.href) || navItems[0];
    
    // Almacenamos el índice actual en el session storage para compararlo en el próximo render
    const prevIndex = sessionStorage.getItem('navIndex') 
      ? parseInt(sessionStorage.getItem('navIndex'), 10) 
      : 0;

    // Si el índice nuevo es mayor, vamos hacia adelante (1), sino, hacia atrás (-1)
    setDirection(currentItem.index > prevIndex ? 1 : -1);
    
    // Guardamos el nuevo índice
    sessionStorage.setItem('navIndex', currentItem.index.toString());
  }, [location]);

  // 3. Configuramos las variantes de animación de Framer Motion
  const variants = {
    // Estado inicial: entra desde la derecha si vamos adelante (x: 100), o desde la izquierda (x: -100)
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    // Estado visible central
    center: {
      x: 0,
      opacity: 1,
    },
    // Estado de salida: se va por la izquierda si íbamos adelante, o por la derecha si íbamos atrás
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="app-frame">
      <div className="hero-backdrop" />

      <main className="shell-content relative overflow-hidden">
        {/* Pasamos 'direction' como custom prop para que las variantes sepan a dónde ir */}
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={location}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="bottom-nav" aria-label="Navegación principal">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isItemActive = 
            location === href || 
            (href === '/rutina' && (location === '/routine' || location === '/crear-rutina'));

          return (
            <Link
              href={href}
              className={cn('nav-item', isItemActive && 'active')}
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