import { useState } from "react";
import { Sparkles, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestions = [
  "What should I post tomorrow?",
  "Show viral trends in my niche.",
  "Give me 10 reel ideas.",
];

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
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text:
            "Based on your niche (Tech + Productivity), here are 3 ideas: \n1) 'AI tools you didn't know' — 92% virality\n2) 'Silent vlog: shipping day' — 88% match\n3) 'Founder GRWM' — 86% fit. Want me to draft scripts?",
        },
      ]);
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
