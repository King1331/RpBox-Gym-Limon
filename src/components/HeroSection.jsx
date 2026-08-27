import React from 'react';
import { Bell } from 'lucide-react';
import useNotifications from '../hooks/useNotifications';
import NotificationsModal from './NotificationsModal';

export default function HeroSection({ children }) {
  const notificationsModal = useNotifications();

  return (
    <section className="relative overflow-hidden shrink-0 h-[320px] flex flex-col justify-between">
      {/* Imagen de fondo en JPG con renderizado estable */}
      <img
        src="/images/atleta5.jpg"
        alt="Atleta durante una sesión de entrenamiento"
        className="absolute inset-0 h-full w-full object-cover object-top pointer-events-none select-none"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      
      {/* Degradados fijos para mantener la profundidad constante */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent pointer-events-none" />

      <div className="relative flex flex-col z-10 h-full">
        {/* Header superior adaptado al notch con safe-area */}
        <header className="flex items-center justify-end px-5 pt-[calc(env(safe-area-inset-top)+1rem)]">
          <button
            type="button"
            onClick={notificationsModal.open}
            aria-label="Ver notificaciones"
            className="relative flex size-10 items-center justify-center rounded-full bg-ink/60 backdrop-blur-md cursor-pointer transition-transform active:scale-95"
          >
            <Bell className="size-5 text-paper" strokeWidth={2} aria-hidden="true" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-flame ring-2 ring-ink" />
          </button>
        </header>

        {/* Contenedor dinámico con altura restante para centrar el contenido */}
        <div className="flex-1 flex items-end px-5 pb-8 pt-4">
          <div className="w-full">{children}</div>
        </div>
      </div>

      {notificationsModal.isOpen && (
        <NotificationsModal onClose={notificationsModal.close} />
      )}
    </section>
  );
}