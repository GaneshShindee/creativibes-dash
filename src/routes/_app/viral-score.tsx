import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis,
} from "recharts";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_app/viral-score")({
  head: () => ({ meta: [{ title: "Viral Score — CreatorPulse" }] }),
  component: ViralScore,
});

function ViralScore() {
  const [scored, setScored] = useState(false);
  const data = [
    { k: "Hook quality", v: 88 },
    { k: "Retention", v: 76 },
    { k: "Trend relevance", v: 92 },
    { k: "Engagement", v: 81 },
    { k: "Originality", v: 73 },
    { k: "Posting time", v: 86 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Viral score engine"
        description="Predict how your content will perform — before you post."
      />

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5 space-y-3">
          <Label className="text-xs">Title</Label>
          <Input placeholder="5 AI tools that will save you 10 hours this week" className="bg-card/50" />
          <Label className="text-xs">Content topic</Label>
          <Input placeholder="AI tools, productivity, founders" className="bg-card/50" />
          <Label className="text-xs">Script</Label>
          <Textarea rows={6} placeholder="Hook in first 3 seconds, then…" className="bg-card/50" />
          <Label className="text-xs">Caption</Label>
          <Textarea rows={3} placeholder="Your caption + hashtags…" className="bg-card/50" />
          <Button onClick={() => setScored(true)} className="w-full bg-[var(--gradient-primary)]">
            <Sparkles className="size-4" /> Score this post
          </Button>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="text-sm font-medium">Predicted performance</div>
          <div className="text-xs text-muted-foreground">Based on 1.2M analyzed posts</div>

          {scored ? (
            <>
              <div className="mt-4 flex items-center gap-6">
                <BigScore value={84} />
                <div className="space-y-2 text-sm">
                  <Suggestion label="Hook" tone="warning">Tighten to under 8 words — current opening is 14.</Suggestion>
                  <Suggestion label="Trend" tone="success">Strong match with 'AI tools' surge (+168% this week).</Suggestion>
                  <Suggestion label="Length" tone="info">45s reels in your niche outperform 60s by 22%.</Suggestion>
                </div>
              </div>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data} outerRadius={110}>
                    <PolarGrid stroke="oklch(1 0 0 / 8%)" />
                    <PolarAngleAxis dataKey="k" tick={{ fill: "oklch(0.7 0.02 270)", fontSize: 11 }} />
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    <Radar dataKey="v" stroke="oklch(0.62 0.17 275)" fill="oklch(0.62 0.17 275)" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="mt-10 h-72 flex flex-col items-center justify-center text-center text-muted-foreground">
              <Sparkles className="size-8 mb-3 text-primary" />
              <div className="text-sm">Enter your post details, then run the score engine.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BigScore({ value }: { value: number }) {
  return (
    <div className="relative size-36 shrink-0">
      <svg className="size-36 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" stroke="oklch(1 0 0 / 8%)" strokeWidth="8" fill="none" />
        <circle cx="50" cy="50" r="42" stroke="url(#vg)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * (1 - value / 100)} />
        <defs>
          <linearGradient id="vg" x1="0" x2="1">
            <stop offset="0" stopColor="oklch(0.62 0.17 275)" />
            <stop offset="1" stopColor="oklch(0.65 0.22 295)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-4xl font-semibold tracking-tight">{value}</div>
          <div className="text-[10px] uppercase text-muted-foreground tracking-widest">virality</div>
        </div>
      </div>
    </div>
  );
}
function Suggestion({ label, tone, children }: { label: string; tone: "success" | "warning" | "info"; children: React.ReactNode }) {
  const color = tone === "success" ? "text-[var(--color-success)]" : tone === "warning" ? "text-[var(--color-warning)]" : "text-primary";
  return (
    <div className="flex gap-2">
      <span className={`text-xs uppercase tracking-wider ${color} w-16 shrink-0`}>{label}</span>
      <span className="text-xs text-muted-foreground">{children}</span>
    </div>
  );
}
