import { useState } from "react";
import { Sparkles, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestions = [
  "What should I post tomorrow?",
  "Show viral trends in Maharashtra.",
  "Give me 10 reel ideas for fitness creators.",
  "Find content gaps in my niche.",
];

function generateReply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("tomorrow") || s.includes("post")) {
    return "Top 3 picks for tomorrow (7:42 PM IST window):\n1) 'AI tools you didn't know' Reel — 94% virality, low competition\n2) 'Founder GRWM' Short — 91% fit, rising momentum\n3) 'Notion + Linear workflow' Carousel — 87% fit\n\nWant me to draft scripts for any of these?";
  }
  if (s.includes("maharashtra") || s.includes("india")) {
    return "Viral trends in Maharashtra right now:\n• #MorningRoutine2026 — +186% this week\n• 'Mumbai cafe walkthrough' Reels — 92/100\n• 'Marathi founder GRWM' — emerging, 78/100\n• 'Local food in 60s' — +142% engagement\n\nPosting window: 7–9 PM IST.";
  }
  if (s.includes("fitness") || s.includes("reel ideas") || s.includes("10")) {
    return "10 reel ideas for fitness creators:\n1) 5-minute morning mobility (POV)\n2) 'What I eat in a day' — minimalist cut\n3) Beginner vs Pro form comparison\n4) Silent gym session w/ text overlays\n5) 30-day challenge weekly update\n6) Common form mistakes — fix in 60s\n7) Pre-workout meal in 30s\n8) Rest day routine that actually helps\n9) Cardio vs lifting — what changed for me\n10) Train with me — full week recap\n\nWant scripts for the top 3?";
  }
  if (s.includes("gap") || s.includes("competitor")) {
    return "Content gaps I found in your niche:\n• Long-form 'build in public' (only 2 competitors covering it)\n• Indian founder GRWM (almost no creators in your niche)\n• Tool comparison carousels — under-saturated, high search demand\n• Audio-first short-form (your competitors ignore this)\n\nEstimated opportunity score: 87/100.";
  }
  return "Based on your niche (Tech + Productivity), here are 3 ideas:\n1) 'AI tools you didn't know' — 92% virality\n2) 'Silent vlog: shipping day' — 88% match\n3) 'Founder GRWM' — 86% fit\n\nWant me to draft scripts?";
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi Aisha — I scanned 1,284 trends overnight. Want today's top 5 for your niche?" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: generateReply(text) }]);
    }, 700);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 size-12 rounded-full bg-[var(--gradient-primary)] grid place-items-center ring-glow hover:scale-105 transition-transform"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="size-5 text-white" />
      </button>
      {open && (
        <div className="fixed bottom-20 right-5 z-40 w-[min(380px,calc(100vw-2rem))] rounded-2xl glass-strong overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-[var(--gradient-primary)] grid place-items-center">
                <Sparkles className="size-3.5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium">Pulse AI</div>
                <div className="text-[10px] text-muted-foreground">Your growth copilot</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>
          <div className="p-3 space-y-2 max-h-[360px] overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`whitespace-pre-line text-sm rounded-xl px-3 py-2 max-w-[85%] ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card/80 text-foreground border border-border/60"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-[11px] px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground border border-border/60">
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="p-3 border-t border-border/60 flex gap-2"
          >
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Pulse anything…" className="h-9 bg-card/50" />
            <Button size="sm" type="submit" className="bg-[var(--gradient-primary)]">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
