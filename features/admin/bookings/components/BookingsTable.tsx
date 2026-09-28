"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  Trash2,
  Search,
  Calendar,
  Sparkles,
  User,
  BedDouble,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import type { IBooking, BookingStatus } from "../types/type.booking";
import { DeleteDialog } from "./Dialog/DeleteDialog";

interface BookingsTableProps {
  bookings: IBooking[];
}

const HEADERS = [
  { label: "Booking", align: "text-left" },
  { label: "Guest", align: "text-left" },
  { label: "Room", align: "text-left" },
  { label: "Dates", align: "text-left" },
  { label: "Total", align: "text-left" },
  { label: "Status", align: "text-left" },
  { label: "Actions", align: "text-right" },
];

const STATUS_STYLES: Record<
  BookingStatus,
  { bg: string; text: string; ring: string; dot: string }
> = {
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-100",
    dot: "bg-amber-500",
  },
  completed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-100",
    dot: "bg-emerald-500",
  },
  cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-100",
    dot: "bg-red-500",
  },
  confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-100",
    dot: "bg-blue-500",
  },
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const nightsBetween = (start: string, end: string) => {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)));
};

export default function BookingsTable({ bookings }: BookingsTableProps) {
  const [searchBooking, setSearchBooking] = useState("");
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | undefined>(
    undefined
  );

  /* ============ Filter ============ */
  const query = searchBooking.trim().toLowerCase();
  const filteredBookings = query
    ? bookings.filter((b) => {
        const matchUser = b.user?.userName?.toLowerCase().includes(query);
        const matchRoom = b.room?.roomNumber?.toLowerCase().includes(query);
        const matchStatus = b.status?.toLowerCase().includes(query);
        const matchId = b._id.toLowerCase().includes(query);
        return matchUser || matchRoom || matchStatus || matchId;
      })
    : bookings;

  /* ============ Empty State ============ */
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F3EE]">
          <Sparkles className="h-6 w-6 text-[#4E604F]" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-[#1B1C1C]">
          No bookings yet
        </h3>
        <p className="mt-1 text-sm text-[#8A9189]">
          Bookings will appear here once guests start reserving rooms.
        </p>
      </div>
    );
  }

  const hasResults = filteredBookings.length > 0;

  return (
    <div className="space-y-4">
      {/* ============ Search ============ */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9189]" />
        <input
          type="text"
          placeholder="Search by guest, room, status, or booking ID..."
          value={searchBooking}
          onChange={(e) => setSearchBooking(e.target.value)}
          className="h-10 w-full rounded-xl border border-[#E4E7E2] bg-[#F8F9F7] py-2.5 pl-10 pr-4 text-sm text-[#303530] placeholder:text-[#8A9189] transition-all focus:border-[#4E604F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4E604F]/10"
        />
      </div>

      <DeleteDialog
        open={openDeleteModel}
        onOpenChange={setOpenDeleteModel}
        bookingId={selectedBooking?._id!}
      />

      {/* ============ Desktop Table ============ */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#E4E7E2] bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#E4E7E2] bg-[#FAFBF9]">
                {HEADERS.map((col) => (
                  <th
                    key={col.label}
                    className={`px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A9189] lg:px-5 ${col.align}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F6F2]">
              {hasResults ? (
                filteredBookings.map((booking, index) => {
                  const nights = nightsBetween(
                    booking.startDate,
                    booking.endDate
                  );
                  const statusStyle = STATUS_STYLES[booking.status];

                  return (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: Math.min(index * 0.02, 0.2),
                      }}
                      className="group transition-colors hover:bg-[#FAFBF9]"
                    >
                      {/* Booking ID */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0F3EE] ring-1 ring-[#E4E7E2]">
                            <Calendar className="h-5 w-5 text-[#4E604F]" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#1B1C1C]">
                              #{booking._id.slice(-6)}
                            </p>
                            <p className="truncate text-[11px] text-[#8A9189]">
                              {nights} {nights === 1 ? "night" : "nights"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Guest */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4E604F]/10 text-[10px] font-semibold text-[#4E604F]">
                            {booking.user?.userName?.charAt(0).toUpperCase() ??
                              "?"}
                          </div>
                          <span className="truncate text-xs text-[#666B65]">
                            {booking.user?.userName ?? "Unknown"}
                          </span>
                        </div>
                      </td>

                      {/* Room */}
                      <td className="px-4 py-4 lg:px-5">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4F6F2] px-2.5 py-1">
                          <BedDouble className="h-3.5 w-3.5 text-[#4E604F]" />
                          <span className="text-xs font-semibold text-[#303530]">
                            {booking.room?.roomNumber ?? "N/A"}
                          </span>
                        </span>
                      </td>

                      {/* Dates */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex flex-col text-xs">
                          <span className="font-medium text-[#303530]">
                            {formatDate(booking.startDate)}
                          </span>
                          <span className="text-[#8A9189]">
                            → {formatDate(booking.endDate)}
                          </span>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-4 py-4 lg:px-5">
                        <span className="text-sm font-bold text-[#4E604F]">
                          ${booking.totalPrice.toFixed(2)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 lg:px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.ring}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                          />
                          {booking.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex items-center justify-end gap-0.5">
                          <Link
                            href={`/dashboard/bookings/${booking._id}`}
                            aria-label={`View booking ${booking._id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            aria-label={`Delete booking ${booking._id}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-red-50 hover:text-red-600"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setOpenDeleteModel(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={HEADERS.length} className="px-4 py-10">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-6 w-6 text-[#8A9189]" />
                      <h3 className="mt-3 text-sm font-semibold text-[#1B1C1C]">
                        No bookings match &ldquo;{searchBooking}&rdquo;
                      </h3>
                      <p className="mt-1 text-xs text-[#8A9189]">
                        Try a different guest, room, or status.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============ Mobile Cards ============ */}
      <div className="space-y-3 md:hidden">
        {hasResults ? (
          filteredBookings.map((booking, index) => {
            const nights = nightsBetween(booking.startDate, booking.endDate);
            const statusStyle = STATUS_STYLES[booking.status];

            return (
              <motion.article
                key={booking._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: Math.min(index * 0.02, 0.2),
                }}
                className="rounded-2xl border border-[#E4E7E2] bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F3EE] ring-1 ring-[#E4E7E2]">
                      <Calendar className="h-5 w-5 text-[#4E604F]" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1B1C1C]">
                        #{booking._id.slice(-6)}
                      </p>
                      <p className="text-xs text-[#8A9189]">
                        {nights} {nights === 1 ? "night" : "nights"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ring-1 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.ring}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                    />
                    {booking.status}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#666B65]">
                    <User className="h-3.5 w-3.5 text-[#8A9189]" />
                    <span className="truncate">
                      {booking.user?.userName ?? "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#666B65]">
                    <BedDouble className="h-3.5 w-3.5 text-[#8A9189]" />
                    <span>Room {booking.room?.roomNumber ?? "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#666B65]">
                    <Calendar className="h-3.5 w-3.5 text-[#8A9189]" />
                    <span>
                      {formatDate(booking.startDate)} →{" "}
                      {formatDate(booking.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#F4F6F2] pt-2">
                    <span className="font-bold text-[#4E604F]">
                      ${booking.totalPrice.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/dashboard/bookings/${booking._id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setOpenDeleteModel(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E7E2] bg-white py-12">
            <Search className="h-6 w-6 text-[#8A9189]" />
            <h3 className="mt-3 text-sm font-semibold text-[#1B1C1C]">
              No bookings match &ldquo;{searchBooking}&rdquo;
            </h3>
            <p className="mt-1 text-xs text-[#8A9189]">
              Try a different guest, room, or status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}