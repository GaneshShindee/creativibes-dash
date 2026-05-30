import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calendarItems } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/calendar")({
  head: () => ({ meta: [{ title: "Calendar — CreatorPulse" }] }),
  component: CalendarPage,
});

function CalendarPage() {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const grid = useMemo(() => buildMonthGrid(cursor), [cursor]);
  const monthLabel = cursor.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content calendar"
        description="Plan, schedule, and ship. AI suggests the best posting times automatically."
        actions={
          <>
            <Tabs defaultValue="month">
              <TabsList className="bg-card/50">
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button className="bg-[var(--gradient-primary)]"><Plus className="size-4" /> New post</Button>
          </>
        }
      />

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">{monthLabel}</div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}><ChevronLeft className="size-4" /></Button>
            <Button size="sm" variant="ghost" onClick={() => setCursor(new Date())}>Today</Button>
            <Button size="sm" variant="ghost" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}><ChevronRight className="size-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d} className="px-2 py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {grid.map((d, i) => {
            const iso = d.toISOString().slice(0, 10);
            const items = calendarItems.filter(c => c.date === iso);
            const inMonth = d.getMonth() === cursor.getMonth();
            const isToday = iso === new Date().toISOString().slice(0, 10);
            return (
              <div key={i} className={`min-h-[100px] rounded-lg p-2 border ${inMonth ? "border-border/60 bg-white/[0.02]" : "border-transparent opacity-40"} ${isToday ? "ring-1 ring-primary/60" : ""}`}>
                <div className="text-[11px] text-muted-foreground">{d.getDate()}</div>
                <div className="mt-1 space-y-1">
                  {items.map(it => (
                    <div key={it.id} className={`text-[11px] px-2 py-1 rounded truncate ${
                      it.status === "ready" ? "bg-primary/15 text-primary" :
                      it.status === "published" ? "bg-[var(--color-success)]/15 text-[var(--color-success)]" :
                      "bg-white/5 text-muted-foreground"
                    }`}>
                      {it.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="text-sm font-medium mb-3">Content pipeline</div>
        <div className="grid md:grid-cols-3 gap-4">
          {(["draft","ready","published"] as const).map(status => (
            <div key={status}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
                <span>{status}</span>
                <Badge className="bg-white/5 border-0 text-muted-foreground">{calendarItems.filter(c => c.status === status).length}</Badge>
              </div>
              <div className="space-y-2">
                {calendarItems.filter(c => c.status === status).map(c => (
                  <div key={c.id} className="px-3 py-2 rounded-lg bg-white/[0.03] border border-border/60 text-sm">
                    <div className="truncate">{c.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{c.platform} · {c.date}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function buildMonthGrid(cursor: Date) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const start = new Date(first);
  start.setDate(start.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}
