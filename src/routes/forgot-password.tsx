import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AuthShell, Field } from "./login";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — CreatorPulse" }] }),
  component: Forgot,
});

function Forgot() {
  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a secure reset link.">
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); }}>
        <Field id="email" label="Email" type="email" placeholder="you@studio.com" />
        <Button className="w-full bg-[var(--gradient-primary)]">Send reset link</Button>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Remembered it? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
