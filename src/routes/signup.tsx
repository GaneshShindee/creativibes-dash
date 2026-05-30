import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AuthShell, SocialButtons, Divider, Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — CreatorPulse" }] }),
  component: Signup,
});

function Signup() {
  return (
    <AuthShell title="Create your account" subtitle="14-day Pro trial. No credit card.">
      <SocialButtons />
      <Divider />
      <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}>
        <Field id="name" label="Full name" placeholder="Aisha Patel" />
        <Field id="email" label="Email" type="email" placeholder="you@studio.com" />
        <Field id="password" label="Password" type="password" placeholder="At least 8 characters" />
        <Button className="w-full bg-[var(--gradient-primary)]">Create account</Button>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
