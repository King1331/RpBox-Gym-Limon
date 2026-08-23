import React from 'react';

export default function ProgressChart({ points = "18,120 112,90 205,100 296,40" }) {
  return (
    <div className="w-full rounded-2xl border border-white/5 bg-ink-soft p-5 shadow-lg">
      <svg
        viewBox="0 0 330 185"
        role="img"
        aria-label="Gráfica de tendencia de progreso"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            {/* Degradado en verde neón (lime) */}
            <stop offset="0" stopColor="#a3e635" stopOpacity=".25" />
            <stop offset="1" stopColor="#a3e635" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Líneas guía horizontales punteadas */}
        {[30, 70, 110, 150].map((y) => (
          <line
            key={y}
            x1="18"
            x2="312"
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="4 4" /* Le da un efecto punteado tecnológico */
          />
        ))}

        {/* Área rellenada bajo la línea */}
        <polygon points={`${points} 312,170 18,170`} fill="url(#area)" />
        
        {/* Línea principal de la gráfica */}
        <polyline
          points={points}
          fill="none"
          stroke="#a3e635" /* Verde lime hex */
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Puntos de datos (Círculos) */}
        {points.split(' ').map((point, index) => {
          const [x, y] = point.split(',');
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4.5"
              className="fill-ink" /* Fondo oscuro como la app */
              stroke="#a3e635"
              strokeWidth="2.5"
            />
          );
        })}

        {/* Etiquetas del Eje X */}
        {['Jun', 'Jul', 'Ago', 'Sep'].map((label, index) => (
          <text
            key={label}
            x={[18, 112, 205, 296][index]}
            y="183"
            textAnchor={index === 3 ? 'end' : 'start'}
            className="fill-white/50 text-[10px] font-semibold uppercase tracking-widest font-sans"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}