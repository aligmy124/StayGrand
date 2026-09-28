"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface ChartCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
}

export default function ChartCard({
  title,
  description,
  icon: Icon,
  action,
  children,
}: ChartCardProps) {
  return (
    <section className="rounded-2xl border border-[#E4E7E2] bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {Icon && (
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0F3EE]"
              aria-hidden="true"
            >
              <Icon className="h-4 w-4 text-[#4E604F]" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-[#1B1C1C]">{title}</h2>
            {description && (
              <p className="mt-0.5 text-xs text-[#8A9189]">{description}</p>
            )}
          </div>
        </div>
        {action}
      </header>

      <div>{children}</div>
    </section>
  );
}