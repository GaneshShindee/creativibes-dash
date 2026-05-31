import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
  size = "md",
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  size?: "md" | "lg";
}) {
  const titleClass =
    size === "lg"
      ? "text-[2.25rem] sm:text-[2.8125rem] leading-tight font-semibold tracking-tight"
      : "text-2xl sm:text-3xl font-semibold tracking-tight";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        <h1 className={titleClass}>{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
