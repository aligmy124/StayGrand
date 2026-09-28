"use client";

import {
  Calendar,
  User,
  BedDouble,
  DollarSign,
  Clock3,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import type { IBooking, BookingStatus } from "../types/type.booking";

interface BookingDetailsProps {
  booking: IBooking;
}

const STATUS_STYLES: Record<
  BookingStatus,
  { bg: string; text: string; ring: string; dot: string; label: string }
> = {
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-100",
    dot: "bg-amber-500",
    label: "Pending",
  },
  completed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-100",
    dot: "bg-emerald-500",
    label: "Completed",
  },
  cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-100",
    dot: "bg-red-500",
    label: "Cancelled",
  },
  confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-100",
    dot: "bg-blue-500",
    label: "Confirmed",
  },
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const nightsBetween = (start: string, end: string) => {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)));
};

export default function BookingDetails({ booking }: BookingDetailsProps) {
  const nights = nightsBetween(booking.startDate, booking.endDate);
  const status = STATUS_STYLES[booking.status];

  return (
    <article className="overflow-hidden rounded-3xl border border-[#E4E7E2] bg-white shadow-[0_8px_30px_rgba(27,28,28,0.05)]">
      {/* ================= HERO ================= */}
      <div className="relative border-b border-[#F0F2EE] bg-gradient-to-br from-[#F8F9F7] via-white to-[#F0F3EE] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-[#8A9189]">
              Booking
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-[#1B1C1C] sm:text-4xl">
              #{booking._id.slice(-8)}
            </h1>
            <p className="mt-1 text-xs text-[#8A9189]">
              Created {formatDate(booking.createdAt)}
            </p>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ring-1 ${status.bg} ${status.text} ${status.ring}`}
          >
            <span className={`h-2 w-2 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>
      </div>

      {/* ================= META ================= */}
      <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">
        <MetaCard
          icon={User}
          label="Guest"
          value={booking.user?.userName ?? "Unknown"}
        />
        <MetaCard
          icon={BedDouble}
          label="Room"
          value={booking.room?.roomNumber ?? "N/A"}
        />
        <MetaCard
          icon={Calendar}
          label="Check-in"
          value={formatDate(booking.startDate)}
        />
        <MetaCard
          icon={Calendar}
          label="Check-out"
          value={formatDate(booking.endDate)}
        />
      </div>

      {/* ================= PRICING ================= */}
      <div className="border-t border-[#F0F2EE] px-5 py-5 sm:px-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F3EE]">
            <DollarSign className="h-4 w-4 text-[#4E604F]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#1B1C1C]">
              Pricing Summary
            </h2>
            <p className="text-xs text-[#8A9189]">
              Total cost breakdown
            </p>
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-[#F0F2EE] bg-[#FAFBF9] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#666B65]">Nights</span>
            <span className="font-semibold text-[#303530]">
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#666B65]">Price per night</span>
            <span className="font-semibold text-[#303530]">
              ${(booking.totalPrice / nights).toFixed(2)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-[#E4E7E2] pt-2">
            <span className="text-sm font-semibold text-[#1B1C1C]">Total</span>
            <span className="text-xl font-bold text-[#4E604F]">
              ${booking.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* ================= PAYMENT ================= */}
      {booking.stripeChargeId && (
        <div className="border-t border-[#F0F2EE] px-5 py-5 sm:px-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#1B1C1C]">
                Payment
              </h2>
              <p className="text-xs text-[#8A9189]">
                Payment processed successfully
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#F0F2EE] bg-[#FAFBF9] px-3 py-2.5">
            <CreditCard className="h-4 w-4 text-[#4E604F]" />
            <span className="font-mono text-xs text-[#303530]">
              {booking.stripeChargeId}
            </span>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="flex flex-col gap-3 border-t border-[#F0F2EE] bg-[#FAFBF9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4E604F]/10 text-xs font-bold text-[#4E604F]">
            {booking.user?.userName?.charAt(0).toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#303530]">
              {booking.user?.userName ?? "Unknown"}
            </p>
            <p className="text-xs text-[#8A9189]">Guest</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#8A9189]">
          <Clock3 className="h-3.5 w-3.5" />
          <span>Updated {formatDate(booking.updatedAt)}</span>
        </div>
      </footer>
    </article>
  );
}

/* =========================================================
   Meta Card
========================================================= */
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