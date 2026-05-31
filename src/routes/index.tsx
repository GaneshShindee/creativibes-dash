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
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="max-w-5xl mx-auto px-5 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3 text-primary" /> New · Pulse AI 2.0 — now with audio trend detection
          </div>
          <h1 className="mt-6 text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05]">
            Never run out of <span className="gradient-text">viral content</span> ideas again.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            CreatorPulse is the AI growth copilot for creators. Discover trends, analyze competitors,
            predict virality, and ship ready-to-post scripts — every morning.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/signup"><Button size="lg" className="bg-[var(--gradient-primary)] hover:opacity-90 ring-glow">
              Start free <ArrowRight className="size-4" />
            </Button></Link>
            <Link to="/dashboard"><Button size="lg" variant="ghost" className="border border-border/60">
              See live dashboard
            </Button></Link>
          </div>
          <div className="mt-6 text-xs text-muted-foreground">No credit card · 14-day Pro trial</div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 max-w-6xl mx-auto px-5 relative">
          <div className="rounded-2xl glass-strong p-2 ring-glow">
            <div className="rounded-xl overflow-hidden bg-background/80 border border-border/60">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-10 border-y border-border/40 bg-background/40">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Trusted by 50,000+ creators and teams
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70">
            {["LATE NIGHT", "BUILDLOG", "MINIMAL", "NORTHBEAM", "PIXELHAUS", "RIVER", "AURORA"].map(b => (
              <span key={b} className="text-sm font-semibold tracking-widest text-muted-foreground">{b}</span>
            ))}
          </div>
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
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-6">
                <div className="size-9 rounded-lg bg-[var(--gradient-primary)] grid place-items-center">
                  <Icon className="size-4 text-white" />
                </div>
                <div className="mt-4 font-medium">{title}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="py-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="bg-primary/15 text-primary border-0">Competitor analysis</Badge>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight">See exactly what's working — for them.</h3>
            <p className="mt-3 text-muted-foreground">Track unlimited handles across platforms. Pulse surfaces their winning posts, posting cadence, and the content gaps you can own.</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <CompetitorPreview />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center mt-20">
          <div className="order-2 md:order-1 glass rounded-2xl p-5">
            <TrendPreview />
          </div>
          <div className="order-1 md:order-2">
            <Badge className="bg-primary/15 text-primary border-0">Trend prediction</Badge>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight">Catch trends before the algorithm does.</h3>
            <p className="mt-3 text-muted-foreground">Our virality model fuses cross-platform signals to surface trends 6-48 hours earlier than your feed.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionTitle eyebrow="Testimonials" title="Loved by creators who actually ship." />
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-6">
                <div className="flex gap-1 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div>
                <p className="mt-3 text-sm">{t.quote}</p>
                <div className="mt-5 text-xs text-muted-foreground"><span className="text-foreground font-medium">{t.name}</span> · {t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionTitle eyebrow="Pricing" title="Plans for every stage of your growth." />
          <div className="grid md:grid-cols-4 gap-4 mt-10">
            {pricingPlans.map((p) => (
              <div key={p.name} className={`rounded-2xl p-6 relative ${p.popular ? "glass-strong ring-1 ring-primary/40 ring-glow" : "glass"}`}>
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
                <Button className={`mt-6 w-full ${p.popular ? "bg-[var(--gradient-primary)]" : ""}`} variant={p.popular ? "default" : "secondary"}>
                  {p.cta}
                </Button>
              </div>
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
          <div className="rounded-3xl p-12 text-center glass-strong ring-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--gradient-aurora)] opacity-60 pointer-events-none" />
            <h3 className="relative text-4xl font-semibold tracking-tight">Start growing this week.</h3>
            <p className="relative mt-3 text-muted-foreground">Join 50,000+ creators using CreatorPulse to ship faster, smarter, and viral-er.</p>
            <div className="relative mt-6 flex items-center justify-center gap-3">
              <Link to="/signup"><Button size="lg" className="bg-[var(--gradient-primary)] hover:opacity-90">Start free</Button></Link>
              <Link to="/dashboard"><Button size="lg" variant="ghost" className="border border-border/60">Open demo</Button></Link>
            </div>
          </div>
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

function DashboardPreview() {
  return (
    <div className="p-5 grid grid-cols-12 gap-3 text-xs">
      <div className="col-span-3 space-y-2">
        {["Today's trends", "Viral score", "Recommendations", "Competitors"].map((s, i) => (
          <div key={s} className={`px-3 py-2 rounded-lg ${i===0 ? "bg-white/10" : "bg-white/[0.03]"}`}>{s}</div>
        ))}
      </div>
      <div className="col-span-9 space-y-3">
        <div className="grid grid-cols-4 gap-3">
          {[
            { l: "Views", v: "1.28M", d: "+12.8%" },
            { l: "Followers", v: "84.2k", d: "+4.1%" },
            { l: "Engagement", v: "7.4%", d: "+0.6" },
            { l: "Trending", v: "92", d: "+8" },
          ].map(s => (
            <div key={s.l} className="glass rounded-lg p-3">
              <div className="text-[10px] text-muted-foreground">{s.l}</div>
              <div className="mt-1 text-base font-semibold">{s.v}</div>
              <div className="text-[10px] text-[var(--color-success)]">{s.d}</div>
            </div>
          ))}
        </div>
        <div className="glass rounded-lg p-3 h-40 flex items-end gap-1.5">
          {[20,35,28,42,55,48,62,70,58,75,82,88,72,90].map((h,i)=>(
            <div key={i} className="flex-1 rounded-sm bg-[var(--gradient-primary)] opacity-80" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CompetitorPreview() {
  return (
    <div className="space-y-2">
      {["@alishaboe", "@thomasfrank", "@minimalbeans", "@buildinpublic"].map((h, i) => (
        <div key={h} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-border/60">
          <div className="flex items-center gap-3">
            <div className="size-7 rounded-full bg-[var(--gradient-primary)]" />
            <div>
              <div className="text-sm font-medium">{h}</div>
              <div className="text-[10px] text-muted-foreground">avg {(420 - i * 80).toLocaleString()}k views</div>
            </div>
          </div>
          <div className="text-xs text-primary">+{12 + i * 5}%</div>
        </div>
      ))}
    </div>
  );
}

function TrendPreview() {
  return (
    <div className="space-y-2">
      {["POV: a day in 60s", "AI tools you didn't know", "Audio: 'Espresso' slowed", "GRWM — founder edition"].map((t, i) => (
        <div key={t} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-border/60">
          <div className="text-sm">{t}</div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-20 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-[var(--gradient-primary)]" style={{ width: `${70 + i * 6}%` }} />
            </div>
            <div className="text-xs text-primary">+{120 + i * 30}%</div>
          </div>
        </div>
      ))}
    </div>
  );
}
