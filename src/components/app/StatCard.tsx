import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  suffix,
}: {
  label: string;
  value: string | number;
  delta?: number;
  icon: LucideIcon;
  suffix?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 size-24 rounded-full bg-[var(--gradient-primary)] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{label}</div>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </div>
      {delta !== undefined && (
        <div className={`mt-2 inline-flex items-center gap-1 text-xs ${positive ? "text-[var(--color-success)]" : "text-destructive"}`}>
          {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
          {Math.abs(delta)}% vs last week
        </div>
      )}
    </div>
  );
}
