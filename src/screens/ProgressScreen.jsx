import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Flame, ChevronLeft } from 'lucide-react';

import ProgressChart from '@/components/ProgressChart';
import SectionHeader from '@/components/SectionHeader';
import HeroSection from '@/components/HeroSection';

const chartPoints = {
  '1M': '18,147 60,138 102,142 144,126 186,130 228,115 270,119 312,101',
  '3M': '18,150 60,141 102,145 144,128 186,132 228,116 270,121 312,102',
  '6M': '18,153 60,146 102,149 144,137 186,133 228,121 270,111 312,92',
};

export default function ProgressScreen() {
  const [range, setRange] = useState('3M');

  return (
    <div className="flex flex-col bg-ink text-paper">
      
      {/* 1. HeroSection Unificado con botón de retroceso contextual */}
      <HeroSection>
        <button 
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-white/50 font-mono text-[11px] tracking-widest uppercase mb-4 hover:text-paper transition-colors cursor-pointer w-fit"
        >
          <ChevronLeft size={16} />
          Volver atrás
        </button>

        <p className="text-[11px] font-semibold uppercase tracking-widest text-white">
          Datos de rendimiento
        </p>
        <h1 className="mt-2 text-5xl font-extrabold leading-[0.95] tracking-tight text-paper text-balance">
          Progreso.
        </h1>
        <p className="mt-3 text-base font-medium text-white/70">
          Los números no mienten. Tu trabajo habla.
        </p>
      </HeroSection>

      <main className="flex flex-col gap-6 px-5 pb-32 pt-4">
        
    {/* 2. Métricas Rápidas */}
<div className="grid grid-cols-3 gap-2 sm:gap-3">
  
  {/* Métrica 1: Peso */}
  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-ink-soft p-3 sm:p-4 shadow-lg text-center overflow-hidden" data-testid="progress-weight">
    <TrendingDown size={18} className="text-lime mb-1.5 sm:mb-2 shrink-0" strokeWidth={2.5} />
    <strong className="text-xl sm:text-2xl font-bold tracking-tighter text-paper font-sans truncate w-full">
      78.4
    </strong>
    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50 mt-0.5 sm:mt-1 truncate w-full">
      Peso (kg)
    </span>
    <div className="text-[11px] sm:text-xs font-medium text-lime mt-1.5 sm:mt-2 bg-lime/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-lime/20 whitespace-nowrap">
      −1.8 kg
    </div>
  </div>

  {/* Métrica 2: Grasa */}
  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-ink-soft p-3 sm:p-4 shadow-lg text-center overflow-hidden" data-testid="progress-fat">
    <TrendingDown size={18} className="text-flame mb-1.5 sm:mb-2 shrink-0" strokeWidth={2.5} />
    <strong className="text-xl sm:text-2xl font-bold tracking-tighter text-paper font-sans truncate w-full">
      14.2<span className="text-xs sm:text-sm">%</span>
    </strong>
    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50 mt-0.5 sm:mt-1 truncate w-full">
      Grasa
    </span>
    <div className="text-[11px] sm:text-xs font-medium text-flame mt-1.5 sm:mt-2 bg-flame/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-flame/20 whitespace-nowrap">
      −2.4%
    </div>
  </div>

  {/* Métrica 3: Músculo */}
  <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-ink-soft p-3 sm:p-4 shadow-lg text-center overflow-hidden" data-testid="progress-muscle">
    <TrendingUp size={18} className="text-lime mb-1.5 sm:mb-2 shrink-0" strokeWidth={2.5} />
    <strong className="text-xl sm:text-2xl font-bold tracking-tighter text-paper font-sans truncate w-full">
      66.8
    </strong>
    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50 mt-0.5 sm:mt-1 truncate w-full">
      Músculo
    </span>
    <div className="text-[11px] sm:text-xs font-medium text-lime mt-1.5 sm:mt-2 bg-lime/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-lime/20 whitespace-nowrap">
      +1.2 kg
    </div>
  </div>

</div>

        {/* 3. Sección de la Gráfica */}
        <section className="flex flex-col gap-3">
          <div className="flex items-end justify-between px-1">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-paper">Tendencia de peso</h3>
              <span className="text-xs font-medium text-lime">−2.2% total</span>
            </div>
            
            {/* Selector de Rango (1M, 3M, 6M) */}
            <div className="flex rounded-lg bg-ink-soft p-1 border border-white/5">
              {Object.keys(chartPoints).map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  data-testid={`button-range-${item}`}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    range === item
                      ? 'bg-ink text-lime shadow-sm border border-white/5'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <ProgressChart points={chartPoints[range]} />
        </section>

        {/* 4. Último Registro */}
        <section className="mt-2">
          <SectionHeader title="Último registro" eyebrow="20 Sep 2026" />
          
          <div className="rounded-2xl border border-white/5 bg-ink-soft p-5 shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/60">Peso corporal</span>
              <strong className="text-lg font-mono text-paper">78.4 kg</strong>
            </div>
            
            <div className="h-[1px] w-full bg-white/5 rounded-full" />
            
            {/* Récord de intensidad (Acento Flame) */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-medium text-white/60">
                <Flame size={14} className="text-flame" />
                Sentadilla 1RM est.
              </span>
              <strong className="text-lg font-mono text-flame">112 kg</strong>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}