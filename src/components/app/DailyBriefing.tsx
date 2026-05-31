import { Flame, TrendingUp, Sparkles, Music2, Hash, Clock, Brain, RefreshCw } from "lucide-react";
import { useDailyBriefing, useNowTick, relativeTime } from "@/lib/use-live-data";

export function DailyBriefing() {
  useNowTick(1000);
  const b = useDailyBriefing();

  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute -right-20 -top-20 size-60 rounded-full bg-[var(--gradient-primary)] opacity-15 blur-3xl" />
      <div className="flex items-start justify-between gap-4 mb-4 relative">
        <div>
          <div className="flex items-center gap-2 text-xs text-primary">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            LIVE · Daily Creator Briefing
          </div>
          <div className="text-base font-medium mt-1">What's happening in your niche right now</div>
        </div>
        <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 shrink-0">
          <RefreshCw className="size-3" />
          Updated {relativeTime(b.generatedAt)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <BriefCard icon={Flame} title="Trending topics" tint="text-orange-400">
          {b.trendingTopics.slice(0, 4).map((t) => (
            <Line key={t.name} left={t.name} right={`+${t.growth}%`} sub={t.platform} good />
          ))}
        </BriefCard>

        <BriefCard icon={TrendingUp} title="Rising trends" tint="text-primary">
          {b.risingTrends.map((t) => (
            <Line key={t.name} left={t.name} right={`${t.momentum}`} sub="momentum" good />
          ))}
          <div className="text-[10px] text-muted-foreground pt-1">Scanned 1,284 signals</div>
        </BriefCard>

        <BriefCard icon={Sparkles} title="Viral opportunities" tint="text-violet-400">
          {b.viralOpportunities.map((o) => (
            <Line key={o.title} left={o.title} right={`${o.score}/100`} good />
          ))}
        </BriefCard>

        <BriefCard icon={Music2} title="Trending audio" tint="text-pink-400">
          {b.trendingAudio.map((a) => (
            <Line key={a.name} left={a.name} right={`${(a.uses / 1000).toFixed(0)}k`} sub="uses" />
          ))}
        </BriefCard>

        <BriefCard icon={Hash} title="Trending hashtags" tint="text-cyan-400">
          {b.trendingHashtags.map((h) => (
            <Line key={h.tag} left={h.tag} right={h.volume} sub="posts" />
          ))}
        </BriefCard>

        <BriefCard icon={Clock} title="Best posting times" tint="text-amber-400">
          {b.bestTimes.map((t) => (
            <Line key={t.platform} left={t.platform} right={t.time} />
          ))}
          <div className="text-[10px] text-muted-foreground pt-1">Based on your audience</div>
        </BriefCard>

        <BriefCard icon={Brain} title="AI recommendations" tint="text-emerald-400" className="md:col-span-2">
          {b.aiPicks.map((p) => (
            <div key={p.title} className="text-xs">
              <div className="text-foreground">{p.title}</div>
              <div className="text-[10px] text-muted-foreground">{p.reason}</div>
            </div>
          ))}
        </BriefCard>
      </div>
    </div>
  );
}

function BriefCard({
  icon: Icon, title, tint, children, className = "",
}: {
  icon: typeof Flame; title: string; tint: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border/60 bg-white/[0.02] p-3.5 space-y-2 ${className}`}>
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
        <Icon className={`size-3.5 ${tint}`} />
        {title}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Line({ left, right, sub, good }: { left: string; right: string; sub?: string; good?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <div className="min-w-0 truncate">
        <span className="text-foreground">{left}</span>
        {sub && <span className="text-[10px] text-muted-foreground ml-1.5">· {sub}</span>}
      </div>
      <div className={`shrink-0 tabular-nums ${good ? "text-[var(--color-success)]" : "text-muted-foreground"}`}>{right}</div>
    </div>
  );
}
