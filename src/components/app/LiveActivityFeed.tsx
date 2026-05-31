import { useLiveActivity, useNowTick, relativeTime } from "@/lib/use-live-data";

export function LiveActivityFeed() {
  useNowTick(1000);
  const events = useLiveActivity();
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">Live activity</div>
        <div className="flex items-center gap-1.5 text-[10px] text-primary">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          STREAMING
        </div>
      </div>
      <ul className="space-y-2.5">
        {events.map((e) => (
          <li
            key={e.id}
            className="text-xs text-muted-foreground flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-500"
          >
            <span className="text-sm leading-none mt-0.5">{e.icon}</span>
            <span className="flex-1 text-foreground/90">{e.text}</span>
            <span className="text-[10px] tabular-nums shrink-0">{relativeTime(e.ts)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
