import { Check } from "lucide-react";

// Indicador de series completadas. Segmentos activos en lima, resto en ink-line.
export default function SeriesProgressDots({ total, current, completed = 0 }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < completed;
        const isCurrent = i === current;
        return (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-200 ${
              isDone
                ? "bg-lime"
                : isCurrent
                ? "bg-paper/80"
                : "bg-ink-line"
            }`}
          />
        );
      })}
    </div>
  );
}

export function SeriesCheckDots({ total, completed = 0 }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const isDone = i < completed;
        return (
          <div
            key={i}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
              isDone
                ? "bg-lime text-ink animate-pop-in"
                : "bg-ink-soft border border-ink-line text-white/30"
            }`}
          >
            {isDone ? <Check size={14} strokeWidth={3} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
          </div>
        );
      })}
    </div>
  );
}