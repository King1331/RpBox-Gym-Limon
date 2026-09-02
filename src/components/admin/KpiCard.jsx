import { Users, Wallet, Clock, UserPlus, UserMinus, TrendingUp, Dumbbell } from "lucide-react";

const iconMap = {
  users: Users,
  wallet: Wallet,
  clock: Clock,
  "user-plus": UserPlus,
  "user-minus": UserMinus,
  "trending-up": TrendingUp,
  dumbbell: Dumbbell,
};

const toneText = { lime: "text-lime", flame: "text-flame", neutral: "text-white/60" };

export default function KpiCard({ label, value, icon, tone = "neutral", mono = false }) {
  const Icon = iconMap[icon] || Users;
  return (
    <div className="glass-card p-4 animate-fade-slide">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-widest text-white/40 truncate">{label}</span>
        <Icon size={18} className={`${toneText[tone]} shrink-0`} strokeWidth={2} />
      </div>
      <div className={`mt-3 text-xl sm:text-2xl font-extrabold tracking-tight whitespace-nowrap ${mono ? "font-mono" : ""}`}>
        {value}
      </div>
    </div>
  );
}