"use client";

import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { IBooking } from "../types/type.booking";

interface BookingHeaderProps {
  totalCount?: number;
  bookings: IBooking[];
}

export default function BookingHeader({
  totalCount = 0,
  bookings,
}: BookingHeaderProps) {
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;

  return (
    <div className="mb-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
              Bookings
            </h1>

            <span className="inline-flex shrink-0 items-center rounded-full bg-[#F0F3EE] px-2.5 py-1 text-xs font-semibold text-[#4E604F]">
              {totalCount} total
            </span>
          </div>

          <p className="mt-1 text-sm text-[#8A9189]">
            Manage all bookings, statuses, and reservations.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={Clock}
          label="Pending"
          value={pendingCount}
          color="amber"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={completedCount}
          color="green"
        />
        <StatCard
          icon={Calendar}
          label="Total"
          value={totalCount}
          color="default"
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
  color: "amber" | "green" | "default";
}) {
  const colorMap = {
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      ring: "ring-amber-100",
    },
    green: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      ring: "ring-emerald-100",
    },
    default: {
      bg: "bg-[#F0F3EE]",
      text: "text-[#4E604F]",
      ring: "ring-[#E4E7E2]",
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