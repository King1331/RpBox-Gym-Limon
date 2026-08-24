import React from 'react';
import SessionCard from '../components/SessionCard';
import { Scoreboard } from '../components/Scoreboard';
import { MembershipCard } from '../components/MembershipCard';
import HeroSection from '../components/HeroSection';

export default function HomeScreen() {
  // Fecha actual formateada (ej. Sábado, 22 de agosto)
  const fechaHoy = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  const fechaFormateada = fechaHoy.charAt(0).toUpperCase() + fechaHoy.slice(1);

  return (
    <div className="flex flex-col bg-ink text-paper">
      
      {/* Hero unificado con tu tamaño y diseño exacto */}
      <HeroSection>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
          {fechaFormateada}
        </p>
        <h1 className="mt-2 text-5xl font-extrabold leading-[0.95] tracking-tight text-paper text-balance">
          Hola,
          <br />
          Fuertaco.
        </h1>
        <p className="mt-3 text-base font-medium text-white/70">
          Hoy no se negocia. Hoy se entrena.
        </p>
      </HeroSection>

      {/* Contenido Principal (Tarjetas) */}
      {/* El pb-28 asegura que el contenido no quede tapado por el menú flotante del AppShell */}
      <main className="flex flex-col gap-4 px-5 pb-28 pt-5">
        <SessionCard />
        <Scoreboard />
        <MembershipCard />
      </main>

    </div>
  );
}