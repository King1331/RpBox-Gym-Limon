import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

// Temporizador circular con cuenta regresiva (SVG).
export default function RestTimer({ duration, onComplete }) {
  const [remaining, setRemaining] = useState(duration);
  const [running, setRunning] = useState(true);
  const rafRef = useRef(null);
  const lastTick = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    setRemaining(duration);
    setRunning(true);
    completedRef.current = false;
    lastTick.current = null;
  }, [duration]);

  useEffect(() => {
    if (!running) {
      lastTick.current = null;
      return;
    }
    const tick = (ts) => {
      if (lastTick.current == null) lastTick.current = ts;
      const delta = (ts - lastTick.current) / 1000;
      lastTick.current = ts;
      setRemaining((prev) => {
        const next = Math.max(0, prev - delta);
        if (next <= 0 && !completedRef.current) {
          completedRef.current = true;
          setRunning(false);
          onComplete?.();
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, onComplete]);

  const size = 220;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const progress = duration > 0 ? remaining / duration : 0;
  const offset = C * (1 - progress);

  const mins = Math.floor(remaining / 60);
  const secs = Math.floor(remaining % 60);
  const timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} stroke="#2a2a2a" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#f3ff47"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[10px] uppercase tracking-widest text-white/40">Descanso</div>
          <div className="text-5xl font-extrabold tracking-tight tabular-nums">{timeStr}</div>
          <div className="text-[11px] text-white/40 mt-1">Respira y prepárate</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setRemaining(duration);
            setRunning(true);
            completedRef.current = false;
            lastTick.current = null;
          }}
          className="touch-press w-14 h-14 rounded-full bg-ink-soft border border-ink-line flex items-center justify-center text-white/80"
          aria-label="Reiniciar"
        >
          <RotateCcw size={22} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => setRunning((r) => !r)}
          className="touch-press w-16 h-16 rounded-full bg-lime text-ink flex items-center justify-center"
          aria-label={running ? "Pausar" : "Iniciar"}
        >
          {running ? <Pause size={26} strokeWidth={2.5} fill="currentColor" /> : <Play size={26} strokeWidth={2.5} fill="currentColor" />}
        </button>
        <button
          onClick={() => onComplete?.()}
          className="touch-press w-14 h-14 rounded-full bg-ink-soft border border-ink-line flex items-center justify-center text-white/80"
          aria-label="Saltar"
        >
          <SkipForward size={22} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}