"use client";

import Link from "next/link";
import { Plus, Sparkles, TrendingUp, Calendar } from "lucide-react";
import type { IFacility } from "../types/type.facility";

interface FacilityHeaderProps {
  totalCount?: number;
  facilities: IFacility[];
}

export default function FacilityHeader({
  totalCount = 0,
  facilities,
}: FacilityHeaderProps) {
  const thisMonthCount = facilities.filter((f) => {
    const d = new Date(f.createdAt);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
              Facilities
            </h1>
            <span className="inline-flex shrink-0 items-center rounded-full bg-[#F0F3EE] px-2.5 py-1 text-xs font-semibold text-[#4E604F]">
              {totalCount} total
            </span>
          </div>
          <p className="mt-1 text-sm text-[#8A9189]">
            Manage all room facilities and amenities.
          </p>
        </div>

        <div className="flex w-full items-center gap-2 md:w-auto">
          <Link
            href="/dashboard/facilities/create"
            className="group relative inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#4E604F] px-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#3F4F40] hover:shadow-lg hover:shadow-[#4E604F]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4E604F]/50 focus-visible:ring-offset-2 active:scale-[0.98] sm:flex-none sm:px-4"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Plus className="relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-90" />
            <span className="relative whitespace-nowrap">Create Facility</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={Sparkles}
          label="Total"
          value={totalCount}
          color="default"
        />
        <StatCard
          icon={Calendar}
          label="This Month"
          value={thisMonthCount}
          color="green"
        />
        <StatCard
          icon={TrendingUp}
          label="Showing"
          value={facilities.length}
          color="blue"
        />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: "default" | "green" | "blue";
}) {
  const colorMap = {
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
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      ring: "ring-blue-100",
    },
  };

  const c = colorMap[color];

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E4E7E2] bg-white p-4 shadow-sm">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.text} ring-1 ${c.ring}`}
      >
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A9189]">
          {label}
        </p>
        <p className="mt-0.5 text-lg font-bold text-[#1B1C1C]">{value}</p>
      </div>
    </div>
  );
}