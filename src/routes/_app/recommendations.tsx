import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Copy, Bookmark } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { recommendations } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/recommendations")({
  head: () => ({ meta: [{ title: "Recommendations — CreatorPulse" }] }),
  component: Recos,
});

function Recos() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI recommendations"
        description="Personalized content ideas, scored by trend match, competition, and creator fit."
        actions={<Button className="bg-[var(--gradient-primary)]"><Sparkles className="size-4" /> Regenerate</Button>}
      />

      <div className="grid lg:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-5 space-y-3 lg:sticky lg:top-20 self-start">
          <div className="text-sm font-medium">Personalize</div>
          {[
            { label: "Region", opts: ["Global", "US", "EU", "India"] },
            { label: "Language", opts: ["English", "Spanish", "Hindi", "French"] },
            { label: "Audience", opts: ["Founders", "Students", "Creators", "Marketers"] },
            { label: "Content type", opts: ["Reels", "Shorts", "Long-form", "Carousels"] },
            { label: "Niche", opts: ["Tech", "Lifestyle", "Business", "Wellness"] },
          ].map(f => (
            <div key={f.label} className="space-y-1.5">
              <Label className="text-xs">{f.label}</Label>
              <Select defaultValue={f.opts[0]}>
                <SelectTrigger className="bg-card/50 h-9"><SelectValue /></SelectTrigger>
                <SelectContent>{f.opts.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          ))}
          <Button className="w-full bg-[var(--gradient-primary)] mt-2">Apply</Button>
        </div>

        <div className="lg:col-span-3 grid gap-4">
          {recommendations.map(r => (
            <div key={r.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{r.format}</div>
                  <div className="text-lg font-medium leading-snug mt-1">{r.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">Hook: "{r.hook}"</p>
                </div>
                <div className="shrink-0 flex items-center gap-1">
                  <Button size="sm" variant="ghost"><Bookmark className="size-4" /></Button>
                  <Button size="sm" variant="ghost"><Copy className="size-4" /></Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                <Score label="Trend match" v={r.trendMatch} />
                <Score label="Competition" v={r.competition} invert />
                <Score label="Virality" v={r.virality} />
                <Score label="Creator fit" v={r.fit} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" className="bg-[var(--gradient-primary)]">Generate script</Button>
                <Button size="sm" variant="secondary" className="bg-white/5">Caption + hashtags</Button>
                <Button size="sm" variant="ghost">Add to calendar</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Score({ label, v, invert }: { label: string; v: number; invert?: boolean }) {
  const good = invert ? v < 50 : v >= 70;
  return (
    <div className="rounded-lg px-3 py-2 bg-white/[0.03] border border-border/60">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <div className="text-sm font-medium">{v}</div>
        <div className="h-1 flex-1 rounded-full bg-white/5 overflow-hidden">
          <div className={`h-full ${good ? "bg-[var(--gradient-primary)]" : "bg-[var(--color-warning)]"}`} style={{ width: `${v}%` }} />
        </div>
      </div>
    </div>
  );
}
