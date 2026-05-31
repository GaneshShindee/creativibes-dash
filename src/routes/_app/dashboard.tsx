import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, Users, TrendingUp, Activity, Sparkles, ArrowRight, PenLine, Calendar as CalendarIcon, Bell, Plus } from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { PageHeader } from "@/components/app/PageHeader";
import { StatCard } from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { growthSeries, platformShare, recommendations, calendarItems } from "@/lib/mock-data";
import { useLiveMetrics, useLiveTrends } from "@/lib/use-live-data";
import { DailyBriefing } from "@/components/app/DailyBriefing";
import { LiveActivityFeed } from "@/components/app/LiveActivityFeed";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CreatorPulse" }] }),
  component: Dashboard,
});

const tooltipStyle = {
  contentStyle: { background: "oklch(0.17 0.014 270)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: 12, fontSize: 12 },
  labelStyle: { color: "oklch(0.7 0.02 270)" },
};

function Dashboard() {
  const metrics = useLiveMetrics();
  const trends = useLiveTrends();
  const topTrends = trends.slice(0, 4);
  return (
    <div className="space-y-6">
      <PageHeader
        size="lg"
        title="Good morning, Aisha 👋"
        description="Here's what's happening in your niche today. 12 new viral opportunities."
        actions={
          <>
            <Button variant="secondary" className="bg-white/5"><Bell className="size-4" /> Notify me</Button>
            <Button className="bg-[var(--gradient-primary)]"><Plus className="size-4" /> Generate ideas</Button>
          </>
        }
      />

      <DailyBriefing />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Total views" value={`${(metrics.views / 1_000_000).toFixed(2)}M`} delta={12.8} icon={Eye} />
        <StatCard label="Followers" value={`${(metrics.followers / 1000).toFixed(1)}k`} delta={4.1} icon={Users} />
        <StatCard label="Engagement" value={metrics.engagement.toFixed(2)} suffix="%" delta={0.6} icon={Activity} />
        <StatCard label="Growth" value={`+${metrics.growth.toFixed(1)}`} suffix="%" delta={3.4} icon={TrendingUp} />
        <StatCard label="Trending score" value={metrics.trendingScore} delta={8} icon={Sparkles} />
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Growth chart */}
        <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium">Growth analytics</div>
              <div className="text-xs text-muted-foreground">Last 7 days</div>
            </div>
            <Badge className="bg-primary/15 text-primary border-0">+18% week-over-week</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthSeries}>
                <defs>
                  <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.17 275)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="oklch(0.62 0.17 275)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="e" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.22 295)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.65 0.22 295)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(0.7 0.02 270)" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke="oklch(0.7 0.02 270)" tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="views" stroke="oklch(0.62 0.17 275)" strokeWidth={2} fill="url(#v)" />
                <Area type="monotone" dataKey="followers" stroke="oklch(0.65 0.22 295)" strokeWidth={2} fill="url(#e)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform share */}
        <div className="col-span-12 lg:col-span-4 glass rounded-2xl p-5">
          <div className="text-sm font-medium">Platform mix</div>
          <div className="text-xs text-muted-foreground">Reach by platform</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={platformShare} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {platformShare.map((_, i) => (
                    <Cell key={i} fill={["oklch(0.62 0.17 275)","oklch(0.65 0.22 295)","oklch(0.72 0.18 200)","oklch(0.78 0.16 75)"][i]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11, color: "oklch(0.7 0.02 270)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's trends */}
        <div className="col-span-12 lg:col-span-7 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">Today's trends</div>
            <Link to="/trends" className="text-xs text-primary inline-flex items-center gap-1">View all <ArrowRight className="size-3" /></Link>
          </div>
          <div className="space-y-2">
            {topTrends.map(t => (
              <div key={t.id} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors">
                <div className="min-w-0">
                  <div className="text-sm truncate">{t.name}</div>
                  <div className="text-[11px] text-muted-foreground">{t.platform} · {t.niche}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-xs text-[var(--color-success)]">+{t.growth}%</div>
                  <ViralBar value={t.virality} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Viral opportunity */}
        <div className="col-span-12 lg:col-span-5 glass rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-[var(--gradient-primary)] opacity-20 blur-3xl" />
          <div className="text-sm font-medium">Viral opportunity score</div>
          <div className="text-xs text-muted-foreground">Based on your niche and audience</div>
          <div className="mt-6 flex items-center gap-5">
            <RadialScore value={92} />
            <div className="space-y-1.5 text-xs">
              <Row label="Trend match" value={94} />
              <Row label="Audience fit" value={88} />
              <Row label="Competition" value={36} invert />
              <Row label="Posting time" value={91} />
            </div>
          </div>
          <Button className="mt-5 w-full bg-[var(--gradient-primary)]">Generate today's content</Button>
        </div>

        {/* Recommendations */}
        <div className="col-span-12 lg:col-span-7 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">Content recommendations</div>
            <Link to="/recommendations" className="text-xs text-primary inline-flex items-center gap-1">More <ArrowRight className="size-3" /></Link>
          </div>
          <div className="space-y-2">
            {recommendations.slice(0, 3).map(r => (
              <div key={r.id} className="px-3 py-3 rounded-lg border border-border/60 bg-white/[0.02]">
                <div className="text-sm">{r.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.format} · "{r.hook}"</div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <Pill label="Match" value={r.trendMatch} />
                  <Pill label="Virality" value={r.virality} />
                  <Pill label="Fit" value={r.fit} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar + activity */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium">Upcoming posts</div>
              <Link to="/calendar" className="text-xs text-primary inline-flex items-center gap-1"><CalendarIcon className="size-3" /> Calendar</Link>
            </div>
            <div className="space-y-2">
              {calendarItems.filter(c => c.status !== "published").slice(0, 3).map(c => (
                <div key={c.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-border/60">
                  <div className="min-w-0">
                    <div className="text-sm truncate">{c.title}</div>
                    <div className="text-[11px] text-muted-foreground">{c.platform} · {c.date}</div>
                  </div>
                  <Badge variant="secondary" className={`text-[10px] ${c.status === "ready" ? "bg-primary/15 text-primary" : "bg-white/5 text-muted-foreground"}`}>
                    {c.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <LiveActivityFeed />
        </div>

        {/* Quick actions */}
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { to: "/script-generator", label: "Generate script", icon: PenLine },
            { to: "/trends", label: "Browse trends", icon: TrendingUp },
            { to: "/competitors", label: "Track competitor", icon: Users },
            { to: "/viral-score", label: "Score a post", icon: Sparkles },
          ].map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="glass rounded-xl p-4 hover:bg-white/[0.06] transition-colors flex items-center gap-3 group">
              <div className="size-9 rounded-lg bg-[var(--gradient-primary)] grid place-items-center">
                <Icon className="size-4 text-white" />
              </div>
              <div className="text-sm">{label}</div>
              <ArrowRight className="ml-auto size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViralBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full bg-[var(--gradient-primary)]" style={{ width: `${value}%` }} />
      </div>
      <div className="text-xs text-muted-foreground w-7 text-right">{value}</div>
    </div>
  );
}
function Row({ label, value, invert }: { label: string; value: number; invert?: boolean }) {
  const good = invert ? value < 50 : value >= 70;
  return (
    <div className="flex items-center gap-2 min-w-[180px]">
      <div className="text-muted-foreground w-24">{label}</div>
      <div className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full ${good ? "bg-[var(--gradient-primary)]" : "bg-[var(--color-warning)]"}`} style={{ width: `${value}%` }} />
      </div>
      <div className="w-6 text-right">{value}</div>
    </div>
  );
}
function Pill({ label, value }: { label: string; value: number }) {
  return <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-border/60 text-muted-foreground">{label} <span className="text-foreground">{value}</span></span>;
}
function RadialScore({ value }: { value: number }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative size-28 shrink-0">
      <svg className="size-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} stroke="oklch(1 0 0 / 8%)" strokeWidth="8" fill="none" />
        <circle cx="50" cy="50" r={r} stroke="url(#g1)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.62 0.17 275)" />
            <stop offset="1" stopColor="oklch(0.65 0.22 295)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-[10px] text-muted-foreground">/ 100</div>
        </div>
      </div>
    </div>
  );
}
