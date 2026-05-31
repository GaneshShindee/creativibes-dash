import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bookmark, TrendingUp, Filter } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useLiveTrends, useNowTick, relativeTime } from "@/lib/use-live-data";
import { useState as useReactState } from "react";

export const Route = createFileRoute("/_app/trends")({
  head: () => ({ meta: [{ title: "Trends — CreatorPulse" }] }),
  component: Trends,
});

function Trends() {
  useNowTick(1000);
  const trends = useLiveTrends(3500);
  const [lastScan] = useReactState(() => Date.now());
  const [platform, setPlatform] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() =>
    trends.filter(t =>
      (platform === "all" || t.platform === platform) &&
      (region === "all" || t.region === region) &&
      (q === "" || t.name.toLowerCase().includes(q.toLowerCase()))
    )
  , [trends, platform, region, q]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trend discovery"
        description="Cross-platform trend signals, scored against your niche in real time."
        actions={
          <>
            <div className="text-[11px] text-muted-foreground hidden sm:flex items-center gap-1.5 mr-2">
              <span className="relative flex size-1.5"><span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-primary" /></span>
              Live · scanned {relativeTime(lastScan)}
            </div>
            <Button className="bg-[var(--gradient-primary)]"><TrendingUp className="size-4" /> Refresh</Button>
          </>
        }
      />

      <div className="glass rounded-2xl p-3 flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground"><Filter className="size-3.5" /> Filters</div>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search trends" className="md:w-64 bg-card/50" />
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="md:w-40 bg-card/50"><SelectValue placeholder="Platform" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All platforms</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="YouTube">YouTube</SelectItem>
            <SelectItem value="TikTok">TikTok</SelectItem>
            <SelectItem value="Facebook">Facebook</SelectItem>
          </SelectContent>
        </Select>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="md:w-40 bg-card/50"><SelectValue placeholder="Region" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All regions</SelectItem>
            <SelectItem value="Global">Global</SelectItem>
            <SelectItem value="US">United States</SelectItem>
            <SelectItem value="EU">Europe</SelectItem>
            <SelectItem value="IN">India</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="md:w-40 bg-card/50"><SelectValue placeholder="Niche" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All niches</SelectItem>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="wellness">Wellness</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="7d">
          <SelectTrigger className="md:w-32 bg-card/50"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map(t => (
          <div key={t.id} className="glass rounded-2xl p-5 group hover:bg-white/[0.06] transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">{t.platform} · {t.niche} · {t.region}</div>
                <div className="mt-1 text-base font-medium leading-snug">{t.name}</div>
              </div>
              <button className="text-muted-foreground hover:text-primary"><Bookmark className="size-4" /></button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Metric label="Growth" value={`+${t.growth}%`} color="text-[var(--color-success)]" />
              <Metric label="Engagement" value={t.engagement.toFixed(1)} />
              <Metric label="Difficulty" value={t.difficulty} />
              <Metric label="Virality" value={t.virality} highlight />
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-[var(--gradient-primary)]" style={{ width: `${t.virality}%` }} />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge className="bg-white/5 border-border/60 text-muted-foreground">#{t.tag}</Badge>
              <Button size="sm" variant="secondary" className="bg-white/5 hover:bg-white/10">Save trend</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value, color, highlight }: { label: string; value: string | number; color?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg px-3 py-2 ${highlight ? "bg-primary/10 border border-primary/20" : "bg-white/[0.03] border border-border/60"}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-sm font-medium ${color ?? ""}`}>{value}</div>
    </div>
  );
}
