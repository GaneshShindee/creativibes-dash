import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, TrendingUp, Sparkles, Gauge, Users, CalendarDays,
  PenLine, Library, BarChart3, Settings, Search, Bell, Plus, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AIAssistant } from "./AIAssistant";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/trends", label: "Trends", icon: TrendingUp },
  { to: "/recommendations", label: "Recommendations", icon: Sparkles },
  { to: "/viral-score", label: "Viral Score", icon: Gauge },
  { to: "/competitors", label: "Competitors", icon: Users },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/script-generator", label: "Scripts", icon: PenLine },
  { to: "/library", label: "Library", icon: Library },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen aurora-bg text-foreground">
      <div className="flex">
        {/* Sidebar — full on desktop, narrow icon strip on mobile */}
        <aside className="flex w-14 lg:w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar/60 backdrop-blur-xl h-screen sticky top-0 self-start z-40 overflow-y-auto">
          <div className="px-3 lg:px-5 py-4 lg:py-5 flex items-center justify-center lg:justify-start gap-0 lg:gap-2">
            <div className="size-8 rounded-lg bg-[var(--gradient-primary)] grid place-items-center">
              <Zap className="size-4 text-white" />
            </div>
            <div className="leading-tight hidden lg:block">
              <div className="text-sm font-semibold">CreatorPulse</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">AI Growth Copilot</div>
            </div>
          </div>
          <nav className="px-1.5 lg:px-3 py-2 flex-1 space-y-1 lg:space-y-0.5">
            {nav.map(({ to, label, icon: Icon }) => {
              const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  title={label}
                  className={`flex items-center justify-center lg:justify-start gap-0 lg:gap-3 rounded-md px-0 lg:px-3 py-2.5 lg:py-2 text-sm transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                  }`}
                >
                  <Icon className="size-5 lg:size-4" />
                  <span className="hidden lg:inline">{label}</span>
                  {label === "Recommendations" && (
                    <Badge className="hidden lg:flex ml-auto bg-primary/15 text-primary border-0 text-[10px]">12</Badge>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block m-3 rounded-xl glass p-4">
            <div className="text-xs text-muted-foreground">Plan</div>
            <div className="mt-1 text-sm font-medium">Creator Pro</div>
            <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-2/3 bg-[var(--gradient-primary)]" />
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">142 / 200 AI scripts used</div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 sm:px-6 h-14">
              <div className="relative flex-1 max-w-xl">
                <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Search trends, scripts, competitors…"
                  className="pl-9 bg-card/50 border-border/60 h-9"
                />
                <kbd className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] text-muted-foreground bg-white/5 border border-border/60">⌘K</kbd>
              </div>
              <Button size="sm" variant="ghost" className="gap-2">
                <Bell className="size-4" />
              </Button>
              <Button size="sm" className="gap-1.5 bg-[var(--gradient-primary)] hover:opacity-90">
                <Plus className="size-4" /> New
              </Button>
              <div className="size-8 rounded-full bg-[var(--gradient-primary)] grid place-items-center text-xs font-semibold">AP</div>
            </div>
          </header>
          <main className="px-4 sm:px-6 py-6 max-w-[1400px] mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <AIAssistant />
    </div>
  );
}
