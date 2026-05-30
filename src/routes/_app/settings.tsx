import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { pricingPlans } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — CreatorPulse" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Profile, brand, integrations, billing, and security." />

      <Tabs defaultValue="profile">
        <TabsList className="bg-card/50">
          {["profile","brand","integrations","notifications","billing","security"].map(t => (
            <TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <div className="glass rounded-2xl p-6 grid md:grid-cols-3 gap-6">
            <div>
              <div className="size-20 rounded-full bg-[var(--gradient-primary)] grid place-items-center text-xl font-semibold">AP</div>
              <Button variant="secondary" className="bg-white/5 mt-3">Change photo</Button>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-3">
              <Field label="Full name" defaultValue="Aisha Patel" />
              <Field label="Email" defaultValue="aisha@studio.com" />
              <Field label="Handle" defaultValue="@aishabuilds" />
              <Field label="Timezone" defaultValue="Europe/Lisbon" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="brand" className="mt-4">
          <div className="glass rounded-2xl p-6 grid md:grid-cols-2 gap-3">
            <Field label="Brand name" defaultValue="Pulse Studio" />
            <Field label="Niche" defaultValue="Tech / Productivity" />
            <Field label="Region" defaultValue="Global" />
            <Field label="Language" defaultValue="English" />
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-4">
          <div className="glass rounded-2xl divide-y divide-border/60">
            {[
              { name: "Instagram", connected: true },
              { name: "YouTube", connected: true },
              { name: "TikTok", connected: false },
              { name: "Facebook", connected: false },
              { name: "Notion", connected: true },
              { name: "Slack", connected: false },
            ].map(i => (
              <div key={i.name} className="flex items-center justify-between p-4">
                <div>
                  <div className="text-sm font-medium">{i.name}</div>
                  <div className="text-xs text-muted-foreground">{i.connected ? "Connected" : "Not connected"}</div>
                </div>
                <Button variant={i.connected ? "secondary" : "default"} className={i.connected ? "bg-white/5" : "bg-[var(--gradient-primary)]"}>
                  {i.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <div className="glass rounded-2xl p-2">
            {[
              "Daily trend digest",
              "New viral opportunity in your niche",
              "Competitor posts that overperform",
              "Weekly growth report",
              "Product updates",
            ].map(n => (
              <div key={n} className="flex items-center justify-between p-3">
                <div className="text-sm">{n}</div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-4 space-y-4">
          <div className="glass rounded-2xl p-6 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Current plan</div>
              <div className="text-lg font-medium mt-1">Creator Pro · $29/mo</div>
              <div className="text-xs text-muted-foreground mt-1">Renews on Jan 12, 2026</div>
            </div>
            <Button className="bg-[var(--gradient-primary)]">Manage billing</Button>
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            {pricingPlans.map(p => (
              <div key={p.name} className={`rounded-2xl p-5 ${p.name === "Creator Pro" ? "glass-strong ring-1 ring-primary/40" : "glass"}`}>
                <div className="text-xs text-muted-foreground">{p.tag}</div>
                <div className="text-base font-medium mt-1">{p.name}</div>
                <div className="text-2xl font-semibold mt-2">{p.price === null ? "Custom" : `$${p.price}`}</div>
                {p.name === "Creator Pro" ? (
                  <Badge className="mt-3 bg-primary/15 text-primary border-0">Current</Badge>
                ) : (
                  <Button size="sm" variant="secondary" className="bg-white/5 mt-3 w-full">Switch</Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <div className="glass rounded-2xl p-6 space-y-4">
            <Field label="Current password" type="password" />
            <Field label="New password" type="password" />
            <div className="flex items-center justify-between pt-3 border-t border-border/60">
              <div>
                <div className="text-sm font-medium">Two-factor authentication</div>
                <div className="text-xs text-muted-foreground">Add an extra layer of security at sign-in.</div>
              </div>
              <Switch />
            </div>
            <Button className="bg-[var(--gradient-primary)]">Save changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Input {...rest} className="bg-card/50" />
    </div>
  );
}
