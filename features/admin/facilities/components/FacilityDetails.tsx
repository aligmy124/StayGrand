"use client";

import {
  Sparkles,
  User,
  Calendar,
  Clock3,
  Hash,
} from "lucide-react";
import type { IFacility } from "../types/type.facility";

interface FacilityDetailsProps {
  facility: IFacility;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function FacilityDetails({ facility }: FacilityDetailsProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[#E4E7E2] bg-white shadow-[0_8px_30px_rgba(27,28,28,0.05)]">
      {/* Hero */}
      <div className="relative border-b border-[#F0F2EE] bg-gradient-to-br from-[#F8F9F7] via-white to-[#F0F3EE] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F0F3EE] ring-1 ring-[#E4E7E2]">
            <Sparkles className="h-7 w-7 text-[#4E604F]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-[#8A9189]">
              Facility
            </p>
            <h1 className="truncate text-2xl font-bold tracking-tight text-[#1B1C1C] sm:text-3xl">
              {facility.name}
            </h1>
            <p className="mt-1 font-mono text-[11px] text-[#8A9189]">
              #{facility._id.slice(-8)}
            </p>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3 sm:p-5">
        <MetaCard
          icon={Hash}
          label="Facility ID"
          value={facility._id.slice(-8)}
        />
        <MetaCard
          icon={User}
          label="Created By"
          value={facility.createdBy?.userName ?? "Unknown"}
        />
        <MetaCard
          icon={Calendar}
          label="Created"
          value={formatDate(facility.createdAt)}
        />
      </div>

      {/* Footer */}
      <footer className="flex flex-col gap-3 border-t border-[#F0F2EE] bg-[#FAFBF9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4E604F]/10 text-xs font-bold text-[#4E604F]">
            {facility.createdBy?.userName?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#303530]">
              {facility.createdBy?.userName ?? "Unknown"}
            </p>
            <p className="text-xs text-[#8A9189]">Created by</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#8A9189]">
          <Clock3 className="h-3.5 w-3.5" />
          <span>Updated {formatDate(facility.updatedAt)}</span>
        </div>
      </footer>
    </article>
  );
}

function MetaCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-[#E8EBE6] bg-[#FAFBF9] p-3.5 transition-colors hover:border-[#DDE3DA] hover:bg-[#F7F9F6]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#4E604F] shadow-sm ring-1 ring-[#E4E7E2]">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A9189]">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-[#1B1C1C]">
          {value}
        </p>
      </div>
    </div>
  );
}