import { createFileRoute } from "@tanstack/react-router";
import {
  Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { PageHeader } from "@/components/app/PageHeader";
import { StatCard } from "@/components/app/StatCard";
import { Activity, Eye, TrendingUp, Users } from "lucide-react";
import { growthSeries } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — CreatorPulse" }] }),
  component: Analytics,
});

const bestTimes = [
  { time: "6AM", v: 28 }, { time: "9AM", v: 42 }, { time: "12PM", v: 56 },
  { time: "3PM", v: 48 }, { time: "6PM", v: 78 }, { time: "9PM", v: 92 }, { time: "12AM", v: 36 },
];

const audience = [
  { group: "18-24", v: 22 }, { group: "25-34", v: 41 }, { group: "35-44", v: 24 }, { group: "45-54", v: 9 }, { group: "55+", v: 4 },
];

const tip = { contentStyle: { background: "oklch(0.17 0.014 270)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: 12, fontSize: 12 } };

function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Deep insights across growth, engagement, audience, and posting performance." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Growth rate" value="12.8%" delta={3.4} icon={TrendingUp} />
        <StatCard label="Engagement" value="7.4%" delta={0.6} icon={Activity} />
        <StatCard label="Reach" value="2.41M" delta={18.2} icon={Eye} />
        <StatCard label="New followers" value="6,212" delta={4.1} icon={Users} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <div className="text-sm font-medium">Performance trend</div>
          <div className="text-xs text-muted-foreground mb-3">Views & engagement, last 7 days</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthSeries}>
                <defs>
                  <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.17 275)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.62 0.17 275)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(0.7 0.02 270)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.02 270)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip {...tip} />
                <Area type="monotone" dataKey="views" stroke="oklch(0.62 0.17 275)" strokeWidth={2} fill="url(#ag1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="text-sm font-medium">Best posting times</div>
          <div className="text-xs text-muted-foreground mb-3">Your audience's peak hours</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bestTimes}>
                <CartesianGrid stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="time" stroke="oklch(0.7 0.02 270)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.7 0.02 270)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip {...tip} />
                <Bar dataKey="v" radius={[6,6,0,0]} fill="oklch(0.65 0.22 295)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="text-sm font-medium">Audience age</div>
          <div className="text-xs text-muted-foreground mb-3">Distribution across age groups</div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={audience} layout="vertical">
                <CartesianGrid stroke="oklch(1 0 0 / 5%)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="group" type="category" stroke="oklch(0.7 0.02 270)" fontSize={11} tickLine={false} axisLine={false} width={60} />
                <Tooltip {...tip} />
                <Bar dataKey="v" radius={[0,6,6,0]} fill="oklch(0.62 0.17 275)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="text-sm font-medium mb-3">Top performing content</div>
          <ul className="space-y-2.5 text-sm">
            {[
              { t: "AI tools roundup — Reel", v: "412k views" },
              { t: "Founder GRWM short", v: "284k views" },
              { t: "Notion workflow long-form", v: "182k views" },
              { t: "POV: shipping day", v: "121k views" },
            ].map(it => (
              <li key={it.t} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-border/60">
                <span className="truncate">{it.t}</span>
                <span className="text-xs text-muted-foreground">{it.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
