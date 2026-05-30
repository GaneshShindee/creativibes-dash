import { createFileRoute } from "@tanstack/react-router";
import { Plus, ExternalLink } from "lucide-react";
import {
  LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { competitors, competitorSeries } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/competitors")({
  head: () => ({ meta: [{ title: "Competitors — CreatorPulse" }] }),
  component: Competitors,
});

function Competitors() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Competitor analysis"
        description="Track creators in your niche. Surface their winning content and the gaps you can own."
      />

      <div className="glass rounded-2xl p-3 flex flex-col md:flex-row gap-2">
        <Input placeholder="@handle on Instagram, YouTube, or TikTok" className="bg-card/50" />
        <Button className="bg-[var(--gradient-primary)]"><Plus className="size-4" /> Track</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium">You vs. industry average</div>
              <div className="text-xs text-muted-foreground">Engagement rate, last 6 weeks</div>
            </div>
            <Badge className="bg-[var(--color-success)]/15 text-[var(--color-success)] border-0">+23% vs. avg</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={competitorSeries}>
                <CartesianGrid stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="week" stroke="oklch(0.7 0.02 270)" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis stroke="oklch(0.7 0.02 270)" tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.17 0.014 270)", border: "1px solid oklch(1 0 0 / 8%)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="you" stroke="oklch(0.62 0.17 275)" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="them" stroke="oklch(0.7 0.02 270)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="text-sm font-medium mb-3">Content gaps</div>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Audio trends — 0 posts", boost: "+38% est. reach" },
              { label: "Long-form tutorials", boost: "+22% retention" },
              { label: "Carousel posts", boost: "+19% saves" },
              { label: "Behind-the-scenes", boost: "+15% comments" },
            ].map(g => (
              <li key={g.label} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-border/60">
                <span>{g.label}</span>
                <span className="text-xs text-primary">{g.boost}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-white/[0.02]">
            <tr>
              <th className="text-left px-5 py-3">Creator</th>
              <th className="text-left px-5 py-3">Platform</th>
              <th className="text-right px-5 py-3">Followers</th>
              <th className="text-right px-5 py-3">Avg views</th>
              <th className="text-right px-5 py-3">Engagement</th>
              <th className="text-right px-5 py-3">Posts/wk</th>
              <th className="text-right px-5 py-3">Fit</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {competitors.map(c => (
              <tr key={c.handle} className="border-t border-border/60 hover:bg-white/[0.03]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-[var(--gradient-primary)]" />
                    <div className="font-medium">{c.handle}</div>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{c.platform}</td>
                <td className="px-5 py-3 text-right">{(c.followers/1000).toFixed(0)}k</td>
                <td className="px-5 py-3 text-right">{(c.avgViews/1000).toFixed(0)}k</td>
                <td className="px-5 py-3 text-right">{c.engagement}%</td>
                <td className="px-5 py-3 text-right">{c.postsPerWeek}</td>
                <td className="px-5 py-3 text-right"><Badge className="bg-primary/15 text-primary border-0">{c.fit}</Badge></td>
                <td className="px-5 py-3 text-right"><Button size="sm" variant="ghost"><ExternalLink className="size-3.5" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
