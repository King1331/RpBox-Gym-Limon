import React, { useState } from 'react';
import { useLocation } from 'wouter';
import {
  TrendingDown,
  TrendingUp,
  Flame,
  ChevronLeft,
  Calendar,
  Dumbbell,
} from 'lucide-react';

import ProgressChart from '../components/ProgressChart';
import SectionHeader from '../components/SectionHeader';
import { useWorkoutSession } from '../lib/workout/WorkoutContext';

const chartPoints = {
  '1M': '18,147 60,138 102,142 144,126 186,130 228,115 270,119 312,101',
  '3M': '18,150 60,141 102,145 144,128 186,132 228,116 270,121 312,102',
  '6M': '18,153 60,146 102,149 144,137 186,133 228,121 270,111 312,92',
};

export default function ProgressScreen() {
  const [range, setRange] = useState('3M');
  const [, setLocation] = useLocation();
  const { streak, weekDays, totalSessions, totalVolume } = useWorkoutSession();

  return (
    <div className="flex flex-col min-h-screen bg-ink text-paper overflow-x-hidden w-full max-w-full">
      {/* Top bar compacta */}
      <div
        className="flex items-center justify-between px-5 pb-2 border-b border-ink-line bg-ink shrink-0"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
      >
        <button
          type="button"
          onClick={() => setLocation('/')}
          className="touch-press flex items-center gap-1 text-white/60 hover:text-paper active:scale-95 transition-all text-xs font-semibold uppercase tracking-widest"
        >
          <ChevronLeft size={16} />
          Volver
        </button>
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest text-white/40">Datos de rendimiento</div>
          <div className="text-sm font-bold text-paper">Progreso</div>
        </div>
        <div className="w-10" />
      </div>

      {/* Contenido scrolleable compacto */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 pt-3 pb-24 w-full max-w-full">
        <div className="space-y-3">
          {/* Racha y calendario semanal */}
          <section className="rounded-2xl bg-ink-soft border border-ink-line p-4 animate-fade-slide">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-full bg-flame/15 border border-flame/30 flex items-center justify-center relative shrink-0">
                <Flame size={28} className="text-flame" fill="currentColor" strokeWidth={2} />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-flame text-paper flex items-center justify-center font-extrabold text-xs border-2 border-ink">
                  {streak}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-paper truncate">{streak} días de racha</div>
                <div className="text-[11px] text-white/50">
                  {totalSessions} sesiones · {(totalVolume / 1000).toFixed(1)}k kg
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 mt-3">
              {weekDays.map((d) => (
                <div key={d.key} className="flex flex-col items-center gap-1 min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 truncate w-full text-center">
                    {d.label}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                      d.trained
                        ? 'bg-lime text-ink'
                        : 'bg-ink border border-ink-line text-white/30'
                    } ${d.isToday ? 'ring-2 ring-lime/50' : ''}`}
                  >
                    {d.dayNum}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-4 text-[10px] text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-lime" /> Entrenado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-ink border border-ink-line" /> Descanso
              </span>
            </div>
          </section>

          {/* Métricas rápidas */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-ink-soft border border-ink-line p-3 text-center">
              <TrendingDown size={16} className="text-lime mx-auto mb-1" strokeWidth={2.5} />
              <strong className="text-lg font-bold text-paper block">78.4</strong>
              <span className="text-[9px] uppercase tracking-wider text-white/50">Peso (kg)</span>
              <div className="text-[10px] font-medium text-lime mt-1 bg-lime/10 px-1.5 py-0.5 rounded-full border border-lime/20">
                −1.8 kg
              </div>
            </div>

            <div className="rounded-2xl bg-ink-soft border border-ink-line p-3 text-center">
              <TrendingDown size={16} className="text-flame mx-auto mb-1" strokeWidth={2.5} />
              <strong className="text-lg font-bold text-paper block">14.2%</strong>
              <span className="text-[9px] uppercase tracking-wider text-white/50">Grasa</span>
              <div className="text-[10px] font-medium text-flame mt-1 bg-flame/10 px-1.5 py-0.5 rounded-full border border-flame/20">
                −2.4%
              </div>
            </div>

            <div className="rounded-2xl bg-ink-soft border border-ink-line p-3 text-center">
              <TrendingUp size={16} className="text-lime mx-auto mb-1" strokeWidth={2.5} />
              <strong className="text-lg font-bold text-paper block">66.8</strong>
              <span className="text-[9px] uppercase tracking-wider text-white/50">Músculo</span>
              <div className="text-[10px] font-medium text-lime mt-1 bg-lime/10 px-1.5 py-0.5 rounded-full border border-lime/20">
                +1.2 kg
              </div>
            </div>
          </div>

          {/* Gráfico */}
          <section className="rounded-2xl bg-ink-soft border border-ink-line p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-paper">Tendencia de peso</h3>
                <span className="text-[11px] font-medium text-lime">−2.2% total</span>
              </div>
              <div className="flex rounded-lg bg-ink p-1 border border-ink-line">
                {Object.keys(chartPoints).map((item) => (
                  <button
                    key={item}
                    onClick={() => setRange(item)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors ${
                      range === item
                        ? 'bg-paper text-ink'
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

          {/* Último registro */}
          <section className="rounded-2xl bg-ink-soft border border-ink-line p-4">
            <SectionHeader title="Último registro" eyebrow="20 Sep 2026" />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs font-medium text-white/60">Peso corporal</span>
              <strong className="text-sm font-bold text-paper">78.4 kg</strong>
            </div>
            <div className="h-[1px] w-full bg-white/5 my-3" />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-medium text-white/60">
                <Flame size={14} className="text-flame" />
                Sentadilla 1RM est.
              </span>
              <strong className="text-sm font-bold text-flame">112 kg</strong>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}