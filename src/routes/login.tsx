import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — CreatorPulse" }] }),
  component: Login,
});

function Login() {
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue to CreatorPulse.">
      <SocialButtons />
      <Divider />
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}>
        <Field id="email" label="Email" type="email" placeholder="you@studio.com" />
        <Field id="password" label="Password" type="password" placeholder="••••••••" />
        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-muted-foreground"><Checkbox /> Remember me</label>
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <Button className="w-full bg-[var(--gradient-primary)]">Sign in</Button>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        No account? <Link to="/signup" className="text-primary hover:underline">Create one</Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen aurora-bg grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-10 relative overflow-hidden border-r border-border/40">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-[var(--gradient-primary)] grid place-items-center"><Zap className="size-4 text-white" /></div>
          <span className="text-sm font-semibold">CreatorPulse</span>
        </Link>
        <div className="relative">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <blockquote className="relative max-w-md text-2xl font-medium leading-snug">
            "It's like having a growth strategist on call every morning."
          </blockquote>
          <div className="relative mt-4 text-sm text-muted-foreground">Diego Morales — Founder, BuildLog</div>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 CreatorPulse AI</div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="secondary" className="bg-white/5 hover:bg-white/10">
        <svg className="size-4" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1H12v3.2h5.35c-.23 1.4-1.66 4.1-5.35 4.1-3.22 0-5.85-2.66-5.85-5.95S8.78 6.5 12 6.5c1.84 0 3.07.78 3.78 1.45L18.2 5.6C16.7 4.2 14.6 3.3 12 3.3 6.93 3.3 2.8 7.43 2.8 12.5S6.93 21.7 12 21.7c6.92 0 9.5-4.86 9.5-7.94 0-.53-.05-.93-.15-2.66Z"/></svg>
        Google
      </Button>
      <Button variant="secondary" className="bg-white/5 hover:bg-white/10"><Github className="size-4" /> GitHub</Button>
    </div>
  );
}

export function Divider() {
  return (
    <div className="my-4 flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted-foreground">
      <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export function Field({ id, label, ...rest }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs">{label}</Label>
      <Input id={id} {...rest} className="bg-card/50" />
    </div>
  );
}
