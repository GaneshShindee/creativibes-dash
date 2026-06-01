import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, Zap, ShieldCheck, Star, Check, Activity, Eye, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingPlans, testimonials, faqs } from "@/lib/mock-data";
import { Reveal, CountUp, AmbientBackdrop, useTick } from "@/components/landing/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CreatorPulse AI — Never run out of viral content ideas" },
      { name: "description", content: "AI growth copilot for creators. Discover trends, analyze competitors, predict virality, and generate ready-to-post scripts every morning." },
      { property: "og:title", content: "CreatorPulse AI — AI Growth Copilot for Creators" },
      { property: "og:description", content: "Discover trends, predict virality, and generate ready-to-post scripts every morning." },
    ],
  }),
  component: Landing,
});

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border/60"
          : "backdrop-blur-md bg-background/30 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-14 px-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-7 rounded-md bg-[var(--gradient-primary)] grid place-items-center transition-transform duration-500 group-hover:rotate-3">
            <Zap className="size-4 text-white" />
          </div>
          <span className="text-sm font-semibold">CreatorPulse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#showcase" className="hover:text-foreground transition-colors">Product</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login"><Button variant="ghost" size="sm" className="btn-lift">Sign in</Button></Link>
          <Link to="/signup"><Button size="sm" className="bg-[var(--gradient-primary)] hover:opacity-90 btn-lift">Get started</Button></Link>
        </div>
      </div>
    </header>
  );
}

function Landing() {
  return (
    <div className="min-h-screen aurora-bg text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <AmbientBackdrop />
        <div className="absolute inset-0 grid-bg pointer-events-none" />

        {/* Floating UI cards — hidden on small screens to preserve layout */}
        <FloatingHeroCards />

        <div className="max-w-5xl mx-auto px-5 text-center relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              New · Pulse AI 2.0 — now with audio trend detection
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05]">
              Never run out of <span className="gradient-text">viral content</span> ideas again.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              CreatorPulse is the AI growth copilot for creators. Discover trends, analyze competitors,
              predict virality, and ship ready-to-post scripts — every morning.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link to="/signup"><Button size="lg" className="bg-[var(--gradient-primary)] hover:opacity-90 ring-glow btn-lift">
                Start free <ArrowRight className="size-4" />
              </Button></Link>
              <Link to="/dashboard"><Button size="lg" variant="ghost" className="border border-border/60 btn-lift">
                See live dashboard
              </Button></Link>
            </div>
            <div className="mt-6 text-xs text-muted-foreground">No credit card · 14-day Pro trial</div>
          </Reveal>
        </div>

        {/* Dashboard preview */}
        <Reveal delay={340}>
          <div className="mt-16 max-w-6xl mx-auto px-5 relative">
            <div className="rounded-2xl glass-strong p-2 ring-glow sheen">
              <div className="rounded-xl overflow-hidden bg-background/80 border border-border/60">
                <DashboardPreview />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Trusted by */}
      <section className="py-10 border-y border-border/40 bg-background/40">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <div className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
              Trusted by <CountUp to={50000} suffix="+" className="text-foreground/90 font-medium" /> creators and teams
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70">
              {["LATE NIGHT", "BUILDLOG", "MINIMAL", "NORTHBEAM", "PIXELHAUS", "RIVER", "AURORA"].map((b, i) => (
                <span
                  key={b}
                  className="text-sm font-semibold tracking-widest text-muted-foreground transition-all duration-500 hover:text-foreground hover:opacity-100"
                  style={{ animation: `float-y ${8 + (i % 3)}s ease-in-out ${-i}s infinite` }}
                >
                  {b}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <SectionTitle eyebrow="Features" title="Your entire content engine, in one place." />
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {[
              { icon: TrendingUp, title: "Real-time trend discovery", desc: "Cross-platform signals from Instagram, YouTube, TikTok and Facebook — scored against your niche." },
              { icon: Sparkles, title: "AI content recommendations", desc: "Personalized ideas, hooks, scripts, captions and hashtags ready to ship." },
              { icon: Zap, title: "Viral score engine", desc: "Score any title or script before you post. Get clear, specific rewrites that actually help." },
              { icon: ShieldCheck, title: "Competitor intelligence", desc: "Track competitors, surface content gaps, and copy what's working — instantly." },
              { icon: Star, title: "Smart calendar", desc: "Drag-and-drop scheduling with AI-suggested slots based on your audience." },
              { icon: Sparkles, title: "Pulse AI copilot", desc: "Ask anything: 'what should I post tomorrow?' and get answers grounded in your data." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="glass rounded-2xl p-6 hover-lift h-full">
                  <div className="size-9 rounded-lg bg-[var(--gradient-primary)] grid place-items-center sheen">
                    <Icon className="size-4 text-white" />
                  </div>
                  <div className="mt-4 font-medium">{title}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="py-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div>
              <Badge className="bg-primary/15 text-primary border-0">Competitor analysis</Badge>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">See exactly what's working — for them.</h3>
              <p className="mt-3 text-muted-foreground">Track unlimited handles across platforms. Pulse surfaces their winning posts, posting cadence, and the content gaps you can own.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass rounded-2xl p-5 hover-lift">
              <CompetitorPreview />
            </div>
          </Reveal>
        </div>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center mt-20">
          <Reveal delay={120}>
            <div className="order-2 md:order-1 glass rounded-2xl p-5 hover-lift">
              <TrendPreview />
            </div>
          </Reveal>
          <Reveal>
            <div className="order-1 md:order-2">
              <Badge className="bg-primary/15 text-primary border-0">Trend prediction</Badge>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">Catch trends before the algorithm does.</h3>
              <p className="mt-3 text-muted-foreground">Our virality model fuses cross-platform signals to surface trends 6-48 hours earlier than your feed.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionTitle eyebrow="Testimonials" title="Loved by creators who actually ship." />
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="glass rounded-2xl p-6 hover-lift h-full">
                  <div className="flex gap-1 text-primary">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="size-3.5 fill-current" />)}</div>
                  <p className="mt-3 text-sm">{t.quote}</p>
                  <div className="mt-5 text-xs text-muted-foreground"><span className="text-foreground font-medium">{t.name}</span> · {t.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionTitle eyebrow="Pricing" title="Plans for every stage of your growth." />
          <div className="grid md:grid-cols-4 gap-4 mt-10">
            {pricingPlans.map((p, idx) => (
              <Reveal key={p.name} delay={idx * 80}>
                <div className={`rounded-2xl p-6 relative hover-lift h-full ${p.popular ? "glass-strong ring-1 ring-primary/40 ring-glow" : "glass"}`}>
                  {p.popular && <Badge className="absolute -top-2 right-4 bg-[var(--gradient-primary)] border-0">Popular</Badge>}
                  <div className="text-xs text-muted-foreground">{p.tag}</div>
                  <div className="mt-1 text-lg font-medium">{p.name}</div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-semibold">{p.price === null ? "Custom" : `$${p.price}`}</span>
                    {typeof p.price === "number" && p.price > 0 && <span className="text-xs text-muted-foreground">/mo</span>}
                  </div>
                  <ul className="mt-5 space-y-2 text-sm">
                    {p.features.map(f => (
                      <li key={f} className="flex gap-2 items-start text-muted-foreground">
                        <Check className="size-4 text-primary shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`mt-6 w-full btn-lift ${p.popular ? "bg-[var(--gradient-primary)]" : ""}`} variant={p.popular ? "default" : "secondary"}>
                    {p.cta}
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-5">
          <SectionTitle eyebrow="FAQ" title="Questions, answered." />
          <Accordion type="single" collapsible className="mt-8 glass rounded-2xl px-2">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-border/60">
                <AccordionTrigger className="px-4 hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-5">
          <Reveal>
            <div className="rounded-3xl p-12 text-center glass-strong ring-glow relative overflow-hidden sheen">
              <div className="absolute inset-0 bg-[var(--gradient-aurora)] opacity-60 pointer-events-none animate-ambient" />
              <h3 className="relative text-4xl font-semibold tracking-tight">Start growing this week.</h3>
              <p className="relative mt-3 text-muted-foreground">
                Join <CountUp to={50000} suffix="+" className="text-foreground/90 font-medium" /> creators using CreatorPulse to ship faster, smarter, and viral-er.
              </p>
              <div className="relative mt-6 flex items-center justify-center gap-3">
                <Link to="/signup"><Button size="lg" className="bg-[var(--gradient-primary)] hover:opacity-90 btn-lift">Start free</Button></Link>
                <Link to="/dashboard"><Button size="lg" variant="ghost" className="border border-border/60 btn-lift">Open demo</Button></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border/40 py-10">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded bg-[var(--gradient-primary)] grid place-items-center"><Zap className="size-3 text-white" /></div>
            © 2026 CreatorPulse AI, Inc.
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
            <a href="#" className="hover:text-foreground">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs uppercase tracking-widest text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

/* ---------- Live previews (subtle continuous motion) ---------- */

function useDrift(seed: number, amp = 0.4, ms = 2200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let alive = true;
    const tick = () => {
      if (!alive) return;
      setV((Math.sin(Date.now() / 900 + seed) + Math.random() * 0.3) * amp);
    };
    tick();
    const id = window.setInterval(tick, ms);
    return () => { alive = false; window.clearInterval(id); };
  }, [seed, amp, ms]);
  return v;
}

function DashboardPreview() {
  useTick(2400);
  const dViews = useDrift(1, 0.05);
  const dFoll = useDrift(2, 0.04);
  const dEng = useDrift(3, 0.03);
  const dTr = useDrift(4, 0.06);

  const views = 1.28 + dViews;
  const followers = 84.2 + dFoll * 10;
  const engagement = 7.4 + dEng;
  const trending = Math.max(80, Math.min(99, Math.round(92 + dTr * 10)));

  const stats = [
    { l: "Views", v: `${views.toFixed(2)}M`, d: `+${(12.8 + dViews * 4).toFixed(1)}%` },
    { l: "Followers", v: `${followers.toFixed(1)}k`, d: `+${(4.1 + dFoll * 2).toFixed(1)}%` },
    { l: "Engagement", v: `${engagement.toFixed(1)}%`, d: `+${(0.6 + dEng * 0.4).toFixed(2)}` },
    { l: "Trending", v: `${trending}`, d: `+${Math.round(8 + dTr * 4)}` },
  ];

  // Animated chart bars
  const [bars, setBars] = useState<number[]>([20,35,28,42,55,48,62,70,58,75,82,88,72,90]);
  useEffect(() => {
    const id = window.setInterval(() => {
      setBars((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        const drift = (Math.random() - 0.4) * 18;
        next.push(Math.max(15, Math.min(98, last + drift)));
        return next;
      });
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="p-5 grid grid-cols-12 gap-3 text-xs relative">
      {/* live indicator */}
      <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] text-primary">
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
        </span>
        LIVE
      </div>

      <div className="col-span-3 space-y-2">
        {["Today's trends", "Viral score", "Recommendations", "Competitors"].map((s, i) => (
          <div key={s} className={`px-3 py-2 rounded-lg transition-colors duration-700 ${i===0 ? "bg-white/10" : "bg-white/[0.03] hover:bg-white/[0.06]"}`}>{s}</div>
        ))}
      </div>
      <div className="col-span-9 space-y-3">
        <div className="grid grid-cols-4 gap-3">
          {stats.map(s => (
            <div key={s.l} className="glass rounded-lg p-3 transition-all duration-700">
              <div className="text-[10px] text-muted-foreground">{s.l}</div>
              <div className="mt-1 text-base font-semibold tabular-nums">{s.v}</div>
              <div className="text-[10px] text-[var(--color-success)] tabular-nums">{s.d}</div>
            </div>
          ))}
        </div>
        <div className="glass rounded-lg p-3 h-40 flex items-end gap-1.5 relative overflow-hidden">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-[var(--gradient-primary)] opacity-80 transition-[height] duration-[1600ms] ease-out"
              style={{ height: `${h}%` }}
            />
          ))}
          {/* moving cursor */}
          <div
            className="pointer-events-none absolute size-2 rounded-full bg-white/90 shadow-[0_0_0_4px_oklch(0.62_0.17_275/0.25)] transition-all duration-[1800ms] ease-in-out"
            style={{
              left: `${10 + ((bars[bars.length - 1] ?? 50) % 80)}%`,
              bottom: `${20 + ((bars[bars.length - 1] ?? 50) % 50)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function CompetitorPreview() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setTick((n) => n + 1), 2600);
    return () => clearInterval(id);
  }, [mounted]);

  return (
    <div className="space-y-2">
      {["@alishaboe", "@thomasfrank", "@minimalbeans", "@buildinpublic"].map((h, i) => {
        const drift = mounted
          ? (Math.sin(Date.now() / 1400 + i) * 2 + Math.random()).toFixed(1)
          : "0.0";
        const pct = 12 + i * 5 + Number(drift);
        return (
          <div key={h} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-border/60 hover-lift transition-all">
            <div className="flex items-center gap-3">
              <div className="size-7 rounded-full bg-[var(--gradient-primary)] relative">
                <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-[var(--color-success)] ring-2 ring-background animate-pulse-soft" />
              </div>
              <div>
                <div className="text-sm font-medium">{h}</div>
                <div className="text-[10px] text-muted-foreground tabular-nums">avg {(420 - i * 80).toLocaleString()}k views</div>
              </div>
            </div>
            <div className="text-xs text-primary tabular-nums">+{pct.toFixed(1)}%</div>
          </div>
        );
      })}
    </div>
  );
}

function TrendPreview() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(id);
  }, [mounted]);

  return (
    <div className="space-y-2">
      {["POV: a day in 60s", "AI tools you didn't know", "Audio: 'Espresso' slowed", "GRWM — founder edition"].map((t, i) => {
        const base = 70 + i * 6;
        const drift = mounted ? Math.sin(Date.now() / 1200 + i * 1.3) * 8 : 0;
        const width = Math.max(40, Math.min(99, base + drift));
        const delta = 120 + i * 30 + Math.round(drift * 2);
        return (
          <div key={t} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-border/60 hover-lift">
            <div className="text-sm flex items-center gap-2">
              <Flame className="size-3 text-primary" />
              {t}
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-[var(--gradient-primary)] transition-[width] duration-[1400ms] ease-out"
                  style={{ width: `${width}%` }}
                />
              </div>
              <div className="text-xs text-primary tabular-nums">+{delta}%</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Floating hero cards (decorative, no layout impact) ---------- */
function FloatingHeroCards() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const v = mounted ? (1.24 + Math.sin(Date.now() / 1800) * 0.04).toFixed(2) : "1.24";
  const eng = mounted ? (7.4 + Math.sin(Date.now() / 1600 + 1) * 0.3).toFixed(1) : "7.4";
  const score = mounted ? Math.round(92 + Math.sin(Date.now() / 1500 + 2) * 4) : 92;

  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setMounted((m) => !m), 3000);
    return () => clearInterval(id);
  }, [mounted]);

  return (
    <div aria-hidden className="hidden xl:block absolute inset-0 pointer-events-none">
      {/* Left — trend card (lowered, tucked to edge near CTA row) */}
      <div className="absolute left-[2%] top-[48%] animate-float-1">
        <div className="glass rounded-xl px-3.5 py-2.5 w-52 shadow-xl">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <TrendingUp className="size-3 text-primary" />
            TREND DETECTED · TIKTOK
          </div>
          <div className="mt-1.5 text-xs font-medium">"POV: a day in 60s" — surging</div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-[var(--gradient-primary)] transition-all duration-1000" style={{ width: "78%" }} />
            </div>
            <span className="text-[10px] text-primary tabular-nums">+182%</span>
          </div>
        </div>
      </div>

      {/* Right — analytics card (lowered to align with subhead) */}
      <div className="absolute right-[2%] top-[44%] animate-float-2">
        <div className="glass rounded-xl px-3.5 py-2.5 w-48 shadow-xl">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Eye className="size-3 text-primary" />
            VIEWS · LAST 24H
          </div>
          <div className="mt-1.5 text-lg font-semibold tabular-nums">{v}M</div>
          <div className="text-[10px] text-[var(--color-success)] tabular-nums">+12.8% vs yesterday</div>
        </div>
      </div>

      {/* Top-left — viral score (small, well above heading) */}
      <div className="absolute left-[3%] top-[18%] animate-float-3">
        <div className="glass rounded-xl px-3.5 py-2.5 w-44 shadow-xl">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Sparkles className="size-3 text-primary" />
            VIRAL SCORE
          </div>
          <div className="mt-1.5 flex items-end gap-1">
            <span className="text-2xl font-semibold tabular-nums">{score}</span>
            <span className="text-[10px] text-muted-foreground mb-1">/ 100</span>
          </div>
        </div>
      </div>

      {/* Top-right — AI pick (well above heading, narrow) */}
      <div className="absolute right-[3%] top-[16%] animate-float-2">
        <div className="glass rounded-xl px-3.5 py-2.5 w-52 shadow-xl">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Activity className="size-3 text-primary" />
            AI PICK · POST TODAY
          </div>
          <div className="mt-1.5 text-xs font-medium leading-snug">
            "3 underrated tools founders use daily"
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground tabular-nums">
            Engagement projection · {eng}%
          </div>
        </div>
      </div>
    </div>
  );
}
