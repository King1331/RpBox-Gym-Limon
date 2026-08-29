import { Minus, Plus } from "lucide-react";

function Stepper({ label, value, onChange, step = 1, suffix, min = 0 }) {
  const clamp = (v) => Math.max(min, v);
  return (
    <div className="flex-1 min-w-0">
      <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40 mb-1.5 sm:mb-2 text-center truncate">{label}</div>
      <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-ink-soft border border-ink-line rounded-xl sm:rounded-2xl p-1 sm:p-1.5 w-full">
        <button
          type="button"
          onClick={() => onChange(clamp(Number(value) - step))}
          className="touch-press w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-white/5 border border-ink-line flex items-center justify-center text-white/70 shrink-0"
          aria-label={`Restar ${label}`}
        >
          <Minus size={12} strokeWidth={2.5} />
        </button>
        <div className="flex-1 min-w-0 text-center px-0.5 sm:px-1">
          <div className="text-base sm:text-lg font-extrabold tracking-tight truncate">{value}</div>
          {suffix && <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 truncate">{suffix}</div>}
        </div>
        <button
          type="button"
          onClick={() => onChange(clamp(Number(value) + step))}
          className="touch-press w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-lime text-ink flex items-center justify-center shrink-0"
          aria-label={`Sumar ${label}`}
        >
          <Plus size={12} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

// Inputs para peso y reps de la serie actual.
export default function SetInputRow({ peso, reps, onChangePeso, onChangeReps }) {
  return (
    <div className="flex gap-1.5 sm:gap-2 w-full max-w-full overflow-hidden">
      <Stepper label="Peso" value={peso} onChange={onChangePeso} step={2.5} suffix="kg" />
      <Stepper label="Reps" value={reps} onChange={onChangeReps} step={1} suffix="reps" />
    </div>
  );
}