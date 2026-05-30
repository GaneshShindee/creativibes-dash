import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Folder, Search } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { savedItems } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/library")({
  head: () => ({ meta: [{ title: "Library — CreatorPulse" }] }),
  component: Library,
});

function Library() {
  const [q, setQ] = useState("");
  const filtered = savedItems.filter(s => s.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Content library" description="Saved ideas, trends, scripts, and competitors — all in one place." />

      <div className="grid lg:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-4 space-y-1 self-start">
          <div className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-1">Folders</div>
          {["All", "Scripts", "Reels", "Audio", "Series", "Watchlist"].map((f, i) => (
            <button key={f} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${i === 0 ? "bg-white/10" : "hover:bg-white/5 text-muted-foreground"}`}>
              <Folder className="size-3.5" /> {f}
            </button>
          ))}
        </div>
        <div className="lg:col-span-3 space-y-3">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search library" className="pl-9 bg-card/50" />
            </div>
            <Tabs defaultValue="all">
              <TabsList className="bg-card/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="scripts">Scripts</TabsTrigger>
                <TabsTrigger value="ideas">Ideas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {filtered.map(s => (
              <div key={s.id} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary/15 text-primary border-0">{s.type}</Badge>
                  <span className="text-[11px] text-muted-foreground">{s.folder}</span>
                </div>
                <div className="mt-3 text-sm font-medium">{s.title}</div>
                <div className="mt-3 text-[11px] text-muted-foreground">Saved 2 days ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
