"use client";

import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  hint?: string;
  color?: "default" | "green" | "amber" | "purple" | "blue";
}

const COLOR_MAP = {
  default: {
    bg: "bg-[#F0F3EE]",
    text: "text-[#4E604F]",
    ring: "ring-[#E4E7E2]",
  },
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    ring: "ring-emerald-100",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    ring: "ring-amber-100",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    ring: "ring-purple-100",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    ring: "ring-blue-100",
  },
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  color = "default",
}: StatCardProps) {
  const c = COLOR_MAP[color];

  return (
    <article
      className="group rounded-2xl border border-[#E4E7E2] bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#DDE3DA] hover:shadow-md"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.text} ring-1 ${c.ring} transition-transform duration-200 group-hover:scale-105`}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>

        {hint && (
          <span className="rounded-full bg-[#F4F6F2] px-2 py-0.5 text-[10px] font-medium text-[#8A9189]">
            {hint}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A9189]">
          {label}
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-[#1B1C1C]">
          {value.toLocaleString()}
        </p>
      </div>
    </article>
  );
}