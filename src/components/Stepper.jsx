import { Minus, Plus } from "lucide-react";

export default function Stepper({ unit, value, onChange, min = 1, max = 20, step = 1 }) {
  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-2 w-full">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 text-white active:scale-95 active:bg-white/20 transition-all disabled:opacity-30 disabled:active:scale-100 shrink-0"
        aria-label={`Restar ${unit}`}
      >
        <Minus size={22} strokeWidth={2.5} />
      </button>
      
      <div className="flex flex-col items-center justify-center flex-1">
        <span className="text-2xl font-bold text-white tracking-tight leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-[10px] text-white/50 font-semibold uppercase tracking-[0.2em] mt-1.5">
            {unit}
          </span>
        )}
      </div>
      
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={value >= max}
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 text-white active:scale-95 active:bg-white/20 transition-all disabled:opacity-30 disabled:active:scale-100 shrink-0"
        aria-label={`Sumar ${unit}`}
      >
        <Plus size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
}