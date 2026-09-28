"use client";

import { Users, Shield, UserCheck, UserX } from "lucide-react";
import type { IUser } from "../types/type.user";

interface UsersHeaderProps {
  totalCount?: number;
  users: IUser[];
}

export default function UsersHeader({
  totalCount = 0,
  users,
}: UsersHeaderProps) {
  const adminCount = users.filter((u) => u.role === "admin").length;
  const verifiedCount = users.filter((u) => u.verified).length;
  const unverifiedCount = users.filter((u) => !u.verified).length;

  return (
    <div className="mb-6 space-y-4">
      {/* Title */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-2xl font-bold text-[#1B1C1C] sm:text-3xl">
              Users
            </h1>
            <span className="inline-flex shrink-0 items-center rounded-full bg-[#F0F3EE] px-2.5 py-1 text-xs font-semibold text-[#4E604F]">
              {totalCount} total
            </span>
          </div>
          <p className="mt-1 text-sm text-[#8A9189]">
            Browse all registered users, roles, and verification status.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Shield}
          label="Admins"
          value={adminCount}
          color="purple"
        />
        <StatCard
          icon={UserCheck}
          label="Verified"
          value={verifiedCount}
          color="green"
        />
        <StatCard
          icon={UserX}
          label="Unverified"
          value={unverifiedCount}
          color="amber"
        />
        <StatCard
          icon={Users}
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
  color: "purple" | "green" | "amber" | "default";
}) {
  const colorMap = {
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      ring: "ring-purple-100",
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