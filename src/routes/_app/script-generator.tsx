import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Copy, Download } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_app/script-generator")({
  head: () => ({ meta: [{ title: "Script generator — CreatorPulse" }] }),
  component: ScriptGen,
});

const SAMPLE = {
  title: "5 AI tools that will save you 10 hours this week",
  hook: "If you're still doing this manually in 2026… stop.",
  script: `[0-3s] Cut to laptop: "Watching me waste 10 hours/week on this 👇"
[3-8s] B-roll of typing fast.
[8-20s] Tool 1 — Pulse AI: shows trending content surfacing in real time.
[20-32s] Tool 2 — Linear for shipping content sprints.
[32-44s] Tool 3 — Descript for editing reels in minutes.
[44-55s] Tool 4 — Notion + AI for ideation.
[55-60s] CTA: "Save this. Follow for the next 5."`,
  caption: "I tested 50+ AI tools last month. These 5 actually saved time. Save & share with a creator friend 🚀",
  cta: "Follow @creatorpulse for daily growth tactics.",
  hashtags: "#aitools #creatoreconomy #contentcreator #productivity #buildinpublic",
  thumbnail: "I CUT 10 HOURS / WEEK",
};

function ScriptGen() {
  const [generated, setGenerated] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="AI script generator" description="From idea to ready-to-shoot script in 30 seconds." />

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 glass rounded-2xl p-5 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Format</Label>
            <Select defaultValue="reel">
              <SelectTrigger className="bg-card/50"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Reel","Short","YouTube long-form","Carousel","Post"].map(o => <SelectItem key={o} value={o.toLowerCase()}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Topic / idea</Label>
            <Input defaultValue="AI tools that save creators time" className="bg-card/50" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Tone</Label>
            <Select defaultValue="confident">
              <SelectTrigger className="bg-card/50"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Confident","Witty","Educational","Inspirational","Casual"].map(o => <SelectItem key={o} value={o.toLowerCase()}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Length</Label>
            <Select defaultValue="45">
              <SelectTrigger className="bg-card/50"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[15,30,45,60,90].map(o => <SelectItem key={o} value={String(o)}>{o}s</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setGenerated(true)} className="w-full bg-[var(--gradient-primary)]">
            <Sparkles className="size-4" /> Generate script
          </Button>
        </div>

        <div className="lg:col-span-3 glass rounded-2xl p-5 space-y-4">
          {!generated ? (
            <div className="h-[420px] flex flex-col items-center justify-center text-center text-muted-foreground">
              <Sparkles className="size-8 mb-3 text-primary" />
              <div className="text-sm">Your script will appear here in seconds.</div>
            </div>
          ) : (
            <>
              <Section label="Title">{SAMPLE.title}</Section>
              <Section label="Hook" mono>{SAMPLE.hook}</Section>
              <Section label="Script" mono>{SAMPLE.script}</Section>
              <Section label="Caption">{SAMPLE.caption}</Section>
              <Section label="CTA">{SAMPLE.cta}</Section>
              <Section label="Hashtags">{SAMPLE.hashtags}</Section>
              <Section label="Thumbnail text">{SAMPLE.thumbnail}</Section>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" className="bg-[var(--gradient-primary)]"><Copy className="size-4" /> Copy all</Button>
                <Button size="sm" variant="secondary" className="bg-white/5"><Download className="size-4" /> Export</Button>
                <Button size="sm" variant="ghost">Add to calendar</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ label, children, mono }: { label: string; children: React.ReactNode; mono?: boolean }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">{label}</div>
      <div className={`text-sm rounded-lg bg-white/[0.03] border border-border/60 p-3 whitespace-pre-line ${mono ? "font-mono text-xs leading-relaxed" : ""}`}>
        {children}
      </div>
    </div>
  );
}
